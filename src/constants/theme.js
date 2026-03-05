export const T = {
  bg: "#F7F4EE",
  bgSub: "#EFEBE3",
  bgCard: "#FFFEF9",
  border: "#E3DBCE",
  borderLight: "#ECE6DB",
  text: "#2A2215",
  textMid: "#6D5C48",
  textLight: "#A49580",
  textFaint: "#C5BBAA",
  accent: "#D4890C",
  accentLight: "#F2C14A",
  accentDark: "#A66A00",
  accentBg: "rgba(212,137,12,0.08)",
  accentBorder: "rgba(212,137,12,0.2)",
  green: "#5D8E3E",
  greenBg: "rgba(93,142,62,0.08)",
  red: "#C75038",
  redBg: "rgba(199,80,56,0.08)",
  blue: "#4A7A9B",
  blueBg: "rgba(74,122,155,0.08)",
  purple: "#7B5EA7",
  purpleBg: "rgba(123,94,167,0.08)",

  // Spacing (4px grid)
  S: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },

  // Fonts
  F: {
    body: 'Nunito_400Regular',
    bodySemi: 'Nunito_600SemiBold',
    bodyBold: 'Nunito_700Bold',
    bodyExtra: 'Nunito_800ExtraBold',
    accent: 'KosugiMaru_400Regular',
  },

  // Border radius
  R: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 },

  // Shadow
  shadow: {
    shadowColor: '#2A2215',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
};

export const FLAG_COLORS = {
  positive: { bg: T.greenBg, text: T.green, border: "rgba(93,142,62,0.2)" },
  tension: { bg: T.redBg, text: T.red, border: "rgba(199,80,56,0.2)" },
  neutral: { bg: T.blueBg, text: T.blue, border: "rgba(74,122,155,0.2)" },
  decision: { bg: T.purpleBg, text: T.purple, border: "rgba(123,94,167,0.2)" },
  value: { bg: T.accentBg, text: T.accentDark, border: T.accentBorder },
  currency: { bg: "rgba(212,137,12,0.06)", text: T.accent, border: "rgba(212,137,12,0.15)" },
};

export const TIER_STYLES = {
  "STORY-READY": { bg: "rgba(93,142,62,0.1)", text: T.green, border: "rgba(93,142,62,0.25)", glow: "rgba(93,142,62,0.05)" },
  "HAS POTENTIAL": { bg: T.accentBg, text: T.accent, border: T.accentBorder, glow: "rgba(212,137,12,0.04)" },
  "RAW MATERIAL": { bg: "rgba(74,122,155,0.06)", text: T.blue, border: "rgba(74,122,155,0.15)", glow: "transparent" },
  "SEED": { bg: "rgba(197,187,170,0.1)", text: T.textLight, border: "rgba(197,187,170,0.2)", glow: "transparent" },
};
