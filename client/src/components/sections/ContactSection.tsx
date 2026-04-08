/* =============================================================
   DESIGN: Dark Editorial — Contact Section
   Clean contact with social links and simple form placeholder
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "maciej@example.com",
    href: "mailto:maciej@example.com",
    color: "text-primary",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/maciej",
    href: "https://linkedin.com",
    color: "text-primary",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/maciej",
    href: "https://github.com",
    color: "text-primary",
  },
];

export default function ContactSection() {
  const { lang, t } = useLanguage();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(t("Formularz kontaktowy będzie dostępny wkrótce.", "Contact form coming soon."));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Section number background */}
        <span className="section-number">04</span>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {t("Kontakt", "Contact")}
          </span>
          <div className="flex-1 separator-gradient" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: heading + links */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-foreground mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("Porozmawiajmy", "Let's talk")}
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {t(
                "Szukasz lektora angielskiego? Chcesz porozmawiać o współpracy przy projekcie EdTech lub AI? Napisz do mnie.",
                "Looking for an English tutor? Want to discuss collaboration on an EdTech or AI project? Reach out."
              )}
            </p>

            {/* Contact links */}
            <div className="space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                      <Icon size={16} className={`${link.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Fira Code', monospace" }}>
                        {link.label}
                      </p>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {link.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Availability */}
            <div className="mt-10 flex items-center gap-3 p-4 rounded border border-primary/20 bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm text-foreground/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t(
                  "Dostępny do nowych projektów i kursantów",
                  "Available for new projects and students"
                )}
              </p>
            </div>
          </div>

          {/* Right: simple form */}
          <div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'Fira Code', monospace" }}>
                  {t("Imię", "Name")}
                </label>
                <input
                  type="text"
                  placeholder={t("Twoje imię", "Your name")}
                  className="w-full px-4 py-3 rounded bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'Fira Code', monospace" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder={t("twoj@email.com", "your@email.com")}
                  className="w-full px-4 py-3 rounded bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'Fira Code', monospace" }}>
                  {t("Wiadomość", "Message")}
                </label>
                <textarea
                  rows={5}
                  placeholder={t("W czym mogę pomóc?", "How can I help you?")}
                  className="w-full px-4 py-3 rounded bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all glow-green"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle size={16} />
                  {t("Wyślij wiadomość", "Send message")}
                </span>
              </button>
              <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t("Formularz wkrótce aktywny — na razie napisz bezpośrednio na email.", "Form coming soon — for now, write directly to email.")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
