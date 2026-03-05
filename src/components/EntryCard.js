import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { T, TIER_STYLES } from '../constants/theme';
import ScoreMeter from './ScoreMeter';
import { FlagBadge, TierBadge, DimensionBar } from './Badges';
import { relTime } from '../engines/helpers';

export default function EntryCard({ entry, expanded, onToggle, isPosted, onTogglePosted, onShip }) {
  const { analysis } = entry;
  const tierStyle = TIER_STYLES[analysis.tier];

  return (
    <View style={{ backgroundColor: expanded ? T.bgCard : 'transparent', borderWidth: expanded ? 1 : 0, borderColor: expanded ? T.border : 'transparent', borderLeftWidth: 3, borderLeftColor: isPosted ? T.textFaint : tierStyle.text, borderRadius: expanded ? T.R.lg : 0, padding: expanded ? 18 : 14, paddingLeft: T.S.lg, marginBottom: T.S.md, opacity: isPosted ? 0.5 : 1, ...(expanded ? T.shadow : {}) }}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
        <ScoreMeter score={analysis.composite} size={expanded ? 48 : 36} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: T.text, fontSize: 13, lineHeight: 22, fontFamily: T.F.body, opacity: expanded ? 1 : 0.85, textDecorationLine: isPosted ? 'line-through' : 'none' }}>{entry.text}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: T.S.sm }}>
            <Text style={{ fontSize: 10, color: T.textFaint, fontFamily: T.F.body }}>{relTime(entry.timestamp)}</Text>
            {isPosted ? (
              <View style={{ backgroundColor: T.bgSub, borderWidth: 1, borderColor: T.border, paddingVertical: 3, paddingHorizontal: 9, borderRadius: T.R.sm }}>
                <Text style={{ fontSize: 9, fontWeight: '800', letterSpacing: 0.6, color: T.textLight, fontFamily: T.F.bodyBold }}>POSTED {'\u2713'}</Text>
              </View>
            ) : (
              <>
                <TierBadge tier={analysis.tier} />
                {analysis.flags.slice(0, expanded ? 10 : 3).map((f, i) => <FlagBadge key={i} flag={f} />)}
                {!expanded && analysis.flags.length > 3 && <Text style={{ fontSize: 9, color: T.textLight, fontFamily: T.F.body }}>+{analysis.flags.length - 3}</Text>}
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 18, paddingTop: T.S.lg, borderTopWidth: 1, borderTopColor: T.borderLight }}>
          <View style={{ flexDirection: 'row', gap: T.S.sm, marginBottom: T.S.lg }}>
            <TouchableOpacity onPress={() => onTogglePosted(entry.id)} activeOpacity={0.7} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: isPosted ? T.greenBg : T.bgSub, borderWidth: 1, borderColor: isPosted ? 'rgba(93,142,62,0.2)' : T.border, borderRadius: T.R.md, padding: 10, paddingHorizontal: 14 }}>
              <View style={{ width: 16, height: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: isPosted ? T.green : 'transparent', borderWidth: 2, borderColor: isPosted ? T.green : T.border }}>
                {isPosted && <Text style={{ color: '#FFFEF9', fontSize: 10, fontWeight: '800' }}>{'\u2713'}</Text>}
              </View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: isPosted ? T.green : T.textMid }}>{isPosted ? 'Posted' : 'Mark posted'}</Text>
            </TouchableOpacity>
            {!isPosted && (
              <TouchableOpacity onPress={() => onShip(entry.id)} activeOpacity={0.7} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: T.accent, borderRadius: T.R.pill, padding: 10, paddingHorizontal: 14 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFEF9', letterSpacing: 0.3 }}>{'\u25B2'} SHIP THIS</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ marginBottom: T.S.lg }}>
            <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.textLight, fontFamily: T.F.bodyBold, marginBottom: 10 }}>SCORE BREAKDOWN</Text>
            <DimensionBar label="Emotion" value={analysis.scores.emotionalIntensity} color={T.red} />
            <DimensionBar label="Tension" value={analysis.scores.narrativeTension} color={T.purple} />
            <DimensionBar label="Value" value={analysis.scores.practicalValue} color={T.accent} />
            <DimensionBar label="Currency" value={analysis.scores.socialCurrency} color={T.blue} />
            <DimensionBar label="Specific" value={analysis.scores.specificity} color={T.green} />
          </View>

          {analysis.suggestions.length > 0 && !isPosted && (
            <View>
              <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.textLight, fontFamily: T.F.bodyBold, marginBottom: T.S.sm }}>BOOST SUGGESTIONS</Text>
              {analysis.suggestions.map((s, i) => (
                <View key={i} style={{ padding: T.S.sm, paddingHorizontal: T.S.md, marginBottom: 4, borderRadius: T.R.sm, backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder }}>
                  <Text style={{ fontSize: 11, color: T.textMid, lineHeight: 16.5 }}><Text style={{ color: T.accent }}>{'\u2192'} </Text>{s}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
