/* =============================================================
   DESIGN: Warm Ink & Paper — Home Page
   Assembles all sections in order
   ============================================================= */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import MethodSection from "@/components/sections/MethodSection";
import AboutSection from "@/components/sections/AboutSection";
import MyStorySection from "@/components/sections/MyStorySection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import JengaSection from "@/components/JengaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <JengaSection id="for-whom">
          <ForWhomSection />
        </JengaSection>
        <JengaSection id="method">
          <MethodSection />
        </JengaSection>
        <JengaSection id="about">
          <AboutSection />
        </JengaSection>
        <JengaSection id="story">
          <MyStorySection />
        </JengaSection>
        <JengaSection id="pricing">
          <PricingSection />
        </JengaSection>
        <JengaSection id="faq">
          <FAQSection />
        </JengaSection>
        <JengaSection id="contact">
          <ContactSection />
        </JengaSection>
      </main>
      <Footer />
    </div>
  );
}
