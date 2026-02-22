import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const OurStorySection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="our-story" ref={ref} className="py-20 md:py-32 bg-transparent">
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="font-script text-5xl md:text-6xl text-gradient-purple mb-4">
            Our Beginning
          </h2>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-lavender/50" />
            <span className="text-primary">❧</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-lavender/50" />
          </div>

          {/* Story Content */}
          <div className="space-y-8 font-sans text-muted-foreground leading-relaxed">
            <p className="text-lg">
              With hearts filled with gratitude to God, we invite you to celebrate the union of
              two souls who have found love, faith, and hope in each other. Our journey together
              has been blessed with countless precious moments and beautiful memories.
            </p>

            <div className="py-6">
              <div className="inline-block px-8 py-4 bg-background rounded-lg border border-lavender/20 shadow-sm">
                <p className="font-serif italic text-foreground text-xl">
                  "Two are better than one, because they have a good return for their labor."
                </p>
                <p className="text-sm text-muted-foreground mt-2">— Ecclesiastes 4:9</p>
              </div>
            </div>

            <p className="text-lg">
              As we embark on this new chapter of our lives, we are grateful for the love and
              support of our families and friends who have been with us every step of the way.
            </p>

            <p className="text-lg">
              We invite you to join us as we celebrate our love and commitment to each other,
              blessed by God's grace and surrounded by those we cherish most.
            </p>
          </div>

          {/* Timeline - Centered for 2 items */}
          <div className="mt-16 flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { date: "When We Met", title: "First Hello", icon: "☕" },
              { date: "April 2026", title: "The Wedding", icon: "⛪" },
            ].map((item, index) => (
              <div key={index} className="relative w-32 md:w-40">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lavender-light flex items-center justify-center text-2xl shadow-md border border-lavender/10">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
                {index === 0 && (
                  <div className="hidden md:block absolute top-8 left-[70%] w-[100%] h-px bg-gradient-to-r from-lavender/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;