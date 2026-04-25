/* =============================================================
   DESIGN: Dark Constellation — Navbar
   Transparent on top, blurs on scroll
   Logo: MW. | Nav links | PL/EN toggle | Theme toggle | CTA
   ============================================================= */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about",    pl: "O mnie",   en: "About" },
  { href: "#for-whom", pl: "Dla kogo", en: "For Whom" },
  { href: "#method",   pl: "Metoda",   en: "Method" },
  { href: "#pricing",  pl: "Cennik",   en: "Pricing" },
  { href: "#faq",      pl: "FAQ",      en: "FAQ" },
  { href: "#contact",  pl: "Kontakt",  en: "Contact" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = scrolled
    ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span
            className="text-foreground font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", letterSpacing: "-0.01em" }}
          >
            MW<span className="text-primary">.</span>
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-foreground/40 text-[9px] tracking-[0.2em] uppercase font-medium">by</span>
            <span className="text-primary text-[11px] tracking-[0.15em] uppercase font-bold">CribroEnglish</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
                {lang === "pl" ? link.pl : link.en}
              </button>
            </li>
          ))}
          <li>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
            >
              Developer
            </Link>
          </li>
          <li>
            <a
              href="https://vocabboost-ai-170162955981.us-west1.run.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wide px-3 py-1.5 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              {t("Panel kursanta", "Student Panel")}
            </a>
          </li>
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className={lang === "pl" ? "text-primary font-semibold" : ""}>PL</span>
            <span className="mx-1 opacity-30">|</span>
            <span className={lang === "en" ? "text-primary font-semibold" : ""}>EN</span>
          </button>

          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          <a
            href="https://calendly.com/maciej-wyrozumski/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2 px-4"
          >
            {t("Umów lekcję", "Book a lesson")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-5 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              {lang === "pl" ? link.pl : link.en}
            </button>
          ))}
          <Link
            href="/projects"
            onClick={() => setMenuOpen(false)}
            className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
          >
            Developer
          </Link>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleLang}
              className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className={lang === "pl" ? "text-primary" : ""}>PL</span>
              <span className="mx-1 opacity-30">|</span>
              <span className={lang === "en" ? "text-primary" : ""}>EN</span>
            </button>
            {toggleTheme && (
              <button onClick={toggleTheme} className="text-muted-foreground hover:text-primary transition-colors">
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
          </div>
          <a
            href="https://calendly.com/maciej-wyrozumski/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center mt-2"
          >
            {t("Umów lekcję", "Book a lesson")}
          </a>
        </div>
      )}
    </nav>
  );
}
