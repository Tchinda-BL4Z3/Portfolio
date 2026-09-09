import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sparkles, Languages, Sun, Moon } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface NavbarProps {
  onChatOpen: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isViewingCV?: boolean;
  onCloseCV?: () => void;
}

export default function Navbar({ onChatOpen, activeSection, setActiveSection, isViewingCV, onCloseCV }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ScrollSpy : Détection automatique de la section active pendant le défilement
  useEffect(() => {
    if (isViewingCV) return;

    const sectionIds = [
      "accueil",
      "parcours",
      "projets",
      "competences",
      "certifications",
      "blog",
      "passions",
      "contact"
    ];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Si l'utilisateur vient de cliquer sur un bouton de nav, laisser le défilement fluide se terminer
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Si l'utilisateur est tout en bas de la page, activer la dernière section (contact)
      if (scrollPosition + windowHeight >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // Décalage pour prendre en compte la hauteur de la barre de navigation fixe
      const offset = 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition + offset >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [isViewingCV, setActiveSection]);

  const navItems = [
    { label: t("navbar.accueil"), id: "accueil" },
    { label: t("navbar.parcours"), id: "parcours" },
    { label: t("navbar.projets"), id: "projets" },
    { label: t("navbar.competences"), id: "competences" },
    { label: t("navbar.certifications"), id: "certifications" },
    { label: t("navbar.blog"), id: "blog" },
    { label: t("navbar.passions"), id: "passions" },
    { label: t("navbar.contact"), id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);

    // Verrouiller temporairement le ScrollSpy pour éviter les micro-sauts pendant l'animation de défilement
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    if (isViewingCV && onCloseCV) {
      onCloseCV();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // height of navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 50);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-xs border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick("accueil")}>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-[#7cedeb] transition-colors">
              {t("navbar.logo")}<span className="text-teal-500 dark:text-[#7cedeb] font-mono">.dev</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-5 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs lg:text-sm font-medium transition-all cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? "text-teal-600 dark:text-[#7cedeb] font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 dark:bg-[#7cedeb] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Chat with AI & Language Selector */}
          <div className="hidden md:flex items-center gap-4">
            {/* Elegant Language Selector */}
            <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-full p-0.5 shadow-2xs">
              <button
                onClick={() => setLanguage("FR")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                  language === "FR"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-955"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                  language === "EN"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-955"
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-full shadow-2xs transition-all cursor-pointer flex items-center justify-center text-slate-600 dark:text-slate-300"
              title={theme === "light" ? (language === "FR" ? "Mode Sombre" : "Dark Mode") : (language === "FR" ? "Mode Clair" : "Light Mode")}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500 animate-pulse-subtle" />
              )}
            </button>

            <button
              onClick={onChatOpen}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-teal-600 text-white font-medium text-xs px-3.5 py-2 rounded-full transition-all tracking-wide shadow-sm hover:shadow-teal-100/55 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
              <span>{t("navbar.aiButton")}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Inline Language selector for Mobile Header */}
            <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-full p-0.5 shadow-2xs mr-1">
              <button
                onClick={() => setLanguage("FR")}
                className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full transition-all cursor-pointer ${
                  language === "FR"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full transition-all cursor-pointer ${
                  language === "EN"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-500"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onChatOpen}
              className="p-1.5 rounded-full text-slate-600 hover:bg-teal-50 hover:text-teal-600 transition-colors cursor-pointer"
              title="Assistant IA de Pierre"
            >
              <Sparkles className="w-4.5 h-4.5 text-teal-500" />
            </button>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-slate-100 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700 rounded-full shadow-2xs transition-all cursor-pointer flex items-center justify-center text-slate-600 dark:text-slate-300"
              title={theme === "light" ? (language === "FR" ? "Mode Sombre" : "Dark Mode") : (language === "FR" ? "Mode Clair" : "Light Mode")}
            >
              {theme === "light" ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 animate-pulse-subtle" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-[#7cedeb] font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-3 space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onChatOpen();
                }}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-full shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>{t("navbar.aiButton")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
