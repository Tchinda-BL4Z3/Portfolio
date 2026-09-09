import React from "react";
import { Sparkles, ArrowRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import profilePhoto from "../assets/images/pierre_portrait_photo.webp";

interface HeroProps {
  onChatOpen: () => void;
  onProjectsClick: () => void;
  onViewCV: () => void;
}

export default function Hero({ onChatOpen, onProjectsClick, onViewCV }: HeroProps) {
  const { t } = useLanguage();
  const fr = t("language") === "FR";

  return (
    <section
      id="accueil"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial from-teal-50/40 via-transparent to-transparent border-b border-slate-100"
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/10 right-1/10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
          
          {/* Left column: Text content */}
          <div className="md:col-span-7 text-left order-2 md:order-1">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-100/80 rounded-full text-teal-700 text-xs font-semibold mb-6 animate-pulse-subtle">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-ping" />
              <span>{t("hero.badge")}</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 mb-5 leading-tight">
              {t("hero.greeting")}<br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                {t("hero.name")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-display font-medium text-lg sm:text-xl lg:text-2xl text-slate-700 mb-5 max-w-2xl leading-snug">
              {t("hero.subtitle")}
            </p>

            {/* Paragraph description */}
            <p className="font-sans text-sm sm:text-base text-slate-600 mb-8 max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>

            {/* Buttons CTA */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onChatOpen}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-3 rounded-full shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-95 text-xs lg:text-sm"
                >
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>{t("hero.cta_ai")}</span>
                </button>

                <button
                  onClick={onProjectsClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-3 rounded-full border border-slate-200 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-95 text-xs lg:text-sm"
                >
                  <span>{t("hero.cta_projects")}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="w-full sm:w-auto inline-block">
                <button
                  onClick={onViewCV}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-teal-50/50 text-teal-700 border-2 border-teal-500 font-bold px-6 py-3 rounded-full cursor-pointer transition-all hover:scale-[1.02] active:scale-95 text-xs lg:text-sm shadow-md animate-pulse-subtle"
                >
                  <FileText className="w-4 h-4 text-teal-500" />
                  <span>{fr ? "Consulter mon CV" : "View My CV"}</span>
                </button>
              </div>
            </div>

            {/* Social connections */}
            <div className="flex items-center gap-5 text-slate-400">
              <a
                href="https://github.com/pierre-tchinda"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors cursor-pointer"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/pierre-tchinda"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:pierre.tchinda@facsciences-uy1.cm"
                className="hover:text-slate-900 transition-colors cursor-pointer"
                title="Gmail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column: Beautiful Portrait container */}
          <div className="md:col-span-5 flex justify-center md:justify-center order-1 md:order-2">
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 select-none">
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-teal-500 to-emerald-400 opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500 -z-10" />
              
              {/* Perfect frame border */}
              <div className="absolute -inset-1.5 rounded-[38px] bg-gradient-to-tr from-teal-500/40 via-emerald-400/40 to-sky-400/40 p-[2px] transition-all duration-500 group-hover:scale-[1.015]">
                <div className="w-full h-full rounded-[36px] bg-slate-50" />
              </div>

              {/* Offset decorative background block */}
              <div className="absolute inset-2 bg-teal-50 border border-teal-100 rounded-[34px] rotate-3 group-hover:rotate-6 transition-transform duration-500 -z-10" />

              {/* Simple photo de profil sans aucun texte à l'intérieur */}
              <div className="w-full h-full rounded-[34px] overflow-hidden border-4 border-white shadow-xl relative bg-slate-900 group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={profilePhoto}
                  alt="Pierre Tchinda"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
