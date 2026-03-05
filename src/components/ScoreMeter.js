import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T, TIER_STYLES } from '../constants/theme';

export default function ScoreMeter({ score, size = 44 }) {
  const tierStyle = score >= 65 ? TIER_STYLES["STORY-READY"] : score >= 40 ? TIER_STYLES["HAS POTENTIAL"] : score >= 20 ? TIER_STYLES["RAW MATERIAL"] : TIER_STYLES["SEED"];
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <View style={{ width: size, height: size, flexShrink: 0 }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={T.borderLight} strokeWidth={3} />
        <Circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={tierStyle.text} strokeWidth={3} strokeDasharray={`${circumference}`} strokeDashoffset={offset} strokeLinecap="round" />
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'JetBrainsMono_700Bold', fontSize: size > 40 ? 13 : size > 24 ? 10 : 8, color: tierStyle.text }}>{score}</Text>
      </View>
    </View>
  );
}
