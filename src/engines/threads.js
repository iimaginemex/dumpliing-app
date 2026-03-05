export const THREAD_TYPES = [
  { id: "pivot", label: "Pivot Arc", icon: "\u2933", desc: "Direction shifts reveal a refinement story" },
  { id: "struggle", label: "The Struggle", icon: "\u25C8", desc: "Friction is where the best content lives" },
  { id: "momentum", label: "Momentum Run", icon: "\u25B8\u25B8", desc: "Stack these wins into a shipping streak post" },
  { id: "learning", label: "Lesson Thread", icon: "\u25B3", desc: "Hard-won knowledge your audience can steal" },
  { id: "decision", label: "Decision Log", icon: "\u2B21", desc: "The tradeoffs behind your choices" },
  { id: "growth", label: "Growth Signal", icon: "\u2197", desc: "Numbers and traction worth sharing" },
];

export function detectThreads(entries) {
  const threadMap = {};
  entries.forEach(entry => {
    if (!entry.analysis) return;
    const { flags, narrativeTypes, scores } = entry.analysis;
    const types = new Set();
    if (narrativeTypes.includes("before_after") || flags.some(f => f.label === "TRANSFORMATION")) types.add("pivot");
    if (scores.emotionalIntensity > 50 && flags.some(f => f.color === "tension")) types.add("struggle");
    if (scores.emotionalIntensity > 50 && flags.some(f => f.color === "positive")) types.add("momentum");
    if (flags.some(f => f.label === "LESSON")) types.add("learning");
    if (narrativeTypes.includes("decision")) types.add("decision");
    if (flags.some(f => f.label === "HAS NUMBERS")) types.add("growth");
    types.forEach(t => { if (!threadMap[t]) threadMap[t] = []; threadMap[t].push(entry); });
  });
  return THREAD_TYPES
    .filter(t => threadMap[t.id]?.length > 0)
    .map(t => ({ ...t, entries: threadMap[t.id], count: threadMap[t.id].length }))
    .sort((a, b) => b.count - a.count);
}
