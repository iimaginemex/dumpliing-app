import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../constants/theme';
import ScoreMeter from '../components/ScoreMeter';
import DumplingIcon from '../components/DumplingIcon';
import { FlagBadge, TierBadge } from '../components/Badges';

export default function RewindScreen({ entries, threads }) {
  if (entries.length < 2) {
    return (
      <View style={{ alignItems: 'center', padding: 48, paddingHorizontal: T.S.xl }}>
        <DumplingIcon size={64} showSteam={true} showEyes={true} />
        <View style={{ height: T.S.md }} />
        <Text style={{ color: T.textLight, fontSize: 13, textAlign: 'center' }}>Need at least a few dumps to generate your rewind. Keep going.</Text>
      </View>
    );
  }

  const storyReady = entries.filter(e => e.analysis.tier === "STORY-READY");
  const avgScore = Math.round(entries.reduce((a, e) => a + e.analysis.composite, 0) / entries.length);
  const topEntry = [...entries].sort((a, b) => b.analysis.composite - a.analysis.composite)[0];
  const topThread = threads[0];

  const angles = [];
  if (threads.find(t => t.id === "struggle") && threads.find(t => t.id === "momentum")) angles.push({ angle: "The Struggle \u2192 Breakthrough Arc", desc: "Walk your audience through the resistance and the payoff." });
  if (threads.find(t => t.id === "decision")) angles.push({ angle: "Behind the Decision", desc: "What you chose, what you rejected, and why." });
  if (threads.find(t => t.id === "pivot")) angles.push({ angle: "What I Almost Got Wrong", desc: "Direction changes framed as refinement." });
  if (threads.find(t => t.id === "learning")) angles.push({ angle: "Lessons from the Trenches", desc: "Hard-won knowledge packaged as practical value." });
  if (threads.find(t => t.id === "growth")) angles.push({ angle: "Numbers Don't Lie", desc: "Lead with data. Specific metrics create credibility." });
  if (angles.length === 0) angles.push({ angle: "The Messy Middle", desc: "Show what building actually looks like between milestones." });

  return (
    <View>
      <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.xxl, marginBottom: T.S.xl, ...T.shadow }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm, marginBottom: T.S.lg }}>
          <Text style={{ color: T.accent, fontSize: 14 }}>{'\u25C6'}</Text>
          <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 1.3, color: T.accent, fontFamily: 'JetBrainsMono_700Bold' }}>THE REWIND</Text>
        </View>
        <Text style={{ color: T.text, fontSize: 14, lineHeight: 24, marginBottom: T.S.lg }}>
          You logged <Text style={{ fontWeight: '700' }}>{entries.length}</Text> thoughts. Your average content score is <Text style={{ fontWeight: '700' }}>{avgScore}</Text>.
          {storyReady.length > 0 && <Text> You have <Text style={{ fontWeight: '700', color: T.green }}>{storyReady.length} story-ready</Text> {storyReady.length === 1 ? 'entry' : 'entries'} waiting to be shared.</Text>}
          {topThread && <Text> Your dominant narrative thread is <Text style={{ fontWeight: '700', color: T.accent }}>{topThread.label}</Text>.</Text>}
        </Text>
      </View>

      {topEntry && (
        <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.xl, marginBottom: T.S.xl, ...T.shadow }}>
          <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 1.1, color: T.textLight, fontFamily: 'JetBrainsMono_700Bold', marginBottom: T.S.md }}>HIGHEST SCORING DUMP</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: T.S.md }}>
            <ScoreMeter score={topEntry.analysis.composite} size={44} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.text, fontSize: 13, lineHeight: 21, fontFamily: 'JetBrainsMono_400Regular' }}>{topEntry.text}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: T.S.sm }}>
                <TierBadge tier={topEntry.analysis.tier} />
                {topEntry.analysis.flags.map((f, i) => <FlagBadge key={i} flag={f} />)}
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.xl, ...T.shadow }}>
        <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 1.1, color: T.textLight, fontFamily: 'JetBrainsMono_700Bold', marginBottom: 14 }}>CONTENT ANGLES TO EXPLORE</Text>
        {angles.map((a, i) => (
          <View key={i} style={{ padding: 14, paddingHorizontal: T.S.lg, marginBottom: T.S.sm, borderRadius: T.R.sm, backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: T.text, marginBottom: 4 }}>{a.angle}</Text>
            <Text style={{ fontSize: 11, color: T.textMid, lineHeight: 16.5 }}>{a.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
