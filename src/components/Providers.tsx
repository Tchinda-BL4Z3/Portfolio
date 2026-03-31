"use client";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Gestion de la Langue (Dictionnaire simple)
const translations = {
  fr: {
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contacts",
    hire: "Engagez-moi",
    heroTitle: "Un Développeur",
  },
  en: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contacts",
    hire: "Hire me",
    heroTitle: "A Fullstack",
  }
};

const LanguageContext = createContext<any>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState("fr");
  const t = translations[lang as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);