import React, { useEffect, useState } from "react";

type SquareVariant = "filled" | "outline" | "double";

interface ScatteredSquare {
  col: number;
  row: number;
  size: string;
  rotate: number;
  variant: SquareVariant;
  justify: "start" | "center" | "end";
  align: "start" | "center" | "end";
  dx?: string;
  dy?: string;
}

export default function AnimatedSquareBackground() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark"
    );
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

  // Squares scattered across the whole page in a loose 4×4 grid.
  // Sizes are viewport-height relative so they never overlap.
  const scatteredSquares: ScatteredSquare[] = [
    {
      col: 1,
      row: 1,
      size: "min(22vh, 240px)",
      rotate: -12,
      variant: "filled",
      justify: "start",
      align: "start",
      dx: "-20%",
    },
    {
      col: 3,
      row: 1,
      size: "min(16vh, 180px)",
      rotate: 10,
      variant: "outline",
      justify: "center",
      align: "center",
    },
    {
      col: 4,
      row: 1,
      size: "min(18vh, 200px)",
      rotate: -6,
      variant: "double",
      justify: "end",
      align: "start",
      dx: "18%",
    },
    {
      col: 2,
      row: 2,
      size: "min(20vh, 220px)",
      rotate: 14,
      variant: "outline",
      justify: "start",
      align: "center",
    },
    {
      col: 3,
      row: 2,
      size: "min(14vh, 160px)",
      rotate: -18,
      variant: "filled",
      justify: "end",
      align: "start",
    },
    {
      col: 1,
      row: 3,
      size: "min(16vh, 180px)",
      rotate: -10,
      variant: "double",
      justify: "center",
      align: "start",
      dx: "-12%",
    },
    {
      col: 2,
      row: 3,
      size: "min(22vh, 240px)",
      rotate: 8,
      variant: "filled",
      justify: "end",
      align: "center",
    },
    {
      col: 4,
      row: 3,
      size: "min(18vh, 200px)",
      rotate: -14,
      variant: "outline",
      justify: "start",
      align: "end",
      dx: "12%",
    },
    {
      col: 1,
      row: 4,
      size: "min(18vh, 200px)",
      rotate: 16,
      variant: "filled",
      justify: "start",
      align: "end",
      dx: "-10%",
    },
    {
      col: 3,
      row: 4,
      size: "min(20vh, 220px)",
      rotate: -8,
      variant: "double",
      justify: "center",
      align: "end",
    },
    {
      col: 4,
      row: 4,
      size: "min(14vh, 160px)",
      rotate: 12,
      variant: "outline",
      justify: "end",
      align: "center",
      dx: "15%",
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden">
      {/* Dynamic ambient gradient overlay that shifts per theme */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-radial from-teal-900/15 via-transparent to-[#030712]/70"
            : "bg-radial from-teal-500/5 via-transparent to-slate-50/30"
        }`}
      />

      {/* Scattered large blue squares */}
      <div className="absolute inset-0 hidden grid-cols-4 grid-rows-4 md:grid">
        {scatteredSquares.map((sq, i) => {
          const variantClass =
            sq.variant === "filled"
              ? isDark
                ? "border-2 border-blue-400/25 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-700/5 shadow-[0_24px_80px_-20px_rgba(37,99,235,0.35)]"
                : "border-2 border-blue-800/35 bg-gradient-to-br from-blue-900/25 via-blue-900/15 to-blue-800/5 shadow-[0_24px_80px_-20px_rgba(30,58,138,0.45)]"
              : sq.variant === "outline"
                ? isDark
                  ? "border-2 border-blue-400/25"
                  : "border-2 border-blue-700/30"
                : isDark
                  ? "border border-blue-400/30"
                  : "border border-blue-800/30";

          return (
            <div
              key={i}
              className={`relative transition-colors duration-700 ${variantClass}`}
              style={{
                gridColumn: sq.col,
                gridRow: sq.row,
                justifySelf: sq.justify,
                alignSelf: sq.align,
                width: sq.size,
                height: sq.size,
                transform: `translate(${sq.dx ?? "0"}, ${sq.dy ?? "0"}) rotate(${sq.rotate}deg)`,
              }}
            >
              {sq.variant === "double" && (
                <div
                  className={`absolute inset-[14%] border ${
                    isDark ? "border-blue-400/25" : "border-blue-800/25"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
