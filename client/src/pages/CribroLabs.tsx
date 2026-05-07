/*
 * CRIBRO LABS — CribroLabs.tsx
 * Dark Premium Agency — Web & App Development
 * Sections: Hero, Services, Portfolio, About, Pricing, Contact
 * Schema: identical to Cribro English visual system
 * Brand: Cribro Labs — budowa aplikacji i stron internetowych
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Zap,
  Database,
  ShoppingCart,
  Bot,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
  ExternalLink,
  Code2,
  Layers,
  Globe,
} from "lucide-react";
import { Menu, X } from "lucide-react";

// ─── Fade-in on scroll ────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Cennik", href: "#cennik" },
  { label: "Kontakt", href: "#kontakt" },
];

function LabsNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
        }}
      >
        {/* Logo */}
        <a
          href="/cribro"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(74,222,128,0.6)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              fontWeight: 500,
              color: "#f5f5f0",
              textTransform: "uppercase",
            }}
          >
            CRIBRO
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              fontWeight: 400,
              color: "#4ade80",
              textTransform: "uppercase",
              marginLeft: "0.1rem",
            }}
          >
            LABS
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "rgba(245,245,240,0.65)",
                letterSpacing: "0.02em",
                cursor: "pointer",
                transition: "color 0.2s ease",
                padding: "0.25rem 0",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#4ade80")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.65)")
              }
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => scrollTo("#kontakt")}
            style={{
              background: "#4ade80",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "2px",
              padding: "0.5rem 1.25rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: "pointer",
              transition: "background 0.2s ease, transform 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#86efac";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#4ade80";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Zapytaj o wycenę
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(245,245,240,0.7)",
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#0d0d0d",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.8)",
                textAlign: "left",
                cursor: "pointer",
                padding: "0.25rem 0",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#kontakt")}
            style={{
              background: "#4ade80",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "2px",
              padding: "0.75rem 1.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "0.5rem",
              textAlign: "center",
            }}
          >
            Zapytaj o wycenę
          </button>
        </div>
      )}
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function HeroSection() {
  const [typed, setTyped] = useState("");
  const phrases = [
    "Strony internetowe",
    "Aplikacje webowe",
    "Sklepy online",
    "Systemy SaaS",
    "Narzędzia AI",
  ];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 45 : 80);
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Green glow top-right */}
      <div
        style={{
          position: "absolute",
          top: "-10rem",
          right: "-10rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="flex flex-col-reverse md:grid"
        >
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: "1.5rem" }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                }}
              >
                cribro.pro / labs
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "#f5f5f0",
                marginBottom: "1rem",
              }}
            >
              Buduję rzeczy,
              <br />
              <span style={{ color: "#4ade80" }}>które działają.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(245,245,240,0.55)",
                marginBottom: "2rem",
                minHeight: "2.5rem",
              }}
            >
              {typed}
              <span
                style={{
                  color: "#4ade80",
                  animation: "blink 0.8s step-end infinite",
                }}
              >
                |
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(245,245,240,0.6)",
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Projektuję i programuję strony internetowe oraz aplikacje webowe.
              Małe firmy, startupy, blogi — od prostego landing page po
              rozbudowany system z backendem. Szybko, czysto, bez kompromisów.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <button
                onClick={() =>
                  document
                    .querySelector("#kontakt")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  background: "#4ade80",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "2px",
                  padding: "0.85rem 1.75rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#86efac";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#4ade80";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Zapytaj o wycenę <ArrowRight size={16} />
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  background: "transparent",
                  color: "#f5f5f0",
                  border: "1px solid rgba(245,245,240,0.2)",
                  borderRadius: "2px",
                  padding: "0.85rem 1.75rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(74,222,128,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#4ade80";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(245,245,240,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "#f5f5f0";
                }}
              >
                Zobacz projekty
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{
                display: "flex",
                gap: "2.5rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {[
                { val: "10+", label: "lat w branży" },
                { val: "100%", label: "własny kod" },
                { val: "∞", label: "możliwości" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#4ade80",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,240,0.4)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Green accent border */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                right: "-1.5rem",
                bottom: "-1.5rem",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "2px",
                zIndex: 0,
              }}
            />
            <img
              src="/photos/maciej-labs-fullbody.png"
              alt="Maciej Wyrozumski — Cribro Labs"
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "2px",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
            />
            {/* Stack badge */}
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "-1rem",
                background: "rgba(10,10,10,0.92)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "2px",
                padding: "0.75rem 1rem",
                zIndex: 2,
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                  marginBottom: "0.3rem",
                }}
              >
                STACK
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(245,245,240,0.75)",
                }}
              >
                React · Node.js · TypeScript
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(74,222,128,0.5); }
          50% { box-shadow: 0 0 14px rgba(74,222,128,0.9); }
        }
      `}</style>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Globe,
    title: "Strony internetowe",
    desc: "Landing page, strony firmowe, blogi — zaprojektowane z myślą o konwersji i szybkości. Responsywne, zoptymalizowane pod SEO.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: Monitor,
    title: "Aplikacje webowe",
    desc: "Kompleksowe aplikacje z backendem, bazą danych i systemem autoryzacji. Od MVP po produkcyjny system.",
    tags: ["TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    icon: ShoppingCart,
    title: "Sklepy online",
    desc: "E-commerce z integracją płatności Stripe, panelem zarządzania i systemem rabatów. Gotowe do sprzedaży od pierwszego dnia.",
    tags: ["Stripe", "Prisma", "Auth"],
  },
  {
    icon: Bot,
    title: "Integracje AI",
    desc: "Chatboty, asystenci, automatyzacje — integracje z OpenAI, Anthropic i innymi modelami językowymi dopasowane do Twojego biznesu.",
    tags: ["OpenAI", "Anthropic", "API"],
  },
  {
    icon: Smartphone,
    title: "Aplikacje mobilne",
    desc: "Natywne aplikacje iOS i Android budowane w React Native. Jeden kod, dwie platformy, pełna funkcjonalność.",
    tags: ["React Native", "Expo", "Mobile"],
  },
  {
    icon: Database,
    title: "Systemy SaaS",
    desc: "Narzędzia B2B z subskrypcją, onboardingiem i integracją z zewnętrznymi API. Skalowalne od dnia pierwszego.",
    tags: ["SaaS", "Subscriptions", "API"],
  },
];

function ServicesSection() {
  return (
    <section id="uslugi" style={{ padding: "7rem 0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4ade80",
              }}
            >
              01 — Usługi
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Co buduję
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
                maxWidth: "520px",
              }}
            >
              Każdy projekt traktuję indywidualnie. Dobór technologii zawsze
              zależy od potrzeb — nie od przyzwyczajeń.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08}>
              <div
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  padding: "2rem",
                  transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(74,222,128,0.25)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 48px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "4px",
                    background: "rgba(74,222,128,0.08)",
                    border: "1px solid rgba(74,222,128,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#4ade80",
                    marginBottom: "1.25rem",
                  }}
                >
                  <svc.icon size={18} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: "0.75rem",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "rgba(245,245,240,0.5)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {svc.desc}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {svc.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#4ade80",
                        background: "rgba(74,222,128,0.07)",
                        border: "1px solid rgba(74,222,128,0.15)",
                        borderRadius: "2px",
                        padding: "0.2rem 0.55rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01",
    title: "Cribro English",
    category: "Platforma edukacyjna",
    desc: "Portal językowy do nauki angielskiego — lekcje, materiały, blog i system rezerwacji. Zbudowany w React + TypeScript z pełnym backendem.",
    tags: ["React", "TypeScript", "Node.js"],
    status: "live",
    url: "https://cribro.pro",
  },
  {
    num: "02",
    title: "Cribro Journal",
    category: "Aplikacja webowa",
    desc: "Aplikacja do codziennego pisania i refleksji. Prosta, szybka, bez rozpraszaczy. Zbudowana z myślą o nawyku myślenia.",
    tags: ["React", "Tailwind", "PWA"],
    status: "live",
    url: "https://journal.cribro.pro",
  },
  {
    num: "03",
    title: "Projekt w przygotowaniu",
    category: "Landing page",
    desc: "Strona dla lokalnej firmy usługowej. Responsywna, zoptymalizowana pod SEO, z formularzem kontaktowym.",
    tags: ["React", "Tailwind", "SEO"],
    status: "soon",
    url: "#",
  },
  {
    num: "04",
    title: "Projekt w przygotowaniu",
    category: "Sklep online",
    desc: "E-commerce z integracją płatności Stripe, panelem zarządzania zamówieniami i systemem rabatów.",
    tags: ["Next.js", "Stripe", "Prisma"],
    status: "soon",
    url: "#",
  },
];

function PortfolioSection() {
  return (
    <section
      id="portfolio"
      style={{
        padding: "7rem 0",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4ade80",
              }}
            >
              02 — Portfolio
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Wybrane projekty
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
              }}
            >
              Portfolio w rozbudowie — więcej projektów pojawi się wkrótce.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "2rem 2.5rem",
                  borderRadius: "2px",
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr auto",
                  gap: "2rem",
                  alignItems: "center",
                  transition: "border-color 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(74,222,128,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)")
                }
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "rgba(74,222,128,0.25)",
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#f5f5f0",
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color:
                          p.status === "live"
                            ? "#4ade80"
                            : "rgba(245,245,240,0.3)",
                        border: `1px solid ${
                          p.status === "live"
                            ? "rgba(74,222,128,0.3)"
                            : "rgba(255,255,255,0.1)"
                        }`,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "2px",
                      }}
                    >
                      {p.status === "live" ? "Live" : "Wkrótce"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4ade80",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.category}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(245,245,240,0.5)",
                      lineHeight: 1.6,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#4ade80",
                          background: "rgba(74,222,128,0.07)",
                          border: "1px solid rgba(74,222,128,0.15)",
                          borderRadius: "2px",
                          padding: "0.2rem 0.55rem",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {p.status === "live" && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(245,245,240,0.3)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#4ade80")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(245,245,240,0.3)")
                    }
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="o-mnie" style={{ padding: "7rem 0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="flex flex-col md:grid"
        >
          {/* Photo */}
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "-1.5rem",
                  right: "1.5rem",
                  bottom: "1.5rem",
                  border: "1px solid rgba(74,222,128,0.15)",
                  borderRadius: "2px",
                }}
              />
              <img
                src="/photos/maciej-labs-portrait.png"
                alt="Maciej Wyrozumski — Cribro Labs"
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "2px",
                  position: "relative",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn delay={0.1}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                }}
              >
                03 — O mnie
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginTop: "0.75rem",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Maciej Wyrozumski.
                <br />
                <span style={{ color: "#4ade80" }}>Builder.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(245,245,240,0.65)",
                  marginBottom: "1.25rem",
                }}
              >
                Jestem programistą i projektantem stron internetowych z
                Bielska-Białej. Buduję strony i aplikacje webowe, które łączą
                estetykę z funkcjonalnością. Pracuję zdalnie z klientami z całej
                Polski.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "rgba(245,245,240,0.65)",
                  marginBottom: "2rem",
                }}
              >
                Nie produkuję szablonowych stron. Każdy projekt traktuję
                indywidualnie — od rozmowy o celach, przez projekt, po wdrożenie
                i wsparcie po starcie. Mój stack to React, TypeScript, Node.js i
                PostgreSQL, ale dobór technologii zawsze zależy od potrzeb
                projektu.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div
                style={{
                  borderLeft: "2px solid #4ade80",
                  paddingLeft: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    color: "rgba(245,245,240,0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  "Buduję strony tak, jak sam chciałbym je mieć — szybkie,
                  czyste i bez zbędnego szumu."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  "React, TypeScript, Next.js",
                  "Node.js, Express, PostgreSQL",
                  "Tailwind CSS, Framer Motion",
                  "Stripe, Auth, REST & GraphQL API",
                  "Integracje AI (OpenAI, Anthropic)",
                ].map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <Check size={14} color="#4ade80" />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(245,245,240,0.65)",
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    subtitle: "Strony i landing page",
    price: "od 1 500 zł",
    period: "jednorazowo",
    highlight: false,
    cta: "Zapytaj o wycenę",
    features: [
      "Landing page lub strona firmowa",
      "Responsywny design (mobile-first)",
      "Optymalizacja SEO",
      "Formularz kontaktowy",
      "Hosting i domena (1 rok)",
      "Wdrożenie i testy",
    ],
  },
  {
    name: "Pro",
    subtitle: "Aplikacje webowe",
    price: "od 4 500 zł",
    period: "jednorazowo",
    highlight: true,
    cta: "Zacznijmy projekt",
    features: [
      "Aplikacja webowa z backendem",
      "System autoryzacji użytkowników",
      "Baza danych (PostgreSQL)",
      "Panel administracyjny",
      "REST API lub GraphQL",
      "Wdrożenie na serwer produkcyjny",
      "30 dni wsparcia po starcie",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Systemy i SaaS",
    price: "Wycena indywidualna",
    period: "projekt niestandardowy",
    highlight: false,
    cta: "Porozmawiajmy",
    features: [
      "System SaaS z subskrypcją",
      "Integracje płatności (Stripe)",
      "Integracje AI i zewnętrzne API",
      "Architektura skalowalna",
      "Dokumentacja techniczna",
      "Wsparcie długoterminowe",
    ],
  },
];

function PricingSection() {
  return (
    <section
      id="cennik"
      style={{
        padding: "7rem 0",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4ade80",
              }}
            >
              04 — Cennik
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                letterSpacing: "-0.02em",
              }}
            >
              Przejrzyste ceny
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(245,245,240,0.5)",
                marginTop: "0.75rem",
              }}
            >
              Pierwsza konsultacja (30 min) jest bezpłatna — ustalamy zakres i
              wycenę.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.1}>
              <div
                style={{
                  background: plan.highlight ? "rgba(74,222,128,0.05)" : "#111",
                  border: `1px solid ${
                    plan.highlight
                      ? "rgba(74,222,128,0.35)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  borderRadius: "2px",
                  padding: "2.5rem 2rem",
                  position: "relative",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 48px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-0.75rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#4ade80",
                      color: "#0a0a0a",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.2rem 0.75rem",
                      borderRadius: "2px",
                      fontWeight: 600,
                    }}
                  >
                    Popularny
                  </div>
                )}

                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                    marginBottom: "0.5rem",
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(245,245,240,0.45)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {plan.subtitle}
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#f5f5f0",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(245,245,240,0.35)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {plan.period}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                    marginBottom: "2rem",
                  }}
                >
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.65rem",
                      }}
                    >
                      <Check
                        size={13}
                        color="#4ade80"
                        style={{ marginTop: "0.2rem", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.875rem",
                          color: "rgba(245,245,240,0.6)",
                          lineHeight: 1.5,
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    document
                      .querySelector("#kontakt")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    width: "100%",
                    background: plan.highlight ? "#4ade80" : "transparent",
                    color: plan.highlight ? "#0a0a0a" : "#f5f5f0",
                    border: plan.highlight
                      ? "none"
                      : "1px solid rgba(245,245,240,0.2)",
                    borderRadius: "2px",
                    padding: "0.85rem 1.5rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: plan.highlight ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "background 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.background =
                        "#86efac";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(74,222,128,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "#4ade80";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlight) {
                      (e.currentTarget as HTMLElement).style.background =
                        "#4ade80";
                    } else {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(245,245,240,0.2)";
                      (e.currentTarget as HTMLElement).style.color = "#f5f5f0";
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    padding: "0.75rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#f5f5f0",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(245,245,240,0.45)",
    marginBottom: "0.5rem",
  };

  return (
    <section id="kontakt" style={{ padding: "7rem 0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="flex flex-col md:grid"
        >
          {/* Left */}
          <FadeIn>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4ade80",
              }}
            >
              05 — Kontakt
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 700,
                color: "#f5f5f0",
                marginTop: "0.75rem",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Zacznijmy razem
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(245,245,240,0.55)",
                marginBottom: "2.5rem",
              }}
            >
              Opisz swój projekt — odezwę się w ciągu 24 godzin. Pierwsza
              konsultacja (30 min) jest bezpłatna.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  icon: Mail,
                  label: "maciej@cribro.pro",
                  href: "mailto:maciej@cribro.pro",
                },
                {
                  icon: Phone,
                  label: "+48 536 524 867",
                  href: "tel:+48536524867",
                },
                {
                  icon: MapPin,
                  label: "Bielsko-Biała · Online",
                  href: "#",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "rgba(245,245,240,0.55)",
                    transition: "color 0.2s ease",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#4ade80")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(245,245,240,0.55)")
                  }
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "4px",
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                      flexShrink: 0,
                    }}
                  >
                    <c.icon size={14} />
                  </div>
                  {c.label}
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: "3rem",
                padding: "1.5rem",
                background: "rgba(74,222,128,0.04)",
                border: "1px solid rgba(74,222,128,0.15)",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Code2 size={14} color="#4ade80" />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4ade80",
                  }}
                >
                  Dostępność
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(245,245,240,0.55)",
                  lineHeight: 1.6,
                }}
              >
                Odpowiadam zwykle w ciągu 24h. Pracuję zdalnie z klientami z
                całej Polski.
              </p>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={0.2}>
            {sent ? (
              <div
                style={{
                  padding: "3rem 2rem",
                  background: "rgba(74,222,128,0.04)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "2px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <Check size={20} color="#4ade80" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: "0.75rem",
                  }}
                >
                  Wiadomość wysłana
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(245,245,240,0.55)",
                    lineHeight: 1.6,
                  }}
                >
                  Odezwę się w ciągu 24 godzin. Dziękuję za zaufanie.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {[
                  { id: "name", label: "Imię i nazwisko *", placeholder: "Jan Kowalski", type: "text" },
                  { id: "email", label: "Email *", placeholder: "jan@firma.pl", type: "email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} style={labelStyle}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(form as any)[field.id]}
                      onChange={(e) =>
                        setForm({ ...form, [field.id]: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(74,222,128,0.4)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                      }
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="service" style={labelStyle}>
                    Rodzaj projektu
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      background: "#111",
                      color: "rgba(245,245,240,0.7)",
                    }}
                  >
                    <option value="">Wybierz...</option>
                    <option value="landing">Strona / Landing page</option>
                    <option value="app">Aplikacja webowa</option>
                    <option value="shop">Sklep online</option>
                    <option value="saas">System SaaS</option>
                    <option value="ai">Integracja AI</option>
                    <option value="other">Inne</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" style={labelStyle}>
                    Opisz projekt *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Czego potrzebujesz? Im więcej szczegółów, tym lepsza wycena."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(74,222,128,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#4ade80",
                    color: "#0a0a0a",
                    border: "none",
                    borderRadius: "2px",
                    padding: "0.9rem 1.75rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#86efac")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#4ade80")
                  }
                >
                  Wyślij zapytanie <ArrowRight size={16} />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function LabsFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 0",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        className="md:flex-row md:items-center md:justify-between"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "rgba(245,245,240,0.4)",
              textTransform: "uppercase",
            }}
          >
            CRIBRO LABS
          </span>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(245,245,240,0.3)",
          }}
        >
          © {year} Maciej Wyrozumski · cribro.pro
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <a
            href="https://cribro.pro"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(245,245,240,0.35)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#4ade80")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.35)")
            }
          >
            Cribro English
          </a>
          <a
            href="mailto:maciej@cribro.pro"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(245,245,240,0.35)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#4ade80")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.35)")
            }
          >
            maciej@cribro.pro
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function CribroLabs() {
  useEffect(() => {
    document.title = "Cribro Labs — Web & App Development";
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <LabsNavbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
      <LabsFooter />
    </div>
  );
}
