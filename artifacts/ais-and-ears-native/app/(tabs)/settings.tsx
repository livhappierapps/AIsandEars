import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSettings } from "@/context/SettingsContext";
import { useColors } from "@/hooks/useColors";

export default function SettingsTab() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { settings, update } = useSettings();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const toggle = (key: keyof typeof settings) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    update({ [key]: !settings[key] });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.foreground }]}>Settings</Text>

      {/* Voice & Camera */}
      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
        Input
      </Text>
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <SettingRow
          icon={<Ionicons name="mic-outline" size={20} color={colors.primary} />}
          label="Microphone"
          description="Enable voice input"
          value={settings.useMic}
          onToggle={() => toggle("useMic")}
          colors={colors}
        />
        <Divider colors={colors} />
        <SettingRow
          icon={<Ionicons name="camera-outline" size={20} color={colors.primary} />}
          label="Camera"
          description="Enable camera vision"
          value={settings.useCam}
          onToggle={() => toggle("useCam")}
          colors={colors}
        />
      </View>

      {/* Leo Behavior */}
      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
        Leo
      </Text>
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <SettingRow
          icon={<Ionicons name="volume-medium-outline" size={20} color={colors.primary} />}
          label="Verbal Responses"
          description="Leo speaks replies aloud"
          value={settings.verbalResponses}
          onToggle={() => toggle("verbalResponses")}
          colors={colors}
        />
        <Divider colors={colors} />
        <SettingRow
          icon={<Feather name="eye" size={20} color={colors.primary} />}
          label="Auto Vision"
          description="Send camera frames automatically"
          value={settings.autoVision}
          onToggle={() => toggle("autoVision")}
          colors={colors}
        />
      </View>

      {/* Appearance */}
      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
        Appearance
      </Text>
      <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <SettingRow
          icon={<Ionicons name="moon-outline" size={20} color={colors.primary} />}
          label="Dark Mode"
          description="Deep navy interface"
          value={settings.isDark}
          onToggle={() => toggle("isDark")}
          colors={colors}
        />
      </View>

      {/* App info */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
          AIs&amp;Ears — v1.0.0
        </Text>
        <Text style={[styles.footerSubtext, { color: colors.mutedForeground }]}>
          Powered by xAI Grok · Voice Agent API
        </Text>
      </View>
    </ScrollView>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
  colors: ReturnType<typeof useColors>;
}

function SettingRow({ icon, label, description, value, onToggle, colors }: RowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconWrapper, { backgroundColor: colors.muted }]}>
        {icon}
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: colors.foreground }]}>{label}</Text>
        <Text style={[styles.rowDesc, { color: colors.mutedForeground }]}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.muted, true: colors.primary + "80" }}
        thumbColor={value ? colors.primary : colors.mutedForeground}
        ios_backgroundColor={colors.muted}
      />
    </View>
  );
}

function Divider({ colors }: { colors: ReturnType<typeof useColors> }) {
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 8,
  },
  heading: {
    fontFamily: "Cormorant_600SemiBold",
    fontSize: 38,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    marginTop: 8,
    marginBottom: 4,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontFamily: "Raleway_500Medium",
    fontSize: 15,
  },
  rowDesc: {
    fontFamily: "Raleway_400Regular",
    fontSize: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 66,
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
    gap: 4,
  },
  footerText: {
    fontFamily: "Raleway_500Medium",
    fontSize: 13,
  },
  footerSubtext: {
    fontFamily: "Raleway_300Light",
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
