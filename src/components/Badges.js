import React from 'react';
import { View, Text } from 'react-native';
import { T, FLAG_COLORS, TIER_STYLES } from '../constants/theme';

export function FlagBadge({ flag }) {
  const style = FLAG_COLORS[flag.color] || FLAG_COLORS.neutral;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: style.bg, borderWidth: 1, borderColor: style.border, paddingVertical: 2, paddingHorizontal: 7, borderRadius: T.R.sm }}>
      <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.7, color: style.text, fontFamily: T.F.bodyBold }}>{flag.label}</Text>
    </View>
  );
}

export function TierBadge({ tier }) {
  const style = TIER_STYLES[tier];
  return (
    <View style={{ backgroundColor: style.bg, borderWidth: 1, borderColor: style.border, paddingVertical: 3, paddingHorizontal: 9, borderRadius: T.R.sm }}>
      <Text style={{ fontSize: 9, fontWeight: '800', letterSpacing: 0.6, color: style.text, fontFamily: T.F.bodyBold }}>{tier}</Text>
    </View>
  );
}

export function DimensionBar({ label, value, color }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <Text style={{ width: 80, fontSize: 9, fontWeight: '600', color: T.textLight, fontFamily: T.F.bodySemi, letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'right' }}>{label}</Text>
      <View style={{ flex: 1, height: 4, backgroundColor: T.bgSub, borderRadius: 2, overflow: 'hidden' }}>
        <View style={{ width: `${value}%`, height: '100%', backgroundColor: color || T.accent, borderRadius: 2 }} />
      </View>
      <Text style={{ width: 28, fontSize: 10, fontWeight: '600', color: T.textMid, fontFamily: T.F.bodySemi, textAlign: 'right' }}>{value}</Text>
    </View>
  );
}
