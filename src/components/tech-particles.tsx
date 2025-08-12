"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "../app/theme-provider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function TechParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Crear partículas iniciales
    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        life: 1,
        maxLife: Math.random() * 100 + 50,
      };
    };

    // Crear partículas iniciales
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Función de animación
    const animate = () => {
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Actualizar vida
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

        // Mantener dentro del canvas
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Calcular opacidad basada en la vida
        const lifeRatio = particle.life / particle.maxLife;
        const currentOpacity = particle.opacity * (1 - lifeRatio * 0.5);

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        const particleColor = isDark ? 
          `rgba(59, 130, 246, ${currentOpacity})` : 
          `rgba(59, 130, 246, ${currentOpacity * 0.7})`;
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Efecto de brillo
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        const glowColor = isDark ? 
          `rgba(59, 130, 246, ${currentOpacity * 0.2})` : 
          `rgba(59, 130, 246, ${currentOpacity * 0.1})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      }

      // Agregar nuevas partículas ocasionalmente
      if (particles.length < 30 && Math.random() < 0.1) {
        particles.push(createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }

      // Conectar partículas cercanas
      const connectionColor = isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(59, 130, 246, 0.04)";
      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.3;
            ctx.strokeStyle = isDark ? 
              `rgba(59, 130, 246, ${opacity})` : 
              `rgba(59, 130, 246, ${opacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="tech-background w-full h-full pointer-events-none"
    />
  );
} 