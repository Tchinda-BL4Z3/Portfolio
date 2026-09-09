import React, { useState } from "react";
import { Code2, Server, Database, Hammer, CheckCircle, RotateCw, Star, Sparkles } from "lucide-react";
import { Skill } from "../types";
import { useLanguage } from "../LanguageContext";

interface SkillCardProps {
  key?: string;
  skill: Skill;
  logoUrl: string;
  isFr: boolean;
}

function SkillFlipCard({ skill, logoUrl, isFr }: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const levelStars = Array.from({ length: 5 }, (_, i) => i < skill.level);
  const levelPercentage = (skill.level / 5) * 100;

  const description = isFr 
    ? (skill.descriptionFr || "Compétence technique maîtrisée dans les projets de développement.")
    : (skill.descriptionEn || "Core technical skill applied in software development projects.");

  const levelLabelsFr: Record<number, string> = {
    5: "Expert / Maîtrisé",
    4: "Avancé",
    3: "Intermédiaire",
    2: "Bases solides",
    1: "Notions"
  };

  const levelLabelsEn: Record<number, string> = {
    5: "Expert / Mastered",
    4: "Advanced",
    3: "Intermediate",
    2: "Solid Basics",
    1: "Fundamental"
  };

  const levelLabel = isFr 
    ? (levelLabelsFr[skill.level] || "Maîtrisé")
    : (levelLabelsEn[skill.level] || "Mastered");

  const isMonochromeIcon = 
    skill.name.toLowerCase().includes("github") || 
    skill.name.toLowerCase().includes("markdown") || 
    skill.name.toLowerCase().includes("ci/cd");

  return (
    <div
      className="perspective-1000 w-full h-[220px] sm:h-[230px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= CARD FACE 1 (FRONT) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl skill-flip-card-front p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group-hover:border-teal-600 dark:group-hover:border-[#7cedeb]">
          
          {/* Top Subtle Category & Glow */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-black border border-slate-300 dark:bg-[#7cedeb]/10 dark:text-[#7cedeb] dark:border-[#7cedeb]/20">
              {skill.category}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="text-xs font-black text-black dark:text-slate-100 ml-1">
                {skill.level}/5
              </span>
            </div>
          </div>

          {/* Center Brand Icon / Image */}
          <div className="flex flex-col items-center justify-center my-auto text-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl p-2.5 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 ${
                isMonochromeIcon
                  ? "bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  : "bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-slate-800"
              }`}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={skill.name}
                  className={`w-full h-full object-contain filter drop-shadow-xs ${
                    isMonochromeIcon ? "brightness-0 dark:invert" : ""
                  }`}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <CheckCircle className="w-8 h-8 text-teal-600 dark:text-[#7cedeb]" />
              )}
            </div>

            <h4 className="font-display font-black text-sm sm:text-base text-black dark:text-white line-clamp-1">
              {skill.name}
            </h4>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-extrabold text-black dark:text-slate-300 group-hover:text-teal-700 dark:group-hover:text-[#7cedeb] transition-colors pt-2 border-t border-slate-200 dark:border-slate-800">
            <RotateCw className="w-3 h-3 animate-spin-slow text-teal-600 dark:text-teal-400" />
            <span>{isFr ? "Survoler / Toucher" : "Hover / Tap to flip"}</span>
          </div>
        </div>

        {/* ================= CARD FACE 2 (BACK) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl skill-flip-card-back p-5 shadow-lg flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5">
            <h4 className="font-display font-black text-sm text-black dark:text-[#7cedeb] truncate">
              {skill.name}
            </h4>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-black border border-slate-300 dark:bg-white/10 dark:text-slate-200 dark:border-transparent">
              {levelLabel}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans text-xs sm:text-[12.5px] leading-relaxed text-black dark:text-slate-100 my-auto line-clamp-4 font-bold">
            {description}
          </p>

          {/* Progress Bar & Flip Hint */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-black dark:text-slate-300 font-mono font-black">
                <span>{isFr ? "Niveau" : "Level"}</span>
                <span className="text-teal-700 dark:text-teal-300 font-black">{levelPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-[#7cedeb] rounded-full transition-all duration-700"
                  style={{ width: `${levelPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 text-[10px] font-black text-teal-800 dark:text-teal-200 pt-0.5">
              <RotateCw className="w-2.5 h-2.5" />
              <span>{isFr ? "Cliquer pour retourner" : "Click to flip back"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { language, t } = useLanguage();
  const isFr = language === "FR";

  const skillsData: Skill[] = [
    // Frontend
    {
      name: "React / Vite.js",
      category: "Frontend",
      level: 5,
      descriptionFr: "Développement d'interfaces SPAs réactives, hooks personnalisés et architecture de composants haute performance avec Vite.",
      descriptionEn: "Building reactive SPA user interfaces, custom hooks, and high-performance component architecture with Vite."
    },
    {
      name: "HTML5 / CSS3",
      category: "Frontend",
      level: 5,
      descriptionFr: "Balisage sémantique moderne, standards du Web, animations CSS réactives, Flexbox et layouts Grid sur-mesure.",
      descriptionEn: "Modern semantic markup, Web standards, responsive CSS animations, Flexbox, and custom Grid layouts."
    },
    {
      name: "React Native (Expo CLI)",
      category: "Frontend",
      level: 5,
      descriptionFr: "Conception d'applications mobiles iOS et Android natives multiplateformes, gestion de la navigation et des API matérielles.",
      descriptionEn: "Designing cross-platform iOS & Android native mobile apps with navigation and hardware API integrations."
    },
    {
      name: "TypeScript",
      category: "Frontend",
      level: 5,
      descriptionFr: "Typage strict, interfaces réutilisables, génériques avancés et prévention des erreurs d'exécution en production.",
      descriptionEn: "Strict typing, reusable interfaces, advanced generics, and runtime error prevention in production."
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      level: 5,
      descriptionFr: "Stylisme responsive moderne, thèmes personnalisés, mode sombre fluide et composants épurés sans surcharge CSS.",
      descriptionEn: "Modern responsive styling, custom themes, fluid dark mode, and sleek components with zero CSS bloat."
    },
    {
      name: "Redux Toolkit",
      category: "Frontend",
      level: 4,
      descriptionFr: "Gestion centralisée et prédictive de l'état global, avec RTK Query pour le caching synchrone des appels API.",
      descriptionEn: "Predictable central state management with RTK Query for automatic asynchronous API data caching."
    },

    // Backend
    {
      name: "Node.js (Express)",
      category: "Backend",
      level: 5,
      descriptionFr: "Création d'APIs RESTful sécurisées, middlewares d'authentification JWT, et architecture modulaire asynchrone.",
      descriptionEn: "Building secure RESTful APIs, JWT authentication middlewares, and asynchronous modular backend services."
    },
    {
      name: "Python",
      category: "Backend",
      level: 4,
      descriptionFr: "Scripting d'automatisation, algorithmes de traitement de données, scripts d'analyse de sécurité et frameworks web (FastAPI/Django).",
      descriptionEn: "Automation scripting, data processing algorithms, security analysis scripts, and web frameworks (FastAPI/Django)."
    },
    {
      name: "Java",
      category: "Backend",
      level: 4,
      descriptionFr: "Programmation Orientée Objet (POO) avancée, gestion stricte du typage, structures de données complexes et applications d'entreprise.",
      descriptionEn: "Advanced Object-Oriented Programming (OOP), strict typing, complex data structures, and enterprise applications."
    },
    {
      name: "PHP",
      category: "Backend",
      level: 4,
      descriptionFr: "Développement web côté serveur, gestion dynamique des sessions, traitement de formulaires et intégration SQL.",
      descriptionEn: "Server-side web development, dynamic session management, form handling, and SQL integration."
    },
    {
      name: "NestJS / Rest APIs",
      category: "Backend",
      level: 4,
      descriptionFr: "Framework Backend orienté objet et modulaire sous TypeScript avec injection de dépendances robuste.",
      descriptionEn: "Modular object-oriented backend framework in TypeScript with clean dependency injection."
    },
    {
      name: "GraphQL & Apollo",
      category: "Backend",
      level: 3,
      descriptionFr: "Requêtes flexibles optimisées, minimisation de la sur-récupération de données et schémas fortement typés.",
      descriptionEn: "Optimized data fetching schemas preventing over-fetching with strongly typed resolvers."
    },
    {
      name: "C / C++ (Fondations)",
      category: "Backend",
      level: 4,
      descriptionFr: "Gestion manuelle de la mémoire, pointeurs, structures de données fondamentales et algorithmique système.",
      descriptionEn: "Manual memory management, pointers, core data structures, and low-level system algorithmics."
    },

    // Base de données
    {
      name: "PostgreSQL & SQL",
      category: "Base de données",
      level: 5,
      descriptionFr: "Modélisation de schémas relationnels, indexation, transactions complexes et requêtes optimisées.",
      descriptionEn: "Relational schema modeling, indexing, complex transactions, and query performance optimization."
    },
    {
      name: "MongoDB & Mongoose",
      category: "Base de données",
      level: 4,
      descriptionFr: "Bases de données NoSQL orientées documents, pipelines d'agrégations et modélisation Mongoose flexible.",
      descriptionEn: "Document-oriented NoSQL database design, complex aggregation pipelines, and Mongoose modeling."
    },
    {
      name: "Firebase (Firestore / Auth)",
      category: "Base de données",
      level: 4,
      descriptionFr: "Synchronisation temps réel, authentification sociale sécurisée et règles de sécurité déclaratives.",
      descriptionEn: "Real-time sync, secure multi-provider authentication, and declarative Firestore security rules."
    },
    {
      name: "Redis (Caching)",
      category: "Base de données",
      level: 3,
      descriptionFr: "Stockage Clé-Valeur en mémoire pour le caching de sessions, la gestion de débit et des performances ultra-rapides.",
      descriptionEn: "In-memory key-value storage for high-speed session caching and API rate limiting."
    },

    // DevOps & Outils
    {
      name: "Terminal Linux",
      category: "DevOps & Outils",
      level: 5,
      descriptionFr: "Maîtrise avancée de la ligne de commande Unix/Linux : gestion des processus, manipulation de flux et filtres (pipes, grep, sed, awk), droits chmod/chown et navigation système.",
      descriptionEn: "Advanced Unix/Linux command-line mastery: process management, I/O streaming & pipes (grep, sed, awk), chmod/chown permissions, and system navigation."
    },
    {
      name: "GitHub",
      category: "DevOps & Outils",
      level: 5,
      descriptionFr: "Gestion de dépôt officiel, workflows de Pull Requests, revue de code, GitHub Actions CI/CD et sécurité de code.",
      descriptionEn: "Official repository management, pull request workflows, code review, GitHub Actions CI/CD, and security audits."
    },
    {
      name: "Docker & Containers",
      category: "DevOps & Outils",
      level: 4,
      descriptionFr: "Conteneurisation d'applications web et bases de données avec Dockerfile multi-étapes et Docker Compose.",
      descriptionEn: "Containerizing web applications and databases using multi-stage Dockerfiles and Docker Compose."
    },
    {
      name: "PowerShell (Windows)",
      category: "DevOps & Outils",
      level: 4,
      descriptionFr: "Scripting d'administration système Windows, automatisation de tâches et gestion de scripts système sécurisés.",
      descriptionEn: "Windows system administration scripting, task automation, and secure environment configuration."
    },
    {
      name: "VS Code",
      category: "DevOps & Outils",
      level: 5,
      descriptionFr: "Environnement de développement principal optimisé, débogage intégré, extensions TypeScript, Git et refactorisation.",
      descriptionEn: "Optimized primary IDE, integrated debugging, TypeScript extensions, Git tooling, and fast refactoring."
    },
    {
      name: "Postman",
      category: "DevOps & Outils",
      level: 5,
      descriptionFr: "Test et validation d'APIs REST/GraphQL, automatisation de collections de requêtes, scripts de test et documentation.",
      descriptionEn: "Testing and validation of REST/GraphQL APIs, request collections automation, testing scripts, and docs."
    },
    {
      name: "Apache",
      category: "DevOps & Outils",
      level: 4,
      descriptionFr: "Configuration de serveur web HTTP Apache, hôtes virtuels (VirtualHosts), modules de réécriture et sécurisation SSL.",
      descriptionEn: "Apache HTTP web server configuration, VirtualHosts setup, URL rewrite modules, and SSL security hardening."
    },
    {
      name: "Markdown",
      category: "DevOps & Outils",
      level: 5,
      descriptionFr: "Rédaction de documentations techniques claires, fichiers README structurés et rédaction d'articles de blog.",
      descriptionEn: "Authoring clean technical documentation, structured README files, and technical blog posts."
    },
    {
      name: "Linux / Scripting Bash",
      category: "DevOps & Outils",
      level: 4,
      descriptionFr: "Administration système Unix, automatisation de tâches et scripts Shell/Bash interactifs.",
      descriptionEn: "Unix system administration, task automation, and interactive Bash shell scripting."
    },
    {
      name: "CI/CD (GitHub Actions)",
      category: "DevOps & Outils",
      level: 4,
      descriptionFr: "Pipelines automatisés de tests unitaires, vérification du linting et déploiement continu.",
      descriptionEn: "Automated pipelines for continuous integration, unit testing, linting, and continuous deployment."
    },
  ];

  const categories = [
    { id: "Frontend", title: t("skills.categories.Frontend"), icon: Code2, color: "text-teal-600 dark:text-[#7cedeb] bg-teal-50 dark:bg-[#7cedeb]/10 border-teal-100 dark:border-[#7cedeb]/20" },
    { id: "Backend", title: t("skills.categories.Backend"), icon: Server, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20" },
    { id: "Base de données", title: t("skills.categories.Base de données"), icon: Database, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20" },
    { id: "DevOps & Outils", title: t("skills.categories.DevOps & Outils"), icon: Hammer, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20" },
  ];

  const getTechLogo = (techName: string) => {
    const normalized = techName.toLowerCase();
    if (normalized.includes("github")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
    }
    if (normalized.includes("html5") || normalized.includes("html")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
    }
    if (normalized.includes("python")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg";
    }
    if (normalized.includes("java") && !normalized.includes("javascript")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg";
    }
    if (normalized.includes("php")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg";
    }
    if (normalized.includes("powershell")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg";
    }
    if (normalized.includes("markdown")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg";
    }
    if (normalized.includes("vscode") || normalized.includes("vs code")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg";
    }
    if (normalized.includes("postman")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg";
    }
    if (normalized.includes("apache")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg";
    }
    if (normalized.includes("react native")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
    }
    if (normalized.includes("react") || normalized.includes("vite")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
    }
    if (normalized.includes("typescript")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
    }
    if (normalized.includes("tailwind")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg";
    }
    if (normalized.includes("redux")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg";
    }
    if (normalized.includes("node")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
    }
    if (normalized.includes("nest")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg";
    }
    if (normalized.includes("graphql")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg";
    }
    if (normalized.includes("c / c++") || normalized.includes("c++") || normalized.includes("fondations")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg";
    }
    if (normalized.includes("postgres") || normalized.includes("sql")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg";
    }
    if (normalized.includes("mongo")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg";
    }
    if (normalized.includes("firebase")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg";
    }
    if (normalized.includes("redis")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg";
    }
    if (normalized.includes("git")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg";
    }
    if (normalized.includes("docker")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg";
    }
    if (normalized.includes("terminal") || normalized.includes("bash")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg";
    }
    if (normalized.includes("linux")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg";
    }
    if (normalized.includes("ci/cd") || normalized.includes("actions")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg";
    }
    return "";
  };

  return (
    <section id="competences" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/80 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-black border border-slate-300 dark:bg-[#7cedeb]/10 dark:text-[#7cedeb] dark:border-[#7cedeb]/20 text-xs font-mono font-black mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-[#7cedeb]" />
            <span>{isFr ? "Flip Cards Interactives" : "Interactive Flip Cards"}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black dark:text-slate-100 tracking-tight mb-4">
            {t("skills.title")}
          </h2>
          <div className="w-12 h-1 bg-teal-600 dark:bg-[#7cedeb] mx-auto rounded-full" />
          <p className="font-sans text-black dark:text-slate-200 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-bold">
            {isFr 
              ? "Survolez ou touchez chaque carte pour découvrir l'expertise détaillée, le niveau de maîtrise et le rôle de chaque technologie dans mes architectures."
              : "Hover or tap any skill card to flip it and explore detailed mastery, experience level, and architectural usage."}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const items = skillsData.filter((s) => s.category === cat.id);

            return (
              <div key={cat.id} className="space-y-6">
                
                {/* Category Header Bar */}
                <div className="flex items-center gap-3 border-b border-slate-300 dark:border-slate-800/80 pb-3">
                  <div className={`p-2 rounded-xl border ${cat.color} shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-black dark:text-slate-100">
                    {cat.title}
                  </h3>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="sm:hidden text-[10px] font-mono font-bold text-teal-700 dark:text-[#7cedeb] bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800 animate-pulse">
                      {isFr ? "Glisser ↔" : "Swipe ↔"}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-400">
                      {items.length} {isFr ? "technologies" : "techs"}
                    </span>
                  </div>
                </div>

                {/* Flip Cards Carousel on Mobile, Grid on Desktop */}
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5 sm:overflow-visible sm:pb-0">
                  {items.map((skill) => {
                    const logoUrl = getTechLogo(skill.name);
                    return (
                      <div key={skill.name} className="w-[82vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                        <SkillFlipCard
                          skill={skill}
                          logoUrl={logoUrl}
                          isFr={isFr}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
