import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { T, TIER_STYLES } from '../constants/theme';
import ScoreMeter from '../components/ScoreMeter';
import DumplingIcon from '../components/DumplingIcon';
import { findBestWeaves } from '../engines/weave';

export default function WeaveScreen({ entries, postedIds, onShipWeave }) {
  const weaves = useMemo(() => findBestWeaves(entries, postedIds), [entries, postedIds]);
  const [expandedWeave, setExpandedWeave] = useState(null);
  const availableCount = entries.filter(e => !postedIds.has(e.id)).length;
  const postedCount = postedIds.size;

  if (entries.length < 2) {
    return (
      <View style={{ alignItems: 'center', padding: 48, paddingHorizontal: T.S.xl }}>
        <DumplingIcon size={64} showSteam={true} showEyes={true} />
        <View style={{ height: T.S.md }} />
        <Text style={{ color: T.textLight, fontSize: 13, textAlign: 'center' }}>Need at least 2 dumps to find weave opportunities.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: 18, paddingHorizontal: T.S.xl, marginBottom: T.S.xl, ...T.shadow }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm, marginBottom: 10 }}>
          <Text style={{ color: T.accent, fontSize: 14 }}>{'\u29D6'}</Text>
          <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.3, color: T.accent, fontFamily: 'JetBrainsMono_700Bold' }}>NARRATIVE WEAVE ENGINE</Text>
        </View>
        <Text style={{ color: T.textMid, fontSize: 12, lineHeight: 20 }}>Dump pairs that amplify each other when combined into a single post or thread.</Text>
        <View style={{ flexDirection: 'row', gap: T.S.lg, marginTop: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: T.text, fontFamily: 'JetBrainsMono_700Bold' }}>{availableCount}</Text>
            <Text style={{ fontSize: 10, color: T.textLight }}>available</Text>
          </View>
          {postedCount > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}><Text style={{ fontSize: 10, fontWeight: '700', color: T.textLight, fontFamily: 'JetBrainsMono_700Bold' }}>{postedCount}</Text><Text style={{ fontSize: 10, color: T.textFaint }}>posted</Text></View>}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: T.accent, fontFamily: 'JetBrainsMono_700Bold' }}>{weaves.length}</Text>
            <Text style={{ fontSize: 10, color: T.textLight }}>pairs found</Text>
          </View>
        </View>
      </View>

      {weaves.length === 0 ? (
        <View style={{ alignItems: 'center', padding: 36 }}>
          <Text style={{ color: T.textLight, fontSize: 13, textAlign: 'center' }}>No strong weave pairs yet. Keep dumping.</Text>
        </View>
      ) : (
        <View>
          {weaves.map((weave, i) => {
            const isOpen = expandedWeave === i;
            const [first, second] = weave.suggestedOrder;
            const firstTier = TIER_STYLES[first.analysis.tier];
            const secondTier = TIER_STYLES[second.analysis.tier];
            return (
              <TouchableOpacity key={i} onPress={() => setExpandedWeave(isOpen ? null : i)} activeOpacity={0.7} style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: isOpen ? T.accentBorder : T.border, borderRadius: T.R.lg, padding: 18, marginBottom: T.S.md, ...T.shadow }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <ScoreMeter score={weave.weaveScore} size={42} />
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: T.text }}>WEAVE SCORE</Text>
                        {weave.liftPercent > 0 && <Text style={{ fontSize: 10, fontWeight: '700', color: T.green, fontFamily: 'JetBrainsMono_700Bold' }}>+{weave.liftPercent}% lift</Text>}
                      </View>
                      <Text style={{ fontSize: 10, color: T.textLight, fontFamily: 'JetBrainsMono_400Regular' }}>base avg {weave.baseAvg} {'\u2192'} weaved {weave.weaveScore}</Text>
                    </View>
                  </View>
                  {weave.daysDiff > 0 && <View style={{ backgroundColor: T.bgSub, paddingVertical: 3, paddingHorizontal: T.S.sm, borderRadius: T.R.sm }}><Text style={{ fontSize: 9, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular' }}>{weave.daysDiff}d apart</Text></View>}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {weave.matchedPatterns.map((p, pi) => (
                    <View key={pi} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder, paddingVertical: 3, paddingHorizontal: 10, borderRadius: T.R.sm }}>
                      <Text style={{ fontSize: 11, color: T.accent }}>{p.icon}</Text>
                      <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.5, color: T.accent, fontFamily: 'JetBrainsMono_700Bold' }}>{p.label.toUpperCase()} +{p.bonus}</Text>
                    </View>
                  ))}
                </View>

                <View style={{ gap: 6 }}>
                  <View style={{ padding: 10, paddingHorizontal: T.S.md, borderRadius: T.R.sm, backgroundColor: T.bgSub, borderLeftWidth: 3, borderLeftColor: firstTier.text }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Text style={{ fontSize: 8, fontWeight: '800', letterSpacing: 1.1, color: T.textLight, fontFamily: 'JetBrainsMono_700Bold' }}>1ST</Text>
                      <ScoreMeter score={first.analysis.composite} size={20} />
                    </View>
                    <Text style={{ color: T.textMid, fontSize: 11, lineHeight: 17.5, fontFamily: 'JetBrainsMono_400Regular' }}>{first.text}</Text>
                  </View>
                  <View style={{ alignItems: 'center', paddingVertical: 2 }}><Text style={{ fontSize: 14, color: T.accent }}>{'\u2193'}</Text></View>
                  <View style={{ padding: 10, paddingHorizontal: T.S.md, borderRadius: T.R.sm, backgroundColor: T.bgSub, borderLeftWidth: 3, borderLeftColor: secondTier.text }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Text style={{ fontSize: 8, fontWeight: '800', letterSpacing: 1.1, color: T.textLight, fontFamily: 'JetBrainsMono_700Bold' }}>2ND</Text>
                      <ScoreMeter score={second.analysis.composite} size={20} />
                    </View>
                    <Text style={{ color: T.textMid, fontSize: 11, lineHeight: 17.5, fontFamily: 'JetBrainsMono_400Regular' }}>{second.text}</Text>
                  </View>
                </View>

                {isOpen && weave.matchedPatterns.length > 0 && (
                  <View style={{ marginTop: T.S.lg, paddingTop: 14, borderTopWidth: 1, borderTopColor: T.borderLight }}>
                    <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 1.1, color: T.textLight, fontFamily: 'JetBrainsMono_700Bold', marginBottom: 10 }}>WHY THIS WEAVE WORKS</Text>
                    {weave.matchedPatterns.map((p, pi) => (
                      <View key={pi} style={{ padding: 10, paddingHorizontal: 14, marginBottom: 6, borderRadius: T.R.sm, backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: T.text, marginBottom: 3 }}>{p.icon} {p.label}</Text>
                        <Text style={{ fontSize: 11, color: T.textMid, lineHeight: 16.5 }}>{p.desc}</Text>
                      </View>
                    ))}
                    {weave.timeBonus > 0 && <View style={{ padding: T.S.sm, paddingHorizontal: 14, borderRadius: T.R.sm, backgroundColor: T.blueBg, borderWidth: 1, borderColor: 'rgba(74,122,155,0.15)', marginBottom: 6 }}><Text style={{ fontSize: 11, color: T.blue }}><Text style={{ fontWeight: '700' }}>+{weave.timeBonus} time distance bonus</Text> — entries {weave.daysDiff} days apart</Text></View>}
                    {weave.compBonus > 0 && <View style={{ padding: T.S.sm, paddingHorizontal: 14, borderRadius: T.R.sm, backgroundColor: T.purpleBg, borderWidth: 1, borderColor: 'rgba(123,94,167,0.15)', marginBottom: 6 }}><Text style={{ fontSize: 11, color: T.purple }}><Text style={{ fontWeight: '700' }}>+{weave.compBonus} complementary bonus</Text> — different scoring dimensions</Text></View>}
                    <TouchableOpacity onPress={() => onShipWeave(weave.a, weave.b)} activeOpacity={0.7} style={{ backgroundColor: T.accent, borderRadius: T.R.pill, padding: T.S.md, marginTop: T.S.md, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFEF9', letterSpacing: 0.3 }}>{'\u25B2'} SHIP THIS WEAVE</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
