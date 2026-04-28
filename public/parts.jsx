/* global React */
const { useState, useEffect, useRef, useCallback } = React;

// ---------- Brand mark (hexagon logo from site) ----------
function BrandMark({ size = 22 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M16 2 L26 9 L26 21 L16 28 L6 21 L6 9 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" />
    </svg>
  );
}

function Icon({ name, size = 16, stroke = 1.8, color = "currentColor" }) {
  const s = { width: size, height: size, fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "send":     return <svg viewBox="0 0 24 24" {...s}><path d="m3 11 18-8-8 18-2-8-8-2Z"/></svg>;
    case "sparkle":  return <svg viewBox="0 0 24 24" {...s}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "globe":    return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "x":        return <svg viewBox="0 0 24 24" {...s}><path d="M5 5l14 14M19 5 5 19"/></svg>;
    case "minus":    return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14"/></svg>;
    case "check":    return <svg viewBox="0 0 24 24" {...s}><path d="m4 12 5 5L20 6"/></svg>;
    case "users":    return <svg viewBox="0 0 24 24" {...s}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"/></svg>;
    case "clock":    return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "calendar": return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case "star":     return <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{width: size, height: size}}><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7Z"/></svg>;
    case "shield":   return <svg viewBox="0 0 24 24" {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
    case "lock":     return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>;
    case "map":      return <svg viewBox="0 0 24 24" {...s}><path d="M9 20 3 18V5l6 2 6-2 6 2v13l-6-2-6 2Z"/><path d="M9 7v13M15 5v13"/></svg>;
    case "calendar+":return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M12 14v4M10 16h4"/></svg>;
    case "share":    return <svg viewBox="0 0 24 24" {...s}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>;
    case "anchor":   return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="5" r="2"/><path d="M12 22V7M5 12h14M5 12a7 7 0 0 0 14 0"/></svg>;
    case "umbrella": return <svg viewBox="0 0 24 24" {...s}><path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2Z"/><path d="M12 12v7a3 3 0 0 0 6 0"/></svg>;
    case "chevron":  return <svg viewBox="0 0 24 24" {...s}><path d="m6 9 6 6 6-6"/></svg>;
    case "left":     return <svg viewBox="0 0 24 24" {...s}><path d="m15 18-6-6 6-6"/></svg>;
    case "right":    return <svg viewBox="0 0 24 24" {...s}><path d="m9 6 6 6-6 6"/></svg>;
    case "lightning":return <svg viewBox="0 0 24 24" {...s}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>;
    case "phone":    return <svg viewBox="0 0 24 24" {...s}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>;
    case "compass":  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/></svg>;
    case "wine":     return <svg viewBox="0 0 24 24" {...s}><path d="M8 2h8M12 22V14M7 22h10M6 2h12l-2 8a4 4 0 0 1-8 0L6 2Z"/></svg>;
    case "camera":   return <svg viewBox="0 0 24 24" {...s}><path d="M3 8h4l2-3h6l2 3h4v12H3V8Z"/><circle cx="12" cy="13" r="4"/></svg>;
    case "tag":      return <svg viewBox="0 0 24 24" {...s}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a1 1 0 0 1-.3-.7V4a1 1 0 0 1 1-1h8.7c.3 0 .5.1.7.3l7.2 7.2a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1"/></svg>;
    case "info":     return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>;
    case "headset":  return <svg viewBox="0 0 24 24" {...s}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4ZM3 19a2 2 0 0 0 2 2h1v-6H3v4Z"/></svg>;
    case "heart":    return <svg viewBox="0 0 24 24" {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>;
    case "plus":     return <svg viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14"/></svg>;
    case "instagram":return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>;
    case "facebook": return <svg viewBox="0 0 24 24" {...s}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/></svg>;
    case "youtube":  return <svg viewBox="0 0 24 24" {...s}><rect x="2" y="6" width="20" height="12" rx="3"/><path d="m10 9 5 3-5 3Z"/></svg>;
    default: return null;
  }
}

// ---------- Streaming text ----------
function StreamText({ text, speed = 12, onDone }) {
  const [shown, setShown] = useState("");
  const doneRef = useRef(false);
  useEffect(() => {
    setShown(""); doneRef.current = false;
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (!doneRef.current && onDone) { doneRef.current = true; onDone(); }
      }
    }, speed);
    return () => clearInterval(id);
  // eslint-disable-next-line
  }, [text]);
  return <>{shown}{shown.length < text.length && <span style={{opacity: 0.5}}>▍</span>}</>;
}

// ---------- Message rows ----------
function MsgRow({ from, children }) {
  return (
    <div className={`bk-msg-row ${from}`}>
      {from === "ai" && <div className="bk-msg-avatar"><BrandMark size={14} /></div>}
      <div className="bk-bubble-msg">{children}</div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="bk-msg-row ai">
      <div className="bk-msg-avatar">b</div>
      <div className="bk-bubble-msg">
        <div className="bk-typing"><span></span><span></span><span></span></div>
      </div>
    </div>
  );
}

function StatusRow({ children }) {
  return (
    <div className="bk-status">
      <div className="bk-spinner"></div>
      <span>{children}</span>
    </div>
  );
}

function Chips({ items, onPick }) {
  return (
    <div className="bk-chips">
      {items.map((c, i) => (
        <button key={i} className="bk-chip" onClick={() => onPick(c)}>{c}</button>
      ))}
    </div>
  );
}

// ---------- TripAdvisor branding ----------
function TripAdvisorOwl({ size = 14 }) {
  // Stylized owl mark — two eyes inside a rounded badge.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Tripadvisor">
      <circle cx="12" cy="12" r="11" fill="#000" />
      <circle cx="8.2" cy="12" r="3.4" fill="#fff" />
      <circle cx="15.8" cy="12" r="3.4" fill="#fff" />
      <circle cx="8.2" cy="12" r="1.5" fill="#000" />
      <circle cx="15.8" cy="12" r="1.5" fill="#000" />
      <circle cx="8.2" cy="12" r="0.45" fill="#34E0A1" />
      <circle cx="15.8" cy="12" r="0.45" fill="#34E0A1" />
      <path d="M9.5 7.4c.9-.5 1.9-.7 2.5-.7s1.6.2 2.5.7" stroke="#000" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function TABubbles({ value = 5, size = 11 }) {
  // Render 5 bubbles, with half-bubble support. Brand color #00AA6C.
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const bubbles = [];
  for (let i = 0; i < 5; i++) {
    let fill;
    if (i < full) fill = "#00AA6C";
    else if (i === full && half) fill = "half";
    else fill = "#E1E3EE";
    bubbles.push(
      <span key={i} style={{
        display: "inline-block",
        width: size, height: size,
        borderRadius: "50%",
        background: fill === "half" ? "linear-gradient(90deg, #00AA6C 50%, #E1E3EE 50%)" : fill,
        marginRight: 1.5,
        flexShrink: 0,
      }} />
    );
  }
  return <span style={{display: "inline-flex", alignItems: "center"}}>{bubbles}</span>;
}

window.TripAdvisorOwl = TripAdvisorOwl;
window.TABubbles = TABubbles;
window.Icon = Icon;
window.BrandMark = BrandMark;
window.StreamText = StreamText;
window.MsgRow = MsgRow;
window.TypingDots = TypingDots;
window.StatusRow = StatusRow;
window.Chips = Chips;
