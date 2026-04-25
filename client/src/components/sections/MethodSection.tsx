/* =============================================================
   DESIGN: Warm Ink & Paper — Method Section
   4 pillars of teaching method, asymmetric layout
   ============================================================= */

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663586786146/TAFunkDrFdD3zZyACdoLmY/about-bg-TaevRFcopD2KaKEpjanKkc.webp";

const pillars = [
  {
    num: "01",
    pl: { title: "Full Immersion", desc: "Zajęcia prowadzę w całości po angielsku, tak aby kontakt z językiem był naturalny i regularny. Twój mózg uczy się myśleć po angielsku, nie tłumaczyć." },
    en: { title: "Full Immersion", desc: "Lessons are conducted entirely in English so that contact with the language is natural and regular. Your brain learns to think in English, not translate." },
  },
  {
    num: "02",
    pl: { title: "Speaking First", desc: "Lekcje są nastawione na mówienie, reagowanie i realne użycie języka, a nie tylko bierne przerabianie materiałów. Mówisz od pierwszej minuty." },
    en: { title: "Speaking First", desc: "Lessons focus on speaking, reacting, and real language use — not passive material review. You speak from the very first minute." },
  },
  {
    num: "03",
    pl: { title: "Pronunciation & Phonetics", desc: "Pomagam poprawiać wymowę, rytm wypowiedzi i pewność mówienia. Fonetyka to moja specjalizacja — uczę, jak naprawdę brzmieć po angielsku." },
    en: { title: "Pronunciation & Phonetics", desc: "I help improve pronunciation, speech rhythm, and speaking confidence. Phonetics is my specialization — I teach you how to actually sound English." },
  },
  {
    num: "04",
    pl: { title: "Konsekwencja, nie intensywność", desc: "30 minut dziennie bije 3 godziny raz w tygodniu. Nauka języka to nawyk, nie maraton. Budujemy system, który działa długofalowo — bez wypalenia." },
    en: { title: "Consistency over intensity", desc: "30 minutes daily beats 3 hours once a week. Language learning is a habit, not a marathon. We build a system that works long-term — without burnout." },
  },
  {
    num: "05",
    pl: { title: "Mniej znaczy więcej", desc: "Nie zasypuję Cię materiałem. Każda lekcja ma jeden główny cel. Skupiamy się na tym, co daje 80% efektu — reszta to szum. Esencja, nie encyklopedia." },
    en: { title: "Less is more", desc: "I don't bury you in material. Every lesson has one main goal. We focus on what gives 80% of the result — the rest is noise. Essence, not encyclopedia." },
  },
];

export default function MethodSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-pillar").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateX(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="method" ref={sectionRef} className="py-24 bg-card/20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: image + label */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm shadow-xl border border-primary/20">
              <img
                src={ABOUT_BG}
                alt={t("Metoda nauczania", "Teaching method")}
                className="w-full h-80 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="section-label mb-1">{t("Moja filozofia", "My philosophy")}</p>
                <p
                  className="text-foreground text-xl font-bold leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {t("Mniej szumu. Więcej języka.", "Less noise. More language.")}
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {t(
                    "Nie potrzebujesz więcej czasu. Potrzebujesz lepszego systemu.",
                    "You don't need more time. You need a better system."
                  )}
                </p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-sm -z-10" />
          </div>

          {/* Right: pillars */}
          <div>
            <div className="relative mb-10">
              <span className="deco-number">03</span>
              <p className="section-label mb-3">{t("Jak uczę", "How I Teach")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Pięć filarów mojej metody", "Five pillars of my method")}
              </h2>
              <div className="rule-ink mt-6 max-w-xs" />
            </div>

            <div className="space-y-6">
              {pillars.map((pillar) => {
                const data = lang === "pl" ? pillar.pl : pillar.en;
                return (
                  <div
                    key={pillar.num}
                    className="reveal-pillar flex gap-5 group"
                    style={{ opacity: 0, transform: "translateX(-16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span
                        className="text-primary font-bold text-xs"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {pillar.num}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-foreground mb-1.5"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {data.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {data.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
