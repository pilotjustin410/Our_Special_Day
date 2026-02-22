import Navigation from "@/components/wedding/Navigation";
import HeroSection from "@/components/wedding/HeroSection";
import OurStorySection from "@/components/wedding/OurStorySection";
import EventDetailsSection from "@/components/wedding/EventDetailsSection";
import GallerySection from "@/components/wedding/GallerySection";
import SaveCalendarSection from "@/components/wedding/SaveCalendarSection";
import FooterSection from "@/components/wedding/FooterSection";
import InteractiveBackground from "@/components/wedding/InteractiveBackground";
import Love3D from "@/components/wedding/Love3D";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <div className="relative">
          {/* Unified Background Layer - Lavender Mist Tint */}
          <div className="absolute inset-0 bg-lavender-light/20 backdrop-blur-[4px] rounded-t-[60px] shadow-[0_-30px_60px_-15px_rgba(139,92,246,0.1)] border-t border-white/60 pointer-events-none" />

          <div className="relative z-10">
            <OurStorySection />
            <EventDetailsSection />
            <GallerySection />
            <SaveCalendarSection />
            <Love3D />
          </div>
        </div>
        <FooterSection />
      </div>
    </main>
  );
};

export default Index;
