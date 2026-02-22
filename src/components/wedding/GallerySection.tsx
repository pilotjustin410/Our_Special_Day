import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GallerySection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
      alt: "Couple portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
      alt: "Engagement moment",
    },
    {
      src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop",
      alt: "Romantic sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
      alt: "Wedding venue",
    },
  ];

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-32 bg-transparent">
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* Gallery Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-purple-deep/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-background text-4xl hover:text-lavender transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={images[selectedImage].src.replace("w=600", "w=1200")}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;