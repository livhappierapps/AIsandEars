import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const DOMAIN = process.env.EXPO_PUBLIC_DOMAIN ?? "";

interface Tier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  tier: string;
  features: string[];
  featured: boolean;
  isSubscription: boolean;
}

const TIERS: Tier[] = [
  {
    id: "full-monthly",
    name: "Full Uplink",
    subtitle: "Monthly",
    price: "$10.99",
    tier: "full-monthly",
    features: ["Unlimited audio + vision", "Leo sees & hears you", "24/7 access", "Cancel anytime"],
    featured: true,
    isSubscription: true,
  },
  {
    id: "audio-monthly",
    name: "Audio Uplink",
    subtitle: "Monthly",
    price: "$5.99",
    tier: "audio-monthly",
    features: ["Unlimited audio", "Leo hears you", "24/7 access", "Cancel anytime"],
    featured: false,
    isSubscription: true,
  },
  {
    id: "full-session",
    name: "Full Session",
    subtitle: "30 minutes",
    price: "$4.99",
    tier: "full-session",
    features: ["30-min audio + vision", "Leo sees & hears you", "One-time payment"],
    featured: false,
    isSubscription: false,
  },
  {
    id: "audio-session",
    name: "Audio Session",
    subtitle: "30 minutes",
    price: "$2.99",
    tier: "audio-session",
    features: ["30-min audio only", "Leo hears you", "One-time payment"],
    featured: false,
    isSubscription: false,
  },
];

export default function PackagesTab() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleBuy = async (tier: Tier) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoadingTier(tier.id);

    try {
      // After Whop redirects back, deep link returns:
      // ais-and-ears-native://conversation?membership_id=mem_xxx&tier=audio-monthly
      const successUrl = `ais-and-ears-native://conversation?membership_id=MEMBERSHIP_ID&tier=${tier.tier}`;
      const cancelUrl = "ais-and-ears-native://cancelled";

      const res = await fetch(`https://${DOMAIN}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tier.tier,
          successUrl,
          cancelUrl,
        }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout unavailable");
      }

      await WebBrowser.openBrowserAsync(data.url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      Alert.alert("Checkout Error", msg);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: colors.foreground }]}>Choose Your Uplink</Text>
        <Text style={[styles.subheading, { color: colors.mutedForeground }]}>
          Give Leo your eyes and ears. No middlemen. No transcriptions.
        </Text>

        {TIERS.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            colors={colors}
            loading={loadingTier === tier.id}
            onBuy={handleBuy}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface TierCardProps {
  tier: Tier;
  colors: ReturnType<typeof useColors>;
  loading: boolean;
  onBuy: (tier: Tier) => void;
}

function TierCard({ tier, colors, loading, onBuy }: TierCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: tier.featured ? colors.primary : colors.border,
          borderWidth: tier.featured ? 1.5 : 1,
        },
      ]}
    >
      {tier.featured && (
        <View style={[styles.featuredBadge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.featuredText, { color: colors.primaryForeground }]}>
            Most Popular
          </Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <View>
          <Text style={[styles.tierName, { color: colors.foreground }]}>{tier.name}</Text>
          <Text style={[styles.tierSubtitle, { color: colors.mutedForeground }]}>
            {tier.subtitle}
          </Text>
        </View>
        <View style={styles.priceBlock}>
          <Text style={[styles.price, { color: tier.featured ? colors.primary : colors.foreground }]}>
            {tier.price}
          </Text>
          {tier.isSubscription && (
            <Text style={[styles.perMonth, { color: colors.mutedForeground }]}>/mo</Text>
          )}
        </View>
      </View>

      <View style={styles.featureList}>
        {tier.features.map((feat) => (
          <View key={feat} style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <Text style={[styles.featureText, { color: colors.mutedForeground }]}>{feat}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.buyButton,
          {
            backgroundColor: tier.featured ? colors.primary : colors.secondary,
            opacity: pressed || loading ? 0.75 : 1,
          },
        ]}
        onPress={() => onBuy(tier)}
        disabled={loading}
        testID={`buy-${tier.id}`}
      >
        {loading ? (
          <ActivityIndicator size="small" color={tier.featured ? colors.primaryForeground : colors.foreground} />
        ) : (
          <>
            <Text
              style={[
                styles.buyText,
                { color: tier.featured ? colors.primaryForeground : colors.foreground },
              ]}
            >
              Get Access
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color={tier.featured ? colors.primaryForeground : colors.foreground}
            />
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  heading: {
    fontFamily: "Cormorant_600SemiBold",
    fontSize: 38,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subheading: {
    fontFamily: "Raleway_400Regular",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 16,
    overflow: "hidden",
  },
  featuredBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 12,
  },
  featuredText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
  },
  tierName: {
    fontFamily: "Cormorant_700Bold",
    fontSize: 24,
    letterSpacing: 0.3,
  },
  tierSubtitle: {
    fontFamily: "Raleway_400Regular",
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  price: {
    fontFamily: "Cormorant_700Bold",
    fontSize: 32,
  },
  perMonth: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
  },
  featureList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 13,
    flex: 1,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 4,
  },
  buyText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
