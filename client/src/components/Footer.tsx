/* =============================================================
   DESIGN: Dark Editorial — Footer
   Minimal, with gradient separator and copyright
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-10 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          © 2025 Maciej Kowalski. {t("Wszelkie prawa zastrzeżone.", "All rights reserved.")}
        </p>
        <p
          className="text-xs text-muted-foreground/50"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {t("Zbudowane z React + AI", "Built with React + AI")}
          <span className="text-primary ml-1">♦</span>
        </p>
      </div>
    </footer>
  );
}
