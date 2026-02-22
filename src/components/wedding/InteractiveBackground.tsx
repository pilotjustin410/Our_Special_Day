import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'sparkle' | 'confetti' | 'heart' | 'flower';
  rotation: number;
  rotationSpeed: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const burstParticlesRef = useRef<BurstParticle[]>([]);
  const animationRef = useRef<number>();

  const handleMove = useCallback((clientX: number, clientY: number) => {
    mousePosRef.current = { x: clientX, y: clientY };
  }, []);

  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const createBurst = useCallback((x: number, y: number) => {
    // Purple/lavender themed burst colors
    const burstColors = [
      "hsla(270, 50%, 70%, 1)",
      "hsla(270, 45%, 55%, 1)",
      "hsla(280, 40%, 75%, 1)",
      "hsla(260, 50%, 65%, 1)",
      "hsla(85, 30%, 50%, 1)",
      "hsla(270, 60%, 80%, 1)",
    ];

    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = 3 + Math.random() * 5;
      const types: Array<'sparkle' | 'confetti' | 'heart' | 'flower'> = ['sparkle', 'confetti', 'heart', 'flower'];
      const type = types[Math.floor(Math.random() * types.length)];

      burstParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: type === 'heart' || type === 'flower' ? 8 + Math.random() * 6 : 4 + Math.random() * 6,
        opacity: 1,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        life: 0,
        maxLife: 60 + Math.random() * 40,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      createBurst(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        createBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMove, createBurst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Purple/lavender themed particle colors
    const colors = [
      "hsla(270, 50%, 70%, 0.6)",
      "hsla(270, 45%, 55%, 0.5)",
      "hsla(85, 30%, 55%, 0.4)",
      "hsla(280, 40%, 80%, 0.5)",
      "hsla(260, 50%, 75%, 0.4)",
    ];

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 5 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawHeart = (x: number, y: number, size: number, color: string, rotation = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, size / 4);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size / 4);
      ctx.bezierCurveTo(-size / 2, size / 2, 0, size * 0.75, 0, size);
      ctx.bezierCurveTo(0, size * 0.75, size / 2, size / 2, size / 2, size / 4);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size / 4);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();
    };

    const drawFlower = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw 5 petals
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.5, size * 0.3, size * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // Draw center
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(45, 80%, 70%, 0.9)";
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();

      // 4-pointed star
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = Math.cos(angle) * size;
        const outerY = Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 4;
        const innerX = Math.cos(innerAngle) * size * 0.3;
        const innerY = Math.sin(innerAngle) * size * 0.3;

        if (i === 0) {
          ctx.moveTo(outerX, outerY);
        } else {
          ctx.lineTo(outerX, outerY);
        }
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    };

    const drawConfetti = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      ctx.fillRect(-size / 2, -size / 4, size, size / 2);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Simplified background to save massive CPU on every frame
      ctx.fillStyle = "hsla(60, 30%, 96%, 1)"; // Base ivory
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mouseX || mouseY) {
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, canvas.width * 0.8
        );
        gradient.addColorStop(0, "hsla(270, 40%, 92%, 0.3)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw particles with mouse interaction
      const time = Date.now() * 0.001; // Moved outside the loop
      particlesRef.current.forEach((particle, index) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distanceSq = dx * dx + dy * dy; // Use squared distance to avoid Math.sqrt
        const maxDistance = 200;
        const maxDistanceSq = maxDistance * maxDistance;

        if (distanceSq < maxDistanceSq && distanceSq > 0) {
          const distance = Math.sqrt(distanceSq); // Only calculate sqrt if within range
          const force = (maxDistance - distance) / maxDistance;

          if (distance < 80) {
            particle.x -= (dx / distance) * force * 4;
            particle.y -= (dy / distance) * force * 4;
          } else {
            particle.x += (dx / distance) * force * 0.5;
            particle.y += (dy / distance) * force * 0.5;
          }
        }

        particle.x += (particle.baseX - particle.x) * 0.01;
        particle.y += (particle.baseY - particle.y) * 0.01;

        // Use the pre-calculated time
        particle.x += particle.speedX + Math.sin(time + index) * 0.2;
        particle.y += particle.speedY + Math.cos(time + index) * 0.2;

        const currentY = particle.y + scrollYRef.current * 0.05;
        const drawY = ((currentY % canvas.height) + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, drawY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // O(N^2) connection loop DELETED for extreme performance
      });

      // Update and draw burst particles
      burstParticlesRef.current = burstParticlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.98; // friction
        p.rotation += p.rotationSpeed;
        p.opacity = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) return false;

        const colorWithOpacity = p.color.replace(/[\d.]+\)$/, `${p.opacity})`);

        switch (p.type) {
          case 'sparkle':
            drawSparkle(p.x, p.y, p.size, colorWithOpacity, p.rotation);
            break;
          case 'confetti':
            drawConfetti(p.x, p.y, p.size, colorWithOpacity, p.rotation);
            break;
          case 'heart':
            drawHeart(p.x, p.y, p.size, colorWithOpacity, p.rotation);
            break;
          case 'flower':
            drawFlower(p.x, p.y, p.size, colorWithOpacity, p.rotation);
            break;
        }

        return true;
      });

      // Draw floating lavender flowers that follow mouse loosely
      for (let i = 0; i < 6; i++) {
        const baseX = canvas.width * (0.1 + i * 0.15);
        const baseY = canvas.height * (0.2 + (i % 2) * 0.4);

        const targetX = baseX + (mouseX - baseX) * 0.1;
        const targetY = baseY + (mouseY - baseY) * 0.1;

        const x = targetX + Math.sin(time + i * 1.5) * 40;
        const y = targetY + Math.cos(time * 0.7 + i * 2) * 30;
        const size = 10 + Math.sin(time * 1.5 + i) * 4;

        drawFlower(x, y, size, `hsla(270, 50%, 70%, ${0.12 + Math.sin(time + i) * 0.08})`, time * 0.3 + i);
      }

      // Draw mouse trail glow - purple themed
      if (mouseX && mouseY) {
        const glowGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        glowGradient.addColorStop(0, "hsla(270, 50%, 60%, 0.15)");
        glowGradient.addColorStop(0.5, "hsla(280, 40%, 70%, 0.08)");
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ touchAction: "none" }}
    />
  );
};

export default InteractiveBackground;