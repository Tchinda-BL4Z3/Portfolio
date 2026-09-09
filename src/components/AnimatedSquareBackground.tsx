import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function AnimatedSquareBackground() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark"
    );
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // Listen for dark mode toggles via MutationObserver on html class
  useEffect(() => {
    const checkDark = () => {
      const darkActive =
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark";
      setIsDark(darkActive);
    };

    checkDark();

    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", checkDark);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", checkDark);
    };
  }, []);

  // Track mouse coordinates for interactive hover square lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Canvas Grid Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const SQUARE_SIZE = 42; // size of grid square in px

    // Active pulsing squares state
    interface PulseSquare {
      col: number;
      row: number;
      opacity: number;
      maxOpacity: number;
      speed: number;
      growing: boolean;
      color: string;
    }

    const pulsingSquares: PulseSquare[] = [];

    // Helper to spawn a new pulse square
    const spawnPulseSquare = () => {
      const cols = Math.ceil(width / SQUARE_SIZE);
      const rows = Math.ceil(height / SQUARE_SIZE);
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);

      // Pick palette based on theme
      const darkPalette = [
        "rgba(124, 237, 235, ", // cyan-teal neon #7cedeb
        "rgba(20, 184, 166, ", // teal #14b8a6
        "rgba(56, 189, 248, ", // sky blue #38bdf8
        "rgba(168, 85, 247, ", // purple accent
      ];

      const lightPalette = [
        "rgba(13, 148, 136, ", // brand teal
        "rgba(15, 118, 110, ", // dark teal
        "rgba(59, 130, 246, ", // blue
        "rgba(20, 184, 166, ", // teal light
      ];

      const palette = isDark ? darkPalette : lightPalette;
      const color = palette[Math.floor(Math.random() * palette.length)];

      pulsingSquares.push({
        col,
        row,
        opacity: 0.01,
        maxOpacity: isDark
          ? Math.random() * 0.35 + 0.15
          : Math.random() * 0.18 + 0.06,
        speed: Math.random() * 0.008 + 0.004,
        growing: true,
        color,
      });
    };

    // Pre-populate initial active squares
    for (let i = 0; i < 30; i++) {
      spawnPulseSquare();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SQUARE_SIZE);
      const rows = Math.ceil(height / SQUARE_SIZE);

      // Draw baseline background grid lines
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = isDark
        ? "rgba(30, 41, 59, 0.4)"
        : "rgba(226, 232, 240, 0.65)";

      ctx.beginPath();
      for (let x = 0; x <= width; x += SQUARE_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += SQUARE_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Maintain pulsing squares density
      if (pulsingSquares.length < 35 && Math.random() < 0.25) {
        spawnPulseSquare();
      }

      // Update and draw pulsing squares
      for (let i = pulsingSquares.length - 1; i >= 0; i--) {
        const sq = pulsingSquares[i];

        if (sq.growing) {
          sq.opacity += sq.speed;
          if (sq.opacity >= sq.maxOpacity) {
            sq.growing = false;
          }
        } else {
          sq.opacity -= sq.speed;
        }

        if (sq.opacity <= 0) {
          pulsingSquares.splice(i, 1);
          continue;
        }

        const x = sq.col * SQUARE_SIZE;
        const y = sq.row * SQUARE_SIZE;

        ctx.fillStyle = `${sq.color}${sq.opacity})`;
        ctx.fillRect(x + 1, y + 1, SQUARE_SIZE - 2, SQUARE_SIZE - 2);

        // In dark mode add glowing border highlight on active tiles
        if (isDark && sq.opacity > 0.15) {
          ctx.strokeStyle = `${sq.color}${sq.opacity * 1.2})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, SQUARE_SIZE - 1, SQUARE_SIZE - 1);
        }
      }

      // Interactive mouse hover tile highlighting!
      if (mouseRef.current.active) {
        const mouseCol = Math.floor(mouseRef.current.x / SQUARE_SIZE);
        const mouseRow = Math.floor(mouseRef.current.y / SQUARE_SIZE);

        const radius = 3; // radius of influence in grid cells
        for (let r = -radius; r <= radius; r++) {
          for (let c = -radius; c <= radius; c++) {
            const targetCol = mouseCol + c;
            const targetRow = mouseRow + r;
            const dist = Math.sqrt(r * r + c * c);

            if (
              dist <= radius &&
              targetCol >= 0 &&
              targetCol < cols &&
              targetRow >= 0 &&
              targetRow < rows
            ) {
              const hoverFactor = Math.max(0, 1 - dist / (radius + 0.5));
              const hoverX = targetCol * SQUARE_SIZE;
              const hoverY = targetRow * SQUARE_SIZE;

              const hoverAlpha = isDark ? hoverFactor * 0.3 : hoverFactor * 0.15;
              const hoverColor = isDark
                ? `rgba(124, 237, 235, ${hoverAlpha})`
                : `rgba(13, 148, 136, ${hoverAlpha})`;

              ctx.fillStyle = hoverColor;
              ctx.fillRect(
                hoverX + 1,
                hoverY + 1,
                SQUARE_SIZE - 2,
                SQUARE_SIZE - 2
              );

              if (dist <= 1) {
                ctx.strokeStyle = isDark
                  ? `rgba(124, 237, 235, ${hoverFactor * 0.6})`
                  : `rgba(13, 148, 136, ${hoverFactor * 0.5})`;
                ctx.lineWidth = 1;
                ctx.strokeRect(
                  hoverX + 0.5,
                  hoverY + 0.5,
                  SQUARE_SIZE - 1,
                  SQUARE_SIZE - 1
                );
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  // Floating decorative squares data
  const floatingSquares = [
    { size: 48, top: "12%", left: "8%", duration: 18, delay: 0 },
    { size: 72, top: "22%", left: "82%", duration: 24, delay: 2 },
    { size: 36, top: "58%", left: "12%", duration: 15, delay: 4 },
    { size: 64, top: "72%", left: "75%", duration: 20, delay: 1 },
    { size: 84, top: "38%", left: "90%", duration: 28, delay: 5 },
    { size: 42, top: "84%", left: "32%", duration: 16, delay: 3 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 print:hidden">
      {/* Background Interactive Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-700"
      />

      {/* Dynamic Ambient Gradient overlay that shifts per theme */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-radial from-teal-900/15 via-transparent to-[#030712]/70"
            : "bg-radial from-teal-500/5 via-transparent to-slate-50/30"
        }`}
      />

      {/* Floating 3D/2D Animated Squares for extra depth */}
      {floatingSquares.map((sq, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-2xl border backdrop-blur-[1px] transition-all duration-700 ${
            isDark
              ? "bg-[#0d1527]/40 border-[#7cedeb]/20 shadow-[0_0_20px_rgba(124,237,235,0.12)]"
              : "bg-white/50 border-teal-500/20 shadow-[0_8px_20px_rgba(13,148,136,0.06)]"
          }`}
          style={{
            width: sq.size,
            height: sq.size,
            top: sq.top,
            left: sq.left,
          }}
          animate={{
            y: [0, -28, 0, 28, 0],
            x: [0, 16, 0, -16, 0],
            rotate: [0, 45, 90, 45, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
            opacity: isDark
              ? [0.2, 0.55, 0.3, 0.6, 0.2]
              : [0.15, 0.38, 0.2, 0.45, 0.15],
          }}
          transition={{
            duration: sq.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sq.delay,
          }}
        >
          {/* Inner accent grid square */}
          <div
            className={`w-full h-full rounded-xl border border-dashed ${
              isDark ? "border-[#7cedeb]/30" : "border-teal-600/25"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}
