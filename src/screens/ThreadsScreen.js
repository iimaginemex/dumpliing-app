import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { T } from '../constants/theme';
import ScoreMeter from '../components/ScoreMeter';
import DumplingIcon from '../components/DumplingIcon';
import { relTime } from '../engines/helpers';

export default function ThreadsScreen({ threads }) {
  const [openThread, setOpenThread] = useState(null);

  if (threads.length === 0) {
    return (
      <View style={{ alignItems: 'center', padding: 48, paddingHorizontal: T.S.xl }}>
        <DumplingIcon size={64} showSteam={true} showEyes={true} />
        <View style={{ height: T.S.md }} />
        <Text style={{ color: T.textLight, fontSize: 13, textAlign: 'center' }}>No threads detected yet. Keep dumping — patterns emerge from volume.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ color: T.textLight, fontSize: 12, lineHeight: 19, marginBottom: T.S.xl }}>Narrative threads detected in your build. Each one is a story your audience wants.</Text>
      {threads.map(thread => {
        const isOpen = openThread === thread.id;
        return (
          <View key={thread.id} style={{ marginBottom: T.S.md }}>
            <TouchableOpacity onPress={() => setOpenThread(isOpen ? null : thread.id)} activeOpacity={0.7} style={{ backgroundColor: isOpen ? T.bgCard : 'transparent', borderWidth: 1, borderColor: isOpen ? T.border : T.borderLight, borderRadius: T.R.lg, padding: T.S.lg, paddingHorizontal: 18, ...(isOpen ? T.shadow : {}) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontSize: 16, color: T.accent }}>{thread.icon}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: T.text }}>{thread.label}</Text>
                </View>
                <View style={{ backgroundColor: T.accentBg, paddingVertical: 2, paddingHorizontal: 10, borderRadius: T.R.sm }}>
                  <Text style={{ color: T.accent, fontSize: 11, fontWeight: '700', fontFamily: 'JetBrainsMono_700Bold' }}>{thread.count}</Text>
                </View>
              </View>
              <Text style={{ color: T.textLight, fontSize: 11, marginTop: T.S.sm, marginLeft: 26, lineHeight: 16.5 }}>{thread.desc}</Text>
            </TouchableOpacity>
            {isOpen && (
              <View style={{ paddingTop: T.S.sm, paddingLeft: 18, borderLeftWidth: 2, borderLeftColor: T.accentBorder, marginLeft: 18 }}>
                {thread.entries.map((e) => (
                  <View key={e.id} style={{ padding: 10, paddingHorizontal: 14, marginBottom: 4 }}>
                    <Text style={{ color: T.textMid, fontSize: 12, lineHeight: 19, fontFamily: 'JetBrainsMono_400Regular' }}>{e.text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
                      <Text style={{ fontSize: 10, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular' }}>{relTime(e.timestamp)}</Text>
                      <ScoreMeter score={e.analysis.composite} size={22} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
