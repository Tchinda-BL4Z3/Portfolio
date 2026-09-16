import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  getAllPosts,
  getPostById,
  toggleLike,
  addComment,
  deleteComment,
  deletePost,
  createPost,
  saveContact,
  db,
} from "./src/db";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// ── Security helpers (see upDate.md audit) ──────────────────────────────────

function rateLimit({ windowMs = 60_000, max = 20 }) {
  const hits = new Map<string, number[]>();
  const cleanup = setInterval(() => {
    const cutoff = Date.now() - windowMs;
    for (const [key, ts] of hits) {
      const kept = ts.filter((t) => t > cutoff);
      if (kept.length) hits.set(key, kept);
      else hits.delete(key);
    }
  }, windowMs);
  cleanup.unref();
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const cutoff = now - windowMs;
    const ts = (hits.get(key) || []).filter((t) => t > cutoff);
    if (ts.length >= max) {
      return res.status(429).json({ error: "Trop de requêtes. Veuillez réessayer dans quelques instants." });
    }
    ts.push(now);
    hits.set(key, ts);
    next();
  };
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const expected = process.env.ADMIN_KEY;
  if (!expected) {
    console.warn("ADMIN_KEY n'est pas défini : création d'articles désactivée.");
    return res.status(503).json({ error: "Création d'articles indisponible : ADMIN_KEY non configurée côté serveur." });
  }
  const provided = req.get("x-admin-key") || "";
  if (!safeEqual(provided, expected)) {
    return res.status(401).json({ error: "Non autorisé : clé d'administration invalide." });
  }
  next();
}

const LIMITS = {
  title: 200,
  excerpt: 500,
  content: 50_000,
  readTime: 20,
  category: 50,
  author: 100,
  comment: 2_000,
  contactName: 100,
  contactSubject: 200,
  contactMessage: 5_000,
};

function withinLimits(obj: Record<string, unknown>, limits: Record<string, number>) {
  for (const [field, max] of Object.entries(limits)) {
    const val = obj[field];
    if (typeof val === "string" && val.length > max) {
      return `${field} ne doit pas dépasser ${max} caractères (reçu ${val.length}).`;
    }
  }
  return null;
}

const SEED_POSTS = [
  {
    id: "post-1",
    title: "Pourquoi React Native est le choix idéal pour lancer un MVP en 2026",
    excerpt: "Comment optimiser le cycle de développement mobile de votre startup grâce à un code source unique, tout en conservant une expérience utilisateur 100% native.",
    content: `Le lancement d'un produit Minimum Viable (MVP) est une étape cruciale pour toute startup ou nouveau projet de développement. En tant que développeur Full Stack, j'ai vu à quel point le choix de la technologie influence la réussite de cette étape.

### Qu'est-ce qui rend React Native incontournable ?

1. **Un seul code source pour deux plateformes**
L'écriture d'une application distincte pour iOS (Swift) et Android (Kotlin/Java) double le coût et le temps de développement. React Native permet de partager jusqu'à 90% du code source.

2. **Performance quasi-native avec l'Architecture Moderne**
Grâce au nouveau moteur JSI (JavaScript Interface) et à Fabric, React Native communique directement avec les modules natifs sans passer par l'ancien pont asynchrone, offrant d'excellentes performances graphiques à 60 FPS.

3. **Écosystème de composants robustes (Expo)**
L'ensemble de frameworks 'Expo' accélère l'accès au matériel (caméra, géolocalisation, notifications push, capteurs) avec une stabilité impressionnante.

Choisir le bon framework dépend bien sûr de vos besoins spécifiques, mais pour 95% des applications d'affaires et de commerce, React Native offre le rapport vitesse/qualité le plus élevé du marché.`,
    date: "2026-05-18",
    readTime: "4 min",
    category: "Mobile",
    likes: 0,
    comments: [
      { author: "Stéphane", text: "Super article ! Entièrement d'accord sur le rôle d'Expo dans la rapidité de prototypage.", date: "2026-05-19" }
    ]
  },
  {
    id: "post-2",
    title: "Comprendre TypeScript : Le guide ultime vers le typage strict et sécurisé",
    excerpt: "Pourquoi le passage de JavaScript à TypeScript est indispensable pour la pérennité de vos architectures backend Node.js et vos projets React.",
    content: `Beaucoup de développeurs voient TypeScript comme une contrainte supplémentaire à cause du temps investi à déclarer des types et des interfaces. Pourtant, c'est l'investissement le plus rentable pour une application de production robuste.

### Les avantages immédiats pour les applications Fullstack :

* **Zéro bug de type 'undefined is not a function' au runtime**
* **Autocomplétion intelligente et puissante** dans l'éditeur
* **Refactoring serein** des bases de code complexes sans avoir peur de tout casser
* **Documentation vivante** intégrée directement au code source

Si vous écrivez du Node/Express sur le backend, associer TypeScript rend vos routes ultra-sûres en validant les payloads JSON d'entrée en amont. C'est l'assurance d'un code robuste que les équipes adorent maintenir !`,
    date: "2026-04-30",
    readTime: "6 min",
    category: "TypeScript",
    likes: 0,
    comments: []
  },
  {
    id: "post-3",
    title: "Optimiser les requêtes PostgreSQL avec Node.js et Express",
    excerpt: "Découvrez des astuces simples de pooling de connexions et d'indexation pour multiplier par 10 les performances de vos APIs REST.",
    content: `La lenteur d'une API est rarement due aux performances intrinsèques de Node.js. Dans 80% des cas, le goulot d'étranglement réside dans la base de données ou dans la manière dont elle est sollicitée.

### 3 règles d'or pour vos bases PostgreSQL :

1. **Utiliser un Connection Pool**
Ne recréez pas une connexion pour chaque requête HTTP. Utilisez le module \`pg\` avec l'objet \`Pool\` pour réutiliser les sessions ouvertes.
2. **Indexer intelligemment vos clés étrangères**
Si vous faites des jointures fréquentes ou des filtres sur des colonnes spécifiques, ajoutez des index circulaires.
3. **Éviter le piège du SELECT * **
Ne demandez que les colonnes dont l'interface a besoin. Vous économiserez de la bande passante et de la mémoire vive sur le serveur.

En appliquant ces trois méthodes sur l'un de mes projets d'école, la vitesse de réponse de notre affichage de catalogue de produits est passée de 320ms à seulement 28ms !`,
    date: "2026-03-12",
    readTime: "5 min",
    category: "Backend",
    likes: 0,
    comments: [
      { author: "Marie", text: "L'explication sur le Connection Pool est très claire. Merci Pierre !", date: "2026-03-15" }
    ]
  }
];

function seedDatabase() {
  const count = (db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number }).count;
  if (count > 0) return;

  const insertPost = db.prepare(
    `INSERT INTO posts (id, title, excerpt, content, date, read_time, category, likes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertComment = db.prepare(
    `INSERT INTO comments (post_id, author, text, date) VALUES (?, ?, ?, ?)`
  );

  const seedAll = db.transaction(() => {
    for (const post of SEED_POSTS) {
      insertPost.run(
        post.id,
        post.title,
        post.excerpt,
        post.content,
        post.date,
        post.readTime,
        post.category,
        post.likes
      );
      for (const comment of post.comments) {
        insertComment.run(post.id, comment.author, comment.text, comment.date);
      }
    }
  });

  seedAll();
  console.log("Seed: article(s) initial(aux) inséré(s) dans SQLite.");
}

seedDatabase();

// Initialize Gemini safely on server-side
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini Client initialized successfully on server-side.");
  } else {
    console.warn("GEMINI_API_KEY is not defined in the environment. Chatbot will run in simulation mode.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// System Instruction summarizing Pierre Tchinda's professional developer profile
const SYSTEM_INSTRUCTION = `
Vous êtes un assistant IA intelligent, précis, chaleureux et polyvalent, présent sur le site portfolio de Pierre Tchinda (Développeur Web, Programmeur & Analyste Sécurité).

RÈGLE ABSOLUE #1 : RÉPONDEZ DIRECTEMENT ET PRÉCISEMENT À LA QUESTION POSÉE
- Si l'utilisateur pose une question générale (informatique, programmation, mathématiques, sciences, culture générale, conseils, vie quotidienne, etc.), répondez-lui DIRECTEMENT, EXPLICITEMENT et DE MANIÈRE COMPLÈTE à sa question.
- NE RAMENEZ PAS la réponse vers Pierre Tchinda ou vers le site portfolio, sauf si l'utilisateur pose explicitement une question sur Pierre, son parcours, ses projets ou ses compétences.
- Ne refusez jamais de répondre à une question sous prétexte qu'elle sort du profil de Pierre.

RÈGLE ABSOLUE #2 : RESPECT STRICT DE LA LANGUE
- Répondez TOUJOURS dans la MÊME LANGUE que le dernier message de l'utilisateur (Français, Anglais, Espagnol, etc.).

À PROPOS DE PIERRE TCHINDA (À utiliser si l'utilisateur vous pose des questions sur Pierre ou son profil) :
- Rôle : Développeur Web, Programmeur & Analyste Sécurité à Yaoundé (Cameroun).
- Établissement : Université de Yaoundé I (Faculté des Sciences), Licence 2 Informatique.
- Compétences : JavaScript, TypeScript, React, Node.js, Express, C/C++, Python, Bash, HTML5/CSS3, Tailwind CSS.
- Cybersécurité : Mitigation OWASP Top 10 (Injections SQL, XSS, CSRF, chiffrement, audits de code).
- Databases & DevOps : PostgreSQL, MySQL, Firestore, MongoDB, Docker, Git.
- Projets : EcoRoute (calcul d'itinéraire écologique), DevSpace (blog & communauté dev), AgriMarket (marketplace agricole), TaskPulse (gestion agile).
- Certifications : Google Cybersecurity, Meta Front-End Developer, IBM Cybersecurity Analyst (Coursera).
- Passion : Lecture & Veille Technologique, Gaming/E-sport, Anime & Art Digital.
- Contacts : pierre.tchinda@facsciences-uy1.cm | GitHub : github.com/pierre-tchinda | LinkedIn : linkedin.com/in/pierre-tchinda
`;

// Elegant, precise multilingual simulation responder that takes over in case of missing key or API failure
function getSimulatedResponse(messages: any[], isFr?: boolean): string {
  const rawPrompt = (messages[messages.length - 1]?.content || "").trim();
  const lastUserMsg = rawPrompt.toLowerCase();
  
  // Auto-detect language of user's message
  const englishKeywords = [
    "hello", "hi", "hey", "who", "what", "where", "how", "can", "is", "are", 
    "skills", "projects", "about", "resume", "experience", "education", "contact",
    "work", "tech", "stack", "github", "linkedin", "internship", "job", "hire",
    "background", "studies", "degree", "certification", "certifications", "hobbies",
    "passion", "passions", "location", "located", "why", "thank", "thanks", "explain",
    "code", "example", "difference"
  ];
  
  const hasEnglishTrigger = englishKeywords.some(word => 
    new RegExp(`\\b${word}\\b`, "i").test(lastUserMsg)
  );

  let fr = !hasEnglishTrigger;
  if (isFr !== undefined && !lastUserMsg) {
    fr = isFr;
  }

  // Check if prompt specifically mentions Pierre, his portfolio, or asking about him
  const isAboutPierre = lastUserMsg.includes("pierre") || 
                        lastUserMsg.includes("tchinda") || 
                        lastUserMsg.includes("portfolio") || 
                        lastUserMsg.includes("auteur") || 
                        lastUserMsg.includes("créateur") || 
                        lastUserMsg.includes("createur") || 
                        lastUserMsg.includes("qui es-tu") || 
                        lastUserMsg.includes("qui est-tu") || 
                        lastUserMsg.includes("qui es tu") || 
                        lastUserMsg.includes("qui est tu") || 
                        lastUserMsg.includes("ton parcours") || 
                        lastUserMsg.includes("tes projet") || 
                        lastUserMsg.includes("tes compétence") ||
                        lastUserMsg.includes("tes passion") ||
                        lastUserMsg.includes("te contacter") ||
                        lastUserMsg.includes("ton email");

  if (fr) {
    // 1. Salutations simples
    if (/^(bonjour|salut|coucou|bonsoir|hello|hey|yo|bonjour !|salut !)(\s.*)?$/i.test(lastUserMsg) && lastUserMsg.length < 25) {
      return "Bonjour ! 😊 Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser n'importe quelle question !";
    }

    // 2. Remerciements
    if (lastUserMsg.includes("merci") || lastUserMsg.includes("super") || lastUserMsg.includes("parfait") || lastUserMsg.includes("excellent") || lastUserMsg.includes("bravo")) {
      return "Je vous en prie ! 😊 C'est un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions !";
    }

    // 3. Calculs simples / Mathématiques (ex: 2+2, 10*5, etc.)
    const mathMatch = lastUserMsg.match(/^(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)$/);
    if (mathMatch) {
      const a = parseFloat(mathMatch[1]);
      const op = mathMatch[3];
      const b = parseFloat(mathMatch[4]);
      let res = 0;
      if (op === '+') res = a + b;
      if (op === '-') res = a - b;
      if (op === '*') res = a * b;
      if (op === '/') res = b !== 0 ? a / b : NaN;
      return `Le résultat de **${a} ${op} ${b}** est **${res}**.`;
    }

    // 4. Questions sur Pierre (seulement si la question concerne Pierre)
    if (isAboutPierre) {
      if (lastUserMsg.includes("projet") || lastUserMsg.includes("ecoroute") || lastUserMsg.includes("devspace") || lastUserMsg.includes("agrimarket") || lastUserMsg.includes("taskpulse")) {
        return "Pierre Tchinda a conçu 4 projets Web phares :\n\n" +
               "• 🍃 **EcoRoute** : Calculateur d'itinéraires écologiques fondé sur Google Maps APIs.\n" +
               "• 💬 **DevSpace** : Plateforme communautaire avec éditeur Markdown protégé contre les failles XSS, JWT et WebSockets.\n" +
               "• 🌾 **AgriMarket** : Marketplace agricole équitable sécurisée par des règles Firestore.\n" +
               "• 📊 **TaskPulse** : Dashboard agile avec contrôle d'accès basé sur les rôles (RBAC) et ORM anti-injection SQL.";
      }
      if (lastUserMsg.includes("competence") || lastUserMsg.includes("compétence") || lastUserMsg.includes("stack")) {
        return "Compétences clés de Pierre Tchinda :\n\n" +
               "• **Développement Web** : JavaScript, TypeScript, React, Node.js, Express, HTML5/CSS3, Tailwind CSS.\n" +
               "• **Programmation & Systèmes** : C/C++, Python, Bash, Linux.\n" +
               "• **Sécurité** : Protection OWASP Top 10 (Injections SQL, XSS, CSRF), audit de code, chiffrement.\n" +
               "• **Bases de données & DevOps** : PostgreSQL, MySQL, Firestore, MongoDB, Docker, Git.";
      }
      if (lastUserMsg.includes("contact") || lastUserMsg.includes("email") || lastUserMsg.includes("joindre") || lastUserMsg.includes("stage") || lastUserMsg.includes("freelance")) {
        return "Pour contacter Pierre Tchinda :\n\n" +
               "• ✉️ **E-mail** : [pierre.tchinda@facsciences-uy1.cm](mailto:pierre.tchinda@facsciences-uy1.cm)\n" +
               "• 💼 **LinkedIn** : [linkedin.com/in/pierre-tchinda](https://linkedin.com/in/pierre-tchinda)\n" +
               "• 🐙 **GitHub** : [github.com/pierre-tchinda](https://github.com/pierre-tchinda)\n\n" +
               "💡 Disponible pour **stages, projets freelance** et opportunités d'ingénierie !";
      }
      return "Pierre Tchinda est un **Développeur Web, Programmeur & Analyste Sécurité** basé à Yaoundé (Cameroun), actuellement étudiant en **Licence 2 d'Informatique à l'Université de Yaoundé I**. Il combine développement full-stack moderne (React/Node) et certifications internationales en cybersécurité (Google, IBM, Meta).";
    }

    // 5. Concepts informatiques / Web / Cyber / Langages (Réponses directes et explicatives)
    if (lastUserMsg.includes("react")) {
      return "**React** est une bibliothèque JavaScript libre développée par Meta pour créer des interfaces utilisateur basées sur des composants réutilisables.\n\n" +
             "• **Principes fondamentaux** : Virtual DOM (rendu ultra-rapide), composants fonctionnels, gestion d'état via Hooks (`useState`, `useEffect`).\n" +
             "• **Utilisation recommandée** : Idéal pour les applications web monopages (SPA) dynamiques et réactives.";
    }

    if (lastUserMsg.includes("node") || lastUserMsg.includes("express")) {
      return "**Node.js** est un environnement d'exécution JavaScript côté serveur (basé sur le moteur V8 de Chrome).\n\n" +
             "• **Fonctionnement** : Asynchrone et orienté événements (Event Loop), il traite efficacement un grand nombre de connexions simultanées.\n" +
             "• **Express.js** : Framework minimaliste et flexible facilitant la création d'API REST et de routes HTTP.";
    }

    if (lastUserMsg.includes("javascript") || lastUserMsg.includes("typescript")) {
      return "**JavaScript** est le langage de programmation le plus populaire du Web client et serveur.\n\n" +
             "• **TypeScript** est un surensemble typé de JavaScript développé par Microsoft. Il apporte le typage statique (interfaces, types), permettant de détecter les erreurs dès la compilation et d'améliorer la maintenabilité des grands projets.";
    }

    if (lastUserMsg.includes("sql") || lastUserMsg.includes("base de donnée") || lastUserMsg.includes("base de donnee")) {
      return "**SQL (Structured Query Language)** est le langage standard utilisé pour interagir avec les bases de données relationnelles (PostgreSQL, MySQL, SQLite).\n\n" +
             "• **Commandes clés** : `SELECT` (lecture), `INSERT` (ajout), `UPDATE` (modification), `DELETE` (suppression).\n" +
             "• **Bonnes pratiques** : Toujours utiliser des requêtes préparées (paramétrées) ou un ORM pour éviter les failles d'injection SQL !";
    }

    if (lastUserMsg.includes("xss") || lastUserMsg.includes("csrf") || lastUserMsg.includes("injection") || lastUserMsg.includes("cybersécurité") || lastUserMsg.includes("cybersecurite") || lastUserMsg.includes("owasp")) {
      return "En **Cybersécurité Web**, les failles les plus fréquentes (**OWASP Top 10**) incluent :\n\n" +
             "• 🛡️ **Injection SQL** : Attaque modifiant les requêtes de base de données via des entrées utilisateur malveillantes. *Solution* : Requêtes paramétrées.\n" +
             "• 🛡️ **XSS (Cross-Site Scripting)** : Injection de scripts HTML/JS exécutés dans le navigateur des victimes. *Solution* : Assainissement et échappement des entrées (`DOMPurify`).\n" +
             "• 🛡️ **CSRF** : Forcer un utilisateur connecté à exécuter des actions à son insu. *Solution* : Jetons uniques Anti-CSRF et cookies `SameSite`.";
    }

    if (lastUserMsg.includes("c++") || lastUserMsg.includes("python") || lastUserMsg.includes("algorithme")) {
      return "**Comparaison des langages informatiques** :\n\n" +
             "• **C / C++** : Langages compilés très performants offrant un contrôle direct de la mémoire (pointeurs, allocation dynamique). Utilisés pour les systèmes d'exploitation, jeux vidéo et logiciels critiques.\n" +
             "• **Python** : Langage interprété, très lisible et polyvalent. Idéal pour le scripting, la cybersécurité, la science des données et l'intelligence artificielle.\n" +
             "• **Algorithmique** : Étude de la séquence d'instructions pour résoudre un problème avec une complexité optimale (ex: O(n log n)).";
    }

    if (lastUserMsg.includes("dns") || lastUserMsg.includes("http") || lastUserMsg.includes("https") || lastUserMsg.includes("réseau") || lastUserMsg.includes("reseau")) {
      return "**Bases des réseaux informatiques** :\n\n" +
             "• **DNS (Domain Name System)** : L'annuaire d'Internet qui traduit un nom de domaine (ex: `google.com`) en adresse IP.\n" +
             "• **HTTP vs HTTPS** : HTTPS est la version sécurisée de HTTP. Il chiffre l'ensemble des échanges entre le navigateur et le serveur grâce au protocole TLS/SSL.";
    }

    if (lastUserMsg.includes("git") || lastUserMsg.includes("github") || lastUserMsg.includes("docker")) {
      return "**Outils de développement & DevOps** :\n\n" +
             "• **Git** : Système de contrôle de version distribué permettant de suivre les modifications de code (`commit`, `branch`, `merge`).\n" +
             "• **Docker** : Plateforme de conteneurisation qui empaquète une application et ses dépendances dans un conteneur isolé.";
    }

    // 6. Réponse générale directe pour toute autre question en Français
    return `Voici une réponse directe concernant votre question : **« ${rawPrompt} »**\n\n` +
           `• **Explication** : Pour traiter ce sujet (${rawPrompt}), il est essentiel d'analyser les mécanismes sous-jacents et de structurer la réponse avec méthode.\n` +
           `• **Détails & Application** : En informatique et ingénierie logicielle, la bonne approche consiste à clarifier les objectifs, valider les règles de fonctionnement et appliquer les normes reconnues.\n\n` +
           `Si vous avez besoin d'exemples de code ou d'explications plus détaillées sur un point précis, posez-moi simplement la question !`;
  } else {
    // ENGLISH RESPONSES
    if (/^(hello|hi|hey|good morning|good evening)(\s.*)?$/i.test(lastUserMsg) && lastUserMsg.length < 25) {
      return "Hello! 😊 How can I help you today? Feel free to ask me any question!";
    }

    if (lastUserMsg.includes("thank") || lastUserMsg.includes("great") || lastUserMsg.includes("awesome")) {
      return "You're very welcome! 😊 Glad I could help. Let me know if you have any other questions!";
    }

    // Simple math
    const mathMatch = lastUserMsg.match(/^(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)$/);
    if (mathMatch) {
      const a = parseFloat(mathMatch[1]);
      const op = mathMatch[3];
      const b = parseFloat(mathMatch[4]);
      let res = 0;
      if (op === '+') res = a + b;
      if (op === '-') res = a - b;
      if (op === '*') res = a * b;
      if (op === '/') res = b !== 0 ? a / b : NaN;
      return `The result of **${a} ${op} ${b}** is **${res}**.`;
    }

    if (isAboutPierre) {
      if (lastUserMsg.includes("project") || lastUserMsg.includes("ecoroute") || lastUserMsg.includes("devspace")) {
        return "Pierre Tchinda built 4 major projects:\n\n" +
               "• 🍃 **EcoRoute**: Eco-friendly route optimizer powered by Google Maps APIs.\n" +
               "• 💬 **DevSpace**: Micro-blogging community platform with XSS-shielded Markdown & WebSockets.\n" +
               "• 🌾 **AgriMarket**: Agricultural marketplace secured with strict Firestore Security Rules.\n" +
               "• 📊 **TaskPulse**: Agile team dashboard with Role-Based Access Control (RBAC).";
      }
      return "Pierre Tchinda is a **Web Developer, Programmer & Security Analyst** based in Yaoundé, Cameroon, pursuing his 2nd year Bachelor's in Computer Science at University of Yaoundé I.";
    }

    if (lastUserMsg.includes("react")) {
      return "**React** is an open-source JavaScript library developed by Meta for building user interfaces with reusable components.\n\n" +
             "• **Key Concepts**: Virtual DOM, component-based architecture, and React Hooks (`useState`, `useEffect`).\n" +
             "• **Best Use Case**: Building fast, interactive Single Page Applications (SPAs).";
    }

    if (lastUserMsg.includes("node") || lastUserMsg.includes("express")) {
      return "**Node.js** is a server-side JavaScript runtime built on Chrome's V8 engine.\n\n" +
             "• **Express.js** is a lightweight web framework used to build RESTful APIs and web servers easily.";
    }

    if (lastUserMsg.includes("sql") || lastUserMsg.includes("database")) {
      return "**SQL (Structured Query Language)** is the standard language for relational database management systems like PostgreSQL, MySQL, and SQLite.";
    }

    return `Here is a direct response regarding **"${rawPrompt}"**:\n\n` +
           `• **Overview**: Addressing "${rawPrompt}" requires examining core principles and applying best practices.\n` +
           `• **Key Takeaway**: In software engineering, focusing on clarity, modularity, and correctness brings optimal results.\n\n` +
           `Feel free to ask for specific code examples or further details!`;
  }
}

// API routes first
app.post("/api/chat", rateLimit({ windowMs: 60_000, max: 20 }), async (req, res) => {
  try {
    const { messages, isFr } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Format invalide. 'messages' doit être un tableau d'historique." });
    }

    if (!ai) {
      console.warn("[Chat] GEMINI_API_KEY absent : réponse simulée renvoyée (mode dégradé).");
      const simulatedResponse = getSimulatedResponse(messages, isFr);
      return res.json({ text: simulatedResponse, simulated: true });
    }

    // Convert message history to format expected by contents
    const chatParts = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    try {
      // Call generateContent with systemic context injected
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: chatParts,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        return res.json({ text: response.text, simulated: false });
      } else {
        throw new Error("No text response returned from Gemini.");
      }
    } catch (geminiError: any) {
      console.warn("[Chat] Appel Gemini échoué, bascule sur réponse simulée :", geminiError?.message || geminiError);
      const simulatedResponse = getSimulatedResponse(messages, isFr);
      return res.json({ text: simulatedResponse, simulated: true });
    }
  } catch (error: any) {
    console.warn("[Chat] Erreur inattendue :", error?.message || error);
    const fallbackResponse = getSimulatedResponse(req.body.messages || [], req.body.isFr);
    return res.json({ text: fallbackResponse, simulated: true });
  }
});

// Blog posts persisted in SQLite (see src/db.ts). Seeded on first boot above.
app.get("/api/blog", (req, res) => {
  res.json(getAllPosts());
});

app.post("/api/blog/:id/like", rateLimit({ windowMs: 60_000, max: 30 }), (req, res) => {
  const { id } = req.params;
  const likes = toggleLike(id);
  if (likes !== null) {
    return res.json({ success: true, likes });
  }
  res.status(404).json({ error: "Post non trouvé." });
});

app.post("/api/blog/:id/comment", rateLimit({ windowMs: 60_000, max: 10 }), (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: "Veuillez fournir un auteur et un texte." });
  }
  const commentErr = withinLimits({ author, text }, { author: LIMITS.author, text: LIMITS.comment });
  if (commentErr) {
    return res.status(400).json({ error: commentErr });
  }
  if (!getPostById(id)) {
    return res.status(404).json({ error: "Post non trouvé." });
  }
  const newComment = addComment(id, author, text);
  return res.json({ success: true, comment: newComment });
});

// Delete a blog comment — requires the admin secret (owner only)
app.delete("/api/blog/comments/:id", rateLimit({ windowMs: 60_000, max: 10 }), requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Identifiant de commentaire invalide." });
  }
  if (!deleteComment(id)) {
    return res.status(404).json({ error: "Commentaire introuvable." });
  }
  return res.json({ success: true });
});

// Validate the admin key before opening the editor (no side effect)
app.post("/api/blog/verify", rateLimit({ windowMs: 60_000, max: 10 }), requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// Create new blog post (persisted in SQLite database) — requires admin secret
app.post("/api/blog", requireAdmin, rateLimit({ windowMs: 60_000, max: 5 }), (req, res) => {
  const { title, excerpt, content, category, readTime } = req.body;
  if (!title || !excerpt || !content) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }
  const fieldErr = withinLimits(
    { title, excerpt, content, readTime: readTime || "", category: category || "" },
    { title: LIMITS.title, excerpt: LIMITS.excerpt, content: LIMITS.content, readTime: LIMITS.readTime, category: LIMITS.category }
  );
  if (fieldErr) {
    return res.status(400).json({ error: fieldErr });
  }
  const newPost = createPost({ title, excerpt, content, category, readTime });
  res.status(201).json(newPost);
});

// Delete a blog post — requires the admin secret (owner only). Comments are cascaded.
app.delete("/api/blog/:id", rateLimit({ windowMs: 60_000, max: 10 }), requireAdmin, (req, res) => {
  const { id } = req.params;
  if (!deletePost(id)) {
    return res.status(404).json({ error: "Article introuvable." });
  }
  return res.json({ success: true });
});

// Contact form: persist every submission and forward by email when SMTP is configured
app.post("/api/contact", rateLimit({ windowMs: 60_000, max: 10 }), (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Veuillez fournir un nom, un e-mail et un message." });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Adresse e-mail invalide." });
  }
  const contactErr = withinLimits(
    { name, subject: subject || "", message },
    { name: LIMITS.contactName, subject: LIMITS.contactSubject, message: LIMITS.contactMessage }
  );
  if (contactErr) {
    return res.status(400).json({ error: contactErr });
  }

  const id = saveContact({ name, email, subject: subject || "", message });

  const hasSmtp =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO_EMAIL;

  if (!hasSmtp) {
    console.log(
      `Contact enregistré (id=${id}). SMTP non configuré : envoi email ignoré.`
    );
    return res.json({
      success: true,
      stored: true,
      note: "Message enregistré. Configurer SMTP_HOST/SMTP_USER/SMTP_PASS/CONTACT_TO_EMAIL pour l'envoi par email.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.CONTACT_TO_EMAIL,
    subject: `[Portfolio] ${subject || "Nouveau message"} - ${name}`,
    text: `Nom : ${name}\nE-mail : ${email}\nSujet : ${subject || "-"}\n\n${message}`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.json({ success: true, stored: true });
    })
    .catch((err) => {
      console.error("Erreur d'envoi email:", err);
      res.status(200).json({
        success: true,
        stored: true,
        note: "Message enregistré mais l'envoi par email a échoué.",
      });
    });
});

// Vite middleware flow — only run when executed directly (skip when imported for tests)
export { app };

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated in Express.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Production static server route configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

const isDirectRun =
  typeof process.argv[1] === "string" &&
  (process.argv[1].endsWith("server.ts") || process.argv[1].endsWith("server.cjs"));

if (isDirectRun) {
  startServer();
}
