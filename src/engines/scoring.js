const EMOTION_LEXICON = {
  high_arousal_negative: {
    words: ["frustrated","stuck","broken","struggling","can't","won't work","hate","ugh","damn","angry","pissed","annoyed","furious","anxious","worried","scared","terrified","panic","stressed","overwhelmed","burned out","exhausted","hell","nightmare","disaster","painful","crushing","brutal"],
    arousal: 0.85, valence: -0.7,
  },
  high_arousal_positive: {
    words: ["finally","amazing","incredible","breakthrough","eureka","blown away","mind-blowing","awe","insane","unbelievable","game-changer","transformed","revolutionary","electric","fired up","pumped","ecstatic","nailed it","crushing it","on fire","skyrocket","exploded","10x","100x"],
    arousal: 0.9, valence: 0.8,
  },
  moderate_arousal: {
    words: ["surprised","unexpected","realized","discovered","interesting","curious","noticed","weird","strange","odd","hmm","wait","actually","turns out","plot twist","didn't expect"],
    arousal: 0.6, valence: 0.3,
  },
  low_arousal: {
    words: ["worked on","continued","made progress","kept going","updated","fixed","adjusted","tweaked","cleaned up","organized","reviewed","checked","maintained"],
    arousal: 0.15, valence: 0.1,
  },
};

const NARRATIVE_MARKERS = {
  tension: { words: ["but","however","despite","although","instead","unfortunately","problem is","challenge","conflict","dilemma","torn between","on one hand","risk","gamble","bet"], weight: 1.0 },
  resolution: { words: ["solved","figured out","finally","answer was","solution","fixed by","worked because","the key was","breakthrough came","clicked when"], weight: 0.8 },
  decision: { words: ["decided","choosing","going with","picked","committed","bet on","killing","cutting","saying no","trade-off","sacrifice","prioritize","instead of"], weight: 0.9 },
  before_after: { words: ["used to","now I","before","after","changed from","switched to","went from","transformed","evolved","pivoted from","was doing","started doing"], weight: 0.85 },
  stakes: { words: ["everything","make or break","last chance","do or die","all in","no turning back","point of no return","ship date","deadline","launch","money","revenue","users","customers"], weight: 0.75 },
};

const PRACTICAL_VALUE_SIGNALS = {
  numbers: /\d+[%xX]|\$\d+|\d+\s*(users|customers|subscribers|downloads|signups|MRR|ARR|revenue|leads|conversions|clicks|views|followers)/i,
  specifics: /\b(tip|trick|hack|strategy|framework|method|technique|approach|tool|resource|template|checklist|step|process|workflow|lesson|rule|principle)\b/i,
  tools: /\b(stripe|notion|figma|vercel|supabase|postgres|react|nextjs|tailwind|aws|gpt|claude|github|slack|discord|twitter|linkedin|productboard|linear|arc)\b/i,
  timeframes: /\b(\d+\s*(days?|weeks?|months?|hours?|minutes?|years?))\b/i,
  lessons: /\b(learned|realized|mistake|never again|wish I knew|pro tip|note to self|takeaway|insight|discovery)\b/i,
};

const SOCIAL_CURRENCY_SIGNALS = {
  insider: /\b(nobody tells you|secret|hidden|most people don't|underrated|overlooked|behind the scenes|real reason|truth is|unpopular opinion|hot take|controversial)\b/i,
  vulnerability: /\b(failed|screwed up|embarrassing|honest|truth is|I was wrong|admit|scared|nervous|imposter|doubt|insecure|vulnerable|transparent)\b/i,
  contrarian: /\b(actually|wrong about|myth|overrated|stop doing|don't|unpopular|against the grain|counterintuitive|opposite)\b/i,
};

export function scoreEntry(text) {
  const lower = text.toLowerCase();
  const scores = { emotionalIntensity: 0, narrativeTension: 0, practicalValue: 0, socialCurrency: 0, specificity: 0 };
  const flags = [];
  const emotions = [];

  let maxArousal = 0;
  let emotionType = null;
  Object.entries(EMOTION_LEXICON).forEach(([type, data]) => {
    const matches = data.words.filter(w => lower.includes(w));
    if (matches.length > 0) {
      const intensity = Math.min(1, matches.length * 0.3) * data.arousal;
      if (intensity > maxArousal) { maxArousal = intensity; emotionType = type; }
      emotions.push({ type, matches, intensity });
    }
  });
  scores.emotionalIntensity = Math.round(maxArousal * 100);
  if (emotionType === "high_arousal_positive") flags.push({ type: "emotion", label: "HIGH ENERGY", color: "positive" });
  if (emotionType === "high_arousal_negative") flags.push({ type: "emotion", label: "RAW TENSION", color: "tension" });
  if (emotionType === "moderate_arousal") flags.push({ type: "emotion", label: "CURIOSITY HOOK", color: "neutral" });

  let tensionScore = 0;
  let narrativeTypes = [];
  Object.entries(NARRATIVE_MARKERS).forEach(([type, data]) => {
    const matches = data.words.filter(w => lower.includes(w));
    if (matches.length > 0) { tensionScore += Math.min(1, matches.length * 0.35) * data.weight; narrativeTypes.push(type); }
  });
  scores.narrativeTension = Math.round(Math.min(1, tensionScore) * 100);
  if (narrativeTypes.includes("tension") && narrativeTypes.includes("resolution")) flags.push({ type: "narrative", label: "FULL ARC", color: "positive" });
  else if (narrativeTypes.includes("tension")) flags.push({ type: "narrative", label: "OPEN TENSION", color: "tension" });
  if (narrativeTypes.includes("decision")) flags.push({ type: "narrative", label: "DECISION POINT", color: "decision" });
  if (narrativeTypes.includes("before_after")) flags.push({ type: "narrative", label: "TRANSFORMATION", color: "positive" });

  let practicalHits = 0;
  Object.entries(PRACTICAL_VALUE_SIGNALS).forEach(([type, pattern]) => {
    if (pattern.test(lower)) { practicalHits++; if (type === "numbers") flags.push({ type: "value", label: "HAS NUMBERS", color: "value" }); if (type === "lessons") flags.push({ type: "value", label: "LESSON", color: "value" }); }
  });
  scores.practicalValue = Math.round(Math.min(1, practicalHits * 0.3) * 100);

  let currencyHits = 0;
  Object.entries(SOCIAL_CURRENCY_SIGNALS).forEach(([type, pattern]) => {
    if (pattern.test(lower)) { currencyHits++; if (type === "vulnerability") flags.push({ type: "currency", label: "VULNERABLE", color: "currency" }); if (type === "contrarian") flags.push({ type: "currency", label: "HOT TAKE", color: "currency" }); if (type === "insider") flags.push({ type: "currency", label: "INSIDER", color: "currency" }); }
  });
  scores.socialCurrency = Math.round(Math.min(1, currencyHits * 0.4) * 100);

  const hasNumbers = /\d/.test(text);
  const hasNames = /[A-Z][a-z]+/.test(text);
  const wordCount = text.split(/\s+/).length;
  let specScore = 0;
  if (hasNumbers) specScore += 0.35;
  if (hasNames) specScore += 0.25;
  if (wordCount > 12) specScore += 0.4;
  scores.specificity = Math.round(Math.min(1, specScore) * 100);

  const composite = Math.round(scores.emotionalIntensity * 0.35 + scores.narrativeTension * 0.25 + scores.practicalValue * 0.20 + scores.socialCurrency * 0.10 + scores.specificity * 0.10);
  let tier;
  if (composite >= 65) tier = "STORY-READY";
  else if (composite >= 40) tier = "HAS POTENTIAL";
  else if (composite >= 20) tier = "RAW MATERIAL";
  else tier = "SEED";

  const suggestions = [];
  if (scores.emotionalIntensity < 30) suggestions.push("Add emotional context — how did this make you feel?");
  if (scores.narrativeTension < 25) suggestions.push("Where's the tension? What was at stake or what did you struggle with?");
  if (scores.practicalValue < 20) suggestions.push("Include specifics — numbers, tools, timelines make it actionable");
  if (scores.socialCurrency < 20 && composite > 30) suggestions.push("Could you frame this as an insider insight or honest admission?");
  if (scores.specificity < 30) suggestions.push("Get concrete — names, numbers, and timeframes add credibility");

  return { scores, composite, tier, flags, suggestions, emotions, narrativeTypes };
}
