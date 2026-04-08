# Koncepcje designu — Portfolio Macieja

## Kontekst
- Minimalistyczny, spójny z aplikacją SelaVie (ADHD-friendly)
- Dwujęzyczny PL/EN
- Trzy filary: lektor angielskiego, IT/AI, twórca aplikacji EdTech
- Struś pędziwiatr jako placeholder zdjęcia profilowego

---

<response>
<probability>0.07</probability>
<idea>

**Design Movement:** Brutalist Minimalism meets Japanese Wabi-Sabi

**Core Principles:**
- Asymetryczny układ z celowym "niedokończeniem" — każda sekcja ma własny rytm
- Typografia jako główny element wizualny (duże, odważne nagłówki)
- Surowa siatka z widocznymi podziałami — linie jako dekoracja
- Treść ponad ozdobą — zero zbędnych elementów

**Color Philosophy:**
- Tło: ciepła biel (oklch 0.97 0.008 85) — papierowa, nie sterylna
- Tekst główny: prawie-czarny (oklch 0.15 0.01 65)
- Akcent: głęboka zieleń szałwiowa (oklch 0.45 0.08 155) — spokój, natura
- Drugi akcent: wyblakły amber (oklch 0.75 0.12 75) — ciepło, energia

**Layout Paradigm:**
- Układ oparty na kolumnach z różną szerokością (1:2:1)
- Hero: imię po lewej, duże, tekst po prawej mały
- Sekcje przesunięte względem siebie — brak symetrii
- Nawigacja: pionowa po lewej stronie (sticky)

**Signature Elements:**
- Cienkie poziome linie oddzielające sekcje
- Liczby sekcji jako duże, wyblakłe tło-cyfry (01, 02, 03...)
- Monospace font dla tagów technologicznych

**Interaction Philosophy:**
- Hover: subtelne podkreślenie, nie kolor
- Scroll: sekcje wchodzą z fade-in z lewej strony
- Przełącznik języka: prosty toggle PL|EN

**Animation:**
- Wejście nagłówków: litery pojawiają się od lewej, 0.3s
- Karty projektów: lekkie uniesienie (translateY -4px) na hover
- Brak parallax, brak agresywnych animacji

**Typography System:**
- Nagłówki: Playfair Display (serif, elegancki, poważny)
- Treść: DM Sans (czytelny, nowoczesny, nie Inter)
- Kod/tagi: JetBrains Mono
- Hierarchia: H1 5rem, H2 2.5rem, body 1rem/1.6

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

**Design Movement:** Swiss International Style — Grid-based Precision

**Core Principles:**
- Matematyczna siatka — wszystko wyrównane do modularnej siatki 8px
- Kontrast jako jedyne narzędzie hierarchii
- Typografia funkcjonalna — każde słowo ma swoje miejsce
- Kolor używany oszczędnie — jeden akcent, reszta czarno-biała

**Color Philosophy:**
- Tło: czysta biel (oklch 1 0 0)
- Tekst: głęboka czerń (oklch 0.1 0 0)
- Akcent: intensywna czerwień (oklch 0.55 0.22 25) — jak w klasycznych plakatach szwajcarskich
- Szarości: tylko dwa odcienie (oklch 0.85 i oklch 0.6)

**Layout Paradigm:**
- Ścisła siatka 12-kolumnowa
- Hero: pełna szerokość, imię i nazwisko w ogromnym foncie
- Sekcje: naprzemiennie pełna szerokość i 8 kolumn
- Nawigacja: pozioma, sticky, z numerami sekcji

**Signature Elements:**
- Grube poziome linie (4px) w kolorze akcentu
- Numery stron/sekcji w prawym górnym rogu
- Tabele jako elementy designu (nie tylko dane)

**Interaction Philosophy:**
- Hover: kolor tła zmienia się na akcent, tekst na biały
- Kliknięcia: natychmiastowe, bez animacji opóźniających
- Scroll: płynny, bez efektów

**Animation:**
- Minimalne — tylko fade-in 0.2s dla nowych sekcji
- Brak parallax, brak slide-in
- Hover transitions: 0.15s linear

**Typography System:**
- Nagłówki: Space Grotesk Bold (geometryczny, precyzyjny)
- Treść: Space Grotesk Regular
- Akcenty: Space Mono (monospace)
- Hierarchia: H1 6rem uppercase, H2 2rem, body 0.95rem

</idea>
</response>

<response>
<probability>0.08</probability>
<idea>

**Design Movement:** Dark Editorial — Magazyn technologiczny nocny

**Core Principles:**
- Ciemne tło jako baza — spokój, skupienie, ADHD-friendly
- Kontrast świetlny zamiast kolorowego — elementy "świecą" na ciemnym tle
- Typografia mieszana: serif dla emocji, sans-serif dla danych
- Sekcje jak strony magazynu — każda ma własny "nastrój"

**Color Philosophy:**
- Tło: głęboka granatowo-szarość (oklch 0.14 0.015 255) — jak nocne niebo
- Tekst główny: ciepła biel (oklch 0.92 0.005 85)
- Akcent 1: elektryczna zieleń (oklch 0.72 0.18 145) — technologia, życie
- Akcent 2: złoty amber (oklch 0.78 0.14 75) — ciepło, ludzki wymiar
- Muted: ciemna szarość (oklch 0.28 0.008 255)

**Layout Paradigm:**
- Układ asymetryczny: lewa kolumna wąska (nawigacja/meta), prawa szeroka (treść)
- Hero: pełna wysokość ekranu, imię na środku z subtelnym glow
- Sekcje: naprzemiennie pełna szerokość i z marginesem
- Sticky sidebar z postępem czytania

**Signature Elements:**
- Subtelny gradient tła (od ciemniejszego do nieco jaśniejszego)
- Karty z border glow w kolorze akcentu
- Separator: cienka linia z gradientem (przezroczysta → akcent → przezroczysta)

**Interaction Philosophy:**
- Hover: elementy "rozświetlają się" — zwiększa się opacity i pojawia glow
- Scroll: sekcje wchodzą z subtelnymi animacjami
- Przełącznik języka: elegancki slide toggle

**Animation:**
- Hero: imię pojawia się litera po literze (typewriter effect)
- Sekcje: fade-in + translateY(20px) → translateY(0), 0.5s ease-out
- Karty: border-color transition na hover, 0.3s

**Typography System:**
- Nagłówki: Cormorant Garamond (serif, elegancki, literacki)
- Treść: Outfit (nowoczesny sans-serif, czytelny)
- Kod/tagi: Fira Code
- Hierarchia: H1 4.5rem, H2 2.2rem, body 1rem/1.7

</idea>
</response>

---

## Wybrana koncepcja: Dark Editorial

Ciemne tło jest spójne z aplikacjami ADHD-friendly (mniej bodźców wizualnych).
Elektryczna zieleń jako akcent technologiczny + złoty amber dla ludzkiego wymiaru lektora.
Serif + sans-serif tworzy napięcie między "człowiekiem" a "technologią".
