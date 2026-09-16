import React, { createContext, useContext, useState, useEffect } from "react";
import htmlCssPdf from "./certification/Coursera YSFMHPJLFWQ8.pdf";
import aiFundamentalsPdf from "./certification/Coursera YY5XVWYEGXM0.pdf";
import programmingJavaPdf from "./certification/Coursera 7YD2H6OK7U2O.pdf";
import htmlCssPreview from "./certification/cert_html_css_p.jpg";
import aiFundamentalsPreview from "./certification/cert_ai_fundamentals_p.jpg";
import programmingJavaPreview from "./certification/cert_programming_java_p.jpg";
import htmlCssHi from "./certification/html_css_hi.jpg";
import aiFundamentalsHi from "./certification/ai_fund_hi.jpg";
import programmingJavaHi from "./certification/programming_java_hi.jpg";
import portfolioSiteImage from "./assets/images/portfolio_site.webp";

const hobbyImages = import.meta.glob("./hobbies/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const HOBBIES: Record<"reading" | "gaming" | "anime", string[]> = {
  reading: [
    hobbyImages["./hobbies/reading/andrew-neel-cckf4TsHAuw-unsplash.jpg"],
    hobbyImages["./hobbies/reading/christopher-gower-m_HRfLhgABo-unsplash.jpg"],
    hobbyImages["./hobbies/reading/daniel-korpai-pKRNxEguRgM-unsplash.jpg"],
    hobbyImages["./hobbies/reading/domenico-loia-hGV2TfOh0ns-unsplash.jpg"],
    hobbyImages["./hobbies/reading/eftakher-alam-i1VQZsU86ok-unsplash.jpg"],
    hobbyImages["./hobbies/reading/julian-hochgesang-Dkn8-zPIbwo-unsplash.jpg"],
    hobbyImages["./hobbies/reading/lee-campbell-DtDlVpy-vvQ-unsplash.jpg"],
  ],
  gaming: [
    hobbyImages["./hobbies/gaming/download.jpg"],
    hobbyImages["./hobbies/gaming/fiche-pokedex-legendes-pokemon-za-info-attaques-emplacement-localisation-guide.jpg"],
    hobbyImages["./hobbies/gaming/pokemon-violet-ecarlate-guide-fiche-pokedex-capacites-talents-evolution-localisation-infos.jpg"],
    hobbyImages["./hobbies/gaming/pokemon-violet-ecarlate-guide-fiche-pokedex-capacites-talents-evolution-localisation-infos-dlc-2-disque-indigo-myrtille-tresor-enfoui-zone-zero.jpg"],
  ],
  anime: [
    hobbyImages["./hobbies/anime-art/22f33386454e6d1585ae9e1b89c821e2.jpg"],
    hobbyImages["./hobbies/anime-art/25986acdd337284c9604bcad32a44117.jpg"],
    hobbyImages["./hobbies/anime-art/292fb5b83cdd67bf29dcd93bbd4c4a27.jpg"],
    hobbyImages["./hobbies/anime-art/316bf0476b254eb7e2e0bd43dc6b675c.jpg"],
    hobbyImages["./hobbies/anime-art/325b5039ff20d929d11e74072fbc11fe.jpg"],
    hobbyImages["./hobbies/anime-art/420b6554c96903e3f3c3f3e6b4f6b7b2.jpg"],
    hobbyImages["./hobbies/anime-art/439417b7840cabb294bb7e612712de4f.jpg"],
    hobbyImages["./hobbies/anime-art/8e4d1656ed2a03d2337ba7fee064a8ed.jpg"],
    hobbyImages["./hobbies/anime-art/991e943a0d98683ccaa2b625fd7e4c06.jpg"],
  ],
};

export type Language = "FR" | "EN";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const translations = {
  FR: {
    navbar: {
      logo: "Tchinda",
      accueil: "Accueil",
      parcours: "Parcours",
      projets: "Projets",
      competences: "Compétences",
      certifications: "Certifications",
      blog: "Blog",
      passions: "Passions & Équilibre",
      contact: "Contact",
      aiButton: "Assistant IA"
    },
    hero: {
      badge: "Disponible pour opportunités Web & Sécurité",
      greeting: "Salut, je suis ",
      name: "Pierre Tchinda",
      subtitle: "Développeur Web, Programmeur & Analyste Sécurité",
      description: "Actuellement étudiant en Licence en Informatique (Niveau 2) : En cours... à l'Université de Yaoundé I. Je fusionne rigueur de programmation, développement web moderne et analyse des risques de sécurité pour concevoir des applications résilientes et performantes.",
      cta_ai: "Tester mon assistant IA",
      cta_projects: "Consulter mes projets",
    },
    about: {
      title: "À Propos & Parcours",
      subtitle: "Découvrez mon parcours académique et professionnel en tant que développeur web et analyste de sécurité informatique.",
      identity_title: "Mon Identité De Développeur",
      identity_p1: "Passionné de programmation classique, du Web et de la cybersécurité, je suis actuellement en Licence en Informatique (Niveau 2) : En cours... à l'Université de Yaoundé I. Je consolide mes fondations d'architecte logiciel et d'auditeur de vulnérabilités.",
      identity_p2: "J'aime concevoir des architectures web réactives basées sur le JavaScript/TypeScript (React, Node.js) tout en explorant la sécurité applicative (OWASP Top 10, tests d'intrusion, audit de code source). Mon objectif est de bâtir des solutions performantes d'une haute résilience opérationnelle.",
      statut_label: "STATUT ACADÉMIQUE :",
      statut_value: "Licence en Informatique (Niveau 2) : En cours...",
      localisation_label: "LOCALISATION :",
      localisation_value: "Yaoundé, Cameroun",
      dispo_label: "DISPONIBILITÉ :",
      dispo_value: "Freelance & Stage",
      timeline_title: "Mon Historique Académique & Pratique",
      filter_all: "Tous",
      filter_work: "Expériences Pro",
      filter_edu: "Formation",
      empty_timeline: "Aucun élément disponible pour cette catégorie.",
      timeline: [
        {
          id: "edu-1",
          title: "Licence en Informatique (Niveau 2) : En cours...",
          organization: "Université de Yaoundé I (UY1)",
          location: "Yaoundé, Cameroun",
          duration: "2025 - Présent",
          description: [
            "Approfondissement de l'algorithmique, des structures de données complexes et de la programmation système.",
            "Conception de protocoles d'échange web sécurisés et bases solides d'administration réseau.",
            "Automatisation via du scripting (Bash, Python) et études théoriques en cryptographie."
          ],
          type: "education"
        },
        {
          id: "work-1",
          title: "Développeur Web & Analyste Scripting (Freelance)",
          organization: "Projets Indépendants & Services Numériques",
          location: "Hybride / Cameroun",
          duration: "2025 - Présent",
          description: [
            "Conception et mise en production d'interfaces web adaptatives en React et de portails métiers performants.",
            "Intégration de mécanismes de sécurité robustes (contrôle d'accès, sanitization des entrées, protection XSS/CSRF).",
            "Déploiement et orchestration légère d'environnements virtualisés à l'aide de Docker."
          ],
          type: "work"
        },
        {
          id: "edu-2",
          title: "Licence en Informatique (Niveau 1)",
          organization: "Université de Yaoundé I (UY1)",
          location: "Yaoundé, Cameroun",
          duration: "2024 - 2025",
          description: [
            "Bases solides d'algorithmique fondamentale en C/C++ et fondements mathématiques de l'informatique.",
            "Introduction au développement Web moderne (HTML5, CSS3, ES6+ JavaScript).",
            "Modélisation et mise en œuvre de bases de données relationnelles SQL."
          ],
          type: "education"
        },
        {
          id: "work-2",
          title: "Technicien Informatique & Sécurité (Stage)",
          organization: "Services technologiques locaux",
          location: "Yaoundé, Cameroun",
          duration: "Juin 2025 - Août 2025",
          description: [
            "Maintenance informatique réseau et sensibilisation interne à la sécurité des systèmes d'information.",
            "Conception de Landing Pages réactives et interfaces utilisateur web sécurisées.",
            "Initiation à l'analyse de journaux d'événements réseaux et identification des vulnérabilités."
          ],
          type: "work"
        }
      ]
    },
    skills: {
      title: "Compétences Techniques",
      subtitle: "Mon profil est structuré autour du développement web moderne, de la maîtrise des langages de programmation, et de l'analyse de sécurité applicative.",
      categories: {
        Frontend: "Ingénierie Frontend",
        Backend: "Développement Backend",
        "Base de données": "Bases de Données",
        "DevOps & Outils": "DevOps & Outils"
      }
    },
    projects: {
      title: "Projets & Réalisations",
      subtitle: "Sélection d'applications web et de solutions de programmation construites dans le respect des standards de codage moderne et de sécurité.",
      empty: "Aucun projet ne correspond aux filtres actuels.",
      categories: {
        Tous: "Tous",
        Web: "Web",
        Mobile: "Mobile",
        "Impact Social": "Impact Social",
        Fullstack: "Fullstack"
      },
      list: [
        {
          id: "pro-1",
          title: "Portfolio & Blog — Développement Fullstack",
          description: "Site personnel complet : portfolio, blog technique et CV interactif. Développé avec React et TypeScript, il intègre un backend Express avec persistance SQLite, un formulaire de contact sécurisé, un blog alimenté par une API REST et le bilinguisme FR/EN.",
          techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Express", "SQLite"],
          category: "Fullstack",
          githubUrl: "https://github.com/pierre-tchinda/portfolio-blog-dev-fullstack",
          demoUrl: "https://tchinda-fogang.me",
          image: portfolioSiteImage
        }
      ]
    },
    certifications: {
      title: "Certifications Professionnelles (Coursera)",
      subtitle: "Garanties d'un processus continu d'accréditation, ces certifications obtenues via Coursera confirment mes compétences auprès de leaders technologiques mondiaux.",
      badge: "Vérifié",
      verified: "Vérifié",
      acquired: "Obtenu en",
      verify_button: "Vérifier la certification",
      cta: "Vérifier les compétences",
      list: [
        {
          id: "cert-1",
title: "HTML and CSS in depth",
          issuer: "Meta (via Coursera)",
          description: "Maîtrise des fondamentaux du développement web : HTML sémantique et accessible, CSS moderne avec Flexbox et Grid, et design responsive adapté à tous les écrans.",
          credentialId: "YSFMHPJLFWQ8",
          url: "https://coursera.org/verify/YSFMHPJLFWQ8",
          image: htmlCssPreview,
          largeImage: htmlCssHi,
          pdfPath: htmlCssPdf
        },
        {
          id: "cert-2",
          title: "AI Fundamentals",
          issuer: "Google (via Coursera)",
          description: "Introduction pratique à l'intelligence artificielle : principes du machine learning, éthique de l'IA et cas d'usage concrets dans des applications métier.",
          credentialId: "YY5XVWYEGXM0",
          url: "https://coursera.org/verify/YY5XVWYEGXM0",
          image: aiFundamentalsPreview,
          largeImage: aiFundamentalsHi,
          pdfPath: aiFundamentalsPdf
        },
        {
          id: "cert-3",
          title: "Programming with Java",
          issuer: "Amazon (via Coursera)",
          description: "Apprentissage complet du langage Java : structures de données essentielles, programmation orientée objet, gestion des exceptions et développement d'applications Java robustes et maintenables.",
          credentialId: "7YD2H6OK7U2O",
          url: "https://coursera.org/verify/7YD2H6OK7U2O",
          image: programmingJavaPreview,
          largeImage: programmingJavaHi,
          pdfPath: programmingJavaPdf
        }
      ]
    },
    blog: {
      title: "Blog Technique & Partage",
      subtitle: "Retours d'expérience, tutoriels et réflexions sur la sécurisation d'applications web et de programmation.",
      searchPlaceholder: "Rechercher un article...",
      reactions: "Réactions",
      comments: "Commentaires",
      writeComment: "Écrire un commentaire...",
      addCommentBtn: "Ajouter",
      inputAuthor: "Votre nom",
      inputComment: "Votre commentaire...",
      readTime: "min de lecture",
      likes: "J'aime",
      toggleComments: "Commentaires",
      categories: {
        Tous: "Tous",
        Mobile: "Mobile",
        Architecture: "Architecture",
        TypeScript: "TypeScript"
      }
    },
    passions: {
      title: "Passions & Équilibre",
      subtitle: "Derrière le code se cachent des centres d'intérêt artistiques, interactifs et créatifs essentiels à mon équilibre de vie.",
      signature: "Expression créative",
      categories: [
        {
          id: "reading",
          title: "Lecture & Veille Intellectuelle",
          description: "Passionné par la lecture d'essais technologiques, d'architecture logicielle, d'ouvrages scientifiques et de philosophie. La lecture quotidienne nourrit ma curiosité intellectuelle, renforce mon esprit critique et forge une capacité de concentration profonde, indispensable pour concevoir et structurer des architectures informatiques exigeantes.",
          images: HOBBIES.reading
        },
        {
          id: "gaming",
          title: "Gaming",
          description: "Adepte de jeux vidéo de stratégie, de jeux de rôle immersifs et d'eSports. Le gaming est pour moi une source d'inspiration en matière de gamification, d'interfaces narratives interactives et de résolution de défis analytiques sous pression.",
          images: HOBBIES.gaming
        },
        {
          id: "anime",
          title: "Anime/Designer",
          description: "Passionné d'animation japonaise, de charadesign et d'illustrations vectorielles numériques. Le dessin numérique affine mon œil pour le choix des palettes de couleurs, l'harmonie des contrastes et la cohérence esthétique dans les interfaces applicatives.",
          images: HOBBIES.anime
        }
      ]
    },
    contact: {
      title: "Contact & Connexion",
      subtitle: "Un projet à développer, une opportunité de stage, ou simplement envie d'échanger autour d'une opportunité ? Envoyez-moi un message.",
      sidebar_title: "Mes Coordonnées Officielles",
      sidebar_subtitle: "Université de Yaoundé I, Licence en Informatique.",
      field_name: "Nom complet",
      field_email: "Adresse e-mail",
      field_msg: "Message",
      field_subject: "Sujet",
      btn_submit: "Envoyer le message",
      btn_submitting: "Envoi en cours...",
      success: "Message envoyé avec succès ! Pierre vous répondra rapidement.",
      error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
    },
    footer: {
      descr: "Développeur logiciel & analyste sécurité. Conçu avec soin en React, Tailwind CSS et Node.js.",
      nav_top: "Haut de page",
      rights: "Tous droits réservés.",
      univ: "Université de Yaoundé I · Licence Informatique"
    },
    chat: {
      title: "Assistant IA de Pierre",
      status: "Prêt à répondre en direct",
      welcome: "Bonjour ! Je suis l'assistant IA de Pierre Tchinda. Posez-moi des questions sur son parcours en Licence 2, ses compétences en développement web et analyse sécurité, ses projets, ou recrutez-le directement !",
      placeholder: "Écrivez votre message ici...",
      send: "Envoyer"
    }
  },
  EN: {
    navbar: {
      logo: "Tchinda",
      accueil: "Home",
      parcours: "Journey",
      projets: "Projects",
      competences: "Skills",
      certifications: "Certifications",
      blog: "Blog",
      passions: "Passions & Balance",
      contact: "Contact",
      aiButton: "AI Assistant"
    },
    hero: {
      badge: "Available for Web & Security Opportunities",
      greeting: "Hi, I am ",
      name: "Pierre Tchinda",
      subtitle: "Web Developer, Programmer & Security Analyst",
      description: "Currently pursuing a Bachelor's Degree in CS (Level 2 : In progress...) at the University of Yaoundé I. I merge versatile programming, modern web development, and security threat modeling to deliver resilient digital platforms.",
      cta_ai: "Try my AI assistant",
      cta_projects: "Browse my projects",
    },
    about: {
      title: "About & Journey",
      subtitle: "Discover my professional and academic background in software engineering and application security.",
      identity_title: "My Developer Identity",
      identity_p1: "Deeply interested in algorithms, software programming, and cybersecurity, I am in my second year (Licence en Informatique Niveau 2 : En cours...) at the University of Yaoundé I.",
      identity_p2: "I engineer responsive web systems using modern JavaScript/TypeScript (React, Node.js) while integrating deep concepts of application safety (OWASP Top 10 prevention, secure API routes, data Sanitization). My goal is high performance paired with bulletproof security.",
      statut_label: "ACADEMIC STATUS:",
      statut_value: "Licence en Informatique (Niveau 2) : En cours...",
      localisation_label: "LOCATION:",
      localisation_value: "Yaoundé, Cameroon",
      dispo_label: "AVAILABILITY:",
      dispo_value: "Freelance & Internships",
      timeline_title: "My Educational & Practical Timeline",
      filter_all: "All",
      filter_work: "Work Experience",
      filter_edu: "Education",
      empty_timeline: "No entries available for this category.",
      timeline: [
        {
          id: "edu-1",
          title: "Bachelor's Degree in Computer Science (Level 2 : In progress...)",
          organization: "University of Yaoundé I (UY1)",
          location: "Yaoundé, Cameroon",
          duration: "2025 - Present",
          description: [
            "Extending data structures knowledge, advanced algorithms layouts, and system programming.",
            "Designing secure data transfer interfaces and mastering network architecture paradigms.",
            "Process scripting automation (Bash, Python) and studying cryptography algorithms."
          ],
          type: "education"
        },
        {
          id: "work-1",
          title: "Freelance Web Developer & Scripting Analyst",
          organization: "Independent Software Projects",
          location: "Hybrid / Cameroon",
          duration: "2025 - Present",
          description: [
            "Building robust, accessible and responsive React web platforms and business portals.",
            "Applying state-of-the-art security countermeasures (preventing XSS, SQL injection, secure session handling).",
            "Orchestrating, compiling and containerizing scalable environments using Docker."
          ],
          type: "work"
        },
        {
          id: "edu-2",
          title: "Bachelor's Degree in Computer Science (1st Year)",
          organization: "University of Yaoundé I (UY1)",
          location: "Yaoundé, Cameroon",
          duration: "2024 - 2025",
          description: [
            "Acquiring strong fundamentals in algorithmic C/C++ coding and discrete mathematics.",
            "Introduction to fundamental web programming languages (HTML5, CSS3, ES6+ JS).",
            "Designing basic relational schemas and manipulating relational tables with SQL query languages."
          ],
          type: "education"
        },
        {
          id: "work-2",
          title: "IT Support & Security Intern",
          organization: "Local IT & Network Service Provider",
          location: "Yaoundé, Cameroon",
          duration: "June 2025 - August 2025",
          description: [
            "Ensuring physical system maintenance, computer networking, and basic operational cybersecurity audits.",
            "Designing reactive landing pages and security-aware user forms inside React.",
            "Familiarizing with event logs analysis and identification of modern server vulnerabilities."
          ],
          type: "work"
        }
      ]
    },
    skills: {
      title: "Technical Skills",
      subtitle: "My technical profile centers on modern web engineering, versatile programming, and application security analysis.",
      categories: {
        Frontend: "Frontend Engineering",
        Backend: "Backend Development",
        "Base de données": "Database Systems",
        "DevOps & Outils": "DevOps & Tooling"
      }
    },
    projects: {
      title: "Projects & Works",
      subtitle: "A selected showcase of web applications and programming files created keeping elite coding standards and security principles in mind.",
      empty: "No projects match the current filters.",
      categories: {
        Tous: "All",
        Web: "Web",
        Mobile: "Mobile",
        "Impact Social": "Social Impact",
        Fullstack: "Fullstack"
      },
      list: [
        {
          id: "pro-1",
          title: "Portfolio & Blog — Fullstack Development",
          description: "Complete personal website: portfolio, tech blog and interactive CV. Built with React and TypeScript, it features an Express backend with SQLite persistence, a secure contact form, a blog powered by a REST API and FR/EN bilingual support.",
          techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Express", "SQLite"],
          category: "Fullstack",
          githubUrl: "https://github.com/pierre-tchinda/portfolio-blog-dev-fullstack",
          demoUrl: "https://tchinda-fogang.me",
          image: portfolioSiteImage
        }
      ]
    },
    certifications: {
      title: "Professional Certifications (Coursera)",
      subtitle: "A testament to continuous accredited learning, these certificates issued by global technology leaders on Coursera validate my industry credentials.",
      badge: "Verified",
      verified: "Verified",
      acquired: "Acquired in",
      verify_button: "Verify Certification",
      cta: "Verify Credentials",
      list: [
        {
          id: "cert-1",
          title: "HTML and CSS in depth",
          issuer: "Meta (via Coursera)",
          description: "Mastery of core web development fundamentals: semantic and accessible HTML, modern CSS with Flexbox and Grid, and responsive design for every screen.",
          credentialId: "YSFMHPJLFWQ8",
          url: "https://coursera.org/verify/YSFMHPJLFWQ8",
          image: htmlCssPreview,
          largeImage: htmlCssHi,
          pdfPath: htmlCssPdf
        },
        {
          id: "cert-2",
          title: "AI Fundamentals",
          issuer: "Google (via Coursera)",
          description: "A practical introduction to artificial intelligence: machine learning principles, AI ethics, and concrete use cases in business applications.",
          credentialId: "YY5XVWYEGXM0",
          url: "https://coursera.org/verify/YY5XVWYEGXM0",
          image: aiFundamentalsPreview,
          largeImage: aiFundamentalsHi,
          pdfPath: aiFundamentalsPdf
        },
        {
          id: "cert-3",
          title: "Programming with Java",
          issuer: "Amazon (via Coursera)",
          description: "Comprehensive Java training: essential data structures, object-oriented programming, exception handling, and building robust, maintainable Java applications.",
          credentialId: "7YD2H6OK7U2O",
          url: "https://coursera.org/verify/7YD2H6OK7U2O",
          image: programmingJavaPreview,
          largeImage: programmingJavaHi,
          pdfPath: programmingJavaPdf
        }
      ]
    },
    blog: {
      title: "Technical Writing & Posts",
      subtitle: "Stories, tutorials, and vulnerability analysis notes regarding modern web security models, system configurations, and stable database schemas.",
      searchPlaceholder: "Search posts...",
      reactions: "Reactions",
      comments: "Comments",
      writeComment: "Write a comment...",
      addCommentBtn: "Post",
      inputAuthor: "Your name",
      inputComment: "Your comment...",
      readTime: "min read",
      likes: "Likes",
      toggleComments: "Comments",
      categories: {
        Tous: "All",
        Mobile: "Mobile",
        Architecture: "Architecture",
        TypeScript: "TypeScript"
      }
    },
    passions: {
      title: "Passions & Balance",
      subtitle: "Beyond writing software lies artistic, interactive, and physical pursuits critical to my daily inspiration and analytical equilibrium.",
      signature: "Creative expression",
      categories: [
        {
          id: "reading",
          title: "Reading & Intellectual Exploration",
          description: "Avid reader of software architecture books, technology essays, philosophy, and thought-provoking scientific literature. Daily reading cultivates intellectual curiosity, sharpens analytical discipline, and fosters the deep focus vital for architecting intricate digital systems.",
          images: HOBBIES.reading
        },
        {
          id: "gaming",
          title: "Gaming",
          description: "A fan of tactical strategy, high-fidelity RPGs, and eSports games. Gaming functions as my school of thought regarding fluid interactive workflows, gamified applications mechanisms, and tackling analytical problems under time pressure.",
          images: HOBBIES.gaming
        },
        {
          id: "anime",
          title: "Anime/Designer",
          description: "Admire Japanese anime animations, character sketch styles, and clean dynamic vector illustrations. Digitally sketching deepens my execution of beautiful color harmonies, optimal margins, and visual weight inside structural user interfaces.",
          images: HOBBIES.anime
        }
      ]
    },
    contact: {
      title: "Contact & Connect",
      subtitle: "Have a software project, an internship opening, or want to share professional thoughts? Feel free to write me. I'll get back to you promptly.",
      sidebar_title: "Official Contact Details",
      sidebar_subtitle: "University of Yaoundé I, Bachelor in Computer Science candidate.",
      field_name: "Full Name",
      field_email: "Email address",
      field_msg: "Message",
      field_subject: "Subject",
      btn_submit: "Send Message",
      btn_submitting: "Sending...",
      success: "Your email message was sent successfully! Pierre will respond shortly.",
      error: "An error occurred while sending your message. Please try again."
    },
    footer: {
      descr: "High-impact Web developer & security analyst. Passionately crafted with React, Tailwind CSS, and Node.js.",
      nav_top: "Back to top",
      rights: "All rights reserved.",
      univ: "University of Yaoundé I · BSc Computer Science"
    },
    chat: {
      title: "Pierre's AI Assistant",
      status: "Online & Ready",
      welcome: "Hello! I am Pierre Tchinda's AI Assistant. Ask me anything about his Bachelor's studies (Licence 2), his web programming and security analysis skills, his main projects, or feel free to hire him directly!",
      placeholder: "Write your message...",
      send: "Send"
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("FR");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "FR" || saved === "EN") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let current: any = translations[language];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        return key; // return key as fallback
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
