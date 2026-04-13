/* =============================================================
   DESIGN: Dark Editorial — Hero Section
   Full-height hero with background image, avatar, typewriter-style intro
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/hero-bg-mtDmSPGVgnxQFHorxDvzAK.webp";
const AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/maciej-avatar_f2b22a3b.png";

const roles = {
  pl: ["Lektor języka angielskiego", "Twórca aplikacji EdTech", "Entuzjasta AI"],
  en: ["English Language Tutor", "EdTech App Builder", "AI Enthusiast"],
};

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentRoles = roles[lang];
  const currentRole = currentRoles[roleIndex];

  useEffect(() => {
    setDisplayed("");
    setRoleIndex(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const pause = 1800;

    if (!isDeleting && displayed === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % currentRoles.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, currentRole, currentRoles.length]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center gap-8 pt-20 pb-16">
        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/40 glow-green">
            <img
              src={AVATAR}
              alt="Maciej Wyrozumski"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary border-2 border-background" title={t("Dostępny do współpracy", "Open to work")} />
        </div>

        {/* Name */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Maciej
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mt-2 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
          >
            Wyrozumski
          </p>
        </div>

        {/* Typewriter role */}
        <div
          className="h-8 flex items-center justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span
            className="text-xl md:text-2xl text-primary font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Short tagline */}
        <p
          className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards", fontFamily: "'Outfit', sans-serif" }}
        >
          {t(
            "10 lat doświadczenia w nauczaniu angielskiego. Buduję narzędzia EdTech wspierane przez AI.",
            "10 years of English teaching experience. Building AI-powered EdTech tools."
          )}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
        >
          <button
            onClick={scrollToAbout}
            className="px-6 py-3 rounded bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all glow-green"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t("Poznaj mnie", "Learn more")}
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-6 py-3 rounded border border-border text-foreground font-semibold text-sm tracking-wide hover:border-primary/50 transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t("Skontaktuj się", "Get in touch")}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
            {t("przewiń", "scroll")}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
