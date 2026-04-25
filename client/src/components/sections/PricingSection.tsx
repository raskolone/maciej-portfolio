/* =============================================================
   DESIGN: Warm Ink & Paper — Pricing Section
   Clean pricing table with 5 options
   ============================================================= */

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const pricingItems = [
  {
    pl: { name: "Lekcja indywidualna online", duration: "60 min", price: "90 zł", note: "Najczęściej wybierana" },
    en: { name: "Individual lesson online", duration: "60 min", price: "PLN 90", note: "Most popular" },
    highlight: true,
  },
  {
    pl: { name: "Lekcja stacjonarna", duration: "60 min", price: "100 zł", note: "Bielsko-Biała i okolice" },
    en: { name: "In-person lesson", duration: "60 min", price: "PLN 100", note: "Bielsko-Biała area" },
    highlight: false,
  },
  {
    pl: { name: "Pakiet 4 lekcji online", duration: "4 × 60 min", price: "340 zł", note: "Oszczędzasz 20 zł" },
    en: { name: "4-lesson online package", duration: "4 × 60 min", price: "PLN 340", note: "Save PLN 20" },
    highlight: false,
  },
  {
    pl: { name: "Business English / specjalistyczne", duration: "60 min", price: "od 120 zł", note: "Firmy, negocjacje, prezentacje" },
    en: { name: "Business English / specialist", duration: "60 min", price: "from PLN 120", note: "Companies, negotiations, presentations" },
    highlight: false,
  },
  {
    pl: { name: "Dojazd lub zajęcia niestandardowe", duration: "wycena", price: "indywidualnie", note: "Katowice i woj. śląskie" },
    en: { name: "Travel or non-standard lessons", duration: "quote", price: "individual", note: "Katowice & Silesia region" },
    highlight: false,
  },
];

const notes = [
  { pl: "Materiały dydaktyczne w cenie", en: "Teaching materials included" },
  { pl: "Zajęcia online i stacjonarnie", en: "Online and in-person available" },
  { pl: "Terminy ustalane indywidualnie", en: "Schedule arranged individually" },
];

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-price").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
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
    <section id="pricing" ref={sectionRef} className="py-24 bg-card/30">
      <div className="container">
        <div className="relative mb-14">
          <span className="deco-number">05</span>
          <p className="section-label mb-3">{t("Cennik", "Pricing")}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Przejrzyste ceny, bez ukrytych opłat", "Transparent pricing, no hidden fees")}
          </h2>
          <div className="rule-ink mt-6 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Pricing table */}
          <div className="lg:col-span-2 space-y-3">
            {pricingItems.map((item, i) => {
              const data = lang === "pl" ? item.pl : item.en;
              return (
                <div
                  key={i}
                  className={`reveal-price flex items-center justify-between p-5 rounded-md border transition-all ${
                    item.highlight
                      ? "border-primary/40 bg-primary/8 shadow-sm"
                      : "border-border/60 bg-card card-glow"
                  }`}
                  style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {data.name}
                      </h3>
                      {item.highlight && (
                        <span className="tag-green text-xs">{t("Popularne", "Popular")}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{data.note}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {data.price}
                    </p>
                    <p className="text-xs text-muted-foreground">{data.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side notes + CTA */}
          <div
            className="reveal-price"
            style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
          >
            <div className="bg-card rounded-sm p-6 border border-border/60">
              <h3
                className="text-base font-bold text-foreground mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Co zawiera cena?", "What's included?")}
              </h3>
              <ul className="space-y-3 mb-6">
                {notes.map((note) => (
                  <li key={note.pl} className="flex items-start gap-2.5">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(note.pl, note.en)}</span>
                  </li>
                ))}
              </ul>
              <div className="rule-ink mb-6" />
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {t(
                  "Pierwsza konsultacja (30 min) jest bezpłatna — poznajemy się, ustalamy cele i plan nauki.",
                  "The first consultation (30 min) is free — we get to know each other, set goals, and plan the learning path."
                )}
              </p>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary w-full justify-center text-sm"
              >
                {t("Umów bezpłatną konsultację", "Book a free consultation")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
