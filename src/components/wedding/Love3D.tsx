import { useRef, useEffect, useCallback, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Love3D = () => {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const animFrameRef = useRef<number>(0);

  const heartShape = useCallback((t: number): [number, number] => {
    // Standard heart equation
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [x, y];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      z: number;
      targetX: number;
      targetY: number;
      targetZ: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      baseColor: string;
      hue: number;
    }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      generateParticles(rect.width, rect.height);
    };

    const generateParticles = (w: number, h: number) => {
      particles = [];
      const scale = Math.min(w, h) * 0.025;
      const count = 400; // Reduced from 600

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const [hx, hy] = heartShape(t);
        const depth = (Math.random() - 0.5) * 40;

        // Randomize the color slightly around lavender/purple
        const hue = 270 + (Math.random() - 0.5) * 40;
        const p = {
          x: (Math.random() - 0.5) * w,
          y: (Math.random() - 0.5) * h,
          z: (Math.random() - 0.5) * 200,
          targetX: hx * scale,
          targetY: hy * scale,
          targetZ: depth,
          vx: 0,
          vy: 0,
          vz: 0,
          size: Math.random() * 2 + 1,
          hue: hue,
          baseColor: `hsla(${hue}, 60%, 65%, `,
          color: "",
        };
        particles.push(p);
      }

      // Add interior particles
      const interiorCount = 150; // Reduced from 300
      for (let i = 0; i < interiorCount; i++) {
        const t = Math.random() * Math.PI * 2;
        const [hx, hy] = heartShape(t);
        const r = Math.random();
        const depth = (Math.random() - 0.5) * 30;
        const hue = 280 + (Math.random() - 0.5) * 30;

        particles.push({
          x: (Math.random() - 0.5) * w,
          y: (Math.random() - 0.5) * h,
          z: (Math.random() - 0.5) * 200,
          targetX: hx * scale * r,
          targetY: hy * scale * r,
          targetZ: depth,
          vx: 0,
          vy: 0,
          vz: 0,
          size: Math.random() * 1.5 + 0.5,
          hue: hue,
          baseColor: `hsla(${hue}, 50%, 60%, `,
          color: "",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        active: true
      };
    };

    const animate = () => {
      if (!isVisible && animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);

      const rotY = mouseRef.current.active ? mouseRef.current.x * 0.5 : Math.sin(Date.now() * 0.001) * 0.2;
      const rotX = mouseRef.current.active ? -mouseRef.current.y * 0.5 : Math.cos(Date.now() * 0.001) * 0.1;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const focalLength = 400;
      const cx = w / 2;
      const cy = h / 2;

      const projected = particles.map(p => {
        // Simple spring physics
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dz = p.targetZ - p.z;

        p.vx += dx * 0.02;
        p.vy += dy * 0.02;
        p.vz += dz * 0.02;

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.vz *= 0.92;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Interaction with mouse
        if (mouseRef.current.active) {
          const mx = mouseRef.current.x * w / 2;
          const my = mouseRef.current.y * h / 2;
          const dist = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
          if (dist < 50) {
            const force = (50 - dist) * 0.5;
            const angle = Math.atan2(p.y - my, p.x - mx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Apply 3D Rotation
        const rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz * sinX;
        rz = p.y * sinX + rz * cosX;

        const scale = focalLength / (focalLength + rz);
        const px = cx + rx * scale;
        const py = cy + ry * scale;
        const pSize = p.size * scale;
        const alpha = Math.max(0.1, Math.min(1, scale));

        return { px, py, pSize, alpha, rz, baseColor: p.baseColor };
      });

      // Z-sorting removed for per-frame performance gain
      // projected.sort((a, b) => b.rz - a.rz);

      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.pSize, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor + p.alpha + ")";
        ctx.fill();

        if (p.pSize > 1.5) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.pSize * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor + (p.alpha * 0.2) + ")";
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave, { passive: true });
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [heartShape, isVisible]);

  return (
    <section ref={revealRef} className="py-24 bg-transparent relative overflow-hidden flex flex-col items-center">
      <div className={`container mx-auto px-4 text-center z-10 pointer-events-none transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-script text-4xl md:text-5xl text-gradient-purple mb-4">
          Infinite Love
        </h2>
        <p className="text-muted-foreground font-sans text-xs tracking-widest uppercase mb-12">
          Interacting with the heart of our story
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-none touch-pan-y"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 bg-lavender/5 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

    </section>
  );
};

export default Love3D;
