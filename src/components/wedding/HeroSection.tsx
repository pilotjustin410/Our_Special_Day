import { useEffect, useState, useRef } from "react";

const weddingDate = new Date("2026-04-23T11:30:00");

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [scrollYLocal, setScrollYLocal] = useState(0); // Keeping limited state for scroll indicator opacity
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      setScrollYLocal(scrollValue);
      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--scroll-y", `${scrollValue}px`);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating decorative lavender elements with Parallax */}
      <div
        className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 opacity-30 animate-float"
        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * 0.2))` }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-lavender drop-shadow-lg">
          <path
            fill="currentColor"
            d="M100,10 C120,30 150,20 170,50 C190,80 180,120 160,150 C140,180 100,190 60,170 C20,150 10,100 30,60 C50,20 80,-10 100,10"
          />
        </svg>
      </div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 md:w-72 md:h-72 opacity-25 animate-float animation-delay-400"
        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * -0.1))` }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary drop-shadow-lg">
          <path
            fill="currentColor"
            d="M100,10 C120,30 150,20 170,50 C190,80 180,120 160,150 C140,180 100,190 60,170 C20,150 10,100 30,60 C50,20 80,-10 100,10"
          />
        </svg>
      </div>
      <div
        className="absolute top-1/4 right-1/4 w-20 h-20 md:w-32 md:h-32 opacity-20 animate-pulse"
        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * 0.3))` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-lavender-dark">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>
      <div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 md:w-24 md:h-24 opacity-15 animate-float animation-delay-600"
        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * -0.2))` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-olive">
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Bible Quote */}
        <p className="text-muted-foreground font-serif italic text-sm md:text-base tracking-wide mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          "Therefore what God has joined together, let no one separate"
        </p>
        <p className="text-muted-foreground font-sans text-xs tracking-[0.2em] uppercase mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          — Mark 10:9
        </p>

        {/* Couple Names with parallax */}
        <div style={{ transform: `translateY(calc(var(--scroll-y, 0px) * 0.1))` }}>
          <h1 className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-gradient-purple mb-4 md:mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Simon James
          </h1>
          <p className="font-script text-2xl md:text-4xl text-primary mb-1 md:mb-2 animate-fade-up opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            &
          </p>
          <h1 className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-gradient-purple mb-6 md:mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            Shibiny Kurian
          </h1>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-lavender" />
          <span className="text-primary text-2xl">✝</span>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-lavender" />
        </div>

        {/* Date & Venue */}
        <p className="font-serif text-xl md:text-2xl text-foreground mb-2 animate-fade-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          Thursday, April 23rd, 2026
        </p>
        <p className="text-muted-foreground font-sans text-base md:text-lg mb-2 animate-fade-up opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
          at 11:30 AM
        </p>
        <p className="text-primary font-serif text-base md:text-lg mb-12 animate-fade-up opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          St Thomas Marthoma Church, Pallipad
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8 animate-fade-up opacity-0" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-lg bg-card border border-lavender/30 flex items-center justify-center shadow-lg">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground mt-2 font-sans tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollYLocal / 100),
          transform: `translate(-50%, calc(var(--scroll-y, 0px) * 0.1))`
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-lavender/60 font-sans">
          Scroll
        </span>
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-lavender/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;