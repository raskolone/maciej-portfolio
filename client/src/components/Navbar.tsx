/* =============================================================
   DESIGN: Dark Editorial — Navbar
   Sticky top nav, minimal, with language toggle PL|EN
   ============================================================= */

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { href: "#about", pl: "O mnie", en: "About" },
  { href: "#skills", pl: "Umiejętności", en: "Skills" },
  { href: "#projects", pl: "Projekty", en: "Projects" },
  { href: "#contact", pl: "Kontakt", en: "Contact" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-serif text-xl font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          MK<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {lang === "pl" ? link.pl : link.en}
            </button>
          ))}
        </div>

        {/* Right side: language toggle + mobile menu */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-mono border border-border rounded px-2 py-1 hover:border-primary/50 transition-colors"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <span className={lang === "pl" ? "text-primary font-semibold" : "text-muted-foreground"}>PL</span>
            <span className="text-muted-foreground/40">|</span>
            <span className={lang === "en" ? "text-primary font-semibold" : "text-muted-foreground"}>EN</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-5 bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {lang === "pl" ? link.pl : link.en}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
