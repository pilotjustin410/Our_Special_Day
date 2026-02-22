import { MapPin, Clock, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const EventDetailsSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const events = [
    {
      title: "The Wedding Ceremony",
      time: "11:30 AM",
      venue: "St Thomas Marthoma Church",
      address: "Pallipad, Haripad, Kerala",
      description: "Join us as we exchange our vows in a sacred ceremony blessed by God's love.",
      icon: "⛪",
    },
  ];

  return (
    <section id="event-details" ref={ref} className="py-20 md:py-32 bg-transparent">
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-gradient-purple mb-4">
            Celebration Details
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-lavender/50" />
            <Calendar className="w-5 h-5 text-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-lavender/50" />
          </div>
        </div>

        {/* Family Details */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom's Family */}
            <div className="relative group bg-gradient-to-br from-lavender-light/50 to-white/40 backdrop-blur-md rounded-2xl p-8 border border-lavender/20 shadow-lg shadow-lavender/5 overflow-hidden transition-all duration-500 hover:shadow-lavender/10 hover:-translate-y-1">
              {/* Floral Watermark */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 text-lavender/10 pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0">
                <svg viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100,20 C120,40 160,30 180,60 C200,90 190,130 160,160 C130,190 70,190 40,160 C10,130 0,90 20,60 C40,30 80,0 100,20" />
                </svg>
              </div>

              <h4 className="font-serif text-xl text-foreground mb-4 relative z-10">Groom's Family</h4>
              <div className="space-y-2 relative z-10">
                <p className="text-foreground/80 font-sans text-base font-medium">
                  Mr. James Oomen and Mrs. Shiny James
                </p>
                <div className="h-px w-12 bg-lavender/30 mx-auto my-3" />
                <p className="text-muted-foreground font-sans text-sm">
                  Kalakattu Bethal, Pallipad, Haripad
                </p>
              </div>
            </div>

            {/* Bride's Family */}
            <div className="relative group bg-gradient-to-br from-lavender-light/50 to-white/40 backdrop-blur-md rounded-2xl p-8 border border-lavender/20 shadow-lg shadow-lavender/5 overflow-hidden transition-all duration-500 hover:shadow-lavender/10 hover:-translate-y-1">
              {/* Floral Watermark */}
              <div className="absolute -left-8 -bottom-8 w-32 h-32 text-lavender/10 pointer-events-none transform -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0">
                <svg viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100,20 C120,40 160,30 180,60 C200,90 190,130 160,160 C130,190 70,190 40,160 C10,130 0,90 20,60 C40,30 80,0 100,20" />
                </svg>
              </div>

              <h4 className="font-serif text-xl text-foreground mb-4 relative z-10">Bride's Family</h4>
              <div className="space-y-2 relative z-10">
                <p className="text-foreground/80 font-sans text-base font-medium">
                  Mr. Kurian K.E and Mrs. Teny Kurian
                </p>
                <div className="h-px w-12 bg-lavender/30 mx-auto my-3" />
                <p className="text-muted-foreground font-sans text-sm">
                  Kripa Bhavan, Umbernadu, Mavelikara
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-4xl mx-auto flex justify-center">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative group w-full bg-gradient-to-br from-lavender-light/50 to-white/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-lavender/20 shadow-lg shadow-lavender/5 overflow-hidden transition-all duration-500 hover:shadow-lavender/10 hover:-translate-y-1"
            >
              {/* Floral Watermarks for Event Card */}
              <div className="absolute -left-12 -top-12 w-48 h-48 text-lavender/5 pointer-events-none transform -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0">
                <svg viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100,20 C120,40 160,30 180,60 C200,90 190,130 160,160 C130,190 70,190 40,160 C10,130 0,90 20,60 C40,30 80,0 100,20" />
                </svg>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 text-lavender/5 pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0">
                <svg viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100,20 C120,40 160,30 180,60 C200,90 190,130 160,160 C130,190 70,190 40,160 C10,130 0,90 20,60 C40,30 80,0 100,20" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                {/* Event Icon */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/60 flex items-center justify-center text-5xl shadow-sm border border-lavender/10">
                  {event.icon}
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-3 text-lg text-primary font-medium">
                    <Clock className="w-5 h-5" />
                    <span className="font-sans">{event.time}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3 text-xl text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-serif font-semibold">{event.venue}</span>
                    </div>
                    <p className="text-base text-muted-foreground font-sans">
                      {event.address}
                    </p>
                  </div>

                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-lavender/40 to-transparent mx-auto py-4" />

                  <p className="text-muted-foreground font-sans text-base leading-relaxed italic">
                    {event.description}
                  </p>

                  {/* Map Link */}
                  <div className="pt-6">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + ", " + event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 hover:bg-lavender-light/80 text-primary rounded-full font-sans text-sm font-semibold transition-all duration-300 border border-lavender/20 shadow-sm hover:shadow-md"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventDetailsSection;