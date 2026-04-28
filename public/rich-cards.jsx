/* global React, Icon */
const { useState: useStateRich, useEffect: useEffectRich } = React;

// ---------- Product data ----------
const PRODUCTS_DATA = [
  {
    id: "bluelagoon",
    name: "Blue Lagoon & Three Islands",
    nameEs: "Laguna Azul y Tres Islas",
    nameIt: "Laguna Blu e Tre Isole",
    duration: "5 hrs",
    capacity: "Up to 12",
    rating: 5.0,
    reviews: 1840,
    img: "url('https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=70')",
    price: 78, childPrice: 39,
    slots: [
      { time: "9:00 AM", left: 12 },
      { time: "11:30 AM", left: 4 },
      { time: "2:00 PM", left: 0 },
    ],
    matchScore: 98,
    tag: "Best match",
  },
  {
    id: "sunset",
    name: "Sunset Cruise & Wine Tasting",
    nameEs: "Crucero al Atardecer",
    nameIt: "Crociera al Tramonto",
    duration: "3 hrs",
    capacity: "Up to 16",
    rating: 4.5,
    reviews: 902,
    img: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70')",
    price: 65, childPrice: 32,
    slots: [
      { time: "5:30 PM", left: 8 },
      { time: "7:00 PM", left: 14 },
    ],
    matchScore: 84,
    tag: "Popular",
  },
  {
    id: "hvar",
    name: "Hvar & Pakleni Islands · full day",
    nameEs: "Hvar y las Islas Pakleni",
    nameIt: "Hvar e le Isole Pakleni",
    duration: "8 hrs",
    capacity: "Up to 10",
    rating: 4.5,
    reviews: 612,
    img: "url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=70')",
    price: 124, childPrice: 62,
    slots: [{ time: "8:00 AM", left: 6 }],
    matchScore: 71,
    tag: "Adventurous",
  },
];

// ---------- Product card ----------
function ProductCard({ p, lang, selectedSlot, onSlotPick, onBook, t }) {
  const name = lang === "es" ? p.nameEs : lang === "it" ? p.nameIt : p.name;
  return (
    <div className={`bk-product ${p.tag === "Best match" ? "recommended" : ""}`}>
      <div className="bk-product-img" style={{ backgroundImage: p.img }}>
        <div className={`bk-product-tag ${p.tag === "Best match" ? "match" : ""}`}>
          {p.tag === "Best match" && <Icon name="sparkle" size={10} />}
          {t.tag[p.tag] || p.tag}{p.matchScore && p.tag === "Best match" ? ` · ${p.matchScore}%` : ""}
        </div>
      </div>
      <div className="bk-product-body">
        <div className="bk-product-name">{name}</div>
        <div className="bk-product-meta">
          <span><Icon name="clock" size={12} /> {p.duration}</span>
          <span><Icon name="users" size={12} /> {p.capacity}</span>
        </div>
        <div className="bk-slots">
          {p.slots.map((s) => (
            <button
              key={s.time}
              className={`bk-slot ${s.left === 0 ? "full" : ""} ${selectedSlot === s.time ? "selected" : ""}`}
              disabled={s.left === 0}
              onClick={() => s.left > 0 && onSlotPick(p.id, s.time)}
            >
              {s.time}
              {s.left > 0 && s.left < 6 && <span className="left">· {s.left} {t.left}</span>}
              {s.left === 0 && <span className="left">· {t.full}</span>}
            </button>
          ))}
        </div>
        <div className="bk-product-foot">
          <div className="bk-price">€{p.price}<small>/ {t.adult}</small></div>
          <button className="bk-book-btn" onClick={() => onBook(p.id)}>
            {t.book} <Icon name="right" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products, lang, selectedSlot, onSlotPick, onBook, t }) {
  return (
    <div className="bk-products">
      {products.map((p) => (
        <ProductCard
          key={p.id} p={p} lang={lang}
          selectedSlot={selectedSlot && selectedSlot.pid === p.id ? selectedSlot.time : null}
          onSlotPick={onSlotPick}
          onBook={onBook}
          t={t}
        />
      ))}
    </div>
  );
}

// ---------- Participants picker ----------
function ParticipantsPicker({ value, onChange, onSubmit, t }) {
  const stepper = (label, sub, key, min = 0, max = 12) => (
    <div className="bk-pp-row" key={key}>
      <div className="bk-pp-label">
        <div className="bk-pp-name">{label}</div>
        <div className="bk-pp-sub">{sub}</div>
      </div>
      <div className="bk-pp-stepper">
        <button
          className="bk-pp-btn"
          aria-label={`decrease ${label}`}
          disabled={value[key] <= min}
          onClick={() => onChange({ ...value, [key]: Math.max(min, value[key] - 1) })}
        >−</button>
        <span className="bk-pp-num">{value[key]}</span>
        <button
          className="bk-pp-btn"
          aria-label={`increase ${label}`}
          disabled={value[key] >= max}
          onClick={() => onChange({ ...value, [key]: Math.min(max, value[key] + 1) })}
        >+</button>
      </div>
    </div>
  );
  const total = (value.adults || 0) + (value.kids || 0) + (value.infants || 0);
  return (
    <div className="bk-pp">
      <div className="bk-pp-head">
        <Icon name="users" size={14} />
        <span>{t.partyTitle}</span>
      </div>
      {stepper(t.adults, t.adultsSub, "adults", 1, 12)}
      {stepper(t.kids, t.kidsSub, "kids", 0, 8)}
      {stepper(t.infants, t.infantsSub, "infants", 0, 4)}
      <button className="bk-pp-submit" disabled={total < 1} onClick={() => onSubmit(value)}>
        {t.partyContinue} · {total} {total === 1 ? t.guest : t.guests}
        <Icon name="right" size={14} />
      </button>
    </div>
  );
}

// ---------- Availability calendar (with party-aware capacity hints) ----------
function AvailabilityCalendar({ value, onPick, party, t }) {
  const [month, setMonthAv] = useStateRich(4); // May
  const year = 2026;
  const monthName = new Date(year, month).toLocaleDateString(t.locale || "en-US", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayD = 25;
  const partySize = (party?.adults || 0) + (party?.kids || 0) + (party?.infants || 0);

  // Deterministic-ish availability seed by (month, day, partySize)
  const availabilityFor = (d) => {
    if (month === 4 && d < todayD) return "past";
    const dow = new Date(year, month, d).getDay();
    if (dow === 1) return "closed"; // Monday closed
    // Pseudo-random buckets
    const seed = (d * 13 + month * 7) % 11;
    if (partySize >= 6) {
      // larger groups have fewer "great" days
      if (seed < 3) return "high";
      if (seed < 7) return "low";
      return "some";
    }
    if (seed < 5) return "high";
    if (seed < 9) return "some";
    return "low";
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bk-avcal">
      <div className="bk-avcal-head">
        <button onClick={() => setMonthAv(m => Math.max(3, m - 1))} aria-label="Previous month"><Icon name="left" size={14} /></button>
        <span>{monthName}</span>
        <button onClick={() => setMonthAv(m => Math.min(7, m + 1))} aria-label="Next month"><Icon name="right" size={14} /></button>
      </div>
      <div className="bk-avcal-meta">
        {t.availabilityFor} <strong>{partySize} {partySize === 1 ? t.guest : t.guests}</strong>
      </div>
      <div className="bk-avcal-grid">
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="dow">{d}</div>)}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} className="day empty" />;
          const av = availabilityFor(d);
          const isSelected = value && value.day === d && value.month === month;
          const clickable = av === "high" || av === "some" || av === "low";
          return (
            <div
              key={i}
              className={`day av-${av} ${isSelected ? "selected" : ""} ${clickable ? "clickable" : ""}`}
              onClick={() => clickable && onPick({
                day: d, month, year,
                availability: av,
                label: new Date(year, month, d).toLocaleDateString(t.locale || "en-US", { weekday: "long", month: "long", day: "numeric" }),
              })}
            >
              <span className="num">{d}</span>
              {clickable && <span className={`dot dot-${av}`} />}
            </div>
          );
        })}
      </div>
      <div className="bk-avcal-legend">
        <span><span className="lg-dot dot-high" /> {t.legendHigh}</span>
        <span><span className="lg-dot dot-some" /> {t.legendSome}</span>
        <span><span className="lg-dot dot-low" /> {t.legendLow}</span>
        <span><span className="lg-dot dot-closed" /> {t.legendClosed}</span>
      </div>
    </div>
  );
}

// ---------- Calendar ----------
function MiniCalendar({ value, onPick, t }) {
  // April/May 2026
  const [month, setMonth] = useStateRich(4); // May (0-indexed)
  const year = 2026;
  const monthName = new Date(year, month).toLocaleDateString(t.locale || "en-US", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayD = 25; // simulate today

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dows = (t.locale === "es-ES")
    ? ["L","M","X","J","V","S","D"]
    : (t.locale === "it-IT")
      ? ["L","M","M","G","V","S","D"]
      : ["S","M","T","W","T","F","S"];

  // To make Mon-first for ES/IT, reorder by shifting first day
  const isMonFirst = t.locale !== "en-US" && t.locale !== undefined && t.locale !== "en";
  const adjusted = cells; // keep simple sun-first

  return (
    <div className="bk-calendar">
      <div className="bk-calendar-head">
        <button onClick={() => setMonth(m => Math.max(3, m-1))}><Icon name="left" size={14} /></button>
        <span>{monthName}</span>
        <button onClick={() => setMonth(m => Math.min(6, m+1))}><Icon name="right" size={14} /></button>
      </div>
      <div className="bk-cal-grid">
        {(isMonFirst ? ["S","M","T","W","T","F","S"] : ["S","M","T","W","T","F","S"]).map((d,i) => (
          <div key={i} className="dow">{d}</div>
        ))}
        {adjusted.map((d, i) => {
          if (d === null) return <div key={i} className="day muted"></div>;
          const isPast = month === 4 && d < todayD;
          const hasAvail = !isPast && d % 7 !== 1; // Mondays closed
          const isSelected = value && value.day === d && value.month === month;
          const cls = ["day"];
          if (isPast) cls.push("muted");
          if (!isPast && !hasAvail) cls.push("unavailable");
          if (hasAvail) cls.push("has-availability");
          if (isSelected) cls.push("selected");
          return (
            <div
              key={i} className={cls.join(" ")}
              onClick={() => hasAvail && onPick({ day: d, month, year, label: new Date(year, month, d).toLocaleDateString(t.locale || "en-US", { weekday: "long", month: "long", day: "numeric" }) })}
            >{d}</div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Map / meeting point ----------
function MeetingPoint({ t }) {
  return (
    <div className="bk-map">
      <div className="bk-map-canvas">
        <div className="bk-map-pin"></div>
        <div className="bk-map-route">
          <svg viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d="M 0 25 Q 30 5, 60 25 T 100 25" stroke="#0FB5A6" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <circle cx="100" cy="25" r="3" fill="#0FB5A6" />
          </svg>
        </div>
      </div>
      <div className="bk-map-info">
        <div>
          <div className="lbl">{t.meetAt}</div>
          <div className="place">Matejuška Harbour · Pier 3</div>
          <div className="sub">{t.beforeDeparture}</div>
        </div>
        <button>{t.directions}</button>
      </div>
    </div>
  );
}

// ---------- Upsell carousel ----------
function UpsellCarousel({ items, addedSet, onToggle, t }) {
  const tones = ["warm", "cool", "plum"];
  return (
    <div className="bk-upsells">
      {items.map((u, i) => (
        <div key={u.id} className={`bk-upsell ${tones[i % 3]}`}>
          <div className="bk-upsell-img" style={{ backgroundImage: `url('${u.img}')` }}>
            <div className="bk-upsell-ic"><Icon name={u.icon} size={12} /></div>
          </div>
          <h5>{u.title}</h5>
          <p>{u.desc}</p>
          <div className="bk-upsell-foot">
            <div className="bk-upsell-price">€{u.price}</div>
            <button className={`bk-upsell-add ${addedSet.has(u.id) ? "added" : ""}`} onClick={() => onToggle(u.id)}>
              {addedSet.has(u.id) ? <><Icon name="check" size={11} /> {t.added}</> : `+ ${t.add}`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Checkout ----------
function Checkout({ summary, onComplete, t }) {
  const [name, setName] = useStateRich("Mara Petrović");
  const [email, setEmail] = useStateRich("mara@example.com");
  const [submitting, setSubmitting] = useStateRich(false);
  const submit = () => {
    setSubmitting(true);
    setTimeout(() => onComplete(), 1300);
  };
  return (
    <div className="bk-checkout">
      <h4>{t.confirmPay}</h4>
      <div className="summary">
        {summary.lines.map((l, i) => (
          <div key={i} className="row"><span>{l.label}</span><span>€{l.amount}</span></div>
        ))}
        {summary.savings > 0 && (
          <div className="row"><span className="save">{t.bundleSaved}</span><span className="save">−€{summary.savings}</span></div>
        )}
        <div className="row total"><span>{t.total}</span><span>€{summary.total}</span></div>
      </div>
      <div className="bk-pay-options">
        <button className="bk-pay-btn">  Pay</button>
        <button className="bk-pay-btn gpay">G Pay</button>
      </div>
      <div className="bk-divider"><span>{t.orPayCard}</span></div>
      <div className="bk-form-row split">
        <input className="bk-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.fullName} />
        <input className="bk-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email} />
      </div>
      <div className="bk-card-input">
        <span className="brand"></span>
        <span className="num">4242 4242 4242 4242</span>
        <span style={{color: "var(--ink-400)", fontSize: 11, fontFamily: "var(--font-mono)"}}>11/27</span>
      </div>
      <button className="bk-checkout-cta" onClick={submit} disabled={submitting}>
        {submitting ? t.processing : <><Icon name="lock" size={13} /> {t.payNow.replace("{€}", "€" + summary.total)}</>}
      </button>
      <div className="bk-checkout-trust">
        <Icon name="shield" size={11} /> {t.trust}
      </div>
    </div>
  );
}

// ---------- Confirmation ----------
function Confirmation({ booking, t }) {
  // Build confetti pieces (deterministic-ish, generated once per mount)
  const confetti = React.useMemo(() => {
    const colors = ["#F4B942", "#E55934", "#2A9D8F", "#5A7FCA", "#F4B942", "#E55934"];
    return Array.from({ length: 28 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.6 + Math.random() * 1.4,
      rotate: Math.random() * 360,
      rotateEnd: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540),
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
      shape: i % 3, // 0=square, 1=circle, 2=rect
      drift: (Math.random() - 0.5) * 80,
    }));
  }, []);

  return (
    <div className="bk-confirm">
      <div className="bk-confetti" aria-hidden="true">
        {confetti.map((c, i) => (
          <span
            key={i}
            className={`bk-confetti-piece shape-${c.shape}`}
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              background: c.color,
              width: `${c.size}px`,
              height: c.shape === 2 ? `${c.size * 0.45}px` : `${c.size}px`,
              "--rot-start": `${c.rotate}deg`,
              "--rot-end": `${c.rotateEnd}deg`,
              "--drift": `${c.drift}px`,
            }}
          />
        ))}
      </div>
      <div className="bk-confirm-head">
        <div className="check"><Icon name="check" size={16} /></div>
        <h4>{t.confirmHeader}</h4>
        <div className="ref">Ref · {booking.ref}</div>
      </div>
      <div className="bk-email-banner">
        <div className="bk-email-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-10 5L2 7"/>
          </svg>
          <span className="bk-email-pulse" />
        </div>
        <div className="bk-email-text">
          <div className="bk-email-title">{t.emailSentTitle}</div>
          <div className="bk-email-body">
            {t.emailSentBody.split("{email}").map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <strong>{booking.email}</strong>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="bk-confirm-body">
        <div className="bk-confirm-row">
          <div className="ic"><Icon name="calendar" size={15} /></div>
          <div><span className="lbl">{t.when}</span><div className="val">{booking.when}</div></div>
        </div>
        <div className="bk-confirm-row">
          <div className="ic"><Icon name="anchor" size={15} /></div>
          <div><span className="lbl">{t.tour}</span><div className="val">{booking.tour}</div></div>
        </div>
        <div className="bk-confirm-row">
          <div className="ic"><Icon name="map" size={15} /></div>
          <div><span className="lbl">{t.meetAt}</span><div className="val">Matejuška Harbour · Pier 3<br/>{booking.meetTime}</div></div>
        </div>
        <div className="bk-confirm-row">
          <div className="ic"><Icon name="umbrella" size={15} /></div>
          <div><span className="lbl">{t.bring}</span><div className="val" style={{fontWeight: 400, fontSize: 12, color: "var(--ink-700)"}}>{t.bringList}</div></div>
        </div>
        <div className="bk-confirm-actions">
          <button><Icon name="calendar+" size={12} /> {t.addCal}</button>
          <button><Icon name="share" size={12} /> {t.share}</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Handoff ----------
function HandoffCard({ t, onCancel }) {
  return (
    <div className="bk-handoff">
      <div className="ic"><Icon name="headset" size={16} /></div>
      <div style={{flex: 1}}>
        <h5>{t.handoffTitle}</h5>
        <p>{t.handoffBody}</p>
        <button>{t.handoffCta}</button>
      </div>
    </div>
  );
}

window.PRODUCTS_DATA = PRODUCTS_DATA;
window.ProductGrid = ProductGrid;
window.MiniCalendar = MiniCalendar;
window.ParticipantsPicker = ParticipantsPicker;
window.AvailabilityCalendar = AvailabilityCalendar;
window.MeetingPoint = MeetingPoint;
window.UpsellCarousel = UpsellCarousel;
window.Checkout = Checkout;
window.Confirmation = Confirmation;
window.HandoffCard = HandoffCard;
