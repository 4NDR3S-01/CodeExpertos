"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../app/theme-provider";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  // Definimos el tipo de partícula para evitar el uso de 'any'
  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  };

  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas completamente y reiniciar partículas al cambiar de tema
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = [];
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animación
    const animate = () => {
      let isDark = false;
      if (typeof window !== 'undefined') {
        isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        isDark = theme === 'dark';
      }
      // Limpiar canvas completamente
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "rgba(13, 27, 48, 0.22)"); // azul profundo tenue
        gradient.addColorStop(0.5, "rgba(10, 22, 40, 0.18)");
        gradient.addColorStop(1, "rgba(5, 12, 22, 0.15)");
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(0.5, "rgba(248, 250, 252, 0.5)");
        gradient.addColorStop(1, "rgba(241, 245, 249, 0.5)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Capa radial adicional para profundidad en modo oscuro
      if (isDark) {
        const radial = ctx.createRadialGradient(
          canvas.width * 0.5,
          canvas.height * 0.35,
          canvas.width * 0.05,
          canvas.width * 0.5,
          canvas.height * 0.5,
          canvas.width * 0.8
        );
        radial.addColorStop(0, 'rgba(30, 58, 138, 0.12)');
        radial.addColorStop(0.4, 'rgba(14, 165, 233, 0.06)');
        radial.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = radial;
        ctx.fillRect(0,0,canvas.width,canvas.height);
      }

      // Grid
      const gridColor = isDark ? "rgba(59, 130, 246, 0.22)" : "rgba(59, 130, 246, 0.08)";
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const gridSize = 50;
      const offsetX = (Date.now() * 0.02) % gridSize;
      const offsetY = (Date.now() * 0.01) % gridSize;
      for (let x = offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Partículas
      const particles = particlesRef.current;
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const particleColor = isDark ? `rgba(59, 130, 246, ${particle.opacity})` : `rgba(59, 130, 246, ${particle.opacity * 0.6})`;
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        const glowColor = isDark ? `rgba(59, 130, 246, ${particle.opacity * 0.3})` : `rgba(59, 130, 246, ${particle.opacity * 0.2})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      });
      // Conexiones
      const connectionColor = isDark ? "rgba(59, 130, 246, 0.12)" : "rgba(59, 130, 246, 0.05)";
      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [theme, isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="tech-background w-full h-full pointer-events-none"
        style={{ filter: "blur(0.5px)" }}
      />
      {/* Overlay de gradiente adicional */}
      <div className={`absolute inset-0 pointer-events-none ${
        typeof window !== 'undefined' && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))
          ? 'bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10'
          : 'bg-gradient-to-br from-blue-50/25 via-transparent to-cyan-50/25'
      }`} />
      {/* Efecto de "scan lines" */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className={`absolute w-full h-px ${
              typeof window !== 'undefined' && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))
                ? 'bg-cyan-400/60'
                : 'bg-blue-600/70'
            }`}
            style={{ top: `${i * 1}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.03,
            }}
          />
        ))}
      </div>
    </div>
  );
}