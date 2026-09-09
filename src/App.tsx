import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AnimatedSquareBackground from "./components/AnimatedSquareBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Blog from "./components/Blog";
import Passions from "./components/Passions";
import Contact from "./components/Contact";
import ChatAI from "./components/ChatAI";
import CVPage from "./components/CVPage";
import { Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("accueil");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isViewingCV, setIsViewingCV] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleScrollToProjects = () => {
    setActiveSection("projets");
    
    if (isViewingCV) {
      setIsViewingCV(false);
      setTimeout(() => {
        const element = document.getElementById("projets");
        if (element) {
          const offset = 80;
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

    const element = document.getElementById("projets");
    if (element) {
      const offset = 80;
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
    <div className="relative min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900 flex flex-col justify-between">
      
      {/* Dynamic Animated Square Background Adapting to Theme */}
      <AnimatedSquareBackground />

      {/* Main Navigation Header */}
      {!isViewingCV && (
        <Navbar
          onChatOpen={handleOpenChat}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isViewingCV={isViewingCV}
          onCloseCV={() => setIsViewingCV(false)}
        />
      )}

      {/* Content sections flow */}
      <main className="flex-grow">
        {isViewingCV ? (
          <CVPage onBack={() => { setIsViewingCV(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        ) : (
          <>
            {/* Hero Banner Section */}
            <Hero
              onChatOpen={handleOpenChat}
              onProjectsClick={handleScrollToProjects}
              onViewCV={() => { setIsViewingCV(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />

            {/* Academic and work timeline */}
            <About />

            {/* Selected Portfolio Projects */}
            <Projects />

            {/* Technical Competencies charts */}
            <Skills />

            {/* Official certifications */}
            <Certifications />

            {/* Technical Blog */}
            <Blog />

            {/* Passion segments */}
            <Passions />

            {/* Form and info contact details */}
            <Contact />
          </>
        )}
      </main>

      {/* Elegant minimalist footer */}
      {!isViewingCV && (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Logo copy block */}
              <div className="text-center md:text-left">
                <span className="font-display font-bold text-lg text-white select-none">
                  Pierre<span className="text-teal-400 font-mono text-sm leading-none">.dev</span>
                </span>
                <p className="text-xs text-slate-500 mt-1.5 max-w-sm">
                  {t("footer.descr")}
                </p>
              </div>

              {/* Quick footer navigation mapping */}
              <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setActiveSection("accueil");
                  }}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t("footer.nav_top")}
                </button>
                <a href="#parcours" className="hover:text-teal-400 transition-colors">{t("language") === "FR" ? "Parcours" : "Profile"}</a>
                <a href="#projets" className="hover:text-teal-400 transition-colors">{t("language") === "FR" ? "Projets" : "Projects"}</a>
                <a href="#blog" className="hover:text-teal-400 transition-colors">{t("language") === "FR" ? "Blog" : "Blog"}</a>
                <a href="#contact" className="hover:text-teal-400 transition-colors">{t("language") === "FR" ? "Contact" : "Contact"}</a>
              </div>

              {/* Copyright declaration */}
              <div className="text-center md:text-right text-xs text-slate-500">
                <p>© {new Date().getFullYear()} Pierre Tchinda. {t("footer.rights")}</p>
                <p className="text-[10px] font-mono text-slate-600 mt-1">
                  {t("footer.univ")}
                </p>
              </div>
              
            </div>
          </div>
        </footer>
      )}

      {/* Floating Sparkle Button for lazy loading chat */}
      {!isChatOpen && !isViewingCV && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 z-40 p-4 bg-slate-900 hover:bg-teal-600 text-white rounded-full shadow-2xl transition-all cursor-pointer group flex items-center gap-2 hover:scale-105 active:scale-95 border border-slate-800"
          title={t("language") === "FR" ? "Discuter avec l'IA de Pierre" : "Chat with Pierre's AI"}
        >
          <Sparkles className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-sans font-semibold text-xs pr-1 hidden sm:inline-block">
            {t("language") === "FR" ? "Assistant IA" : "AI Assistant"}
          </span>
        </button>
      )}

      {/* Real-time recruitment agent AI bot chat */}
      <ChatAI
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

    </div>
  );
}
