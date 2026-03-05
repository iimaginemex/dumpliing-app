import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { T, TIER_STYLES } from '../constants/theme';
import ScoreMeter from '../components/ScoreMeter';
import DumplingIcon from '../components/DumplingIcon';
import { FlagBadge, TierBadge } from '../components/Badges';

export default function TimelineScreen({ entries, postedIds }) {
  const [filter, setFilter] = useState(null);

  if (entries.length === 0) {
    return (
      <View style={{ alignItems: 'center', padding: 48, paddingHorizontal: T.S.xl }}>
        <DumplingIcon size={64} showSteam={true} showEyes={true} />
        <View style={{ height: T.S.md }} />
        <Text style={{ color: T.textLight, fontSize: 13 }}>Start dumping to see your build timeline.</Text>
      </View>
    );
  }

  const sorted = [...entries].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const filtered = filter ? sorted.filter(e => e.analysis.tier === filter) : sorted;
  const dayGroups = {};
  filtered.forEach(e => {
    const key = new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (!dayGroups[key]) dayGroups[key] = [];
    dayGroups[key].push(e);
  });
  const tiers = ["STORY-READY", "HAS POTENTIAL", "RAW MATERIAL", "SEED"];
  const tierCounts = {};
  tiers.forEach(t => { tierCounts[t] = entries.filter(e => e.analysis.tier === t).length; });
  const avgScore = Math.round(entries.reduce((a, e) => a + e.analysis.composite, 0) / entries.length);

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: T.S.xxl }}>
        {[{ v: `${entries.length}`, l: "DUMPS" }, { v: `${avgScore}`, l: "AVG SCORE" }, { v: `${tierCounts["STORY-READY"]}`, l: "STORY-READY" }].map((s, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: 14, alignItems: 'center', ...T.shadow }}>
            <Text style={{ fontSize: 22, color: T.text, fontFamily: T.F.accent }}>{s.v}</Text>
            <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.textLight, fontFamily: T.F.bodyBold, marginTop: 2 }}>{s.l}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', gap: 6, marginBottom: T.S.xxl, flexWrap: 'wrap' }}>
        <TouchableOpacity onPress={() => setFilter(null)} activeOpacity={0.7} style={{ backgroundColor: !filter ? T.accent : 'transparent', borderWidth: 1, borderColor: !filter ? T.accent : T.border, borderRadius: T.R.pill, paddingVertical: 5, paddingHorizontal: T.S.md }}>
          <Text style={{ color: !filter ? '#FFFEF9' : T.textLight, fontSize: 10, fontWeight: '700', fontFamily: T.F.bodyBold, letterSpacing: 0.5 }}>ALL</Text>
        </TouchableOpacity>
        {tiers.map(t => (
          <TouchableOpacity key={t} onPress={() => setFilter(filter === t ? null : t)} activeOpacity={0.7} style={{ backgroundColor: filter === t ? TIER_STYLES[t].bg : 'transparent', borderWidth: 1, borderColor: filter === t ? TIER_STYLES[t].border : T.border, borderRadius: T.R.pill, paddingVertical: 5, paddingHorizontal: T.S.md }}>
            <Text style={{ color: filter === t ? TIER_STYLES[t].text : T.textLight, fontSize: 10, fontWeight: '700', fontFamily: T.F.bodyBold, letterSpacing: 0.3 }}>{t} ({tierCounts[t]})</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ paddingLeft: T.S.xxl }}>
        <View style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 2, backgroundColor: T.accent, opacity: 0.3 }} />
        {Object.entries(dayGroups).map(([day, dayEntries]) => (
          <View key={day} style={{ marginBottom: 28 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: -24, marginBottom: T.S.md }}>
              <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: T.bg, borderWidth: 2, borderColor: T.accent, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: T.accent }} />
              </View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: T.textMid }}>{day}</Text>
              <Text style={{ fontSize: 10, color: T.textFaint, fontFamily: T.F.body }}>{dayEntries.length} dump{dayEntries.length > 1 ? 's' : ''}</Text>
            </View>
            {dayEntries.map(entry => {
              const ts = TIER_STYLES[entry.analysis.tier];
              const isPosted = postedIds?.has(entry.id);
              return (
                <View key={entry.id} style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.md, paddingHorizontal: 14, marginBottom: 6, marginLeft: -12, borderLeftWidth: 3, borderLeftColor: isPosted ? T.textFaint : ts.text, opacity: isPosted ? 0.5 : 1, ...T.shadow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                    <ScoreMeter score={entry.analysis.composite} size={28} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: T.text, fontSize: 12, lineHeight: 19, fontFamily: T.F.body, textDecorationLine: isPosted ? 'line-through' : 'none' }}>{entry.text}</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                        {isPosted ? (
                          <View style={{ backgroundColor: T.bgSub, borderWidth: 1, borderColor: T.border, paddingVertical: 2, paddingHorizontal: 8, borderRadius: T.R.sm }}>
                            <Text style={{ fontSize: 9, fontWeight: '800', letterSpacing: 0.6, color: T.textLight, fontFamily: T.F.bodyBold }}>POSTED {'\u2713'}</Text>
                          </View>
                        ) : (
                          <>
                            <TierBadge tier={entry.analysis.tier} />
                            {entry.analysis.flags.slice(0, 3).map((f, i) => <FlagBadge key={i} flag={f} />)}
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
