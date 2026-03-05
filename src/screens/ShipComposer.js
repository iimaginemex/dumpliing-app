import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { T, TIER_STYLES } from '../constants/theme';
import { PLATFORMS, SCRIPT_STRUCTURES, buildScriptFromEntries, buildTextDraft } from '../engines/shipping';

export default function ShipComposer({ entries, shipSelection, onClose, onMarkPosted }) {
  const [step, setStep] = useState("platform");
  const [platform, setPlatform] = useState(null);
  const [formatId, setFormatId] = useState(null);
  const [sections, setSections] = useState([]);
  const [editedSections, setEditedSections] = useState({});
  const [copied, setCopied] = useState(false);

  const selectedEntries = entries.filter(e => shipSelection.has(e.id));
  const selectPlatform = (p) => { setPlatform(p); setStep("format"); };
  const selectFormat = (fId, needsScript) => {
    setFormatId(fId);
    try {
      setSections(needsScript ? (buildScriptFromEntries(selectedEntries, fId) || []) : (buildTextDraft(selectedEntries, fId) || []));
    } catch (err) {
      setSections([{ role: "POST", label: "Draft", text: selectedEntries.map(e => e.text).join("\n\n"), hint: "Edit your content here.", editable: true }]);
    }
    setEditedSections({}); setCopied(false); setStep("compose");
  };
  const updateSection = (idx, text) => setEditedSections(prev => ({ ...prev, [idx]: text }));
  const getFullText = () => sections.filter(s => s.editable !== false).map((s, i) => editedSections[i] !== undefined ? editedSections[i] : s.text).filter(Boolean).join("\n\n");
  const copyToClipboard = async () => { await Clipboard.setStringAsync(getFullText()); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  const shipAndMark = async () => { await Clipboard.setStringAsync(getFullText()); selectedEntries.forEach(e => onMarkPosted(e.id)); setStep("shipped"); };

  const platformData = platform ? PLATFORMS.find(p => p.id === platform) : null;
  const formatData = platformData?.formats?.find(f => f.id === formatId) || null;
  const isScript = formatData?.needsScript || false;
  const charCount = step === "compose" ? getFullText().length : 0;

  const roleColor = (role) => {
    if (role === "HOOK" || role === "RECAP") return T.accent;
    if (role === "TENSION" || role === "PROBLEM" || role === "STRUGGLES") return T.red;
    if (role === "INSIGHT" || role === "LESSON" || role === "TAKEAWAY") return T.blue;
    if (role === "PAYOFF" || role === "CLOSE" || role === "WINS" || role === "CH3") return T.green;
    if (role === "CTA" || role === "CLIFF") return T.purple;
    if (role === "BODY" || role === "JOURNEY" || role === "CH1" || role === "CH2") return T.textMid;
    return T.textLight;
  };

  if (step === "shipped") {
    const platformInfo = PLATFORMS.find(p => p.id === platform);
    const fmtInfo = platformInfo?.formats?.find(f => f.id === formatId);
    return (
      <View style={{ alignItems: 'center', padding: 40, paddingHorizontal: T.S.xl }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, marginBottom: T.S.xl, backgroundColor: T.greenBg, borderWidth: 2, borderColor: T.green, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, color: T.green }}>{'\u2713'}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: '800', color: T.text, marginBottom: T.S.sm }}>Shipped!</Text>
        <Text style={{ fontSize: 13, color: T.textMid, lineHeight: 20, textAlign: 'center', marginBottom: 6 }}>Draft copied to clipboard. {selectedEntries.length} dump{selectedEntries.length !== 1 ? 's' : ''} marked as posted.</Text>
        <Text style={{ fontSize: 11, color: T.textLight, marginBottom: 28, fontFamily: T.F.body }}>{platformInfo?.label} {'\u2192'} {fmtInfo?.label}</Text>
        <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.lg, marginBottom: T.S.xl, width: '100%', ...T.shadow }}>
          <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.green, fontFamily: T.F.bodyBold, marginBottom: 10 }}>MARKED AS POSTED {'\u2713'}</Text>
          {selectedEntries.map(e => (
            <View key={e.id} style={{ padding: T.S.sm, paddingHorizontal: 10, marginBottom: 4, borderRadius: T.R.sm, backgroundColor: T.bgSub, borderLeftWidth: 2, borderLeftColor: T.green }}>
              <Text style={{ color: T.textLight, fontSize: 11, lineHeight: 16.5, fontFamily: T.F.body, textDecorationLine: 'line-through', opacity: 0.7 }}>{e.text}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: T.S.sm }}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ backgroundColor: T.accent, borderRadius: T.R.pill, paddingVertical: T.S.md, paddingHorizontal: 28 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFEF9', letterSpacing: 0.3 }}>DONE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setStep("platform"); setFormatId(null); setPlatform(null); setSections([]); }} activeOpacity={0.7} style={{ borderWidth: 1, borderColor: T.border, borderRadius: T.R.md, paddingVertical: T.S.md, paddingHorizontal: T.S.xl }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: T.textMid }}>SHIP AGAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === "platform") return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: T.S.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
          <Text style={{ color: T.accent, fontSize: 14 }}>{'\u25B2'}</Text>
          <Text style={{ fontSize: 10, letterSpacing: 0.6, color: T.accent, fontFamily: T.F.accent }}>SHIP CONTENT</Text>
        </View>
        <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ borderWidth: 1, borderColor: T.border, borderRadius: T.R.sm, paddingVertical: 5, paddingHorizontal: T.S.md }}>
          <Text style={{ fontSize: 10, color: T.textLight, fontFamily: T.F.body }}>{'\u2715'} CLOSE</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: 14, paddingHorizontal: T.S.lg, marginBottom: T.S.xl, ...T.shadow }}>
        <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.textLight, fontFamily: T.F.bodyBold }}>{selectedEntries.length} DUMP{selectedEntries.length !== 1 ? 'S' : ''} SELECTED</Text>
        <View style={{ marginTop: T.S.sm }}>
          {selectedEntries.slice(0, 3).map(e => (
            <Text key={e.id} style={{ color: T.textMid, fontSize: 11, lineHeight: 16.5, marginVertical: 2, fontFamily: T.F.body, borderLeftWidth: 2, borderLeftColor: TIER_STYLES[e.analysis.tier].text, paddingLeft: 10 }}>{e.text.length > 80 ? e.text.slice(0, 80) + "..." : e.text}</Text>
          ))}
          {selectedEntries.length > 3 && <Text style={{ fontSize: 10, color: T.textFaint, marginTop: 4 }}>+{selectedEntries.length - 3} more</Text>}
        </View>
      </View>
      <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 0.8, color: T.textLight, fontFamily: T.F.bodyBold, marginBottom: 14 }}>WHERE ARE YOU SHIPPING?</Text>
      <View style={{ gap: T.S.sm }}>
        {PLATFORMS.map(p => (
          <TouchableOpacity key={p.id} onPress={() => selectPlatform(p.id)} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.lg, paddingHorizontal: 18, ...T.shadow }}>
            <Text style={{ fontSize: 20, width: 32, textAlign: 'center' }}>{p.icon}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: T.text }}>{p.label}</Text>
              <Text style={{ fontSize: 10, color: T.textLight, fontFamily: T.F.body, marginLeft: T.S.sm }}>{p.formats.length} format{p.formats.length !== 1 ? 's' : ''}</Text>
            </View>
            <Text style={{ fontSize: 14, color: T.textFaint }}>{'\u2192'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (step === "format") return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: T.S.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
          <Text style={{ fontSize: 16 }}>{platformData?.icon}</Text>
          <Text style={{ fontSize: 10, letterSpacing: 0.6, color: T.accent, fontFamily: T.F.accent }}>{platformData?.label.toUpperCase()} — CHOOSE FORMAT</Text>
        </View>
        <TouchableOpacity onPress={() => setStep("platform")} activeOpacity={0.7} style={{ borderWidth: 1, borderColor: T.border, borderRadius: T.R.sm, paddingVertical: 5, paddingHorizontal: T.S.md }}>
          <Text style={{ fontSize: 10, color: T.textLight, fontFamily: T.F.body }}>{'\u2190'} BACK</Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: T.S.sm }}>
        {platformData?.formats.map(f => (
          <TouchableOpacity key={f.id} onPress={() => selectFormat(f.id, f.needsScript)} activeOpacity={0.7} style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: T.S.lg, paddingHorizontal: 18, ...T.shadow }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
                <Text style={{ fontSize: 14 }}>{f.icon}</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.text }}>{f.label}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {f.needsScript && <View style={{ backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder, paddingVertical: 2, paddingHorizontal: 7, borderRadius: T.R.sm }}><Text style={{ fontSize: 8, fontWeight: '800', letterSpacing: 0.6, color: T.accent, fontFamily: T.F.bodyBold }}>SCRIPT</Text></View>}
                <View style={{ backgroundColor: T.bgSub, paddingVertical: 2, paddingHorizontal: 7, borderRadius: T.R.sm }}><Text style={{ fontSize: 8, fontWeight: '700', letterSpacing: 0.7, color: T.textLight, fontFamily: T.F.bodyBold }}>{f.optimal}</Text></View>
              </View>
            </View>
            <Text style={{ fontSize: 11, color: T.textMid, lineHeight: 16.5, marginBottom: T.S.sm }}>{f.desc}</Text>
            <Text style={{ fontSize: 10, color: T.textFaint, lineHeight: 15, fontStyle: 'italic' }}>{'\uD83D\uDCA1'} {f.tip}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (step !== "compose" || !formatData) return <View style={{ alignItems: 'center', padding: 48 }}><Text style={{ color: T.textLight, fontSize: 13 }}>Loading...</Text></View>;

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: T.S.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
          <Text style={{ fontSize: 14 }}>{formatData.icon}</Text>
          <Text style={{ fontSize: 10, letterSpacing: 0.8, color: T.accent, fontFamily: T.F.accent }}>{isScript ? 'SCRIPT' : 'DRAFT'} — {formatData.label.toUpperCase()}</Text>
          <Text style={{ fontSize: 9, color: T.textFaint, fontFamily: T.F.body }}>{platformData?.label}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <TouchableOpacity onPress={() => setStep("format")} activeOpacity={0.7} style={{ borderWidth: 1, borderColor: T.border, borderRadius: T.R.sm, paddingVertical: 5, paddingHorizontal: 10 }}><Text style={{ fontSize: 9, color: T.textLight, fontFamily: T.F.body }}>{'\u2190'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={{ borderWidth: 1, borderColor: T.border, borderRadius: T.R.sm, paddingVertical: 5, paddingHorizontal: 10 }}><Text style={{ fontSize: 9, color: T.textLight, fontFamily: T.F.body }}>{'\u2715'}</Text></TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 10, paddingHorizontal: 14, marginBottom: T.S.lg, borderRadius: T.R.sm, backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 10, color: T.accent, flex: 1 }}>{'\uD83D\uDCA1'} {formatData?.tip}</Text>
        {isScript && SCRIPT_STRUCTURES[formatId] && (
          <View style={{ backgroundColor: 'rgba(212,137,12,0.15)', borderWidth: 1, borderColor: T.accentBorder, paddingVertical: 4, paddingHorizontal: 10, borderRadius: T.R.sm, marginLeft: 10 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: T.accent, fontFamily: T.F.bodyBold }}>{SCRIPT_STRUCTURES[formatId].totalSeconds >= 60 ? `${Math.floor(SCRIPT_STRUCTURES[formatId].totalSeconds/60)}:${(SCRIPT_STRUCTURES[formatId].totalSeconds%60).toString().padStart(2,"0")}` : `${SCRIPT_STRUCTURES[formatId].totalSeconds}s`}</Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: 3, marginBottom: T.S.lg }}>
        {sections.filter(s => s.editable !== false).map((s, i) => <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: roleColor(s.role), opacity: 0.7 }} />)}
      </View>

      {sections.map((section, i) => (
        <View key={i} style={{ marginBottom: T.S.md, backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, overflow: 'hidden', ...T.shadow }}>
          <View style={{ padding: T.S.sm, paddingHorizontal: 14, backgroundColor: T.bgSub, borderBottomWidth: 1, borderBottomColor: T.borderLight }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
                <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: roleColor(section.role) }} />
                <Text style={{ fontSize: 10, fontWeight: '700', color: T.text, fontFamily: T.F.bodyBold, letterSpacing: 0.4 }}>{section.label}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: T.S.sm }}>
                {section.timestamp && <View style={{ backgroundColor: T.accentBg, borderWidth: 1, borderColor: T.accentBorder, paddingVertical: 2, paddingHorizontal: T.S.sm, borderRadius: T.R.sm }}><Text style={{ fontSize: 9, fontWeight: '700', color: T.accent, fontFamily: T.F.bodyBold }}>{section.timestamp}</Text></View>}
                {section.durationLabel && <View style={{ backgroundColor: T.bgSub, borderWidth: 1, borderColor: T.border, paddingVertical: 2, paddingHorizontal: 7, borderRadius: T.R.sm }}><Text style={{ fontSize: 9, fontWeight: '600', color: T.textLight, fontFamily: T.F.bodySemi }}>{section.durationLabel}</Text></View>}
              </View>
            </View>
          </View>
          {section.editable && (
            <View style={{ padding: T.S.md, paddingHorizontal: 14 }}>
              {section.rawDump ? <View style={{ padding: T.S.sm, paddingHorizontal: 10, marginBottom: 10, borderRadius: T.R.sm, backgroundColor: 'rgba(212,137,12,0.04)', borderLeftWidth: 2, borderLeftColor: T.accentBorder }}><Text style={{ fontSize: 8, fontWeight: '700', letterSpacing: 0.6, color: T.textFaint, fontFamily: T.F.bodyBold, marginBottom: 3 }}>SOURCE DUMP</Text><Text style={{ fontSize: 10, color: T.textLight, lineHeight: 15, fontFamily: T.F.body, fontStyle: 'italic' }}>{section.rawDump}</Text></View> : null}
              <TextInput value={editedSections[i] !== undefined ? editedSections[i] : section.text} onChangeText={(text) => updateSection(i, text)} multiline style={{ color: T.text, fontSize: 13, lineHeight: 22, fontFamily: T.F.body, textAlignVertical: 'top', minHeight: 60 }} />
              {section.hint && <Text style={{ fontSize: 10, color: T.textFaint, marginTop: 6, fontStyle: 'italic' }}>{section.hint}</Text>}
            </View>
          )}
        </View>
      ))}

      <View style={{ backgroundColor: T.bgCard, borderWidth: 1, borderColor: T.border, borderRadius: T.R.lg, padding: 14, marginTop: T.S.lg, ...T.shadow }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: T.S.md }}>
          <Text style={{ fontSize: 10, color: T.textLight, fontFamily: T.F.body }}>{charCount} chars{formatId === "tw_tweet" && charCount > 280 ? <Text style={{ color: T.red }}> over 280</Text> : null}</Text>
          <Text style={{ fontSize: 10, color: T.textFaint }}>{platformData?.label} {'\u00B7'} {formatData?.label}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: T.S.sm }}>
          <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.7} style={{ flex: 1, backgroundColor: T.bgSub, borderWidth: 1, borderColor: T.border, borderRadius: T.R.md, padding: T.S.md, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: T.text }}>{copied ? '\u2713 COPIED' : 'COPY DRAFT'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shipAndMark} activeOpacity={0.7} style={{ flex: 1, backgroundColor: T.accent, borderRadius: T.R.pill, padding: T.S.md, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFEF9', letterSpacing: 0.3 }}>{'\u25B2'} SHIP & MARK POSTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
