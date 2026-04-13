/* =============================================================
   DESIGN: Dark Editorial — About Section
   Asymmetric layout: large section number, two-column content
   ============================================================= */

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "10+", labelPl: "lat doświadczenia", labelEn: "years of experience" },
    { value: "500+", labelPl: "godzin lekcji", labelEn: "hours of lessons" },
    { value: "3", labelPl: "projekty w budowie", labelEn: "projects in progress" },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        {/* Section number background */}
        <span className="section-number select-none">01</span>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className="text-xs tracking-[0.3em] uppercase text-primary"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {t("O mnie", "About me")}
          </span>
          <div className="flex-1 separator-gradient" />
        </div>

        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-start transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left: heading */}
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {lang === "pl" ? (
                <>Lektor.<br />Twórca.<br /><span className="text-primary">Ocalały.</span></>
              ) : (
                <>Tutor.<br />Builder.<br /><span className="text-primary">Survivor.</span></>
              )}
            </h2>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {stats.map((stat) => (
                <div key={stat.value} className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-primary"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t(stat.labelPl, stat.labelEn)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div className="space-y-5 text-muted-foreground leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <p className="text-foreground/90">
              {t(
                "Mam 37 lat i 10 lat doświadczenia jako lektor języka angielskiego. Pracowałem z setkami kursantów — od uczniów szkół średnich po menedżerów i specjalistów IT.",
                "I'm 37 years old with 10 years of experience as an English language tutor. I've worked with hundreds of students — from high school pupils to managers and IT professionals."
              )}
            </p>
            <p>
              {t(
                "Dziś łączę nauczanie z technologią. Buduję aplikację EdTech, która łączy naukę angielskiego z odpornością psychiczną — narzędzie stworzone z myślą o osobach z ADHD i tych, którzy szukają struktury w chaosie.",
                "Today I combine teaching with technology. I'm building an EdTech app that merges English learning with mental resilience — a tool designed for people with ADHD and those who seek structure in chaos."
              )}
            </p>
            <p>
              {t(
                "Jestem minimalistą i esencjalistą. Wstaje o 4:30, pracuję w blokach, buduję systemy. Nie romantyzuję walki — po prostu działam.",
                "I'm a minimalist and essentialist. I wake up at 4:30, work in blocks, build systems. I don't romanticize the struggle — I just act."
              )}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Python", "React", "AI Tools", "SQL", "Supabase", "EdTech", "ADHD-friendly design"].map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
              {["English C2", "Teaching", "Curriculum Design"].map((tag) => (
                <span key={tag} className="lang-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
