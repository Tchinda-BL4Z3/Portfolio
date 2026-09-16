import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Printer, User, Sun, Moon } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import profilePhoto from "../assets/images/pierre_portrait_photo.webp";

interface CVPageProps {
  onBack: () => void;
}

export default function CVPage({ onBack }: CVPageProps) {
  const { language } = useLanguage();
  const [cvLang, setCvLang] = useState<"FR" | "EN">(language);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
  });
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark";
    setIsDarkMode(isCurrentlyDark);
  }, []);

  // Keep CV language in sync when user toggles language in the main navbar
  useEffect(() => {
    setCvLang(language);
  }, [language]);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    const root = document.documentElement;
    if (nextDark) {
      root.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handlePrint = () => {
    // Always render the printed PDF in light theme, like the site's light view.
    // The CV layout is compacted to exactly one A4 sheet via the
    // `@media print` rules in index.css, so no zooming is needed.
    const hadDark = document.documentElement.classList.contains("dark");
    if (hadDark) document.documentElement.classList.remove("dark");

    const doPrint = () => {
      window.print();
      if (hadDark) document.documentElement.classList.add("dark");
    };

    // Wait for web fonts so the printed layout matches the final render.
    const ready =
      document.fonts && (document.fonts as unknown as { ready: Promise<unknown> }).ready
        ? Promise.resolve((document.fonts as unknown as { ready: Promise<unknown> }).ready)
        : Promise.resolve();
    ready
      .then(() => new Promise((r) => window.requestAnimationFrame(() => r(null))))
      .then(() => doPrint())
      .catch(() => doPrint());
  };

  const content = {
    FR: {
      title: "Pierre Tchinda",
      subtitle: "Développeur Web & Analyste Sécurité",
      personalInfoTitle: "Informations personnelles",
      skillsTitle: "Compétences",
      qualitiesTitle: "Qualités",
      hobbiesTitle: "Hobbies et centres d'intérêt",
      languagesTitle: "Langues",
      profileTitle: "Profil",
      experienceTitle: "Expérience professionnelle",
      educationTitle: "Formation",
      certificationsTitle: "Certifications",
      referencesTitle: "Références",
      profileDesc: "Étudiant en Licence 2 Informatique à l'Université de Yaoundé I. Développeur web React/Node.js et analyste sécurité, je conçois des architectures applicatives performantes, résilientes et sécurisées par défaut.",
      contacts: [
        { icon: "user", label: "Pierre Tchinda", value: "Pierre Tchinda" },
        { icon: "mail", label: "Email", value: "pierre.tchinda@facsciences-uy1.cm", href: "mailto:pierre.tchinda@facsciences-uy1.cm" },
        { icon: "phone", label: "Téléphone", value: "+237 600-000-000", href: "tel:+237600000000" },
        { icon: "pin", label: "Adresse", value: "Yaoundé, Cameroun" },
        { icon: "github", label: "GitHub", value: "github.com/pierre-tchinda", href: "https://github.com/pierre-tchinda" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/pierre-tchinda", href: "https://linkedin.com/in/pierre-tchinda" }
      ],
      skillsItems: [
        { name: "TypeScript / JavaScript", rating: 5 },
        { name: "React.js / Node.js", rating: 5 },
        { name: "C / C++ (Système)", rating: 4 },
        { name: "OWASP / Sécurité Web", rating: 4 },
        { name: "Python / Scripting Bash", rating: 4 },
        { name: "Docker & SQL / NoSQL", rating: 4 }
      ],
      qualities: [
        "Rigueur & Esprit critique",
        "Résolution méthodique de problèmes",
        "Curiosité & Veille continue",
        "Esprit d'équipe & Collaboration"
      ],
      hobbies: [
        "Lecture & Veille Intellectuelle",
        "Échecs & Jeux de Stratégie",
        "Sport & Fitness",
        "Musique & Rythme"
      ],
      languages: [
        { name: "Français", level: "Langue maternelle", rating: 5 },
        { name: "Anglais", level: "Professionnel (C1)", rating: 4 }
      ],
      expItems: [
        {
          role: "Développeur Freelance Full-Stack & Sécurité",
          company: "Indépendant",
          location: "Yaoundé",
          date: "de 2025 à ce jour",
          summary: "Développement d'interfaces web réactives et d'architectures applicatives sécurisées pour clients indépendants et projets universitaires.",
          categories: [
            {
              title: "Ingénierie Web & Conception :",
              points: [
                "Développement de dashboards et d'interfaces applicatives en React et TypeScript",
                "Conteneurisation des environnements de développement et de déploiement avec Docker"
              ]
            },
            {
              title: "Sécurité applicative & OWASP :",
              points: [
                "Application stricte des directives OWASP Top 10 (anti-XSS, CSRF, assainissement)",
                "Mise en place d'authentification robuste, contrôle d'accès et audit du code source"
              ]
            }
          ]
        },
        {
          role: "Technicien Informatique & Sécurité",
          company: "Service Technique UY1",
          location: "Faculté des Sciences, Yaoundé",
          date: "de juin 2025 à août 2025",
          summary: "Support technique, maintenance du parc réseau et renforcement de l'infrastructure web.",
          categories: [
            {
              title: "Support infrastructure & systèmes :",
              points: [
                "Maintenance corrective et préventive du parc machines et des commutateurs réseau",
                "Surveillance des journaux et sécurisation de landing pages (anti vol de session)"
              ]
            }
          ]
        }
      ],
      eduItems: [
        {
          degree: "Licence 2 en Informatique",
          school: "Université de Yaoundé I, Faculté des Sciences",
          date: "2025 - Présent",
          points: [
            "Algorithmique avancée, structures de données complexes et programmation système C/C++",
            "Bases de la cryptographie, protocoles de chiffrement et sécurité réseau"
          ]
        },
        {
          degree: "Licence 1 en Informatique",
          school: "Université de Yaoundé I, Faculté des Sciences",
          date: "2024 - 2025",
          points: [
            "Algorithmique fondamentale et implémentations en langage C",
            "Web standard (HTML5, CSS3, ES6), design réactif et bases de données SQL"
          ]
        }
      ],
      certItems: [
        { name: "Google Cybersecurity Professional Certificate", org: "Coursera / Google", year: "2025" },
        { name: "Meta Front-End Developer Specialization", org: "Coursera / Meta", year: "2025" },
        { name: "IBM Cybersecurity Analyst Professional Certificate", org: "Coursera / IBM", year: "2025" }
      ],
      references: [
        { name: "Dr. Jean-Bosco T.", role: "Directeur de Département Informatique", phone: "+237 600-000-000" },
        { name: "M. Sylvain K.", role: "Chef de projet Sécurité", phone: "+237 611-111-111" }
      ],
      backBtn: "Retour au Portfolio",
      printBtn: "Imprimer / Enregistrer PDF",
      footerCopyright: "© Pierre Tchinda - CV"
    },
    EN: {
      title: "Pierre Tchinda",
      subtitle: "Web Developer & Security Analyst",
      personalInfoTitle: "Personal Information",
      skillsTitle: "Skills",
      qualitiesTitle: "Qualities",
      hobbiesTitle: "Hobbies and Interests",
      languagesTitle: "Languages",
      profileTitle: "Profile",
      experienceTitle: "Professional Experience",
      educationTitle: "Education",
      certificationsTitle: "Certifications",
      referencesTitle: "References",
      profileDesc: "Undergraduate in CS (Licence 2) at the University of Yaoundé I. React/Node.js web developer and security analyst building high-performance, resilient, and secure-by-default applications.",
      contacts: [
        { icon: "user", label: "Pierre Tchinda", value: "Pierre Tchinda" },
        { icon: "mail", label: "Email", value: "pierre.tchinda@facsciences-uy1.cm", href: "mailto:pierre.tchinda@facsciences-uy1.cm" },
        { icon: "phone", label: "Phone", value: "+237 600-000-000", href: "tel:+237600000000" },
        { icon: "pin", label: "Address", value: "Yaoundé, Cameroon" },
        { icon: "github", label: "GitHub", value: "github.com/pierre-tchinda", href: "https://github.com/pierre-tchinda" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/pierre-tchinda", href: "https://linkedin.com/in/pierre-tchinda" }
      ],
      skillsItems: [
        { name: "TypeScript / JavaScript", rating: 5 },
        { name: "React.js / Node.js", rating: 5 },
        { name: "C / C++ (System)", rating: 4 },
        { name: "OWASP / Web Protection", rating: 4 },
        { name: "Python / Bash Scripting", rating: 4 },
        { name: "Docker & SQL / NoSQL", rating: 4 }
      ],
      qualities: [
        "Rigor & Critical Thinking",
        "Methodical Problem Solving",
        "Curiosity & Continuous Learning",
        "Team Collaboration & Communication"
      ],
      hobbies: [
        "Reading & Intellectual Tech Watch",
        "Chess & Strategy Games",
        "Fitness & Running",
        "Music & Sound Rhythm"
      ],
      languages: [
        { name: "French", level: "Native Tongue", rating: 5 },
        { name: "English", level: "Professional (C1)", rating: 4 }
      ],
      expItems: [
        {
          role: "Freelance Full-Stack & Security Developer",
          company: "Independent Services",
          location: "Yaoundé",
          date: "from 2025 to Present",
          summary: "Designing responsive web solutions and secure-by-default software architectures for clients and academic projects.",
          categories: [
            {
              title: "Web Engineering & Design :",
              points: [
                "Building complex administrative dashboards in React and TypeScript",
                "Deploying reproducible development and production containers using Docker"
              ]
            },
            {
              title: "Application Security & OWASP :",
              points: [
                "Strict adherence to OWASP Top 10 guidelines (anti-XSS, CSRF, input sanitization)",
                "Robust session management, role-based access control, and code review"
              ]
            }
          ]
        },
        {
          role: "IT Support & Security Intern",
          company: "UY1 Technical Group",
          location: "Faculty of Sciences, Yaoundé",
          date: "from June 2025 to Aug 2025",
          summary: "IT infrastructure upkeep, network switch maintenance, and web system shielding.",
          categories: [
            {
              title: "Infrastructure & Network support :",
              points: [
                "Preventive and corrective maintenance of computer labs and network switches",
                "Firewall log monitoring and secure landing pages (anti session hijacking)"
              ]
            }
          ]
        }
      ],
      eduItems: [
        {
          degree: "B.Sc. in Computer Science - Year 2",
          school: "University of Yaoundé I, Faculty of Sciences",
          date: "2025 - Present",
          points: [
            "Advanced algorithms, complex data structures, and system level languages (C/C++)",
            "Cryptography foundations, encryption protocols, and network security"
          ]
        },
        {
          degree: "B.Sc. in Computer Science - Year 1",
          school: "University of Yaoundé I, Faculty of Sciences",
          date: "2024 - 2025",
          points: [
            "Algorithms design and applied program implementation in C",
            "Standard web practices (HTML5, CSS3, ES6), responsive design, and SQL databases"
          ]
        }
      ],
      certItems: [
        { name: "Google Cybersecurity Professional Certificate", org: "Coursera / Google", year: "2025" },
        { name: "Meta Front-End Developer Specialization", org: "Coursera / Meta", year: "2025" },
        { name: "IBM Cybersecurity Analyst Professional Certificate", org: "Coursera / IBM", year: "2025" }
      ],
      references: [
        { name: "Dr. Jean-Bosco T.", role: "Head of Computer Science Dept", phone: "+237 600-000-000" },
        { name: "Mr. Sylvain K.", role: "Lead Cybersecurity Officer", phone: "+237 611-111-111" }
      ],
      backBtn: "Back to Portfolio",
      printBtn: "Print / Save PDF",
      footerCopyright: "© Pierre Tchinda - CV"
    }
  };

  const curr = content[cvLang];

  const getContactIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      case "mail":
        return <Mail className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      case "phone":
        return <Phone className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      case "pin":
        return <MapPin className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      case "github":
        return <Github className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      case "linkedin":
        return <Linkedin className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
      default:
        return <User className="w-3.5 h-3.5 text-[#0fa3b1] dark:text-[#2dd4bf] shrink-0" />;
    }
  };

  const renderRatingDots = (rating: number) => {
    return (
      <div className="flex items-center gap-1 shrink-0">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
              dot <= rating
                ? "bg-[#0fa3b1] dark:bg-[#2dd4bf] print:bg-[#0fa3b1]"
                : "bg-slate-300 dark:bg-slate-700 print:bg-slate-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0 print:min-h-0 transition-colors duration-300 ${
      isDarkMode ? "bg-[#030712] text-white" : "bg-slate-100/70 text-black"
    }`}>
      
      {/* Top Controls Bar (Hidden during printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all shadow-sm ${
            isDarkMode
              ? "text-slate-300 hover:text-white bg-[#0d1527] border border-slate-700 hover:border-slate-500"
              : "text-black hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 font-bold"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#0fa3b1]" />
          <span>{curr.backBtn}</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all cursor-pointer shadow-sm flex items-center justify-center ${
              isDarkMode
                ? "bg-[#0d1527] border-slate-700 text-[#2dd4bf] hover:bg-slate-800"
                : "bg-white border-slate-300 text-black hover:bg-slate-50 font-bold"
            }`}
            title={isDarkMode ? "Mode Clair" : "Mode Sombre"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switch */}
          <div className={`flex p-0.5 rounded-full border shadow-sm transition-colors duration-300 ${
            isDarkMode ? "bg-[#0d1527] border-slate-700" : "bg-white border-slate-300"
          }`}>
            <button
              onClick={() => setCvLang("FR")}
              className={`px-3 py-1 text-[11px] font-black rounded-full transition-all cursor-pointer ${
                cvLang === "FR"
                  ? "bg-[#0fa3b1] text-white shadow-sm"
                  : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-black hover:text-slate-800 font-bold"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setCvLang("EN")}
              className={`px-3 py-1 text-[11px] font-black rounded-full transition-all cursor-pointer ${
                cvLang === "EN"
                  ? "bg-[#0fa3b1] text-white shadow-sm"
                  : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-black hover:text-slate-800 font-bold"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Resume Sheet - exact match to user template: Left column (34%) + Right column (66%) */}
      <article ref={sheetRef} className={`cv-sheet max-w-4xl mx-auto rounded-none sm:rounded-2xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12 min-h-[1100px] print:shadow-none print:border-none print:rounded-none print:max-w-full print:p-0 print:min-h-0 transition-all duration-300 ${
        isDarkMode ? "bg-[#0b121e] border border-slate-800" : "bg-white border border-slate-300"
      }`}>
        
        {/* LEFT COLUMN: 34% width, soft cyan background with top teal wave + photo & bottom teal wave */}
        <aside className={`col-span-12 md:col-span-4 shrink-0 flex flex-col justify-between border-r print:col-span-4 transition-colors duration-300 ${
          isDarkMode 
            ? "bg-[#071722] text-white border-slate-800" 
            : "bg-[#eef8f8] text-black border-slate-300 print:bg-[#eef8f8]"
        }`}>
          
          <div>
            {/* TOP HEADER TEAL BLOCK WITH CANDIDATE NAME & CURVED WAVE */}
            <div className="relative bg-[#0fa3b1] dark:bg-[#0d8995] text-white pt-8 pb-24 sm:pb-28 px-4 text-center print:bg-[#0fa3b1]">
              <div className="space-y-1">
                <h1 className="font-display font-black text-xl sm:text-2xl tracking-wide text-white drop-shadow-xs">
                  {curr.title}
                </h1>
                <p className="text-[11px] font-sans font-semibold text-teal-100 tracking-wider uppercase">
                  {curr.subtitle}
                </p>
              </div>

              {/* Downward curved wave at bottom of teal header */}
              <div className="absolute -bottom-1 left-0 right-0 overflow-hidden leading-none z-0 pointer-events-none">
                <svg viewBox="0 0 500 70" preserveAspectRatio="none" className="w-full h-8 sm:h-10 text-[#eef8f8] dark:text-[#071722] fill-current print:text-[#eef8f8]">
                  <path d="M0,0 C160,65 340,65 500,0 L500,70 L0,70 Z" />
                </svg>
              </div>

              {/* Circular Avatar overlapping the wave - lowered to leave full space for top text */}
              <div className="absolute -bottom-14 sm:-bottom-16 left-1/2 -translate-x-1/2 z-10">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md bg-slate-900 print:border-white">
                  <img
                    src={profilePhoto}
                    alt="Pierre Tchinda"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* SIDEBAR CONTENT (Starts below lowered avatar with clean breathing room) */}
            <div className="pt-20 sm:pt-22 px-6 sm:px-7 space-y-6">
              
              {/* SECTION 1: Informations personnelles */}
              <section className="space-y-3">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1 border-b border-slate-300 dark:border-slate-700 print:border-slate-300 print:text-[#0b7a87]">
                  {curr.personalInfoTitle}
                </h3>
                
                <div className="space-y-2.5 pt-1 text-xs">
                  {curr.contacts.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 text-[#0fa3b1] dark:text-[#2dd4bf]">{getContactIcon(c.icon)}</div>
                      {c.href ? (
                        <a 
                          href={c.href} 
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-bold text-black dark:text-white hover:text-[#0fa3b1] dark:hover:text-[#2dd4bf] break-all transition-colors"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="font-bold text-black dark:text-white">
                          {c.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 2: Compétences (with 5-dot rating) */}
              <section className="space-y-3">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1 border-b border-slate-300 dark:border-slate-700 print:border-slate-300 print:text-[#0b7a87]">
                  {curr.skillsTitle}
                </h3>

                <div className="space-y-2 pt-1">
                  {curr.skillsItems.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-black dark:text-white truncate">
                        {skill.name}
                      </span>
                      {renderRatingDots(skill.rating)}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3: Langues (with rating dots & level) */}
              <section className="space-y-3">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1 border-b border-slate-300 dark:border-slate-700 print:border-slate-300 print:text-[#0b7a87]">
                  {curr.languagesTitle}
                </h3>

                <div className="space-y-2 pt-1">
                  {curr.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-black dark:text-white block">
                          {lang.name}
                        </span>
                        <span className="text-[11px] font-semibold text-black/80 dark:text-slate-300">
                          {lang.level}
                        </span>
                      </div>
                      {renderRatingDots(lang.rating)}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 4: Qualités (with small solid square bullets) */}
              <section className="space-y-3">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1 border-b border-slate-300 dark:border-slate-700 print:border-slate-300 print:text-[#0b7a87]">
                  {curr.qualitiesTitle}
                </h3>

                <div className="space-y-2 pt-1 text-xs">
                  {curr.qualities.map((quality, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0fa3b1] dark:bg-[#2dd4bf] shrink-0 rounded-xs print:bg-[#0fa3b1]" />
                      <span className="font-bold text-black dark:text-white">
                        {quality}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: Hobbies et centres d'intérêt */}
              <section className="space-y-3">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1 border-b border-slate-300 dark:border-slate-700 print:border-slate-300 print:text-[#0b7a87]">
                  {curr.hobbiesTitle}
                </h3>

                <div className="space-y-2 pt-1 text-xs">
                  {curr.hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0fa3b1] dark:bg-[#2dd4bf] shrink-0 rounded-xs print:bg-[#0fa3b1]" />
                      <span className="font-bold text-black dark:text-white">
                        {hobby}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* BOTTOM TEAL CURVED FLOURISH matching template */}
          <div className="relative mt-8 overflow-hidden leading-none z-0">
            <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-10 text-[#0fa3b1] dark:text-[#0d8995] fill-current print:text-[#0fa3b1]">
              <path d="M0,80 C160,15 340,15 500,80 L500,80 L0,80 Z" />
            </svg>
          </div>

        </aside>

        {/* RIGHT COLUMN: 66% width, crisp white background, clean typography & structure */}
        <main className={`col-span-12 md:col-span-8 p-7 sm:p-9 lg:p-10 flex flex-col justify-between print:col-span-8 transition-colors duration-300 ${
          isDarkMode ? "bg-[#0b121e] text-white" : "bg-white text-black print:bg-white print:text-black"
        }`}>
          
          <div className="space-y-7">
            
            {/* SECTION: Profil */}
            <section className="space-y-2">
              <h2 className="font-sans font-bold text-2xl sm:text-[26px] text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1.5 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 print:text-[#0b7a87]">
                {curr.profileTitle}
              </h2>
              <p className="font-sans text-[13px] sm:text-[13.5px] text-black dark:text-white font-normal leading-relaxed pt-1">
                {curr.profileDesc}
              </p>
            </section>

            {/* SECTION: Expérience professionnelle */}
            <section className="space-y-4">
              <h2 className="font-sans font-bold text-2xl sm:text-[26px] text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1.5 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 print:text-[#0b7a87]">
                {curr.experienceTitle}
              </h2>

              <div className="space-y-5 pt-1">
                {curr.expItems.map((exp, index) => (
                  <div key={index} className="space-y-1.5">
                    {/* Role & Date Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                      <h3 className="font-sans font-bold text-black dark:text-white text-[14px] sm:text-[15px]">
                        {exp.role}
                      </h3>
                      <span className="font-sans text-xs text-black dark:text-white font-bold whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>

                    {/* Company & Location in Teal */}
                    <p className="font-sans text-xs font-bold text-[#0b7a87] dark:text-[#2dd4bf] print:text-[#0b7a87]">
                      {exp.company}, {exp.location}
                    </p>

                    {/* Brief Summary */}
                    <p className="font-sans text-xs sm:text-[12.5px] text-black dark:text-white leading-relaxed">
                      {exp.summary}
                    </p>

                    {/* Structured Categories & Bullets */}
                    <div className="space-y-2 pt-1">
                      {exp.categories.map((cat, ci) => (
                        <div key={ci} className="space-y-1">
                          <p className="font-sans text-xs sm:text-[13px] font-bold text-black dark:text-white">
                            {cat.title}
                          </p>
                          <ul className="space-y-1 pl-1">
                            {cat.points.map((pt, pi) => (
                              <li key={pi} className="flex items-start gap-2 text-xs sm:text-[12.5px] text-black dark:text-white leading-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-1.5 shrink-0 print:bg-black" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: Formation */}
            <section className="space-y-3.5">
              <h2 className="font-sans font-bold text-2xl sm:text-[26px] text-[#0b7a87] dark:text-[#2dd4bf] tracking-tight pb-1.5 border-b border-slate-200 dark:border-slate-800 print:border-slate-200 print:text-[#0b7a87]">
                {curr.educationTitle}
              </h2>

              <div className="space-y-4 pt-1">
                {curr.eduItems.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                      <h3 className="font-sans font-bold text-black dark:text-white text-[14px] sm:text-[15px]">
                        {edu.degree}
                      </h3>
                      <span className="font-sans text-xs text-black dark:text-white font-bold whitespace-nowrap">
                        {edu.date}
                      </span>
                    </div>

                    <p className="font-sans text-xs font-bold text-[#0b7a87] dark:text-[#2dd4bf] print:text-[#0b7a87]">
                      {edu.school}
                    </p>

                    <ul className="space-y-1 pl-1 pt-0.5">
                      {edu.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-xs sm:text-[12.5px] text-black dark:text-white leading-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-1.5 shrink-0 print:bg-black" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: Certifications & Références */}
            <section className="space-y-3.5 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-200 dark:border-slate-800 print:border-slate-200">
                
                {/* Certifications */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-sm text-[#0b7a87] dark:text-[#2dd4bf] uppercase tracking-wider print:text-[#0b7a87]">
                    {curr.certificationsTitle}
                  </h3>
                  <div className="space-y-2 text-xs text-black dark:text-white">
                    {curr.certItems.map((cert, ci) => (
                      <div key={ci} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0fa3b1] dark:bg-[#2dd4bf] mt-1.5 shrink-0 print:bg-[#0fa3b1]" />
                        <div>
                          <p className="font-bold text-black dark:text-white leading-tight">
                            {cert.name}
                          </p>
                          <p className="text-[11px] font-semibold text-black/80 dark:text-slate-300">
                            {cert.org} • {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Références */}
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-sm text-[#0b7a87] dark:text-[#2dd4bf] uppercase tracking-wider print:text-[#0b7a87]">
                    {curr.referencesTitle}
                  </h3>
                  <div className="space-y-2 text-xs text-black dark:text-white">
                    {curr.references.map((ref, ri) => (
                      <div key={ri} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850/60 border border-slate-300 dark:border-slate-750 print:bg-slate-50 print:border-slate-300">
                        <p className="font-bold text-black dark:text-white">
                          {ref.name}
                        </p>
                        <p className="text-[11px] font-semibold text-black dark:text-slate-300">
                          {ref.role}
                        </p>
                        <p className="text-[11px] font-mono font-bold text-[#0b7a87] dark:text-[#2dd4bf] mt-0.5 print:text-[#0b7a87]">
                          {ref.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Minimalist Bottom Copyright / Page Signature matching template */}
          <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center">
            <span className="text-[11px] font-sans text-black/70 dark:text-slate-400 font-semibold">
              {curr.footerCopyright}
            </span>
          </footer>

        </main>

      </article>

      {/* Floating Actions Tray: Print / PDF Button (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mt-8 flex items-center justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2.5 px-7 py-3 bg-[#0fa3b1] hover:bg-[#0d8995] text-white text-xs font-extrabold rounded-full cursor-pointer transition-all shadow-md hover:scale-[1.02] active:scale-95"
          title={cvLang === "FR" ? "Imprimer le CV (Optimisé A4 / PDF)" : "Print CV (Optimized A4 / PDF)"}
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>{curr.printBtn}</span>
        </button>
      </div>

    </div>
  );
}
