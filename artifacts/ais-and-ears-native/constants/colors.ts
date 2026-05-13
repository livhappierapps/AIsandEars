/**
 * Design tokens derived from the AIs&Ears web app (index.css HSL → hex).
 * Deep navy-teal background + verdigris (#82c4b0) accent.
 * Both light and dark palettes are defined so useColors() auto-switches.
 */

const colors = {
  light: {
    text: "#0d1e2e",
    tint: "#4a9e8a",
    background: "#f0f5f8",
    foreground: "#0d1e2e",
    card: "#ffffff",
    cardForeground: "#0d1e2e",
    primary: "#4a9e8a",
    primaryForeground: "#ffffff",
    secondary: "#dff0eb",
    secondaryForeground: "#0d1e2e",
    muted: "#dff0eb",
    mutedForeground: "#3d6070",
    accent: "#4a9e8a",
    accentForeground: "#ffffff",
    destructive: "#d95a5a",
    destructiveForeground: "#ffffff",
    border: "#b8d5e0",
    input: "#dff0eb",
  },
  dark: {
    text: "#dce9ef",
    tint: "#82c4b0",
    background: "#121f30",
    foreground: "#dce9ef",
    card: "#172538",
    cardForeground: "#dce9ef",
    primary: "#82c4b0",
    primaryForeground: "#0a141f",
    secondary: "#1c2e44",
    secondaryForeground: "#dce9ef",
    muted: "#1f3347",
    mutedForeground: "#7b96ab",
    accent: "#6db5a1",
    accentForeground: "#0a141f",
    destructive: "#d95a5a",
    destructiveForeground: "#ffffff",
    border: "#1e3a52",
    input: "#1c2e44",
  },
  radius: 12,
};

export default colors;
