import React, { createContext, useContext, useState, useEffect } from "react";

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
          title: "EcoRoute - Itinéraire Carbone Vert",
          description: "Application de cartographie optimisée calculant l'itinéraire optimal rejetant le moins de CO2 en temps réel. Intègre l'API Google Maps, un stockage chiffré des clés de sessions et d'API, et un tableau de bord analytique rigoureusement sécurisé.",
          techStack: ["React Native", "TypeScript", "Node.js", "Express", "Google Maps API", "Tailwind CSS"],
          category: "Mobile",
          githubUrl: "https://github.com/pierre-tchinda/ecoroute-mobile",
          demoUrl: "https://github.com/pierre-tchinda/ecoroute-mobile",
          featured: true,
          image: "/src/assets/images/ecoroute_app_1779368251643.png"
        },
        {
          id: "pro-2",
          title: "DevSpace - Blog & Communauté Synchrone",
          description: "Plateforme communautaire et micro-blogging pour développeurs. Éditeur technique en Markdown sécurisé contre les injections (XSS/input laundering). Les échanges synchrones s'effectuent par un protocole WebSocket blindé avec authentification JWT.",
          techStack: ["React", "Express", "REST APIs", "WebSockets", "MongoDB", "Tailwind CSS"],
          category: "Web",
          githubUrl: "https://github.com/pierre-tchinda/devspace-platform",
          demoUrl: "https://github.com/pierre-tchinda/devspace-platform",
          featured: true,
          image: "/src/assets/images/devspace_app_1779368265088.png"
        },
        {
          id: "pro-3",
          title: "Agrimarket - Commerce Agricole Équitable",
          description: "Portail mobile connectant producteurs agricoles et acheteurs urbains au Cameroun. Intègre des règles de sécurité (Firestore Security Rules) très strictes pour s'assurer que les données et les transactions financières des utilisateurs restent hautement sécurisées.",
          techStack: ["React Native", "Firebase", "Firestore", "Cloud Functions", "Expo Push Notifications"],
          category: "Impact Social",
          githubUrl: "https://github.com/pierre-tchinda/agrimarket-impact",
          demoUrl: "https://github.com/pierre-tchinda/agrimarket-impact",
          featured: true,
          image: "/src/assets/images/agrimarket_app_1779368280856.png"
        },
        {
          id: "pro-4",
          title: "TaskPulse - Backoffice de Gestion Agile",
          description: "Outil d'administration de workflow d'équipes. Gère finement les rôles utilisateurs et l'accès réseau. Protégé contre les injections SQL grâce à de l'Object-Relational Mapping (ORM) et intègre des visualisations sécurisées de données d'activité.",
          techStack: ["React", "TypeScript", "PostgreSQL", "Knex.js", "Tailwind CSS", "Recharts"],
          category: "Web",
          githubUrl: "https://github.com/pierre-tchinda/taskpulse-dashboard",
          demoUrl: "https://github.com/pierre-tchinda/taskpulse-dashboard",
          featured: false,
          image: "/src/assets/images/taskpulse_app_1779368297129.png"
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
          title: "Google Cybersecurity Professional Certificate",
          issuer: "Google (via Coursera)",
          date: "Avril 2026",
          credentialId: "COURSERA-GOOGLE-CYBERSEC9",
          url: "https://coursera.org/verify/google-cybersecurity",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
        },
        {
          id: "cert-2",
          title: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta (via Coursera)",
          date: "Février 2026",
          credentialId: "COURSERA-META-7781F",
          url: "https://coursera.org/verify/meta-frontend-dev",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
        },
        {
          id: "cert-3",
          title: "IBM Cybersecurity Analyst Professional Certificate",
          issuer: "IBM (via Coursera)",
          date: "Novembre 2025",
          credentialId: "COURSERA-IBM-SECANALYST1",
          url: "https://coursera.org/verify/ibm-cybersecurity-analyst",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
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
          images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507842229447-ff47f4f66487?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532012164546-f432f2e37273?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop"
          ]
        },
        {
          id: "gaming",
          title: "Gaming",
          description: "Adepte de jeux vidéo de stratégie, de jeux de rôle immersifs et d'eSports. Le gaming est pour moi une source d'inspiration en matière de gamification, d'interfaces narratives interactives et de résolution de défis analytiques sous pression.",
          images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548685913-fe6574340a49?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop"
          ]
        },
        {
          id: "anime",
          title: "Anime/Designer",
          description: "Passionné d'animation japonaise, de charadesign et d'illustrations vectorielles numériques. Le dessin numérique affine mon œil pour le choix des palettes de couleurs, l'harmonie des contrastes et la cohérence esthétique dans les interfaces applicatives.",
          images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop"
          ]
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
          title: "EcoRoute - Carbon-Light Navigation",
          description: "Mobile mapping app calculating optimal eco-friendly routes yielding the lowest carbon footprint. Integrates Google Maps API, a highly secured API key holder mechanism, and custom cryptographic session managers.",
          techStack: ["React Native", "TypeScript", "Node.js", "Express", "Google Maps API", "Tailwind CSS"],
          category: "Mobile",
          githubUrl: "https://github.com/pierre-tchinda/ecoroute-mobile",
          demoUrl: "https://github.com/pierre-tchinda/ecoroute-mobile",
          featured: true,
          image: "/src/assets/images/ecoroute_app_1779368251643.png"
        },
        {
          id: "pro-2",
          title: "DevSpace - Blog & Live Community",
          description: "Social blog system for programmers. Integrates Markdown rendering protected against XSS injections. Live exchanges are powered by WebSockets protected by robust, secure JSON Web Token authentication.",
          techStack: ["React", "Express", "REST APIs", "WebSockets", "MongoDB", "Tailwind CSS"],
          category: "Web",
          githubUrl: "https://github.com/pierre-tchinda/devspace-platform",
          demoUrl: "https://github.com/pierre-tchinda/devspace-platform",
          featured: true,
          image: "/src/assets/images/devspace_app_1779368265088.png"
        },
        {
          id: "pro-3",
          title: "AgriMarket - Fair-Trade Farmer App",
          description: "A high-impact social mobile portal connecting rural Cameroonian farmers with central urbans. Built on specialized Firebase security policies (Firestore Security Rules) protecting user data from unsolicited read/writes.",
          techStack: ["React Native", "Firebase", "Firestore", "Cloud Functions", "Expo Push Notifications"],
          category: "Impact Social",
          githubUrl: "https://github.com/pierre-tchinda/agrimarket-impact",
          demoUrl: "https://github.com/pierre-tchinda/agrimarket-impact",
          featured: true,
          image: "/src/assets/images/agrimarket_app_1779368280856.png"
        },
        {
          id: "pro-4",
          title: "TaskPulse - Agile Backoffice Panel",
          description: "Visual agile team task workspace. Integrates strict user privilege role mapping, protection against SQL injection bugs using an ORM layer, and safe graphic charting modules.",
          techStack: ["React", "TypeScript", "PostgreSQL", "Knex.js", "Tailwind CSS", "Recharts"],
          category: "Web",
          githubUrl: "https://github.com/pierre-tchinda/taskpulse-dashboard",
          demoUrl: "https://github.com/pierre-tchinda/taskpulse-dashboard",
          featured: false,
          image: "/src/assets/images/taskpulse_app_1779368297129.png"
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
          title: "Google Cybersecurity Professional Certificate",
          issuer: "Google (via Coursera)",
          date: "April 2026",
          credentialId: "COURSERA-GOOGLE-CYBERSEC9",
          url: "https://coursera.org/verify/google-cybersecurity",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
        },
        {
          id: "cert-2",
          title: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta (via Coursera)",
          date: "February 2026",
          credentialId: "COURSERA-META-7781F",
          url: "https://coursera.org/verify/meta-frontend-dev",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
        },
        {
          id: "cert-3",
          title: "IBM Cybersecurity Analyst Professional Certificate",
          issuer: "IBM (via Coursera)",
          date: "November 2025",
          credentialId: "COURSERA-IBM-SECANALYST1",
          url: "https://coursera.org/verify/ibm-cybersecurity-analyst",
          image: "/src/assets/images/cert_diploma_1779368313219.png"
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
          images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507842229447-ff47f4f66487?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532012164546-f432f2e37273?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop"
          ]
        },
        {
          id: "gaming",
          title: "Gaming",
          description: "A fan of tactical strategy, high-fidelity RPGs, and eSports games. Gaming functions as my school of thought regarding fluid interactive workflows, gamified applications mechanisms, and tackling analytical problems under time pressure.",
          images: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548685913-fe6574340a49?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop"
          ]
        },
        {
          id: "anime",
          title: "Anime/Designer",
          description: "Admire Japanese anime animations, character sketch styles, and clean dynamic vector illustrations. Digitally sketching deepens my execution of beautiful color harmonies, optimal margins, and visual weight inside structural user interfaces.",
          images: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501472312651-726afd116ff1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop"
          ]
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
