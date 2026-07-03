/**
 * conversation.tsx — Live session screen
 *
 * Voice pipeline (iOS):
 *   Mic → expo-av LINEAR_PCM 24kHz mono → 500ms WAV chunks
 *   → skip 44-byte WAV header → raw PCM16 bytes
 *   → base64 → input_audio_buffer.append over WebSocket
 *   → xAI server_vad detects speech end → Leo responds in text
 *   → expo-speech reads Leo's response aloud
 *
 * Text pipeline (all platforms):
 *   TextInput → conversation.item.create + response.create → text stream
 *
 * Vision: tap camera → ImagePicker → POST /api/grok-vision → Leo describes what it sees
 */

import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettings } from "@/context/SettingsContext";
import { useColors } from "@/hooks/useColors";

const DOMAIN = process.env.EXPO_PUBLIC_DOMAIN ?? "";

function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type ConnStatus = "idle" | "verifying" | "connecting" | "connected" | "error" | "ended";

interface ChatMessage {
  id: string;
  role: "user" | "leo";
  text: string;
  isStreaming: boolean;
  timestamp: Date;
  isVision?: boolean;
  isVoice?: boolean;
}

// ── PCM16 streaming config ──────────────────────────────────────────────────
// xAI Realtime API requires: PCM16, 24 kHz, mono, little-endian
// iOS LINEAR_PCM records exactly this format inside a WAV container.
// The WAV container header is always 44 bytes — we strip it before sending.
// Android: expo-av cannot output raw PCM16 — voice input is iOS-only for now.

const WAV_HEADER_BYTES = 44;

const MIC_RECORDING_OPTIONS: Audio.RecordingOptions = {
  android: {
    extension: ".wav",
    outputFormat: Audio.AndroidOutputFormat.DEFAULT,
    audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
    sampleRate: 24000,
    numberOfChannels: 1,
    bitRate: 384000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.IOSAudioQuality.MAX,
    outputFormat: Audio.IOSOutputFormat.LINEARPCM,
    sampleRate: 24000,
    numberOfChannels: 1,
    bitRate: 384000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {},
};

// ── Component ────────────────────────────────────────────────────────────────

export default function ConversationScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { settings } = useSettings();

  const params = useLocalSearchParams<{ session_id?: string; tier?: string }>();

  const [status, setStatus] = useState<ConnStatus>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [verifiedSessionId, setVerifiedSessionId] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [hasUsedCamera, setHasUsedCamera] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const streamingIdRef = useRef<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Mic refs — using refs (not state) so async recording loop reads current values
  const isMicActiveRef = useRef(false);
  const currentRecordingRef = useRef<Audio.Recording | null>(null);

  // ── Session verification ─────────────────────────────────────────────────
  useEffect(() => {
    const rawSessionId = params.session_id;
    if (!rawSessionId) { setStatus("error"); return; }

    // Whop membership IDs start with "mem_"
    if (rawSessionId.startsWith("mem_")) {
      verifyWhopSession(rawSessionId, params.tier);
    } else {
      // Already a verified session UUID — go straight to connecting
      setVerifiedSessionId(rawSessionId);
      setTier(params.tier ?? null);
      setStatus("connecting");
    }
  }, []);

  async function verifyWhopSession(membershipId: string, tierParam?: string) {
    setStatus("verifying");
    try {
      const query = new URLSearchParams({ membership_id: membershipId });
      if (tierParam) query.set("tier", tierParam);
      const res = await fetch(`https://${DOMAIN}/api/checkout/verify?${query.toString()}`);
      const data = await res.json() as {
        sessionId?: string;
        tier?: string;
        expiresAt?: string | null;
        error?: string;
      };
      if (!res.ok || !data.sessionId) throw new Error(data.error ?? "Session verification failed");
      setVerifiedSessionId(data.sessionId);
      setTier(data.tier ?? null);
      if (data.expiresAt) setExpiresAt(new Date(data.expiresAt));
      setStatus("connecting");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed";
      Alert.alert("Session Error", msg, [{ text: "Go Back", onPress: () => router.back() }]);
      setStatus("error");
    }
  }

  // ── WebSocket connection ─────────────────────────────────────────────────
  useEffect(() => {
    if (!verifiedSessionId || status !== "connecting") return;

    const userKey = settings.xaiApiKey?.trim();
    const wsUrl = `wss://${DOMAIN}/api/grok-live?sessionId=${verifiedSessionId}${
      userKey ? `&userKey=${encodeURIComponent(userKey)}` : ""
    }`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");

      // Configure session:
      //   - modalities: ["text"] — Leo responds in text, expo-speech reads it aloud
      //   - input_audio_format: "pcm16" — we stream raw PCM16 from the mic
      //   - server_vad — xAI detects when user stops speaking (no manual commit needed)
      //   - silence_duration_ms: 700 — extra 100ms vs web to absorb mobile network jitter
      ws.send(JSON.stringify({
        type: "session.update",
        session: {
          modalities: ["text"],
          input_audio_format: "pcm16",
          instructions:
            "You are Leo, a warm, curious, and present AI. " +
            "Users can speak to you directly via microphone or type messages. " +
            "Be concise (2-3 sentences), conversational, and natural. " +
            "If asked about what you can see, acknowledge you can receive camera snapshots via the vision button.",
          temperature: 0.85,
          max_response_output_tokens: 200,
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 700,
          },
        },
      }));

      addLeoMessage(
        "Connected — I can hear you. Tap the mic to speak, or type below. Tap 📷 to share your view.",
        false,
      );
    };

    ws.onmessage = (event) => {
      try {
        handleServerEvent(JSON.parse(event.data as string));
      } catch {}
    };

    ws.onerror = () => { setStatus("error"); };

    ws.onclose = (e) => {
      if (e.code !== 1000) {
        setStatus((current) => current === "ended" ? current : "error");
      }
    };

    return () => {
      // Stop mic if active when navigating away
      isMicActiveRef.current = false;
      if (currentRecordingRef.current) {
        currentRecordingRef.current.stopAndUnloadAsync().catch(() => {});
        currentRecordingRef.current = null;
      }
      ws.close(1000, "Screen unmounted");
    };
  }, [verifiedSessionId, status === "connecting"]);

  // ── Session timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((expiresAt.getTime() - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeRemaining(0);
        setStatus("ended");
        wsRef.current?.close(1000, "Session expired");
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  // ── Server event handler ─────────────────────────────────────────────────
  const handleServerEvent = useCallback((msg: Record<string, unknown>) => {
    switch (msg.type) {
      case "response.text.delta": {
        const delta = msg.delta as string;
        const sid = streamingIdRef.current;
        if (sid) {
          setMessages((prev) =>
            prev.map((m) => m.id === sid ? { ...m, text: m.text + delta } : m)
          );
        } else {
          const newId = genId();
          streamingIdRef.current = newId;
          setMessages((prev) => [
            ...prev,
            { id: newId, role: "leo", text: delta, isStreaming: true, timestamp: new Date() },
          ]);
        }
        break;
      }

      case "response.done": {
        const sid = streamingIdRef.current;
        if (sid) {
          setMessages((prev) => {
            const done = prev.map((m) =>
              m.id === sid ? { ...m, isStreaming: false } : m
            );
            if (settings.verbalResponses) {
              const finalMsg = done.find((m) => m.id === sid);
              if (finalMsg) {
                Speech.stop();
                Speech.speak(finalMsg.text, { language: "en", rate: 0.92, pitch: 1.05 });
              }
            }
            return done;
          });
          streamingIdRef.current = null;
        }
        setIsSending(false);
        break;
      }

      // Phase 1: PCM16 audio output not yet implemented — Leo responds via text + expo-speech.
      // Phase 2 will buffer these and play Leo's raw voice using expo-av.
      case "response.audio.delta":
      case "response.audio.done":
        break;

      // VAD events — useful for future UI feedback (e.g. "Leo is listening" indicator)
      case "input_audio_buffer.speech_started":
      case "input_audio_buffer.speech_stopped":
      case "input_audio_buffer.committed":
        break;

      case "error":
        setStatus("error");
        break;

      default:
        break;
    }
  }, [settings.verbalResponses]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function addLeoMessage(text: string, isVision = false, isVoice = false) {
    setMessages((prev) => [
      ...prev,
      {
        id: genId(),
        role: "leo",
        text,
        isStreaming: false,
        timestamp: new Date(),
        isVision,
        isVoice,
      },
    ]);
    if (settings.verbalResponses && !isVision) {
      Speech.speak(text, { language: "en", rate: 0.92, pitch: 1.05 });
    }
  }

  // ── PCM16 mic streaming ──────────────────────────────────────────────────
  //
  // Records in 500ms chunks (matching optimal mobile latency vs. overhead tradeoff).
  // Each chunk: expo-av → WAV file → read as base64 → strip 44-byte header
  //             → raw PCM16 bytes → re-encode base64 → input_audio_buffer.append
  //
  // xAI server_vad handles turn detection — no manual commit needed.
  // Loop continues until isMicActiveRef is set false.

  const runRecordingLoop = useCallback(async () => {
    if (!isMicActiveRef.current) return;
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;

    const recording = new Audio.Recording();
    currentRecordingRef.current = recording;

    try {
      await recording.prepareToRecordAsync(MIC_RECORDING_OPTIONS);
      await recording.startAsync();

      // Record 500ms chunk
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      // If mic was stopped during recording, clean up and exit
      if (!isMicActiveRef.current) {
        try { await recording.stopAndUnloadAsync(); } catch {}
        currentRecordingRef.current = null;
        return;
      }

      await recording.stopAndUnloadAsync();
      currentRecordingRef.current = null;

      const uri = recording.getURI();
      if (uri && wsRef.current?.readyState === WebSocket.OPEN) {
        // Read WAV file as base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Decode → skip WAV header → extract raw PCM16 → re-encode
        const binary = atob(base64);
        if (binary.length > WAV_HEADER_BYTES) {
          const pcmBinary = binary.slice(WAV_HEADER_BYTES);
          const pcm16Base64 = btoa(pcmBinary);

          wsRef.current.send(JSON.stringify({
            type: "input_audio_buffer.append",
            audio: pcm16Base64,
          }));
        }

        // Clean up temp file (fire-and-forget)
        FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => {});
      }
    } catch {
      // Recording error — stop loop gracefully
      currentRecordingRef.current = null;
      isMicActiveRef.current = false;
      setIsMicActive(false);
      return;
    }

    // Continue loop
    if (isMicActiveRef.current) {
      runRecordingLoop();
    }
  }, []);

  const startMic = async () => {
    if (status !== "connected") return;

    // expo-av PCM16 recording is iOS-only for now
    // Android MediaRecorder cannot output raw PCM16 without native transcoding
    if (Platform.OS === "android") {
      Alert.alert(
        "Android Voice Coming Soon",
        "Live voice input is currently iOS only. Type your message below, or tap 📷 to share your view.",
      );
      return;
    }

    const { status: permStatus } = await Audio.requestPermissionsAsync();
    if (permStatus !== "granted") {
      Alert.alert(
        "Microphone Access Needed",
        "Enable microphone access in Settings to speak with Leo.",
      );
      return;
    }

    // iOS audio mode: recording requires allowsRecordingIOS
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    Speech.stop(); // stop any current expo-speech before mic goes live
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    isMicActiveRef.current = true;
    setIsMicActive(true);
    runRecordingLoop();
  };

  const stopMic = async () => {
    isMicActiveRef.current = false;
    setIsMicActive(false);

    if (currentRecordingRef.current) {
      try { await currentRecordingRef.current.stopAndUnloadAsync(); } catch {}
      currentRecordingRef.current = null;
    }

    // Restore normal audio mode for playback
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    }).catch(() => {});

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleMic = () => {
    if (isMicActive) {
      stopMic();
    } else {
      startMic();
    }
  };

  // ── Send text message ────────────────────────────────────────────────────
  const sendMessage = () => {
    const text = inputText.trim();
    if (!text || !wsRef.current || status !== "connected" || isSending) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInputText("");
    setIsSending(true);
    inputRef.current?.blur();

    setMessages((prev) => [
      ...prev,
      { id: genId(), role: "user", text, isStreaming: false, timestamp: new Date() },
    ]);

    wsRef.current.send(JSON.stringify({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text }],
      },
    }));
    wsRef.current.send(JSON.stringify({ type: "response.create" }));
  };

  // ── Camera vision ────────────────────────────────────────────────────────
  const sendVisionSnapshot = async () => {
    if (!verifiedSessionId) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const { status: permStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (permStatus !== "granted") {
      Alert.alert("Camera Access Needed", "Allow camera access in Settings to use Leo's vision.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled || !result.assets[0]?.base64) return;

    const imageData = `data:image/jpeg;base64,${result.assets[0].base64}`;

    setMessages((prev) => [
      ...prev,
      {
        id: genId(),
        role: "user",
        text: "📷 Camera snapshot sent",
        isStreaming: false,
        timestamp: new Date(),
        isVision: true,
      },
    ]);

    try {
      const userKey = settings.xaiApiKey?.trim();
      const res = await fetch(`https://${DOMAIN}/api/grok-vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: verifiedSessionId,
          imageData,
          prompt: "What do you see right now?",
          isFirstFrame: !hasUsedCamera,
          ...(userKey ? { userKey } : {}),
        }),
      });
      const data = await res.json() as { message?: string; error?: string };
      if (data.message) {
        addLeoMessage(data.message, true);
        setHasUsedCamera(true);
      }
    } catch {
      addLeoMessage("I couldn't process the image. Please try again.", false);
    }
  };

  // ── Disconnect ───────────────────────────────────────────────────────────
  const handleEnd = () => {
    Alert.alert("End Session?", "Disconnect from Leo?", [
      { text: "Stay", style: "cancel" },
      {
        text: "End",
        style: "destructive",
        onPress: () => {
          Speech.stop();
          // Stop mic before closing WS
          isMicActiveRef.current = false;
          if (currentRecordingRef.current) {
            currentRecordingRef.current.stopAndUnloadAsync().catch(() => {});
            currentRecordingRef.current = null;
          }
          wsRef.current?.close(1000, "User ended session");
          setStatus("ended");
          router.back();
        },
      },
    ]);
  };

  // ── Status helpers ───────────────────────────────────────────────────────
  const statusColor =
    status === "connected" ? "#22c55e"
      : status === "connecting" || status === "verifying" ? "#f59e0b"
        : "#ef4444";

  const statusLabel =
    status === "verifying" ? "Verifying..."
      : status === "connecting" ? "Connecting..."
        : status === "connected" ? (isMicActive ? "Listening..." : "Live")
          : status === "error" ? "Connection Error"
            : status === "ended" ? "Session Ended"
              : "Idle";

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, { backgroundColor: "#0d1926" }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: "#1e3a52" }]}>
        <Pressable onPress={handleEnd} style={styles.headerBack} hitSlop={12}>
          <Ionicons name="chevron-down" size={24} color="#dce9ef" />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Leo</Text>
          <View style={styles.statusRow}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isMicActive ? "#82c4b0" : statusColor },
            ]} />
            <Text style={[
              styles.statusLabel,
              { color: isMicActive ? "#82c4b0" : statusColor },
            ]}>
              {statusLabel}
            </Text>
            {timeRemaining !== null && timeRemaining > 0 && (
              <Text style={styles.timerText}>
                {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
              </Text>
            )}
          </View>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* Chat area */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={[styles.chatList, { paddingBottom: bottomPad + 80 }]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            status === "connecting" || status === "verifying" ? (
              <View style={styles.emptyState}>
                <ActivityIndicator color="#82c4b0" />
                <Text style={styles.emptyText}>
                  {status === "verifying" ? "Verifying payment..." : "Connecting to Leo..."}
                </Text>
              </View>
            ) : status === "error" ? (
              <View style={styles.emptyState}>
                <Ionicons name="warning-outline" size={32} color="#d95a5a" />
                <Text style={[styles.emptyText, { color: "#d95a5a" }]}>
                  Connection failed. Check your internet connection.
                </Text>
              </View>
            ) : null
          }
        />

        {/* Input bar */}
        {(status === "connected" || status === "connecting") && (
          <View
            style={[
              styles.inputBar,
              {
                backgroundColor: "#172538",
                borderTopColor: isMicActive ? "#82c4b040" : "#1e3a52",
                paddingBottom: bottomPad + 8,
              },
            ]}
          >
            {/* Listening strip — shown when mic is active */}
            {isMicActive && (
              <View style={styles.listeningStrip}>
                <View style={[styles.listenDot, { backgroundColor: "#82c4b0" }]} />
                <Text style={[styles.listeningText, { color: "#82c4b0" }]}>
                  Leo is listening — speak naturally
                </Text>
              </View>
            )}

            <View style={styles.inputRow}>
              {/* Camera button */}
              <Pressable
                onPress={sendVisionSnapshot}
                style={({ pressed }) => [
                  styles.iconButton,
                  { backgroundColor: pressed ? "#1e3a52" : "#1c2e44" },
                ]}
                testID="camera-button"
              >
                <Ionicons
                  name={hasUsedCamera ? "camera" : "camera-outline"}
                  size={22}
                  color={hasUsedCamera ? "#82c4b0" : "#7b96ab"}
                />
              </Pressable>

              {/* Mic button */}
              <Pressable
                onPress={toggleMic}
                disabled={status !== "connected"}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: isMicActive
                      ? "#82c4b025"
                      : pressed ? "#1e3a52" : "#1c2e44",
                    borderWidth: isMicActive ? 1 : 0,
                    borderColor: isMicActive ? "#82c4b060" : "transparent",
                  },
                ]}
                testID="mic-button"
              >
                <Ionicons
                  name={isMicActive ? "mic" : "mic-outline"}
                  size={22}
                  color={isMicActive ? "#82c4b0" : "#7b96ab"}
                />
              </Pressable>

              {/* Text input */}
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={isMicActive ? "Or type here too..." : "Say something to Leo..."}
                placeholderTextColor="#7b96ab"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                multiline={false}
                editable={status === "connected"}
                testID="message-input"
              />

              {/* Send button */}
              <Pressable
                onPress={sendMessage}
                disabled={!inputText.trim() || isSending || status !== "connected"}
                style={({ pressed }) => [
                  styles.sendButton,
                  {
                    backgroundColor:
                      inputText.trim() && status === "connected"
                        ? "#82c4b0"
                        : "#1c2e44",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                testID="send-button"
              >
                {isSending ? (
                  <ActivityIndicator size="small" color="#0a141f" />
                ) : (
                  <Feather
                    name="arrow-up"
                    size={18}
                    color={inputText.trim() && status === "connected" ? "#0a141f" : "#7b96ab"}
                  />
                )}
              </Pressable>
            </View>
          </View>
        )}

        {status === "ended" && (
          <View style={[styles.sessionEndedBar, { paddingBottom: bottomPad + 8 }]}>
            <Text style={styles.sessionEndedText}>Session ended</Text>
            <Pressable onPress={() => router.back()} style={styles.goBackButton}>
              <Text style={styles.goBackText}>Choose a new plan</Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isLeo = message.role === "leo";
  return (
    <View style={[styles.bubbleRow, isLeo ? styles.bubbleRowLeft : styles.bubbleRowRight]}>
      {isLeo && (
        <View style={styles.leoAvatar}>
          <Ionicons name="radio" size={14} color="#82c4b0" />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isLeo
            ? { backgroundColor: "#172538", borderBottomLeftRadius: 4 }
            : { backgroundColor: "#82c4b0", borderBottomRightRadius: 4 },
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            { color: isLeo ? "#dce9ef" : "#0a141f" },
            message.isStreaming && { opacity: 0.8 },
          ]}
        >
          {message.text}
          {message.isStreaming && (
            <Text style={{ color: "#82c4b0", opacity: 0.7 }}> ▌</Text>
          )}
        </Text>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerBack: {
    width: 40,
    alignItems: "center",
    paddingBottom: 2,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontFamily: "Cormorant_600SemiBold",
    fontSize: 22,
    color: "#dce9ef",
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  timerText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 11,
    color: "#7b96ab",
    marginLeft: 4,
  },
  chatList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    color: "#7b96ab",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    maxWidth: "85%",
  },
  bubbleRowLeft: { alignSelf: "flex-start" },
  bubbleRowRight: { alignSelf: "flex-end" },
  leoAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1f3347",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    flexShrink: 1,
  },
  bubbleText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
    lineHeight: 22,
  },
  // ── Input bar ──────────────────────────────────────────────────────────
  inputBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  listeningStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
  },
  listenDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  listeningText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 11,
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    backgroundColor: "#1c2e44",
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 11,
    color: "#dce9ef",
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
    maxHeight: 120,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  // ── Session ended bar ──────────────────────────────────────────────────
  sessionEndedBar: {
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 24,
    gap: 12,
    backgroundColor: "#0d1926",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#1e3a52",
  },
  sessionEndedText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    color: "#7b96ab",
  },
  goBackButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#82c4b0",
    borderRadius: 100,
  },
  goBackText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#0a141f",
  },
});
