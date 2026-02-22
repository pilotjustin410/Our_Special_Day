import { Heart } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 bg-card border-t border-lavender/10">
      <div className="container mx-auto px-4 text-center">
        {/* Names */}
        <h3 className="font-script text-4xl text-gradient-purple mb-4">
          Simon & Shibiny
        </h3>

        {/* Date */}
        <p className="text-muted-foreground font-sans text-sm mb-6">
          April 23, 2026 • St Thomas Marthoma Church, Pallipad
        </p>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-lavender/40" />
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-lavender/40" />
        </div>

        {/* Bible Quote */}
        <p className="text-muted-foreground font-serif italic text-sm max-w-md mx-auto">
          "And now these three remain: faith, hope and love. But the greatest of these is love."
        </p>
        <p className="text-primary/70 text-xs mt-2 font-sans">
          — 1 Corinthians 13:13
        </p>

        {/* Sharing happiness */}
        <p className="text-muted-foreground/60 text-xs mt-8 font-script text-lg">
          Sharing happiness
        </p>
        <p className="text-foreground font-sans text-sm mt-1">
          Justin James
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;