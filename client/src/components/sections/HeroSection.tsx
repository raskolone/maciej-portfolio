/* =============================================================
   DESIGN: Dark Constellation — Hero Section
   Full-height hero with animated constellation canvas
   Centered layout: avatar → name → typewriter → desc → CTAs
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";

const AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/maciej-avatar_f2b22a3b.png";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const phrases = lang === "pl"
    ? ["Full Immersion Teacher", "Pronunciation Coach", "EdTech Builder", "AI Enthusiast"]
    : ["Full Immersion Teacher", "Pronunciation Coach", "EdTech Builder", "AI Enthusiast"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated constellation */}
      <ConstellationCanvas />
      {/* Radial gradient overlay for depth — original from ZIP */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, oklch(0.11 0.015 240 / 60%) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16">

        {/* Avatar */}
        <div
          className="animate-fade-in mb-6"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/50 animate-glow-pulse">
              <img
                src={AVATAR}
                alt="Maciej Wyrozumski"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status dot */}
            <div className="absolute bottom-1 right-1 glow-dot" />
          </div>
        </div>

        {/* Name */}
        <div
          className="animate-fade-in-up mb-2"
          style={{ opacity: 0, animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <h1
            className="text-6xl md:text-8xl font-bold text-foreground leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Maciej
          </h1>
          <p
            className="text-base md:text-lg text-muted-foreground tracking-[0.35em] uppercase mt-1"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Wyrozumski
          </p>
        </div>

        {/* Typewriter subtitle */}
        <div
          className="animate-fade-in-up mb-5 h-8"
          style={{ opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          <TypewriterText
            phrases={phrases}
            className="text-lg md:text-xl font-semibold text-primary"
          />
        </div>

        {/* Description */}
        <p
          className="animate-fade-in-up text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
          style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards", fontFamily: "'DM Sans', sans-serif" }}
        >
          {t(
            "10 lat doświadczenia w nauczaniu angielskiego. Specjalizacja: fonetyka, Business English, full immersion. Online i w Bielsku-Białej.",
            "10 years of experience teaching English. Specialization: phonetics, Business English, full immersion. Online and in Bielsko-Biała."
          )}
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up flex flex-col sm:flex-row gap-3 mb-12"
          style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <a
            href="https://calendly.com/maciej-wyrozumski/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t("Umów pierwszą lekcję", "Book a lesson")}
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-secondary"
          >
            {t("Poznaj mnie", "About me")}
          </a>
        </div>

        {/* Proof stats */}
        <div
          className="animate-fade-in flex flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ opacity: 0, animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          {[
            { num: "10+", label: t("lat doświadczenia", "years experience") },
            { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
            { num: "100%", label: t("zajęcia po angielsku", "lessons in English") },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="text-primary font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
              >
                {item.num}
              </span>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tagline + CribroEnglish brand */}
        <div
          className="animate-fade-in mt-10 mb-6 flex flex-col items-center gap-2"
          style={{ opacity: 0, animationDelay: "1.1s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary/40" />
            <span
              className="text-muted-foreground/60 text-[11px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              less noise. more language.
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <span
            className="text-primary/70 text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            CribroEnglish
          </span>
        </div>
      </div>
    </section>
  );
}
