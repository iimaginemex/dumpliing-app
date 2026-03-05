const WEAVE_PATTERNS = [
  { id: "struggle_to_breakthrough", label: "Struggle \u2192 Breakthrough", desc: "The highest-engagement BIP format. Your audience follows the pain, then gets the payoff.", icon: "\u25C8\u2192\u25C6", test: (a, b) => { const aS = a.analysis.flags.some(f => f.color === "tension") && a.analysis.scores.emotionalIntensity > 35; const bW = b.analysis.flags.some(f => f.color === "positive") && b.analysis.scores.emotionalIntensity > 35; const bS = b.analysis.flags.some(f => f.color === "tension") && b.analysis.scores.emotionalIntensity > 35; const aW = a.analysis.flags.some(f => f.color === "positive") && a.analysis.scores.emotionalIntensity > 35; return (aS && bW) || (bS && aW); }, bonus: 35 },
  { id: "tension_resolution", label: "Tension \u2192 Resolution", desc: "You posed a problem and found the answer. Classic narrative arc.", icon: "\u26A1\u2192\u2713", test: (a, b) => { const aT = a.analysis.narrativeTypes.includes("tension"); const bR = b.analysis.narrativeTypes.includes("resolution"); const bT = b.analysis.narrativeTypes.includes("tension"); const aR = a.analysis.narrativeTypes.includes("resolution"); return (aT && bR) || (bT && aR); }, bonus: 30 },
  { id: "decision_consequence", label: "Decision \u2192 Outcome", desc: "You made a call and showed what happened.", icon: "\u2B21\u2192\u2197", test: (a, b) => { const aD = a.analysis.narrativeTypes.includes("decision"); const bO = b.analysis.scores.practicalValue > 25 || b.analysis.flags.some(f => f.label === "HAS NUMBERS"); const bD = b.analysis.narrativeTypes.includes("decision"); const aO = a.analysis.scores.practicalValue > 25 || a.analysis.flags.some(f => f.label === "HAS NUMBERS"); return (aD && bO) || (bD && aO); }, bonus: 25 },
  { id: "before_after", label: "Before \u2192 After", desc: "Transformation content. Show the gap.", icon: "\u25C1\u2192\u25B7", test: (a, b) => { const has = a.analysis.narrativeTypes.includes("before_after") || b.analysis.narrativeTypes.includes("before_after"); const dd = Math.abs(new Date(a.timestamp) - new Date(b.timestamp)) / 86400000; return has && dd > 1; }, bonus: 22 },
  { id: "emotional_contrast", label: "Emotional Contrast", desc: "Low meets high. The contrast amplifies both.", icon: "\u25BD\u2192\u25B3", test: (a, b) => Math.abs(a.analysis.scores.emotionalIntensity - b.analysis.scores.emotionalIntensity) > 40, bonus: 18 },
  { id: "vulnerability_lesson", label: "Vulnerability \u2192 Lesson", desc: "Raw honesty followed by earned wisdom.", icon: "\u2661\u2192\u25B3", test: (a, b) => { const aV = a.analysis.flags.some(f => f.label === "VULNERABLE"); const bL = b.analysis.flags.some(f => f.label === "LESSON"); const bV = b.analysis.flags.some(f => f.label === "VULNERABLE"); const aL = a.analysis.flags.some(f => f.label === "LESSON"); return (aV && bL) || (bV && aL); }, bonus: 28 },
  { id: "momentum_stack", label: "Momentum Stack", desc: "Multiple wins stacked together.", icon: "\u25B8\u25B8\u25B8", test: (a, b) => a.analysis.scores.emotionalIntensity > 40 && b.analysis.scores.emotionalIntensity > 40 && a.analysis.flags.some(f => f.color === "positive") && b.analysis.flags.some(f => f.color === "positive"), bonus: 15 },
];

export function calculateWeaveScore(entryA, entryB) {
  const baseAvg = Math.round((entryA.analysis.composite + entryB.analysis.composite) / 2);
  let totalBonus = 0;
  const matchedPatterns = [];
  WEAVE_PATTERNS.forEach(p => { if (p.test(entryA, entryB)) { totalBonus += p.bonus; matchedPatterns.push(p); } });
  const timeDiff = Math.abs(new Date(entryA.timestamp) - new Date(entryB.timestamp));
  const daysDiff = timeDiff / 86400000;
  let timeBonus = 0;
  if (daysDiff > 7) timeBonus = 8; else if (daysDiff > 3) timeBonus = 5; else if (daysDiff > 1) timeBonus = 3;
  const dimKeys = ["emotionalIntensity", "narrativeTension", "practicalValue", "socialCurrency", "specificity"];
  let complementary = 0;
  dimKeys.forEach(k => { const aS = entryA.analysis.scores[k] > 50; const bS = entryB.analysis.scores[k] > 50; const aW = entryA.analysis.scores[k] < 25; const bW = entryB.analysis.scores[k] < 25; if ((aS && bW) || (bS && aW)) complementary++; });
  const compBonus = complementary * 4;
  const weaveScore = Math.min(100, baseAvg + totalBonus + timeBonus + compBonus);
  const liftPercent = baseAvg > 0 ? Math.round(((weaveScore - baseAvg) / baseAvg) * 100) : 0;
  let suggestedOrder = [entryA, entryB];
  if (entryA.analysis.flags.some(f => f.color === "positive") && entryB.analysis.flags.some(f => f.color === "tension")) suggestedOrder = [entryB, entryA];
  else if (new Date(entryA.timestamp) > new Date(entryB.timestamp)) suggestedOrder = [entryB, entryA];
  return { weaveScore, baseAvg, totalBonus: totalBonus + timeBonus + compBonus, liftPercent, matchedPatterns, timeBonus, compBonus, daysDiff: Math.round(daysDiff), suggestedOrder };
}

export function findBestWeaves(entries, postedIds) {
  const available = entries.filter(e => !postedIds.has(e.id));
  if (available.length < 2) return [];
  const pairs = [];
  for (let i = 0; i < available.length; i++) {
    for (let j = i + 1; j < available.length; j++) {
      const result = calculateWeaveScore(available[i], available[j]);
      if (result.matchedPatterns.length > 0 || result.liftPercent > 10) pairs.push({ a: available[i], b: available[j], ...result });
    }
  }
  return pairs.sort((a, b) => b.weaveScore - a.weaveScore).slice(0, 12);
}
