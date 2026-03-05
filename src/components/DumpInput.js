import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { T } from '../constants/theme';
import DumplingIcon from './DumplingIcon';

export default function DumpInput({ onAdd }) {
  const [text, setText] = useState('');
  const ref = useRef(null);
  const submit = () => { if (!text.trim()) return; onAdd(text.trim()); setText(''); ref.current?.focus(); };

  return (
    <View style={{ backgroundColor: T.bgCard, borderWidth: 1.5, borderColor: T.border, borderRadius: T.R.xl, padding: T.S.xl, marginBottom: 28, ...T.shadow }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm, marginBottom: T.S.md }}>
        <DumplingIcon size={16} showSteam={false} showEyes={false} />
        <Text style={{ color: T.textLight, fontFamily: 'JetBrainsMono_600SemiBold', fontSize: 11, letterSpacing: 0.7 }}>DUMP</Text>
      </View>
      <TextInput ref={ref} value={text} onChangeText={setText} onSubmitEditing={submit} placeholder="what happened? what's stuck? what clicked? what did you decide? just dump it..." placeholderTextColor={T.textFaint} multiline numberOfLines={3} style={{ color: T.text, fontSize: 14, lineHeight: 24, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: -0.1, textAlignVertical: 'top', minHeight: 72 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: T.borderLight }}>
        <Text style={{ fontSize: 11, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular' }}>tap LOG IT to save</Text>
        <TouchableOpacity onPress={submit} disabled={!text.trim()} activeOpacity={0.7} style={{ backgroundColor: text.trim() ? T.accent : T.bgSub, borderRadius: T.R.pill, paddingVertical: 8, paddingHorizontal: 22 }}>
          <Text style={{ color: text.trim() ? '#FFFEF9' : T.textFaint, fontSize: 12, fontWeight: '700', fontFamily: 'JetBrainsMono_700Bold', letterSpacing: 0.5 }}>LOG IT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
