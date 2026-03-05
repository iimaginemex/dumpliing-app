import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_600SemiBold, JetBrainsMono_700Bold, JetBrainsMono_800ExtraBold } from '@expo-google-fonts/jetbrains-mono';
import * as SplashScreen from 'expo-splash-screen';

import { T } from './src/constants/theme';
import { scoreEntry } from './src/engines/scoring';
import { detectThreads } from './src/engines/threads';
import { findBestWeaves } from './src/engines/weave';
import { genId } from './src/engines/helpers';

import DumpInput from './src/components/DumpInput';
import EntryCard from './src/components/EntryCard';
import DumplingIcon from './src/components/DumplingIcon';
import { LogIcon, WeaveIcon, TimeIcon, ThreadsIcon, RewindIcon } from './src/components/TabIcons';
import WeaveScreen from './src/screens/WeaveScreen';
import TimelineScreen from './src/screens/TimelineScreen';
import ThreadsScreen from './src/screens/ThreadsScreen';
import RewindScreen from './src/screens/RewindScreen';
import ShipComposer from './src/screens/ShipComposer';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ JetBrainsMono_400Regular, JetBrainsMono_600SemiBold, JetBrainsMono_700Bold, JetBrainsMono_800ExtraBold });
  const [entries, setEntries] = useState([]);
  const [threads, setThreads] = useState([]);
  const [view, setView] = useState("log");
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [postedIds, setPostedIds] = useState(new Set());
  const [shipSelection, setShipSelection] = useState(new Set());
  const [isShipping, setIsShipping] = useState(false);

  const onLayoutRootView = useCallback(async () => { if (fontsLoaded) await SplashScreen.hideAsync(); }, [fontsLoaded]);
  const togglePosted = useCallback((id) => { setPostedIds(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }, []);
  const startShipFromWeave = useCallback((entryA, entryB) => { setShipSelection(new Set([entryA.id, entryB.id])); setIsShipping(true); }, []);
  const startShipFromEntry = useCallback((id) => { setShipSelection(new Set([id])); setIsShipping(true); }, []);
  const weaveCount = useMemo(() => findBestWeaves(entries, postedIds).length, [entries, postedIds]);

  const addEntry = useCallback((text) => {
    const analysis = scoreEntry(text);
    const entry = { id: genId(), text, timestamp: new Date().toISOString(), analysis };
    setEntries(prev => { const updated = [entry, ...prev]; setThreads(detectThreads(updated)); return updated; });
  }, []);

  const loadSamples = () => {
    const samples = [
      { text: "realized I've been building for developers when my actual users are designers. pivoting the entire UI language.", h: 192 },
      { text: "rethinking the whole onboarding. what if instead of a tutorial we just dropped people into the tool with one example pre-loaded?", h: 168 },
      { text: "shipped the MVP to 10 people. 3 responded. one said 'this is exactly what I needed.' that's enough for now.", h: 144 },
      { text: "stuck on pricing. freemium feels like a trap but charging from day one scares me. decided to go with $9/mo and see what happens.", h: 130 },
      { text: "learned that nobody reads changelogs. started doing 15-second loom videos instead. engagement went 5x.", h: 108 },
      { text: "switched from postgres to sqlite for the prototype. feels like going backwards but turns out it's way faster to iterate.", h: 96 },
      { text: "frustrated with the landing page. rewrote the copy 4 times and it still feels generic. might just be honest and say 'we're figuring this out'", h: 72 },
      { text: "talked to a user today and realized we've been solving the wrong problem. they don't need more features, they need fewer steps.", h: 60 },
      { text: "decided to kill the social features for now. hurts but we need to ship the core first. saying no is the hardest part of building.", h: 36 },
      { text: "finally got the auth flow working after 3 days of hell. was overcomplicating it the whole time. note to self: start simple.", h: 30 },
      { text: "two more users signed up organically. didn't even launch yet. word of mouth is real. 47 total now.", h: 12 },
      { text: "going with stripe for payments. decided not to overthink it. just ship.", h: 6 },
      { text: "built the entire settings page in one session. on fire today. crushing it. shipped 3 features before lunch.", h: 3 },
    ];
    const newEntries = samples.map(s => {
      const ts = new Date(); ts.setHours(ts.getHours() - s.h);
      return { id: genId(), text: s.text, timestamp: ts.toISOString(), analysis: scoreEntry(s.text) };
    });
    setEntries(newEntries);
    setThreads(detectThreads(newEntries));
  };

  const navItems = [
    { id: "log", label: "LOG", Icon: LogIcon },
    { id: "weave", label: "WEAVE", Icon: WeaveIcon, count: weaveCount },
    { id: "timeline", label: "TIME", Icon: TimeIcon },
    { id: "threads", label: "THREADS", Icon: ThreadsIcon, count: threads.length },
    { id: "rewind", label: "REWIND", Icon: RewindIcon },
  ];
  const storyReadyCount = entries.filter(e => e.analysis.tier === "STORY-READY").length;

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: T.bg }} onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" backgroundColor={T.bg} />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: T.S.xl, paddingTop: T.S.lg, paddingBottom: 100 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={{ marginBottom: T.S.xxxl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <DumplingIcon size={28} />
              <Text style={{ fontSize: 26, fontWeight: '900', letterSpacing: -1, color: T.text, fontFamily: 'JetBrainsMono_700Bold' }}>dumpliing</Text>
              <Text style={{ fontSize: 9, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: 0.7, opacity: 0.6, marginLeft: 2 }}>by BIP ENGINE</Text>
            </View>
            <View style={{ backgroundColor: T.accentBg, borderRadius: T.R.pill, paddingVertical: 6, paddingHorizontal: 14, alignSelf: 'flex-start', marginBottom: T.S.md }}>
              <Text style={{ color: T.textLight, fontSize: 12, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: 0.2 }}>dump it all {'\u2192'} find the story {'\u2192'} build in public</Text>
            </View>
            {storyReadyCount > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: T.greenBg, borderWidth: 1, borderColor: 'rgba(93,142,62,0.2)', paddingVertical: 5, paddingHorizontal: 12, borderRadius: T.R.md, alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: T.green, fontFamily: 'JetBrainsMono_700Bold', letterSpacing: 0.5 }}>{storyReadyCount} STORY-READY</Text>
                <Text style={{ fontSize: 10, color: T.textLight }}>dump{storyReadyCount > 1 ? 's' : ''} waiting to be shared</Text>
              </View>
            )}
          </View>

          {isShipping && shipSelection.size > 0 ? (
            <ShipComposer entries={entries} shipSelection={shipSelection} onClose={() => { setIsShipping(false); setShipSelection(new Set()); }} onMarkPosted={togglePosted} />
          ) : (
            <>
              {view === "log" && (
                <View>
                  <DumpInput onAdd={addEntry} />
                  {entries.length === 0 ? (
                    <View style={{ alignItems: 'center', padding: 48, paddingHorizontal: T.S.xl }}>
                      <DumplingIcon size={64} showSteam={true} showEyes={true} />
                      <View style={{ height: T.S.md }} />
                      <Text style={{ color: T.textLight, fontSize: 13, lineHeight: 22, textAlign: 'center', maxWidth: 340 }}>Start dumping your thoughts above.{'\n'}<Text style={{ color: T.textFaint }}>Every entry gets scored for content worthiness in real time.</Text></Text>
                      <TouchableOpacity onPress={loadSamples} activeOpacity={0.7} style={{ marginTop: T.S.xl, borderWidth: 1, borderColor: T.border, borderRadius: T.R.sm, paddingVertical: 9, paddingHorizontal: T.S.xl }}>
                        <Text style={{ color: T.textLight, fontSize: 11, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: 0.3 }}>load sample entries {'\u2192'}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ fontSize: 9, fontWeight: '700', letterSpacing: 1.1, color: T.textFaint, fontFamily: 'JetBrainsMono_700Bold', marginBottom: T.S.md }}>{entries.length} DUMP{entries.length !== 1 ? 'S' : ''} LOGGED{postedIds.size > 0 ? ` \u00B7 ${postedIds.size} POSTED` : ''}</Text>
                      {entries.map(entry => (
                        <EntryCard key={entry.id} entry={entry} expanded={expandedEntry === entry.id} onToggle={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)} isPosted={postedIds.has(entry.id)} onTogglePosted={togglePosted} onShip={startShipFromEntry} />
                      ))}
                    </View>
                  )}
                </View>
              )}
              {view === "weave" && <WeaveScreen entries={entries} postedIds={postedIds} onShipWeave={startShipFromWeave} />}
              {view === "timeline" && <TimelineScreen entries={entries} threads={threads} postedIds={postedIds} />}
              {view === "threads" && <ThreadsScreen threads={threads} entries={entries} />}
              {view === "rewind" && <RewindScreen entries={entries} threads={threads} />}
            </>
          )}

          {/* FOOTER */}
          <View style={{ marginTop: 56, paddingTop: T.S.xl, borderTopWidth: 1, borderTopColor: T.borderLight, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: 0.5, textAlign: 'center' }}>DUMPLIING — a BIP ENGINE tool for builders who can't see their own story</Text>
            <Text style={{ fontSize: 9, color: T.textFaint, fontFamily: 'JetBrainsMono_400Regular', letterSpacing: 0.3, marginTop: 4, opacity: 0.5, textAlign: 'center' }}>scoring engine: Berger-Milkman arousal model {'\u00B7'} STEPPS {'\u00B7'} SPREAD {'\u00B7'} BIP practitioner data</Text>
          </View>
        </ScrollView>

        {/* BOTTOM TAB BAR */}
        <View style={{ backgroundColor: T.bgCard, borderTopWidth: 1, borderTopColor: T.borderLight, shadowColor: '#2A2215', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 3 }}>
          <View style={{ flexDirection: 'row', paddingVertical: 8, paddingBottom: 4 }}>
            {navItems.map(item => {
              const active = view === item.id;
              return (
                <TouchableOpacity key={item.id} onPress={() => setView(item.id)} activeOpacity={0.7} style={{ flex: 1, alignItems: 'center', paddingVertical: 4 }}>
                  <View style={{ position: 'relative' }}>
                    <item.Icon size={20} color={active ? T.accent : T.textFaint} />
                    {item.count > 0 && (
                      <View style={{ position: 'absolute', top: -4, right: -8, backgroundColor: T.accent, borderRadius: T.R.pill, minWidth: 14, height: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
                        <Text style={{ color: '#FFFEF9', fontSize: 8, fontWeight: '800' }}>{item.count}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ color: active ? T.accent : T.textLight, fontSize: 9, fontWeight: '700', fontFamily: 'JetBrainsMono_700Bold', letterSpacing: 0.5, marginTop: 3 }}>{item.label}</Text>
                  {active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: T.accent, marginTop: 3 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
