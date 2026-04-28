/* =============================================================
   DESIGN: Dark Constellation — Apps Page
   Podstrona /apps — lista aplikacji Macieja
   Zakładki: Cribro Journal (i kolejne w przyszłości)
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const apps = [
  {
    id: "cribro-journal",
    name: "Cribro Journal",
    tagPl: "Dziennik refleksji",
    tagEn: "Reflection Journal",
    descPl:
      "Aplikacja do codziennego pisania, refleksji i budowania nawyku myślenia. Zaprojektowana z myślą o prostocie — mniej szumu, więcej głębi.",
    descEn:
      "An app for daily writing, reflection, and building a thinking habit. Designed with simplicity in mind — less noise, more depth.",
    url: "https://journal.cribro.com",
    label: "journal.cribro.com",
    status: "live",
  },
];

export default function Apps() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="container">
          <p
            className="section-label mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {t("Moje aplikacje", "My Apps")}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Aplikacje", "Applications")}
          </h1>
          <p className="mt-4 text-muted-foreground text-base max-w-xl">
            {t(
              "Narzędzia, które buduję i których używam na co dzień. Każde z nich to odpowiedź na konkretny problem.",
              "Tools I build and use every day. Each one is an answer to a specific problem."
            )}
          </p>
        </div>
      </section>

      {/* Apps grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border hover:border-primary/50 transition-all duration-300 p-6"
                style={{
                  borderRadius: "2px",
                  background: "oklch(0.13 0.015 240 / 0.6)",
                }}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase text-primary/70"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {t(app.tagPl, app.tagEn)}
                  </span>
                  {app.status === "live" && (
                    <span className="flex items-center gap-1.5 text-[10px] text-primary/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      live
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2
                  className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {app.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {t(app.descPl, app.descEn)}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-xs text-primary/70 group-hover:text-primary transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                  <ExternalLink size={12} />
                  {app.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
