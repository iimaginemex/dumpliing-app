export const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "\u25CE", formats: [
    { id: "ig_reel", label: "Reel", desc: "Short-form video. 15-90s optimal.", needsScript: true, icon: "\u25B6", optimal: "30-60s", tip: "Hook in first 1.7s. Completion rate is the #1 algorithm signal." },
    { id: "ig_carousel", label: "Carousel", desc: "Swipeable slides. Highest engagement rate.", needsScript: false, icon: "\u25EB", optimal: "8-12 slides", tip: "First 2 slides must answer 'is this for me?' and 'what do I get?'." },
    { id: "ig_story", label: "Story", desc: "24hr ephemeral. Behind-the-scenes.", needsScript: false, icon: "\u25CB", optimal: "6-13 slides", tip: "Most exits happen in first 3 slides. DM replies are highest-weight signal." },
    { id: "ig_post", label: "Single Post", desc: "Static image + caption.", needsScript: false, icon: "\u25A1", optimal: "1 image + caption", tip: "Long captions with story arcs outperform short ones." },
  ]},
  { id: "tiktok", label: "TikTok", icon: "\u266A", formats: [
    { id: "tt_short", label: "Quick Hit", desc: "15-45s. One idea, fast delivery.", needsScript: true, icon: "\u26A1", optimal: "15-30s", tip: "First 2 seconds determine everything. Authentic > polished." },
    { id: "tt_medium", label: "Build Story", desc: "60-180s. Deeper narrative.", needsScript: true, icon: "\u25B6", optimal: "60-90s", tip: "80%+ retention on 45s+ = viral signal." },
    { id: "tt_series", label: "Series Episode", desc: "Episodic content. Builds loyalty.", needsScript: true, icon: "\u25C7\u25C7", optimal: "45-120s", tip: "End with a hook for the next episode." },
  ]},
  { id: "youtube", label: "YouTube", icon: "\u25B7", formats: [
    { id: "yt_short", label: "Short", desc: "Under 60s vertical.", needsScript: true, icon: "\u26A1", optimal: "15-35s", tip: "Loopable content gets replays. Use as funnel to long-form." },
    { id: "yt_long", label: "Long-Form Video", desc: "8-20min. Deepest engagement.", needsScript: true, icon: "\u25B6\u25B6", optimal: "8-15min", tip: "Satisfaction > watch time. Chapters increase retention." },
    { id: "yt_community", label: "Community Post", desc: "Text/image post.", needsScript: false, icon: "\uD83D\uDCAC", optimal: "Text + image", tip: "Polls drive highest engagement." },
  ]},
  { id: "twitter", label: "X / Twitter", icon: "\u2715", formats: [
    { id: "tw_tweet", label: "Tweet", desc: "Punchy, personal, one takeaway.", needsScript: false, icon: "\u26A1", optimal: "Under 280 chars", tip: "Vulnerability gets shared. Screenshots stop the scroll." },
    { id: "tw_thread", label: "Thread", desc: "Multi-part story.", needsScript: false, icon: "\u25C7\u25C7\u25C7", optimal: "4-8 tweets", tip: "Tweet 1 must work standalone. End with a question." },
  ]},
  { id: "linkedin", label: "LinkedIn", icon: "\u25A3", formats: [
    { id: "li_post", label: "Story Post", desc: "Vulnerable hook, lesson payoff.", needsScript: false, icon: "\u25A3", optimal: "800-1500 chars", tip: "First 2 lines are everything. Questions drive comments." },
    { id: "li_carousel", label: "Carousel Doc", desc: "PDF slides. High dwell time.", needsScript: false, icon: "\u25EB", optimal: "7-10 slides", tip: "Dwell time is LinkedIn's key engagement metric." },
  ]},
];

export const SCRIPT_STRUCTURES = {
  ig_reel: { totalSeconds: 45, sections: [
    { role: "HOOK", label: "HOOK", time: "0:00-0:03", seconds: [0,3], hint: "Stop the scroll. You have 1.7 seconds." },
    { role: "TENSION", label: "SETUP", time: "0:03-0:10", seconds: [3,10], hint: "Set up the conflict. Why should they care?" },
    { role: "BODY", label: "VALUE", time: "0:10-0:38", seconds: [10,38], hint: "Deliver the value. Show, don't tell." },
    { role: "PAYOFF", label: "CTA", time: "0:38-0:45", seconds: [38,45], hint: "Land the takeaway. Saves and shares > likes." },
  ]},
  tt_short: { totalSeconds: 25, sections: [
    { role: "HOOK", label: "HOOK", time: "0:00-0:02", seconds: [0,2], hint: "Interrupt the scroll." },
    { role: "BODY", label: "POINT", time: "0:02-0:20", seconds: [2,20], hint: "One idea. Fast delivery." },
    { role: "PAYOFF", label: "PUNCH", time: "0:20-0:25", seconds: [20,25], hint: "End sharply." },
  ]},
  tt_medium: { totalSeconds: 90, sections: [
    { role: "HOOK", label: "HOOK", time: "0:00-0:03", seconds: [0,3], hint: "Pattern interrupt." },
    { role: "TENSION", label: "STRUGGLE", time: "0:03-0:20", seconds: [3,20], hint: "What went wrong? Raw honesty." },
    { role: "JOURNEY", label: "PROCESS", time: "0:20-0:55", seconds: [20,55], hint: "Walk through what happened." },
    { role: "INSIGHT", label: "LESSON", time: "0:55-1:20", seconds: [55,80], hint: "What you learned." },
    { role: "CTA", label: "CTA", time: "1:20-1:30", seconds: [80,90], hint: "Follow for updates." },
  ]},
  tt_series: { totalSeconds: 75, sections: [
    { role: "RECAP", label: "RECAP", time: "0:00-0:05", seconds: [0,5], hint: "Orient returning viewers." },
    { role: "HOOK", label: "HOOK", time: "0:05-0:12", seconds: [5,12], hint: "What's different today?" },
    { role: "BODY", label: "UPDATE", time: "0:12-1:00", seconds: [12,60], hint: "Show the work." },
    { role: "CLIFF", label: "CLIFF", time: "1:00-1:15", seconds: [60,75], hint: "Tease what's coming." },
  ]},
  yt_short: { totalSeconds: 30, sections: [
    { role: "HOOK", label: "HOOK", time: "0:00-0:03", seconds: [0,3], hint: "Value must be obvious immediately." },
    { role: "BODY", label: "CORE", time: "0:03-0:25", seconds: [3,25], hint: "One clear topic. Loopable." },
    { role: "CTA", label: "BRIDGE", time: "0:25-0:30", seconds: [25,30], hint: "Point to long-form." },
  ]},
  yt_long: { totalSeconds: 600, sections: [
    { role: "HOOK", label: "COLD OPEN", time: "0:00-0:30", seconds: [0,30], hint: "Start with the most compelling moment." },
    { role: "INTRO", label: "INTRO", time: "0:30-2:00", seconds: [30,120], hint: "Who are you, what are you building?" },
    { role: "CH1", label: "CH1: PROBLEM", time: "2:00-4:00", seconds: [120,240], hint: "What were you facing?" },
    { role: "CH2", label: "CH2: PROCESS", time: "4:00-6:30", seconds: [240,390], hint: "Walk through what you did." },
    { role: "CH3", label: "CH3: RESULT", time: "6:30-8:00", seconds: [390,480], hint: "Show numbers, real outcomes." },
    { role: "LESSON", label: "LESSONS", time: "8:00-9:00", seconds: [480,540], hint: "Actionable insights." },
    { role: "CTA", label: "CTA", time: "9:00-10:00", seconds: [540,600], hint: "Subscribe, comment, next video." },
  ]},
};

function classifyEntryRole(entry) {
  const roles = [];
  const { flags, scores, narrativeTypes } = entry.analysis;
  if (flags.some(f => f.color === "tension") || scores.emotionalIntensity > 60) roles.push("hook");
  if (narrativeTypes.includes("tension") || flags.some(f => f.label === "OPEN TENSION")) roles.push("tension");
  if (flags.some(f => f.label === "LESSON") || scores.practicalValue > 40) roles.push("insight");
  if (flags.some(f => f.label === "HAS NUMBERS") || scores.specificity > 60) roles.push("evidence");
  if (flags.some(f => f.color === "positive") || narrativeTypes.includes("resolution")) roles.push("payoff");
  if (roles.length === 0) roles.push("context");
  return roles;
}

function generateMockScript(rawText, role, seconds, formatId) {
  const text = rawText || "";
  const lower = text.toLowerCase();
  if (role === "HOOK") {
    if (lower.includes("finally") || lower.includes("breakthrough")) return `I just figured something out that changed everything about how I'm building this.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
    if (lower.includes("frustrated") || lower.includes("stuck") || lower.includes("struggling")) return `I've been stuck on this for days and I need to talk about it.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
    if (lower.includes("realized") || lower.includes("discovered") || lower.includes("turns out")) return `So I just realized something that most people building in public completely miss.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
    if (lower.includes("decided") || lower.includes("killing") || lower.includes("cutting")) return `I just made one of the hardest decisions of this entire build.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
    if (lower.includes("shipped") || lower.includes("launched") || lower.includes("users")) return `We just hit a milestone I didn't think would come this fast.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
    return `Here's something nobody told me about building a product from scratch.\n\n[TEXT ON SCREEN: "${text.split(".")[0]}"]`;
  }
  if (role === "RECAP") return `Episode [X] of building [YOUR PRODUCT] in public.\n\nQuick recap — last time [BRIEF PREVIOUS CONTEXT]. Today, something shifted.`;
  if (role === "TENSION" || role === "STRUGGLES") { const s = text.split(/[.!?]+/).filter(s => s.trim()); const m = s[0]?.trim() || text; return `So here's what happened — ${m.charAt(0).toLowerCase() + m.slice(1)}.\n\n${s.length > 1 ? `And the thing is, ${s[1]?.trim().charAt(0).toLowerCase()}${s[1]?.trim().slice(1)}.` : "I didn't see this coming."}\n\n[SHOW: screen recording / your frustrated face — keep it raw]`; }
  if (role === "BODY" || role === "JOURNEY" || role === "CH1" || role === "CH2") { const s = text.split(/[.!?]+/).filter(s => s.trim()); let sc = "Let me walk you through what actually happened.\n\n"; s.forEach((x, i) => { const c = x.trim(); if (i === 0) sc += `${c}.\n\n`; else if (i === 1) sc += `And then — ${c.charAt(0).toLowerCase()}${c.slice(1)}.\n\n`; else sc += `${c}.\n\n`; }); sc += `[B-ROLL: screen recording / behind-the-scenes footage]`; if (role === "CH2") sc += `\n\n[CHAPTER MARKER: "The Process"]`; return sc; }
  if (role === "INSIGHT" || role === "LESSON" || role === "CH3") { const s = text.split(/[.!?]+/).filter(s => s.trim()); const m = s[0]?.trim() || text; let sc = `And here's the thing that actually matters — ${m.charAt(0).toLowerCase() + m.slice(1)}.\n\n`; if (s.length > 1) sc += `${s[1]?.trim()}.\n\n`; sc += `If you're building something right now, take this with you: [RESTATE THE CORE LESSON].`; if (role === "CH3") sc += `\n\n[SHOW: metrics, screenshots — the receipts]`; return sc; }
  if (role === "PAYOFF" || role === "CLOSE") return text ? `So yeah — ${text.charAt(0).toLowerCase() + text.slice(1)}\n\nThat's the real update. No filter.\n\n[TEXT ON SCREEN: key takeaway in bold]` : `That's the real story behind this week's build.\n\n[TEXT ON SCREEN: key takeaway in bold]`;
  if (role === "CLIFF") return `But here's where it gets interesting — next [week/episode], I'm going to [TEASE NEXT TOPIC].\n\nFollow if you want to find out.\n\n[TEXT ON SCREEN: "Follow for Part [X]"]`;
  if (role === "CTA") { if (formatId === "yt_long") return `If this was helpful, hit subscribe.\n\nDrop a comment: what's the hardest part of what you're building?\n\n[END SCREEN: subscribe + related video]`; if (formatId === "yt_short") return `Full breakdown on my channel — link in bio.\n\n[TEXT ON SCREEN: "Full video"]`; return `If this resonated, follow — I'm sharing the whole journey.\n\n[TEXT ON SCREEN: "Follow for more"]`; }
  if (role === "INTRO") return `What's up — I'm [YOUR NAME], and I'm building [YOUR PRODUCT] completely in public.\n\nToday I want to talk about something that [CONNECT TO HOOK].\n\n[BRIEF INTRO ANIMATION — keep it under 5 seconds]`;
  return text || "[YOUR CONTENT HERE]";
}

function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function buildScriptFromEntries(selectedEntries, formatId) {
  const structure = SCRIPT_STRUCTURES[formatId];
  if (!structure) return null;
  const classified = selectedEntries.map(e => ({ entry: e, roles: classifyEntryRole(e) }));
  const hookEntry = classified.find(c => c.roles.includes("hook"))?.entry || classified.find(c => c.roles.includes("tension"))?.entry || selectedEntries[0];
  const tensionEntry = classified.find(c => c.roles.includes("tension") && c.entry !== hookEntry)?.entry;
  const insightEntry = classified.find(c => c.roles.includes("insight") && c.entry !== hookEntry)?.entry;
  const evidenceEntry = classified.find(c => c.roles.includes("evidence") && c.entry !== hookEntry && c.entry !== insightEntry)?.entry;
  const payoffEntry = classified.find(c => c.roles.includes("payoff") && c.entry !== hookEntry)?.entry;

  return structure.sections.map(section => {
    let sourceEntry = null; let rawText = "";
    if (section.role === "HOOK") { sourceEntry = hookEntry; rawText = hookEntry?.text || ""; }
    else if (section.role === "RECAP") { sourceEntry = hookEntry; rawText = hookEntry?.text || ""; }
    else if (section.role === "TENSION" || section.role === "STRUGGLES") { sourceEntry = tensionEntry; rawText = tensionEntry?.text || ""; }
    else if (section.role === "INSIGHT" || section.role === "LESSON" || section.role === "CH3") { sourceEntry = insightEntry || evidenceEntry; rawText = (insightEntry || evidenceEntry)?.text || ""; }
    else if (section.role === "BODY" || section.role === "JOURNEY" || section.role === "CH1") { sourceEntry = tensionEntry || selectedEntries.find(e => e !== hookEntry && e !== insightEntry); rawText = sourceEntry?.text || ""; }
    else if (section.role === "CH2") { const others = selectedEntries.filter(e => e !== hookEntry && e !== tensionEntry && e !== insightEntry); sourceEntry = others[0] || tensionEntry; rawText = sourceEntry?.text || ""; }
    else if (section.role === "PAYOFF" || section.role === "CLOSE" || section.role === "CLIFF") { sourceEntry = payoffEntry || insightEntry; rawText = (payoffEntry || insightEntry)?.text || ""; }
    else if (section.role === "CTA" || section.role === "INTRO") { rawText = ""; }
    const scriptText = generateMockScript(rawText, section.role, section.seconds, formatId);
    const duration = section.seconds[1] - section.seconds[0];
    return { ...section, text: scriptText, rawDump: rawText, sourceEntry, editable: true, timestamp: `${formatTimestamp(section.seconds[0])} \u2192 ${formatTimestamp(section.seconds[1])}`, durationLabel: duration >= 60 ? `${Math.floor(duration/60)}m ${duration%60}s` : `${duration}s` };
  });
}

export function buildTextDraft(selectedEntries, formatId) {
  const classified = selectedEntries.map(e => ({ entry: e, roles: classifyEntryRole(e) }));
  const sections = [];
  const hookEntry = classified.find(c => c.roles.includes("hook"))?.entry || selectedEntries[0];
  const tensionEntry = classified.find(c => c.roles.includes("tension") && c.entry !== hookEntry)?.entry;
  const insightEntry = classified.find(c => c.roles.includes("insight") && c.entry !== hookEntry)?.entry;
  const evidenceEntry = classified.find(c => c.roles.includes("evidence"))?.entry;
  const usedIds = new Set([hookEntry?.id, tensionEntry?.id, insightEntry?.id, evidenceEntry?.id].filter(Boolean));
  const rest = selectedEntries.filter(e => !usedIds.has(e.id));

  if (formatId === "tw_tweet") {
    sections.push({ role: "POST", label: "Your tweet", text: hookEntry.text, hint: "Keep under 280 chars.", editable: true });
    if (insightEntry && insightEntry !== hookEntry) sections.push({ role: "ALT", label: "Alternative angle", text: insightEntry.text, hint: "Different frame.", editable: true });
  } else if (formatId === "tw_thread") {
    sections.push({ role: "HOOK", label: "1/ Hook", text: hookEntry.text, hint: "Must work standalone.", editable: true });
    if (tensionEntry) sections.push({ role: "TENSION", label: `${sections.length + 1}/ The struggle`, text: tensionEntry.text, hint: "Deepen the conflict.", editable: true });
    rest.forEach(e => sections.push({ role: "CONTEXT", label: `${sections.length + 1}/ The journey`, text: e.text, hint: "Middle of the story.", editable: true }));
    if (insightEntry) sections.push({ role: "INSIGHT", label: `${sections.length + 1}/ The lesson`, text: insightEntry.text, hint: "Actionable value.", editable: true });
    sections.push({ role: "CTA", label: `${sections.length + 1}/ Close`, text: "What's one thing you've been building that surprised you?", hint: "End with a question.", editable: true });
  } else if (formatId === "li_post") {
    sections.push({ role: "HOOK", label: "Hook (first 2 lines)", text: hookEntry.text, hint: "Only 2 lines visible before 'see more'.", editable: true });
    if (tensionEntry) sections.push({ role: "TENSION", label: "The backstory", text: tensionEntry.text, hint: "Set the scene.", editable: true });
    rest.forEach(e => sections.push({ role: "BODY", label: "The journey", text: e.text, hint: "Build the narrative.", editable: true }));
    if (insightEntry) sections.push({ role: "INSIGHT", label: "The takeaway", text: insightEntry.text, hint: "Land the lesson.", editable: true });
    sections.push({ role: "CTA", label: "Close + CTA", text: "What's something you're working through right now?", hint: "Invite engagement.", editable: true });
  } else if (formatId === "ig_carousel" || formatId === "li_carousel") {
    sections.push({ role: "COVER", label: "Slide 1 — Cover", text: hookEntry.text, hint: "Under 10 words.", editable: true });
    if (tensionEntry) sections.push({ role: "PROBLEM", label: "Slide 2 — The Problem", text: tensionEntry.text, hint: "Set up why this matters.", editable: true });
    rest.forEach(e => sections.push({ role: "SLIDE", label: `Slide ${sections.length + 1} — Point`, text: e.text, hint: "One idea per slide.", editable: true }));
    if (insightEntry) sections.push({ role: "TAKEAWAY", label: `Slide ${sections.length + 1} — Key Takeaway`, text: insightEntry.text, hint: "The main thing to remember.", editable: true });
    sections.push({ role: "CTA", label: `Slide ${sections.length + 1} — CTA`, text: "Save this for later. Share with a builder who needs it.", hint: "Saves and shares are king.", editable: true });
  } else if (formatId === "ig_story") {
    sections.push({ role: "HOOK", label: "Story 1 — Hook", text: hookEntry.text, hint: "Hook hard.", editable: true });
    selectedEntries.slice(1).forEach((e, i) => sections.push({ role: "SLIDE", label: `Story ${i + 2}`, text: e.text, hint: "Keep momentum.", editable: true }));
    sections.push({ role: "CTA", label: "Final Story — CTA", text: "DM me 'build' if you want to hear more \u2192", hint: "DM replies are strongest signal.", editable: true });
  } else if (formatId === "ig_post") {
    sections.push({ role: "CAPTION", label: "Caption", text: selectedEntries.map(e => e.text).join("\n\n"), hint: "Long captions outperform short ones.", editable: true });
  } else if (formatId === "yt_community") {
    sections.push({ role: "POST", label: "Community Post", text: hookEntry.text, hint: "Polls drive highest engagement.", editable: true });
    if (insightEntry) sections.push({ role: "CONTEXT", label: "Context", text: insightEntry.text, hint: "Add detail.", editable: true });
  }
  return sections;
}
