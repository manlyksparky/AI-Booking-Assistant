/* global React, Icon */

function Logo({ name, light }) {
  return (
    <div className={"ds-logo " + (light ? "ds-logo-light" : "")}>
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
        <path d="M16 2 L26 9 L26 21 L16 28 L6 21 L6 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="13" r="2" fill="currentColor" />
      </svg>
      <span>{name}</span>
    </div>
  );
}

const TOUR_DATA = [
  { name: "Blue Lagoon & Three Islands", img: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=70", duration: "5 hrs", price: 78, tag: "Family-friendly", rating: 4.9, reviews: 1240, desc: "Drift into Croatia's most photographed bay, then snorkel two more secluded coves." },
  { name: "Sunset Cruise & Wine Tasting", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70", duration: "3 hrs", price: 65, tag: "Couples", rating: 4.9, reviews: 612, desc: "Golden hour off the Marjan cliffs with a flight of Pošip and Dingač from family vineyards." },
  { name: "Hvar & Pakleni Islands", img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=70", duration: "8 hrs", price: 124, tag: "Full day", rating: 4.8, reviews: 980, desc: "A long, lazy day hopping the Pakleni archipelago with a long lunch in Hvar town." },
  { name: "Private skipper · half day", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=70", duration: "4 hrs", price: 320, tag: "Private", rating: 5.0, reviews: 218, desc: "Your boat, your route. Up to 8 guests, a fridge full of cold drinks, no fixed itinerary." },
];

const MORE_TOURS = [
  { name: "Brač · Zlatni Rat & Bol", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=70", duration: "6 hrs", price: 89, tag: "Beach day" },
  { name: "Krka Waterfalls by sea", img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=70", duration: "9 hrs", price: 145, tag: "Nature" },
  { name: "Vis & the Blue Cave", img: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=900&q=70", duration: "10 hrs", price: 165, tag: "Bestseller" },
  { name: "Speedboat island sampler", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=70", duration: "7 hrs", price: 99, tag: "Speedboat" },
];

const REVIEWS = [
  { name: "Hannah M.", country: "🇬🇧 London, UK", text: "Boka, our skipper, was unreal. He took us to a cove that wasn't on the itinerary and we had it entirely to ourselves for 90 minutes. Best day of our trip.", tour: "Blue Lagoon · July 2025", avatar: "https://i.pravatar.cc/100?img=44" },
  { name: "Marco & Elena", country: "🇮🇹 Milan, IT", text: "Booked 24 hours before — they had room, picked us up at the apartment, and we were sipping wine on Hvar by lunchtime. Effortless.", tour: "Hvar Full-Day · August 2025", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "Priya S.", country: "🇺🇸 Brooklyn, NY", text: "Sunset cruise blew our expectations away. Tiny group, two crew, and the captain told us about every island on the horizon. Bring a sweater.", tour: "Sunset Cruise · September 2025", avatar: "https://i.pravatar.cc/100?img=47" },
];

const DESTINATIONS = [
  { name: "Hvar Town", desc: "Lavender fields, the Pakleni, and a centuries-old sea fortress.", img: "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=800&q=70" },
  { name: "Brač Island", desc: "Home to Zlatni Rat — the shape-shifting golden horn beach.", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=70" },
  { name: "Vis & Biševo", desc: "The Blue Cave at midday — water glows like stained glass.", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=70" },
  { name: "Pakleni Islands", desc: "A scattered necklace of pine-fringed coves off Hvar.", img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=70" },
];

const JOURNAL = [
  { tag: "Local guide", title: "Where the locals actually swim near Split", read: "6 min read", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70" },
  { tag: "Trip planning", title: "Half-day vs full-day: how to pick your first boat trip", read: "4 min read", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=70" },
  { tag: "Food & drink", title: "A short, opinionated guide to konobas in Hvar", read: "8 min read", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=70" },
];

const FAQ = [
  { q: "What's included in the price?", a: "All boats include fuel, snorkel kit, fresh towels, drinking water and a glass of homemade rakija to finish the day. Lunch is included on full-day trips." },
  { q: "What if the weather turns?", a: "We watch the bura wind closely. If we cancel, you get a full refund or a free reschedule — your call. We'll never put you on the water if it isn't safe or fun." },
  { q: "Can I bring kids?", a: "Yes — most of our tours are family-friendly. Children under 4 sail free; under 12 are half price. Life vests in every size are on board." },
  { q: "Do I need to know how to swim?", a: "Not for the cruises. For the snorkel stops, basic swimming helps but a buoyancy vest is always available if you'd rather float." },
  { q: "How do I pay?", a: "Most guests pay online when booking, but we're happy to take cash on the day. No booking fees, ever." },
];

function StarRow({ rating }) {
  return (
    <span className="ds-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i <= Math.round(rating) ? "#F5B400" : "#E5E7EB"}>
          <path d="M6 0.5 L7.4 4 L11.2 4.4 L8.4 6.9 L9.2 10.6 L6 8.7 L2.8 10.6 L3.6 6.9 L0.8 4.4 L4.6 4 Z" />
        </svg>
      ))}
    </span>
  );
}

function SiteBackdrop({ operatorName, onOpenChat }) {
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div className="ds-site">
      {/* Top nav */}
      <header className="ds-nav">
        <div className="ds-nav-inner">
          <Logo name={operatorName} />
          <nav className="ds-nav-links">
            <a className="active">Tours</a>
            <a>Destinations</a>
            <a>Private charters</a>
            <a>The journal</a>
            <a>About</a>
          </nav>
          <div className="ds-nav-right">
            <button className="ds-nav-lang">🇬🇧 EN · €</button>
            <button className="ds-nav-cta">Book a tour</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="ds-hero">
        <div className="ds-hero-content">
          <div className="ds-hero-eyebrow">
            <span className="ds-dot"></span> Split, Croatia · Locally owned since 2008
          </div>
          <h1>Boat trips along the<br/>Dalmatian coast.</h1>
          <p>Small-group island hopping, sunset cruises, and full-day adventures to Hvar &amp; the Pakleni. Skippered by people who grew up on these waters.</p>
          <div className="ds-hero-cta">
            <button className="ds-btn-primary">See all tours</button>
            <button className="ds-btn-ghost" onClick={onOpenChat}>
              <Icon name="sparkle" size={14} /> Ask Owla, our local guide
            </button>
          </div>
          <div className="ds-hero-trust">
            <div>
              <strong>4.9</strong>
              <span>Tripadvisor · 3,300+ reviews</span>
            </div>
            <div>
              <strong>12</strong>
              <span>tours · half &amp; full day</span>
            </div>
            <div>
              <strong>0%</strong>
              <span>booking fees</span>
            </div>
          </div>
        </div>
        <div className="ds-hero-art">
          <div className="ds-hero-img"></div>
          <div className="ds-hero-card">
            <div className="ds-hero-card-row">
              <div className="ds-hero-card-thumb"></div>
              <div>
                <div className="ds-hero-card-title">Blue Lagoon &amp; Three Islands</div>
                <div className="ds-hero-card-meta">5 hrs · from €78</div>
              </div>
            </div>
            <div className="ds-hero-card-foot">
              <span>Next departure</span>
              <strong>Tomorrow · 9:00 AM</strong>
            </div>
          </div>
          <div className="ds-hero-badge">
            <div className="ds-hero-badge-num">4.9</div>
            <div>
              <StarRow rating={5} />
              <div className="ds-hero-badge-sub">Tripadvisor · 3,300+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo strip */}
      <section className="ds-press">
        <div className="ds-press-label">As featured in</div>
        <div className="ds-press-row">
          <span style={{fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em"}}>Condé Nast Traveller</span>
          <span style={{fontWeight: 800, fontSize: 17, letterSpacing: "0.18em"}}>LONELY PLANET</span>
          <span style={{fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 19}}>The Times</span>
          <span style={{fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em"}}>AFAR</span>
          <span style={{fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18}}>Bon Appétit</span>
          <span style={{fontWeight: 800, fontSize: 16, letterSpacing: "0.12em"}}>NATGEO</span>
        </div>
      </section>

      {/* Tour grid */}
      <section className="ds-tours">
        <div className="ds-section-head">
          <div>
            <div className="ds-eyebrow">12 tours · Half day to overnight</div>
            <h2>Our most-loved tours</h2>
          </div>
          <a className="ds-section-link">View all 12 →</a>
        </div>
        <div className="ds-tour-grid">
          {TOUR_DATA.map((tour, i) => (
            <div className="ds-tour" key={i}>
              <div className="ds-tour-img" style={{ backgroundImage: `url('${tour.img}')` }}>
                <div className="ds-tour-tag">{tour.tag}</div>
                <button className="ds-tour-fav" aria-label="Save"><Icon name="heart" size={14} /></button>
              </div>
              <div className="ds-tour-body">
                <div className="ds-tour-rating">
                  <StarRow rating={tour.rating} />
                  <span>{tour.rating} · {tour.reviews.toLocaleString()} reviews</span>
                </div>
                <div className="ds-tour-name">{tour.name}</div>
                <div className="ds-tour-desc">{tour.desc}</div>
                <div className="ds-tour-meta">
                  <span>{tour.duration}</span>
                  <span className="ds-tour-price">from €{tour.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ds-tour-grid" style={{marginTop: 18}}>
          {MORE_TOURS.map((tour, i) => (
            <div className="ds-tour" key={i}>
              <div className="ds-tour-img" style={{ backgroundImage: `url('${tour.img}')` }}>
                <div className="ds-tour-tag">{tour.tag}</div>
                <button className="ds-tour-fav" aria-label="Save"><Icon name="heart" size={14} /></button>
              </div>
              <div className="ds-tour-body">
                <div className="ds-tour-name">{tour.name}</div>
                <div className="ds-tour-meta">
                  <span>{tour.duration}</span>
                  <span className="ds-tour-price">from €{tour.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations / map */}
      <section className="ds-destinations">
        <div className="ds-destinations-inner">
          <div className="ds-dest-head">
            <div>
              <div className="ds-eyebrow">Where we sail</div>
              <h2>Eight islands, one home port.</h2>
              <p>From Split's old harbour we can reach Brač in 30 minutes, Hvar in 90, and Vis &amp; Biševo by lunch. Click any island to see the tours that go there.</p>
            </div>
            <div className="ds-dest-stats">
              <div><strong>8</strong><span>islands visited</span></div>
              <div><strong>43</strong><span>secret coves &amp; beaches</span></div>
              <div><strong>120 km</strong><span>of Adriatic coast</span></div>
            </div>
          </div>
          <div className="ds-dest-grid">
            <div className="ds-map">
              <svg viewBox="0 0 600 380" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="14" height="14">
                    <circle cx="2" cy="2" r="1" fill="rgba(15,72,128,0.18)" />
                  </pattern>
                </defs>
                <rect width="600" height="380" fill="url(#dots)" />
                {/* Mainland */}
                <path d="M 0 60 Q 80 50 140 70 T 280 90 Q 360 100 440 80 Q 520 70 600 90 L 600 0 L 0 0 Z" fill="#E8DFCD" stroke="#C9B894" strokeWidth="1" />
                {/* Coastline detail */}
                <path d="M 0 60 Q 80 50 140 70 T 280 90 Q 360 100 440 80 Q 520 70 600 90" stroke="#9A8862" strokeWidth="1.5" fill="none" />
                {/* Islands */}
                <ellipse cx="180" cy="180" rx="46" ry="14" fill="#E8DFCD" stroke="#C9B894" />
                <text x="180" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3D5871">Brač</text>
                <ellipse cx="290" cy="220" rx="68" ry="14" fill="#E8DFCD" stroke="#C9B894" />
                <text x="290" y="245" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3D5871">Hvar</text>
                <ellipse cx="220" cy="220" rx="14" ry="6" fill="#E8DFCD" stroke="#C9B894" />
                <text x="220" y="207" textAnchor="middle" fontSize="8" fill="#3D5871">Pakleni</text>
                <ellipse cx="120" cy="280" rx="38" ry="10" fill="#E8DFCD" stroke="#C9B894" />
                <text x="120" y="275" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3D5871">Vis</text>
                <circle cx="80" cy="290" r="5" fill="#E8DFCD" stroke="#C9B894" />
                <text x="64" y="294" textAnchor="end" fontSize="8" fill="#3D5871">Biševo</text>
                <ellipse cx="430" cy="170" rx="36" ry="10" fill="#E8DFCD" stroke="#C9B894" />
                <text x="430" y="165" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3D5871">Šolta</text>

                {/* Routes */}
                <path d="M 80 95 Q 130 130 180 175" stroke="#0F4880" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.6" />
                <path d="M 80 95 Q 180 150 290 215" stroke="#0F4880" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.6" />
                <path d="M 80 95 Q 100 180 120 275" stroke="#0F4880" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.6" />

                {/* Split pin */}
                <circle cx="80" cy="95" r="6" fill="#0F4880" />
                <circle cx="80" cy="95" r="11" fill="none" stroke="#0F4880" strokeWidth="1.2" opacity="0.4" />
                <text x="80" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F4880">SPLIT</text>
                <text x="80" y="68" textAnchor="middle" fontSize="8" fill="#6B7180">⚓ home port</text>
              </svg>
            </div>
            <div className="ds-dest-list">
              {DESTINATIONS.map((d, i) => (
                <div className="ds-dest-card" key={i}>
                  <div className="ds-dest-img" style={{ backgroundImage: `url('${d.img}')` }}></div>
                  <div className="ds-dest-text">
                    <div className="ds-dest-name">{d.name}</div>
                    <div className="ds-dest-desc">{d.desc}</div>
                  </div>
                  <Icon name="chevron" size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Big quote / image split */}
      <section className="ds-bigsplit">
        <div className="ds-bigsplit-img"></div>
        <div className="ds-bigsplit-text">
          <div className="ds-eyebrow ds-eyebrow-light">Our promise</div>
          <h2>We sail like it's our cousin's birthday.</h2>
          <p>No 60-person catamarans. No microphone-narrated tours. Just a small boat, a skipper who knows the wind, and time to actually swim. If we wouldn't put our own family on the boat that day, nobody goes out.</p>
          <div className="ds-bigsplit-sig">— Boka &amp; Iva, founders</div>
        </div>
      </section>

      {/* Reviews */}
      <section className="ds-reviews">
        <div className="ds-section-head">
          <div>
            <div className="ds-eyebrow">3,300+ reviews</div>
            <h2>Guests say it best.</h2>
          </div>
          <div className="ds-review-rating">
            <div className="ds-review-rating-num">4.9</div>
            <div>
              <StarRow rating={5} />
              <div className="ds-review-rating-sub">Tripadvisor Travelers' Choice 2024</div>
            </div>
          </div>
        </div>
        <div className="ds-review-grid">
          {REVIEWS.map((r, i) => (
            <div className="ds-review-card" key={i}>
              <StarRow rating={5} />
              <p>"{r.text}"</p>
              <div className="ds-review-foot">
                <img src={r.avatar} alt={r.name} />
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.country}</span>
                </div>
              </div>
              <div className="ds-review-tour">{r.tour}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Crew */}
      <section className="ds-crew">
        <div className="ds-section-head">
          <div>
            <div className="ds-eyebrow">The crew</div>
            <h2>Eight skippers. One philosophy.</h2>
          </div>
          <a className="ds-section-link">Meet everyone →</a>
        </div>
        <div className="ds-crew-grid">
          {[
            { name: "Boka", role: "Founder &amp; lead skipper", img: "https://i.pravatar.cc/200?img=33" },
            { name: "Iva", role: "Co-founder · operations", img: "https://i.pravatar.cc/200?img=49" },
            { name: "Tomislav", role: "Skipper · Hvar specialist", img: "https://i.pravatar.cc/200?img=68" },
            { name: "Marija", role: "Skipper · sunset cruises", img: "https://i.pravatar.cc/200?img=23" },
            { name: "Petar", role: "Skipper · Vis &amp; Biševo", img: "https://i.pravatar.cc/200?img=15" },
            { name: "Ana", role: "Guest experience", img: "https://i.pravatar.cc/200?img=5" },
          ].map((c, i) => (
            <div className="ds-crew-card" key={i}>
              <img src={c.img} alt={c.name} />
              <div className="ds-crew-name">{c.name}</div>
              <div className="ds-crew-role" dangerouslySetInnerHTML={{__html: c.role}}></div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="ds-strip">
        <div className="ds-strip-item">
          <div className="ds-strip-num">01</div>
          <div>
            <strong>Pick a trip that fits your week</strong>
            <span>Half-day, full-day, or private — all our boats max 12 guests.</span>
          </div>
        </div>
        <div className="ds-strip-item">
          <div className="ds-strip-num">02</div>
          <div>
            <strong>Book in 60 seconds</strong>
            <span>No phone calls or back-and-forth emails. Pay on the day if you prefer.</span>
          </div>
        </div>
        <div className="ds-strip-item">
          <div className="ds-strip-num">03</div>
          <div>
            <strong>Show up &amp; enjoy</strong>
            <span>Snorkel kits, lunch on Brač and a glass of homemade rakija are on us.</span>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="ds-journal">
        <div className="ds-section-head">
          <div>
            <div className="ds-eyebrow">The journal</div>
            <h2>Stories from the coast.</h2>
          </div>
          <a className="ds-section-link">Read all →</a>
        </div>
        <div className="ds-journal-grid">
          {JOURNAL.map((j, i) => (
            <a className="ds-journal-card" key={i}>
              <div className="ds-journal-img" style={{ backgroundImage: `url('${j.img}')` }}></div>
              <div className="ds-journal-body">
                <div className="ds-journal-tag">{j.tag}</div>
                <div className="ds-journal-title">{j.title}</div>
                <div className="ds-journal-read">{j.read} →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="ds-faq">
        <div className="ds-faq-inner">
          <div>
            <div className="ds-eyebrow">Common questions</div>
            <h2>Everything you wanted to ask.</h2>
            <p>Still on the fence? Open the chat in the corner — Owla's our local guide AI and answers in seconds, in your language.</p>
            <button className="ds-btn-primary" onClick={onOpenChat}><Icon name="sparkle" size={14} /> Ask Owla anything</button>
          </div>
          <div className="ds-faq-list">
            {FAQ.map((f, i) => (
              <div className={"ds-faq-item " + (openFaq === i ? "open" : "")} key={i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <div className="ds-faq-q">
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "minus" : "plus"} size={14} />
                </div>
                {openFaq === i && <div className="ds-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="ds-newsletter">
        <div className="ds-newsletter-inner">
          <div>
            <h2>One email a month. No spam.</h2>
            <p>Local stories, off-season deals, and a heads-up when we open private dates. Unsubscribe with a single click.</p>
          </div>
          <form className="ds-newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button>Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="ds-foot">
        <div className="ds-foot-top">
          <div className="ds-foot-brand">
            <Logo name={operatorName} light />
            <p>Locally owned, family operated boat tours from Split. Sailing the Dalmatian coast since 2008.</p>
            <div className="ds-foot-social">
              <a aria-label="Instagram"><Icon name="instagram" size={16} /></a>
              <a aria-label="Facebook"><Icon name="facebook" size={16} /></a>
              <a aria-label="YouTube"><Icon name="youtube" size={16} /></a>
            </div>
          </div>
          <div>
            <h4>Tours</h4>
            <a>Half-day cruises</a>
            <a>Full-day adventures</a>
            <a>Sunset &amp; wine</a>
            <a>Private charters</a>
            <a>Group bookings</a>
          </div>
          <div>
            <h4>Destinations</h4>
            <a>Hvar &amp; Pakleni</a>
            <a>Brač &amp; Bol</a>
            <a>Vis &amp; the Blue Cave</a>
            <a>Krka waterfalls</a>
            <a>Šolta</a>
          </div>
          <div>
            <h4>Help</h4>
            <a>FAQs</a>
            <a>Cancellation policy</a>
            <a>Contact us</a>
            <a>What to bring</a>
            <a>Weather &amp; safety</a>
          </div>
          <div>
            <h4>Visit us</h4>
            <a>Matejuška 14<br/>21000 Split, HR</a>
            <a>+385 21 555 0142</a>
            <a>hello@dalmatiasea.co</a>
          </div>
        </div>
        <div className="ds-foot-bottom">
          <span>© 2026 Dalmatia Sea Co. · OIB 12345678901</span>
          <span>Privacy · Terms · Cookies</span>
          <span>Powered by <strong>Bokun</strong></span>
        </div>
      </footer>
    </div>
  );
}

window.SiteBackdrop = SiteBackdrop;
