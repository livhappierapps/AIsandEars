import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const DOMAIN = process.env.EXPO_PUBLIC_DOMAIN ?? "";
const USE_NATIVE_DRIVER = Platform.OS !== "web";

export default function HomeTab() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.6, duration: 900, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: USE_NATIVE_DRIVER }),
      ])
    ).start();
  }, []);

  const handleCTA = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(tabs)/packages");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Hero banner */}
      <View style={styles.heroWrapper}>
        <Image
          source={{ uri: `https://${DOMAIN}/images/ai-banner.jpg` }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", colors.background]}
          style={styles.heroGradient}
          locations={[0.3, 1]}
        />
      </View>

      {/* Content overlay */}
      <Animated.View
        style={[
          styles.contentArea,
          { paddingTop: topPad, paddingBottom: bottomPad + 80, opacity: fadeAnim },
        ]}
        pointerEvents="box-none"
      >
        {/* Top title (over hero image) */}
        <View style={[styles.titleArea, { paddingTop: topPad + 8 }]}>
          <Text style={[styles.appTitle, { color: colors.primary }]}>AIs&amp;Ears</Text>
        </View>

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          <Text style={[styles.headline, { color: colors.foreground }]}>
            Give Your AI{"\n"}Real Eyes &amp; Ears
          </Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            No transcriptions. No middlemen.{"\n"}Leo hears and sees — directly.
          </Text>

          {/* Status pill */}
          <View style={[styles.statusPill, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.statusDotWrapper}>
              <Animated.View
                style={[
                  styles.statusDotPulse,
                  { backgroundColor: "#4ade80", transform: [{ scale: pulseAnim }] },
                ]}
              />
              <View style={[styles.statusDot, { backgroundColor: "#22c55e" }]} />
            </View>
            <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
              Systems Nominal
            </Text>
          </View>

          {/* CTA button */}
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={handleCTA}
            testID="cta-button"
          >
            <Text style={[styles.ctaText, { color: colors.primaryForeground }]}>
              Choose Your Uplink
            </Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "62%",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  contentArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleArea: {
    paddingHorizontal: 24,
  },
  appTitle: {
    fontFamily: "Cormorant_700Bold",
    fontSize: 28,
    letterSpacing: 2,
  },
  bottomContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  headline: {
    fontFamily: "Cormorant_600SemiBold",
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: 0.5,
  },
  tagline: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1,
  },
  statusDotWrapper: {
    width: 10,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
  },
  statusDotPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.35,
  },
  statusText: {
    fontFamily: "Raleway_500Medium",
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 100,
    marginTop: 4,
    marginBottom: 8,
  },
  ctaText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
