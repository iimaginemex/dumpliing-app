export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

export function relTime(ts) {
  const d = new Date(ts), now = new Date(), diff = now - d;
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), dy = Math.floor(diff / 86400000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  if (h < 24) return `${h}h`;
  if (dy < 7) return `${dy}d`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
