import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { apiUrl } from "@/lib/api";

/**
 * Small, collapsed "Owner access" link for the packages screen. Posts the
 * private owner pass to /api/owner-pass and opens the conversation with the
 * returned session id, the same way a verified Whop session is opened.
 */
export function OwnerAccess() {
  const colors = useColors();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!code.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("owner-pass"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        sessionId?: string;
        tier?: string;
        expiresAt?: string | null;
        error?: string;
      };
      if (!res.ok || !data.sessionId) {
        throw new Error(
          res.status === 404
            ? "Owner access isn't turned on for this server."
            : (data.error ?? "That code didn't work."),
        );
      }
      setCode("");
      setOpen(false);
      router.push({
        pathname: "/conversation",
        params: {
          session_id: data.sessionId,
          tier: data.tier ?? "",
          ...(data.expiresAt ? { expires_at: data.expiresAt } : {}),
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "That code didn't work.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.toggle}
        testID="owner-access-toggle"
      >
        <Feather name="key" size={12} color={colors.mutedForeground} />
        <Text style={[styles.toggleText, { color: colors.mutedForeground }]}>
          Owner access
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.form} testID="owner-access-form">
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Owner pass"
        placeholderTextColor={colors.mutedForeground}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={submit}
        style={[
          styles.input,
          { color: colors.foreground, borderColor: colors.border },
        ]}
        testID="owner-access-input"
      />
      {error ? (
        <Text style={[styles.error, { color: colors.destructive }]}>
          {error}
        </Text>
      ) : null}
      <View style={styles.row}>
        <Pressable
          onPress={submit}
          disabled={busy || !code.trim()}
          style={[
            styles.button,
            {
              backgroundColor: colors.secondary,
              opacity: busy || !code.trim() ? 0.6 : 1,
            },
          ]}
          testID="owner-access-submit"
        >
          {busy ? (
            <ActivityIndicator size="small" color={colors.foreground} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.foreground }]}>
              Connect
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setOpen(false);
            setError(null);
          }}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: colors.mutedForeground }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    opacity: 0.7,
  },
  toggleText: { fontFamily: "Raleway_400Regular", fontSize: 12 },
  form: { gap: 8, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
  },
  error: { fontFamily: "Raleway_400Regular", fontSize: 12 },
  row: { flexDirection: "row", gap: 8 },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 100,
  },
  buttonText: { fontFamily: "Raleway_600SemiBold", fontSize: 13 },
});
