import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SaveCalendarSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const handleSaveCalendar = () => {
    const event = {
      title: "Simon & Shibiny's Wedding",
      description:
        "Wedding Ceremony at St Thomas Marthoma Church, Pallipad, Haripad, Kerala. Join us as we celebrate our union blessed by God's love.",
      location: "St Thomas Marthoma Church, Pallipad, Haripad, Kerala",
      startDate: "20260423T060000Z", // 11:30 AM IST = 6:00 AM UTC
      endDate: "20260423T103000Z",   // ~4:00 PM IST
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Simon & Shibiny Wedding//EN",
      "BEGIN:VEVENT",
      `DTSTART:${event.startDate}`,
      `DTEND:${event.endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simon-shibiny-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoogleCalendar = () => {
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", "Simon & Shibiny's Wedding");
    url.searchParams.set("dates", "20260423T060000Z/20260423T103000Z");
    url.searchParams.set("details", "Wedding Ceremony at St Thomas Marthoma Church, Pallipad, Haripad, Kerala.");
    url.searchParams.set("location", "St Thomas Marthoma Church, Pallipad, Haripad, Kerala");
    window.open(url.toString(), "_blank");
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-transparent">
      <div className={`container mx-auto px-4 text-center transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-script text-4xl md:text-5xl text-gradient-purple mb-3">
          Save the Date
        </h2>
        <p className="text-muted-foreground font-serif italic text-sm mb-2">
          April 23, 2026 — 11:30 AM
        </p>
        <p className="text-muted-foreground font-sans text-xs mb-8">
          St Thomas Marthoma Church, Pallipad, Kerala
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleSaveCalendar}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans gap-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CalendarPlus className="w-5 h-5" />
            Add to Calendar (.ics)
          </Button>
          <Button
            onClick={handleGoogleCalendar}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 font-sans gap-2 px-6 py-3 rounded-full transition-all duration-300"
          >
            <CalendarPlus className="w-5 h-5" />
            Google Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SaveCalendarSection;
