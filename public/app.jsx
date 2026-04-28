/* global React, ReactDOM, Icon, BrandMark, MsgRow, TypingDots, StatusRow, Chips, StreamText, PRODUCTS_DATA, ProductGrid, MiniCalendar, MeetingPoint, UpsellCarousel, Checkout, Confirmation, HandoffCard, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, ParticipantsPicker, AvailabilityCalendar */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- i18n strings ----------
const I18N = {
  en: {
    locale: "en-US", flag: "🇬🇧",
    headerName: "Owla", headerSub: "Travel guide · Replies in seconds",
    encrypted: "Encrypted", freeCancel: "Free 24h cancellation", langs: "25 languages",
    placeholder: "Ask Owla about Split tours…",
    aiFooter: "AI guide — answers grounded in this operator's tours",
    greeting: "Hi, I'm Owla, your local guide. 👋",
    greeting2: "Whether you've already mapped out your week or you're winging it — I'll help you find the right boat trip and book it right here. What's the plan?",
    chips: ["Family-friendly Saturday", "Sunset cruise", "Hvar day-trip", "Private charter"],
    searching: "Searching 12 tours · matching by date, group & vibe…",
    productIntro: "Three trips fit your brief. The Blue Lagoon is the obvious pick — gentle 5-hour route, kid-sized snorkel kits onboard, and skippers who genuinely love showing children the rays at the cove. Only 4 seats left at 11:30 AM though, so don't wait too long.",
    pickedSlot: "Saturday 2 May · 11:30 AM, locked in 👌. Quick housekeeping — what's the meeting point and a couple of perks worth knowing about.",
    upsellIntro: "Travellers who book the Blue Lagoon often add one of these. No pressure — they're optional and you can remove them at checkout.",
    readyCheckout: "Ready when you are. Confirm your details and I'll send tickets straight to your inbox.",
    bookedMsg: "Booked! Confirmation just landed in your inbox 📨",
    afterBookedMsg: "See you Saturday, Mara. One last tip from a local — bring small bills, the konoba on Brač runs on cash and the homemade rakija is worth a glass.",
    book: "Book",
    reviews: "reviews", left: "left", full: "full", adult: "adult",
    tag: { "Best match": "Best match", "Popular": "Popular", "Adventurous": "Adventurous" },
    add: "Add", added: "Added",
    confirmPay: "Confirm & pay", total: "Total", bundleSaved: "Bundle saved",
    orPayCard: "or pay by card", fullName: "Full name", email: "Email", processing: "Processing…",
    payNow: "Pay {€} & confirm", trust: "Secured by Stripe · Free cancellation up to 24h",
    confirmHeader: "You're all set, Mara!",
    when: "When", tour: "Tour", meetAt: "Meet at", bring: "Bring",
    bringList: "Swimsuit, towel, sunscreen. Snorkels & lunch are on us.",
    addCal: "Add to calendar", share: "Share",
    emailSentTitle: "Confirmation email on its way",
    emailSentBody: "We've sent your booking details and meeting point to {email}. Please check your inbox (and spam folder, just in case).",
    handoffTitle: "Want to talk to a human?",
    handoffBody: "I'll send your conversation to Marko, the owner — he typically replies within 2 hours.",
    handoffCta: "Yes, connect me",
    beforeDeparture: "Be there 15 min before departure",
    directions: "Directions",
    askParty: "Lovely choice. How many people are joining?",
    askDate: "Now — when are you thinking? Tap a day with green availability.",
    partyTitle: "Who's coming?",
    adults: "Adults", adultsSub: "Age 18+",
    kids: "Children", kidsSub: "Ages 3–17",
    infants: "Infants", infantsSub: "Under 3 · free",
    guest: "guest", guests: "guests",
    partyContinue: "Continue",
    availabilityFor: "Availability for",
    legendHigh: "Plenty of seats", legendSome: "Filling up", legendLow: "Almost sold out", legendClosed: "Closed",
    partySetMsg: "{adults} adult{adultsPlural}{kidsPart}{infantsPart} — got it.",
    dateSetMsg: "{label} — perfect, that's a great day to be on the water.",
    productIntroFiltered: "Here are the trips that fit {date} for your group of {size}. The Blue Lagoon is still my top pick — the kids' route is calmer and snorkel kits in their size come standard.",
  },
  es: {
    locale: "es-ES", flag: "🇪🇸",
    headerName: "Owla", headerSub: "Guía local · Responde en segundos",
    encrypted: "Cifrado", freeCancel: "Cancelación gratis 24h", langs: "25 idiomas",
    placeholder: "Pregúntale a Owla sobre tours en Split…",
    aiFooter: "Guía IA — respuestas basadas en los tours de este operador",
    greeting: "¡Hola! Soy Owla, tu guía local de Split. 👋",
    greeting2: "¿Buscas algo concreto o aún explorando? Cuéntame el plan y te ayudo a encontrar y reservar el barco perfecto, todo desde aquí.",
    chips: ["Familiar el sábado", "Crucero al atardecer", "Excursión a Hvar", "Charter privado"],
    searching: "Buscando 12 tours · filtrando por fecha, grupo y estilo…",
    productIntro: "Tres opciones encajan con tu plan. La Laguna Azul es la apuesta clara — ruta tranquila de 5 horas, equipo de snorkel para niños a bordo, y patrones que adoran enseñar las rayas a los pequeños. Solo quedan 4 plazas a las 11:30, no esperes mucho.",
    pickedSlot: "Sábado 2 de mayo · 11:30, reservado 👌. Te paso el punto de encuentro y un par de extras que vale la pena conocer.",
    upsellIntro: "Quienes reservan la Laguna Azul suelen añadir alguno de estos. Sin compromiso — se pueden quitar en el checkout.",
    readyCheckout: "Cuando quieras. Confirma tus datos y te mando las entradas al correo.",
    bookedMsg: "¡Reservado! Confirmación ya en tu correo 📨",
    afterBookedMsg: "Hasta el sábado, Mara. Un consejo de local — lleva algo de efectivo, en la konoba de Brač lo agradecen y la rakija casera vale una copa.",
    book: "Reservar",
    reviews: "reseñas", left: "quedan", full: "lleno", adult: "adulto",
    tag: { "Best match": "La mejor opción", "Popular": "Popular", "Adventurous": "Aventurero" },
    add: "Añadir", added: "Añadido",
    confirmPay: "Confirmar y pagar", total: "Total", bundleSaved: "Ahorro pack",
    orPayCard: "o paga con tarjeta", fullName: "Nombre completo", email: "Correo", processing: "Procesando…",
    payNow: "Pagar {€} y confirmar", trust: "Asegurado por Stripe · Cancelación gratis 24h antes",
    confirmHeader: "¡Listo, Mara!",
    when: "Cuándo", tour: "Tour", meetAt: "Punto de encuentro", bring: "Lleva",
    bringList: "Bañador, toalla, protector solar. Snorkel y almuerzo van por nuestra cuenta.",
    addCal: "Añadir al calendario", share: "Compartir",
    emailSentTitle: "Email de confirmación en camino",
    emailSentBody: "Te hemos enviado los detalles de la reserva y el punto de encuentro a {email}. Revisa tu bandeja de entrada (y la carpeta de spam, por si acaso).",
    handoffTitle: "¿Quieres hablar con una persona?",
    handoffBody: "Le paso tu conversación a Marko, el dueño — suele contestar en menos de 2 horas.",
    handoffCta: "Sí, conéctame",
    beforeDeparture: "Llega 15 min antes de la salida",
    directions: "Cómo llegar",
    askParty: "Buena elección. ¿Cuántos sois?",
    askDate: "Ahora — ¿qué día te encaja? Toca uno con disponibilidad en verde.",
    partyTitle: "¿Quién viene?",
    adults: "Adultos", adultsSub: "18+ años",
    kids: "Niños", kidsSub: "De 3 a 17 años",
    infants: "Bebés", infantsSub: "Menos de 3 · gratis",
    guest: "persona", guests: "personas",
    partyContinue: "Continuar",
    availabilityFor: "Disponibilidad para",
    legendHigh: "Muchas plazas", legendSome: "Llenándose", legendLow: "Casi agotado", legendClosed: "Cerrado",
    partySetMsg: "{adults} adulto{adultsPlural}{kidsPart}{infantsPart} — anotado.",
    dateSetMsg: "{label} — perfecto, es un día ideal para estar en el mar.",
    productIntroFiltered: "Aquí tienes los tours que encajan con {date} para tu grupo de {size}. La Laguna Azul sigue siendo mi favorita — la ruta es más tranquila para los peques y traen snorkel de su talla.",
  },
  it: {
    locale: "it-IT", flag: "🇮🇹",
    headerName: "Owla", headerSub: "Guida locale · Risponde in pochi secondi",
    encrypted: "Crittografato", freeCancel: "Cancellazione gratuita 24h", langs: "25 lingue",
    placeholder: "Chiedi a Owla dei tour di Spalato…",
    aiFooter: "Guida AI — risposte basate sui tour di questo operatore",
    greeting: "Ciao! Sono Owla, la tua guida locale a Spalato. 👋",
    greeting2: "Hai già un piano o stai ancora esplorando? Raccontami cosa cerchi e ti aiuto a trovare e prenotare la gita in barca giusta, tutto qui dentro.",
    chips: ["Sabato in famiglia", "Crociera al tramonto", "Gita a Hvar", "Charter privato"],
    searching: "Ricerca 12 tour · filtro per data, gruppo e stile…",
    productIntro: "Tre opzioni perfette per voi. La Laguna Blu è la scelta naturale — 5 ore tranquille, kit da snorkeling per bambini a bordo, e skipper che adorano mostrare le razze ai piccoli. Solo 4 posti alle 11:30, non aspettate troppo.",
    pickedSlot: "Sabato 2 maggio · 11:30, prenotato 👌. Ti passo il punto d'incontro e un paio di extra che vale la pena conoscere.",
    upsellIntro: "Chi prenota la Laguna Blu spesso aggiunge uno di questi. Senza impegno — puoi toglierli al checkout.",
    readyCheckout: "Quando vuoi. Conferma i tuoi dati e ti mando i biglietti via email.",
    bookedMsg: "Prenotato! Conferma già nella tua casella 📨",
    afterBookedMsg: "A sabato, Mara. Un consiglio da locale — porta un po' di contanti, alla konoba di Brač sono graditi e la rakija fatta in casa merita un assaggio.",
    book: "Prenota",
    reviews: "recensioni", left: "rimasti", full: "pieno", adult: "adulto",
    tag: { "Best match": "Miglior scelta", "Popular": "Popolare", "Adventurous": "Avventuroso" },
    add: "Aggiungi", added: "Aggiunto",
    confirmPay: "Conferma e paga", total: "Totale", bundleSaved: "Sconto pacchetto",
    orPayCard: "o paga con carta", fullName: "Nome completo", email: "Email", processing: "Elaborazione…",
    payNow: "Paga {€} e conferma", trust: "Protetto da Stripe · Cancellazione gratis 24h prima",
    confirmHeader: "Tutto pronto, Mara!",
    when: "Quando", tour: "Tour", meetAt: "Ritrovo", bring: "Porta con te",
    bringList: "Costume, asciugamano, crema solare. Snorkel e pranzo li offriamo noi.",
    addCal: "Aggiungi al calendario", share: "Condividi",
    emailSentTitle: "Email di conferma in arrivo",
    emailSentBody: "Abbiamo inviato i dettagli della prenotazione e il punto di ritrovo a {email}. Controlla la posta in arrivo (e la cartella spam, per sicurezza).",
    handoffTitle: "Vuoi parlare con una persona?",
    handoffBody: "Inoltro la conversazione a Marko, il titolare — di solito risponde entro 2 ore.",
    handoffCta: "Sì, mettimi in contatto",
    beforeDeparture: "Arriva 15 min prima della partenza",
    directions: "Indicazioni",
    askParty: "Ottima scelta. In quanti siete?",
    askDate: "Ora — quale giorno preferite? Tocca un giorno con disponibilità verde.",
    partyTitle: "Chi viene?",
    adults: "Adulti", adultsSub: "18+ anni",
    kids: "Bambini", kidsSub: "Da 3 a 17 anni",
    infants: "Neonati", infantsSub: "Sotto i 3 · gratis",
    guest: "persona", guests: "persone",
    partyContinue: "Continua",
    availabilityFor: "Disponibilità per",
    legendHigh: "Molti posti", legendSome: "Si sta riempiendo", legendLow: "Quasi esaurito", legendClosed: "Chiuso",
    partySetMsg: "{adults} adult{adultsPlural}{kidsPart}{infantsPart} — segnato.",
    dateSetMsg: "{label} — perfetto, è un giorno splendido per stare in mare.",
    productIntroFiltered: "Ecco i tour che vanno bene per {date} con il vostro gruppo di {size}. La Laguna Blu rimane la mia preferita — il percorso è più tranquillo per i bambini e gli snorkel della loro misura sono inclusi.",
  },
};

const UPSELLS_BY_LANG = {
  en: [
    { id: "pickup", title: "Hotel pickup", desc: "We'll collect you 25 min before departure.", price: 15, icon: "anchor", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=70" },
    { id: "lunch", title: "Upgrade lunch · grilled fish", desc: "Whole fish at the konoba on Brač, with local wine.", price: 22, icon: "wine", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70" },
    { id: "photo", title: "Pro photo package", desc: "Drone & underwater shots, delivered same evening.", price: 35, icon: "camera", img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=600&q=70" },
  ],
  es: [
    { id: "pickup", title: "Recogida en hotel", desc: "Te recogemos 25 min antes de la salida.", price: 15, icon: "anchor", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=70" },
    { id: "lunch", title: "Almuerzo premium · pescado a la brasa", desc: "Pescado entero en la konoba de Brač, con vino local.", price: 22, icon: "wine", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70" },
    { id: "photo", title: "Pack fotos profesionales", desc: "Tomas con dron y bajo el agua, entregadas la misma noche.", price: 35, icon: "camera", img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=600&q=70" },
  ],
  it: [
    { id: "pickup", title: "Ritiro in hotel", desc: "Veniamo a prenderti 25 min prima della partenza.", price: 15, icon: "anchor", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=70" },
    { id: "lunch", title: "Pranzo speciale · pesce alla griglia", desc: "Pesce intero alla konoba di Brač, con vino locale.", price: 22, icon: "wine", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70" },
    { id: "photo", title: "Pacchetto foto pro", desc: "Riprese con drone e subacquee, consegnate in serata.", price: 35, icon: "camera", img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=600&q=70" },
  ],
};

// ---------- Panel-wide confetti burst ----------
function PanelConfetti() {
  const pieces = useMemo(() => {
    const colors = ["#F4B942", "#E55934", "#2A9D8F", "#5A7FCA", "#F4B942", "#E55934", "#2A9D8F", "#FFFFFF"];
    return Array.from({ length: 70 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.4 + Math.random() * 1.8,
      rotate: Math.random() * 360,
      rotateEnd: (Math.random() > 0.5 ? 1 : -1) * (540 + Math.random() * 720),
      color: colors[i % colors.length],
      size: 7 + Math.random() * 8,
      shape: i % 3,
      drift: (Math.random() - 0.5) * 180,
    }));
  }, []);
  return (
    <div className="bk-panel-confetti" aria-hidden="true">
      {pieces.map((c, i) => (
        <span
          key={i}
          className={`bk-panel-confetti-piece shape-${c.shape}`}
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            background: c.color,
            width: `${c.size}px`,
            height: c.shape === 2 ? `${c.size * 0.4}px` : `${c.size}px`,
            "--rot-start": `${c.rotate}deg`,
            "--rot-end": `${c.rotateEnd}deg`,
            "--drift": `${c.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- AI flow phases ----------
// 0 greet -> 1 user query -> 2 search -> 3 results -> 4 user picks slot
// 5 picked-confirm + map + calendar -> 6 upsells -> 7 checkout -> 8 confirmation -> 9 free chat (real AI)

function ChatWidget({ tweaks, scenario, onChangeScenario, onClose, closing }) {
  const lang = tweaks.lang;
  const t = I18N[lang];
  const [messages, setMessages] = useState([]); // {id, from, content, type, data}
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [calendarPick, setCalendarPick] = useState({ day: 2, month: 4, year: 2026, label: "Saturday, May 2" });
  const [addedUpsells, setAddedUpsells] = useState(new Set());
  const [party, setParty] = useState({ adults: 2, kids: 0, infants: 0 });
  const [searchDate, setSearchDate] = useState(null);
  const [intentLabel, setIntentLabel] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const convoRef = useRef(null);
  const idRef = useRef(0);
  const nextId = () => `m${++idRef.current}`;

  // Reset on scenario / lang change
  useEffect(() => {
    setMessages([]);
    setPhase(0);
    setSelectedSlot(null);
    setAddedUpsells(new Set());
    idRef.current = 0;
    // greeting after a brief delay — split into two bubbles
    const t1 = setTimeout(() => {
      setMessages([{ id: nextId(), from: "ai", type: "stream", content: I18N[lang].greeting }]);
    }, 400);
    const t2 = setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: I18N[lang].greeting2 }]);
    }, 1600);
    const t3 = setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "chips", content: I18N[lang].chips }]);
      setPhase(1);
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line
  }, [lang, scenario]);

  // Auto-scroll
  useEffect(() => {
    if (convoRef.current) convoRef.current.scrollTop = convoRef.current.scrollHeight;
  }, [messages, aiThinking]);

  // Convert chip -> user text -> trigger party picker
  const handleChip = (label) => {
    if (phase <= 1) {
      // Chip flow: party picker → date picker → search
      setIntentLabel(label);
      setMessages(m => [
        ...m.filter(x => x.type !== "chips"),
        { id: nextId(), from: "user", type: "text", content: label },
      ]);
      setPhase(1.2);
      setTimeout(() => {
        setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.askParty }]);
      }, 500);
      setTimeout(() => {
        setMessages(m => [...m, { id: nextId(), from: "ai", type: "party" }]);
      }, 1900);
      return;
    }
    sendUserMessage(label);
  };

  const onPartySubmit = (p) => {
    setParty(p);
    setPhase(1.5);
    // Build summary text
    const adultsPart = `${p.adults} ${p.adults === 1 ? t.adults.replace(/s$/, '') : t.adults}`;
    const kidsPart = p.kids ? `, ${p.kids} ${p.kids === 1 ? t.kids.replace(/s$|ren$/i, '') : t.kids}` : "";
    const infantsPart = p.infants ? `, ${p.infants} ${t.infants}` : "";
    const summary = `${adultsPart.toLowerCase()}${kidsPart.toLowerCase()}${infantsPart.toLowerCase()}`;
    setMessages(m => [
      ...m.filter(x => x.type !== "party"),
      { id: nextId(), from: "user", type: "text", content: summary.charAt(0).toUpperCase() + summary.slice(1) },
    ]);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.askDate }]);
    }, 500);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "avcal" }]);
    }, 1700);
  };

  const onDatePick = (d) => {
    setSearchDate(d);
    setCalendarPick(d); // also pre-fills the meeting calendar later
    setMessages(m => [
      ...m.filter(x => x.type !== "avcal"),
      { id: nextId(), from: "user", type: "text", content: d.label },
    ]);
    setPhase(1.8);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.dateSetMsg.replace("{label}", d.label) }]);
    }, 400);
    setTimeout(() => {
      runFilteredProductSearch(d);
    }, 1800);
  };

  const runFilteredProductSearch = (date) => {
    setPhase(2);
    setAiThinking(true);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "system", type: "status", content: t.searching }]);
    }, 200);
    const size = (party.adults || 0) + (party.kids || 0) + (party.infants || 0);
    const introText = t.productIntroFiltered
      .replace("{date}", date.label.replace(/^\w+,\s*/, ""))
      .replace("{size}", size);
    setTimeout(() => {
      setMessages(m => [
        ...m.filter(x => x.type !== "status"),
        { id: nextId(), from: "ai", type: "stream", content: introText },
      ]);
    }, 1700);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "products" }]);
      setPhase(3);
      setAiThinking(false);
    }, 5400);
  };

  // Send user message
  const sendUserMessage = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setInput("");
    const userMsg = { id: nextId(), from: "user", type: "text", content: text };
    setMessages(m => [...m, userMsg]);

    // Branch by phase
    if (phase <= 1) {
      // First substantive query — show search status, then product results
      runProductSearch(text);
    } else if (phase === 9) {
      // Free-form AI chat (post-booking)
      runFreeAi(text);
    } else {
      // Mid-flow free question — answer via real AI but stay grounded
      runFreeAi(text);
    }
  };

  const runProductSearch = (queryText) => {
    setPhase(2);
    setAiThinking(true);
    // remove chips from history
    setMessages(m => m.filter(x => x.type !== "chips"));
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "system", type: "status", content: t.searching }]);
    }, 200);
    setTimeout(() => {
      setMessages(m => [
        ...m.filter(x => x.type !== "status"),
        { id: nextId(), from: "ai", type: "stream", content: t.productIntro },
      ]);
    }, 1700);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "products" }]);
      setPhase(3);
      setAiThinking(false);
    }, 5500);
  };

  const onSlotPick = (pid, time) => {
    if (phase < 4) setPhase(4);
    setSelectedSlot({ pid, time });
  };

  const onBook = (pid) => {
    const slot = (selectedSlot && selectedSlot.pid === pid)
      ? selectedSlot
      : { pid, time: PRODUCTS_DATA.find(p => p.id === pid).slots.find(s => s.left > 0).time };
    setSelectedSlot(slot);
    setPhase(5);
    // user-tap confirmation as a synthetic user message
    const userText = lang === "es" ? `Perfecto, reserva ${slot.time}` : lang === "it" ? `Perfetto, prenota le ${slot.time}` : `Great — book ${slot.time}`;
    setMessages(m => [...m, { id: nextId(), from: "user", type: "text", content: userText }]);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.pickedSlot }]);
    }, 600);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "calendar" }]);
    }, 2400);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "map" }]);
    }, 2900);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.upsellIntro }]);
    }, 3500);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "upsells" }]);
      setPhase(6);
    }, 5400);
  };

  const onUpsellToggle = (id) => {
    setAddedUpsells(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const proceedToCheckout = () => {
    setPhase(7);
    const userText = lang === "es" ? "Vamos al pago" : lang === "it" ? "Andiamo al checkout" : "Let's check out";
    setMessages(m => [...m, { id: nextId(), from: "user", type: "text", content: userText }]);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.readyCheckout }]);
    }, 500);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "checkout" }]);
    }, 2400);
  };

  const onPaymentComplete = () => {
    setPhase(8);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4500);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "celebration", content: t.bookedMsg }]);
    }, 200);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "confirmation" }]);
    }, 1400);
    setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: t.afterBookedMsg }]);
      setPhase(9);
    }, 2600);
  };

  // --- Real AI free chat ---
  const runFreeAi = async (userText) => {
    setAiThinking(true);
    const langLabel = lang === "es" ? "Spanish" : lang === "it" ? "Italian" : "English";
    const sys = `You are Owla, a knowledgeable, warm local guide for Split, Croatia, embedded in a tour operator's booking widget for Dalmatia Sea Co. Their tours are: Blue Lagoon & Three Islands (5h, €78 adult, family-friendly), Sunset Cruise & Wine Tasting (3h, €65 adult), Hvar & Pakleni Islands full day (8h, €124 adult). Tone: travel guide — knowledgeable, suggests, story-tells, never pushy. Keep replies under 60 words. Reply in ${langLabel}. Stay grounded in these tours; if asked about something outside, gently redirect or offer to connect with a human.`;
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: `${sys}\n\nUser: ${userText}` }
        ]
      });
      setAiThinking(false);
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: reply.trim() }]);
    } catch (e) {
      setAiThinking(false);
      setMessages(m => [...m, { id: nextId(), from: "ai", type: "stream", content: lang === "es" ? "Lo siento — algo falló. Inténtalo de nuevo." : lang === "it" ? "Mi dispiace — qualcosa è andato storto. Riprova." : "Sorry — something glitched. Try again?" }]);
    }
  };

  // ---------- Compose summary for checkout ----------
  const summary = useMemo(() => {
    if (!selectedSlot) return null;
    const product = PRODUCTS_DATA.find(p => p.id === selectedSlot.pid);
    const adultsLine = { label: `2 × ${t.adult} · ${product.name.split(" ").slice(0,3).join(" ")}…`, amount: 2 * product.price };
    const kidsLine = { label: `2 × ${lang === "es" ? "niño" : lang === "it" ? "bambini" : "child"} · -50%`, amount: 2 * product.childPrice };
    const lines = [adultsLine, kidsLine];
    let extras = 0;
    UPSELLS_BY_LANG[lang].forEach(u => {
      if (addedUpsells.has(u.id)) {
        lines.push({ label: u.title, amount: u.price });
        extras += u.price;
      }
    });
    const subtotal = adultsLine.amount + kidsLine.amount + extras;
    const savings = addedUpsells.size >= 2 ? Math.round(subtotal * 0.10) : 0;
    return { lines, savings, total: subtotal - savings };
  // eslint-disable-next-line
  }, [selectedSlot, addedUpsells, lang]);

  // ---------- Render ----------
  const renderMessage = (m, i) => {
    if (m.type === "text") return <MsgRow key={m.id} from={m.from}>{m.content}</MsgRow>;
    if (m.type === "celebration") {
      return (
        <div key={m.id} className="bk-celebration-bubble">
          <div className="bk-celebration-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div className="bk-celebration-text">
            <div className="bk-celebration-eyebrow">{lang === "es" ? "RESERVA CONFIRMADA" : lang === "it" ? "PRENOTAZIONE CONFERMATA" : "BOOKING CONFIRMED"}</div>
            <div className="bk-celebration-title">{m.content}</div>
          </div>
          <div className="bk-celebration-shine" />
        </div>
      );
    }
    if (m.type === "stream") {
      const isLast = i === messages.length - 1;
      return (
        <MsgRow key={m.id} from="ai">
          {isLast ? <StreamText text={m.content} /> : m.content}
        </MsgRow>
      );
    }
    if (m.type === "status") return <StatusRow key={m.id}>{m.content}</StatusRow>;
    if (m.type === "chips") return <Chips key={m.id} items={m.content} onPick={handleChip} />;
    if (m.type === "party") return (
      <ParticipantsPicker key={m.id} value={party} onChange={setParty} onSubmit={onPartySubmit} t={t} />
    );
    if (m.type === "avcal") return (
      <AvailabilityCalendar key={m.id} value={searchDate} onPick={onDatePick} party={party} t={t} />
    );
    if (m.type === "products") return (
      <ProductGrid key={m.id} products={PRODUCTS_DATA} lang={lang}
        selectedSlot={selectedSlot} onSlotPick={onSlotPick} onBook={onBook} t={t} />
    );
    if (m.type === "calendar") return (
      <MiniCalendar key={m.id} value={calendarPick} onPick={setCalendarPick} t={t} />
    );
    if (m.type === "map") return <MeetingPoint key={m.id} t={t} />;
    if (m.type === "upsells") return (
      <React.Fragment key={m.id}>
        <UpsellCarousel items={UPSELLS_BY_LANG[lang]} addedSet={addedUpsells} onToggle={onUpsellToggle} t={t} />
        <Chips items={[
          lang === "es" ? "Continuar al pago" : lang === "it" ? "Vai al checkout" : "Continue to checkout",
          lang === "es" ? "Hablar con persona" : lang === "it" ? "Parla con una persona" : "Talk to a human",
        ]} onPick={(label) => {
          if (label.toLowerCase().includes("human") || label.toLowerCase().includes("persona")) {
            setMessages(prev => [...prev, { id: nextId(), from: "user", type: "text", content: label }]);
            setMessages(prev => [...prev, { id: nextId(), from: "ai", type: "handoff" }]);
          } else {
            proceedToCheckout();
          }
        }} />
      </React.Fragment>
    );
    if (m.type === "checkout") return (
      <Checkout key={m.id} summary={summary} onComplete={onPaymentComplete} t={t} />
    );
    if (m.type === "confirmation") {
      const product = PRODUCTS_DATA.find(p => p.id === selectedSlot?.pid);
      return (
        <Confirmation key={m.id} t={t} booking={{
          ref: "BKN-9F4-2026",
          when: `${calendarPick.label} · ${selectedSlot?.time}`,
          tour: `${product?.name} · 2 ${t.adult}, 2 ${lang === "es" ? "niños" : lang === "it" ? "bambini" : "children"}`,
          meetTime: `${selectedSlot?.time ? "15 min " + (lang === "es" ? "antes" : lang === "it" ? "prima" : "before") : ""}`,
          email: "mara.petrovic@gmail.com",
        }} />
      );
    }
    if (m.type === "handoff") return <HandoffCard key={m.id} t={t} />;
    return null;
  };

  return (
    <div className={`bk-panel ${closing ? "closing" : ""}`}>
      <div className="bk-header">
        <div className="bk-header-row">
          <div className="bk-avatar"><BrandMark size={20} /></div>
          <div className="bk-header-meta">
            <div className="name">{t.headerName}<span className="ai-tag">AI</span></div>
            <div className="sub"><span className="dot"></span> {t.headerSub}</div>
          </div>
          <button className="bk-lang-pill" onClick={() => setShowLangMenu(s => !s)}>
            <span style={{fontSize: 14, lineHeight: 1}}>{t.flag}</span>
            {lang.toUpperCase()}
            <Icon name="chevron" size={11} />
          </button>
          {onClose && (
            <button className="bk-icon-btn bk-close" onClick={onClose} aria-label="Close chat">
              <Icon name="minus" size={14} />
            </button>
          )}
        </div>
        {showLangMenu && (
          <div className="bk-lang-menu" onMouseLeave={() => setShowLangMenu(false)}>
            {Object.entries(I18N).map(([k, v]) => (
              <button key={k} className={lang === k ? "active" : ""} onClick={() => {
                window.parent.postMessage({type: '__edit_mode_set_keys', edits: {lang: k}}, '*');
                tweaks.lang = k; // optimistic
                onChangeScenario && onChangeScenario(k);
                setShowLangMenu(false);
              }}>
                <span style={{fontSize: 16}}>{v.flag}</span>
                <span>{k === "en" ? "English" : k === "es" ? "Español" : "Italiano"}</span>
                {lang === k && <span style={{marginLeft: "auto"}}><Icon name="check" size={12} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bk-convo" ref={convoRef}>
        {messages.map(renderMessage)}
        {aiThinking && <TypingDots />}
        {showCelebration && <PanelConfetti />}
      </div>

      <div className="bk-composer">
        <div className="bk-composer-row">
          <textarea
            className="bk-composer-input"
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendUserMessage();
              }
            }}
            rows={1}
          />
          <button className="bk-send" disabled={!input.trim()} onClick={() => sendUserMessage()}>
            <Icon name="send" size={15} />
          </button>
        </div>
        <div className="bk-composer-foot">
          <span className="powered"><Icon name="sparkle" size={10} /> {t.aiFooter}</span>
        </div>
      </div>
    </div>
  );
}

function StageLanguageSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const t = I18N[lang];
  const labels = { en: "English", es: "Español", it: "Italiano" };
  return (
    <div className="bk-stage-lang">
      <button className="bk-stage-lang-trigger" onClick={() => setOpen(o => !o)}>
        <span style={{fontSize: 18, lineHeight: 1}}>{t.flag}</span>
        <span className="lbl">{labels[lang]}</span>
        <Icon name="chevron" size={13} />
      </button>
      {open && (
        <div className="bk-stage-lang-menu" onMouseLeave={() => setOpen(false)}>
          {Object.entries(I18N).map(([k, v]) => (
            <button key={k} className={lang === k ? "active" : ""} onClick={() => { setLang(k); setOpen(false); }}>
              <span style={{fontSize: 18}}>{v.flag}</span>
              <span style={{flex: 1, textAlign: "left"}}>{labels[k]}</span>
              {lang === k && <Icon name="check" size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Chat launcher (bubble + auto-open) ----------
function ChatLauncher({ tweaks, onChangeScenario }) {
  const lang = tweaks.lang;
  const t = I18N[lang];
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [closing, setClosing] = useState(false);
  const [unread, setUnread] = useState(1);
  const everOpenedRef = useRef(false);

  // Auto-open: 8s after page load, OR 3s after first scroll past 250px, whichever first
  useEffect(() => {
    if (everOpenedRef.current) return;
    let opened = false;
    let scrollTimer = null;
    const openIt = () => {
      if (opened || everOpenedRef.current) return;
      opened = true;
      everOpenedRef.current = true;
      setOpen(true);
      setShowTeaser(false);
      setUnread(0);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (opened || scrollTimer) return;
      if (window.scrollY > 250) {
        scrollTimer = setTimeout(openIt, 3000);
        window.removeEventListener("scroll", onScroll);
      }
    };
    const teaserTimer = setTimeout(() => {
      if (!opened) setShowTeaser(true);
    }, 4000);
    const openTimer = setTimeout(openIt, 8000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(teaserTimer);
      clearTimeout(openTimer);
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Allow site-side CTA to open
  useEffect(() => {
    const handler = () => {
      everOpenedRef.current = true;
      setOpen(true); setShowTeaser(false); setUnread(0);
    };
    window.addEventListener("bk-open", handler);
    return () => window.removeEventListener("bk-open", handler);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 200);
  };

  return (
    <div className="bk-panel-wrap">
      {open && (
        <ChatWidget
          tweaks={tweaks}
          scenario="family"
          onChangeScenario={onChangeScenario}
          onClose={handleClose}
          closing={closing}
        />
      )}
      {!open && showTeaser && (
        <div className="bk-teaser" onClick={() => { everOpenedRef.current = true; setOpen(true); setShowTeaser(false); setUnread(0); }}>
          <button className="bk-teaser-close" onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}>
            <Icon name="x" size={11} />
          </button>
          <div className="bk-teaser-avatar"><BrandMark size={20} /></div>
          <div className="bk-teaser-text">
            <strong>Owla · {t.headerSub.split('·')[0].trim()}</strong>
            {lang === "es" ? "¿Buscas algo en concreto? Te ayudo a encontrarlo." : lang === "it" ? "Stai cercando qualcosa? Posso aiutarti a trovarlo." : "Looking for something? Happy to help you find it."}
          </div>
        </div>
      )}
      {!open && (
        <button className="bk-bubble bk-bubble-pulse" onClick={() => { everOpenedRef.current = true; setOpen(true); setShowTeaser(false); setUnread(0); }} aria-label="Open chat">
          <Icon name="sparkle" size={26} />
          {unread > 0 && <span className="bk-bubble-badge">{unread}</span>}
        </button>
      )}
    </div>
  );
}

// ---------- App root ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "operatorName": "Dalmatia Sea Co.",
  "accentColor": "#2E3CA6",
  "tealColor": "#0FB5A6",
  "lang": "en"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);
  const [scenarioKey, setScenarioKey] = useState(0);

  useEffect(() => {
    document.documentElement.style.setProperty("--indigo", tweaks.accentColor);
    document.documentElement.style.setProperty("--teal", tweaks.tealColor);
  }, [tweaks.accentColor, tweaks.tealColor]);

  const restart = () => setScenarioKey(k => k + 1);

  return (
    <>
      <div className="bk-stage embedded">
        <SiteBackdrop operatorName={tweaks.operatorName} onOpenChat={() => window.dispatchEvent(new CustomEvent("bk-open"))} />
        <ChatLauncher key={`${tweaks.lang}-${scenarioKey}`} tweaks={tweaks} onChangeScenario={restart} />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Brand">
          <TweakColor tweaks={tweaks} setTweaks={setTweaks} keyName="accentColor" label="Accent (indigo)" />
          <TweakColor tweaks={tweaks} setTweaks={setTweaks} keyName="tealColor" label="Live / success (teal)" />
          <TweakSelect tweaks={tweaks} setTweaks={setTweaks} keyName="operatorName" label="Operator"
            options={[
              {value: "Dalmatia Sea Co.", label: "Dalmatia Sea Co."},
              {value: "Adriatic Boat Tours", label: "Adriatic Boat Tours"},
              {value: "Split Sailing Club", label: "Split Sailing Club"},
              {value: "Queen Tour Croatia", label: "Queen Tour Croatia"},
            ]}
          />
        </TweakSection>
        <TweakSection title="Conversation">
          <TweakSelect tweaks={tweaks} setTweaks={setTweaks} keyName="lang" label="Language"
            options={[
              {value: "en", label: "🇬🇧 English"},
              {value: "es", label: "🇪🇸 Español"},
              {value: "it", label: "🇮🇹 Italiano"},
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
} else {
  window.addEventListener("DOMContentLoaded", () => {
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  });
}
