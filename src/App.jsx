import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Instagram, Twitter, Terminal, ExternalLink, 
  User2, Cpu, GraduationCap, Mail, Globe, Server, ShieldAlert, 
  Wrench, Monitor, MapPin, Languages, Zap, Layout, Database
} from 'lucide-react';

// --- DICTIONNAIRE DE TRADUCTION COMPLET ---
const translations = {
  FR: {
    nav: ["ABOUT", "SKILLS", "PROJECTS", "CERTIFICATIONS", "SERVICES", "CONTACTS"],
    job: "Développeur Web, Programmeur et Analyste Sécurité",
    terminalBtn: "TERMINAL_ACCESS",
    about: {
      title: "Identity_Brief",
      bio: [
        "Bienvenue sur mon portfolio ! Je suis Tchinda Fogang, un développeur web passionné et analyste en sécurité, dédié à la création d'écosystèmes numériques robustes et sécurisés.",
        "Ma mission est de transformer des idées complexes en solutions élégantes et fonctionnelles, en mettant l'accent sur les bonnes pratiques de développement, la performance et l'expérience utilisateur.",
        "Que ce soit pour des projets front-end interactifs, des back-ends puissants ou l'optimisation des infrastructures, je suis toujours prêt à relever de nouveaux défis. Explorez mes compétences, mes certifications et mes projets pour découvrir mon travail et n'hésitez pas à me contacter !"
      ],
      hire: "Recrutez-moi",
      cv: "Télécharger CV"
    },
    skills: { 
      title: "Core_Capabilities", subtitle: "MON ÉCOSYSTÈME TECHNIQUE",
      categories: [
        { title: "Langages Frontend", skills: ["HTML", "CSS", "JavaScript", "JSON", "React"] },
        { title: "Stacks Backend", skills: ["Node.js", "PHP", "Python", "Java", "C++"] },
        { title: "Base de données & Cloud", skills: ["MySQL", "PGSQL", "SQL", "Apache", "Docker"] },
        { title: "Sécurité Système", skills: ["Pentest", "Vulnerability", "Linux", "Powershell"] },
        { title: "Outils de Dev", skills: ["VS Code", "Postman", "GitHub", "Agile", "Markdown"] }
      ]
    },
    projects: { 
      title: "Selected_Works", 
      subtitle: "ARCHIVES_PROJETS_V1.0",
      btn: "Project_Live",
      items: [
        { title: "TCHINDA-OS V1", type: "SYSTEM DESIGN", desc: "Interface de portfolio immersive simulant un système d'exploitation... futuriste", stack: "React / Tailwind", dep: "Vercel", id_code: "PROJ-001" },
        { title: "NEXUS SECURE", type: "CYBER SECURITY", desc: "Outil d'analyse de vulnérabilités réseau avec tableau de bord en temps réel.", stack: "Python / Kali", dep: "Local Host", id_code: "PROJ-002" },
        { title: "QUANTUM API", type: "BACKEND ARCH", desc: "Infrastructure micro-services hautement disponible pour traitement massif.", stack: "Node.js / PGSQL", dep: "Docker / AWS", id_code: "PROJ-003" }
      ]
    },
    certs: {
      title: "Verified_Credentials",
      subtitle: "ACCRÉDITATIONS & DIPLÔMES",
      items: [
        { title: "Web Dev Basic", issuer: "Coursera / Google", desc: "Fondamentaux du développement web: HTML, CSS, JavaScript et responsive design." },
        { title: "Cybersecurity Essentials", issuer: "Cisco Academy", desc: "Principes fondamentaux de la sécurité informatique, protection des réseaux et données." },
        { title: "Fullstack JavaScript", issuer: "Meta Professional", desc: "Maîtrise de l'écosystème React, Node.js et des architectures d'applications modernes." }
      ]
    },
    services: {
      title: "Professional_Services",
      subtitle: "SOLUTIONS & EXPERTISES TECHNIQUES",
      items: [
        { title: "Développement Fullstack", desc: "Conception d'applications web modernes, réactives et scalables utilisant les dernières architectures." },
        { title: "Audit & Sécurité", desc: "Analyse de vulnérabilités, tests d'intrusion et sécurisation des infrastructures numériques." },
        { title: "Architecture Système", desc: "Mise en place d'environnements virtualisés, gestion de serveurs Linux et déploiement Docker." }
      ]
    },
    contact: {
      title: "Contact_Protocol",
      subtitle: "ESTABLISHING_COMMUNICATION_V2.0",
      sendBtn: "Transmit_Signal",
      labels: { name: "_Identity_Name", email: "_Access_Email", subject: "_Signal_Subject", msg: "_Transmission_Data" },
      placeholders: { name: "EX: TCHINDA FOGANG", subject: "COLLABORATION / SÉCURITÉ / DÉVELOPPEMENT", msg: "ENTREZ VOTRE MESSAGE ICI..." }
    },
    footer: {
      desc: "Architecte de solutions numériques sécurisées et performantes. Dédié à l'innovation continue et à la robustesse des systèmes.",
      cvBtn: "Télécharger_CV_Complet.PDF"
    }
  },
  EN: {
    nav: ["ABOUT", "SKILLS", "PROJECTS", "CERTIFICATIONS", "SERVICES", "CONTACTS"],
    job: "Web Developer, Programmer & Security Analyst",
    terminalBtn: "TERMINAL_ACCESS",
    about: {
      title: "Identity_Brief",
      bio: [
        "Welcome to my portfolio! I am Tchinda Fogang, a passionate web developer and security analyst, dedicated to creating robust and secure digital ecosystems.",
        "My mission is to transform complex ideas into elegant and functional solutions, focusing on development best practices, performance, and user experience.",
        "Whether for interactive front-end projects, powerful back-ends, or infrastructure optimization, I am always ready for new challenges. Explore my skills, certifications, and projects to discover my work!"
      ],
      hire: "Hire Me",
      cv: "Download CV"
    },
    skills: { 
      title: "Core_Capabilities", subtitle: "MY TECHNICAL ECOSYSTEM",
      categories: [
        { title: "Frontend Languages", skills: ["HTML", "CSS", "JavaScript", "JSON", "React"] },
        { title: "Backend Stacks", skills: ["Node.js", "PHP", "Python", "Java", "C++"] },
        { title: "Database & Cloud", skills: ["MySQL", "PGSQL", "SQL", "Apache", "Docker"] },
        { title: "System Security", skills: ["Pentest", "Vulnerability", "Linux", "Powershell"] },
        { title: "Dev Tools", skills: ["VS Code", "Postman", "GitHub", "Agile", "Markdown"] }
      ]
    },
    projects: { 
      title: "Selected_Works", 
      subtitle: "PROJECT_ARCHIVES_V1.0",
      btn: "Project_Live",
      items: [
        { title: "TCHINDA-OS V1", type: "SYSTEM DESIGN", desc: "Immersive portfolio interface simulating a futuristic operating system.", stack: "React / Tailwind", dep: "Vercel", id_code: "PROJ-001" },
        { title: "NEXUS SECURE", type: "CYBER SECURITY", desc: "Network vulnerability analysis tool with real-time dashboard.", stack: "Python / Kali", dep: "Local Host", id_code: "PROJ-002" },
        { title: "QUANTUM API", type: "BACKEND ARCH", desc: "Highly available micro-services infrastructure for massive processing.", stack: "Node.js / PGSQL", dep: "Docker / AWS", id_code: "PROJ-003" }
      ]
    },
    certs: {
      title: "Verified_Credentials",
      subtitle: "ACCREDITATIONS & DIPLOMAS",
      items: [
        { title: "Web Dev Basic", issuer: "Coursera / Google", desc: "Web development fundamentals: HTML, CSS, JavaScript, and responsive design." },
        { title: "Cybersecurity Essentials", issuer: "Cisco Academy", desc: "Fundamentals of computer security, network protection, and data security." },
        { title: "Fullstack JavaScript", issuer: "Meta Professional", desc: "Mastery of the React ecosystem, Node.js, and modern app architectures." }
      ]
    },
    services: {
      title: "Professional_Services",
      subtitle: "SOLUTIONS & TECHNICAL EXPERTISE",
      items: [
        { title: "Fullstack Development", desc: "Design of modern, reactive, and scalable web applications using latest architectures." },
        { title: "Audit & Security", desc: "Vulnerability analysis, penetration testing, and digital infrastructure securing." },
        { title: "System Architecture", desc: "Setup of virtualized environments, Linux server management, and Docker deployment." }
      ]
    },
    contact: {
      title: "Contact_Protocol",
      subtitle: "ESTABLISHING_COMMUNICATION_V2.0",
      sendBtn: "Transmit_Signal",
      labels: { name: "_Identity_Name", email: "_Access_Email", subject: "_Signal_Subject", msg: "_Transmission_Data" },
      placeholders: { name: "EG: TCHINDA FOGANG", subject: "COLLABORATION / SECURITY / DEVELOPMENT", msg: "ENTER YOUR MESSAGE HERE..." }
    },
    footer: {
      desc: "Architect of secure and high-performance digital solutions. Dedicated to continuous innovation and system robustness.",
      cvBtn: "Download_Full_Resume.PDF"
    }
  }
};

const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  let iconPath = "";
  let needsInvert = false; 
  if (n.includes('html')) iconPath = "html5/html5-original.svg";
  else if (n.includes('css')) iconPath = "css3/css3-original.svg";
  else if (n.includes('javascript') || n === 'js') iconPath = "javascript/javascript-original.svg";
  else if (n.includes('react')) iconPath = "react/react-original.svg";
  else if (n.includes('node')) iconPath = "nodejs/nodejs-original.svg";
  else if (n.includes('python')) iconPath = "python/python-original.svg";
  else if (n.includes('php')) iconPath = "php/php-original.svg";
  else if (n.includes('java') && !n.includes('script')) iconPath = "java/java-original.svg";
  else if (n.includes('c++')) iconPath = "cplusplus/cplusplus-original.svg";
  else if (n.includes('mysql')) iconPath = "mysql/mysql-original.svg";
  else if (n.includes('pgsql')) iconPath = "postgresql/postgresql-original.svg";
  else if (n.includes('docker')) iconPath = "docker/docker-original.svg";
  else if (n.includes('linux')) iconPath = "linux/linux-original.svg";
  else if (n.includes('apache')) iconPath = "apache/apache-original.svg";
  else if (n.includes('powershell')) iconPath = "powershell/powershell-original.svg";
  else if (n.includes('github')) { iconPath = "github/github-original.svg"; needsInvert = true; }
  else if (n.includes('markdown')) { iconPath = "markdown/markdown-original.svg"; needsInvert = true; }

  if (iconPath) {
    return (
      <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`} alt={name}
        className={`w-4 h-4 object-contain transition-all duration-300 ${needsInvert ? 'invert brightness-200' : 'brightness-100'} group-hover/skill:scale-110`} />
    );
  }
  return <Cpu size={14} className="text-cyan-400" />;
};

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [lang, setLang] = useState('FR');
  const t = translations[lang];

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = { root: null, rootMargin: '-20% 0px -75% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, observerOptions);
    sections.forEach((section) => { if (section.id) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
      {/* Background Glows (Originaux - Ne pas toucher) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              <Terminal size={18} className="text-cyan-400" />
            </div>
            <span className="font-bold tracking-tighter text-base md:text-xl bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              TCHINDA<span className="text-cyan-400">@Portfolio</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {t.nav.map((name, i) => {
              const ids = ["about", "skills", "projects", "certifications", "services", "contacts"];
              return (
                <a key={name} href={`#${ids[i]}`} className={`text-[10px] font-bold tracking-[0.25em] transition-all relative group ${activeSection === ids[i] ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                  {name}
                  {activeSection === ids[i] && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all group">
              <Languages size={14} className="text-cyan-400" />
              <span className="text-[10px] font-black text-gray-300 tracking-widest">{lang}</span>
            </button>
            <button className="hidden sm:block border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-cyan-400 transition-all">
              {t.terminalBtn}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 pb-20 px-4 md:px-10 flex flex-col items-center gap-12 md:gap-16">
        
        {/* SECTION: ABOUT */}
        <section id="about" className="w-full max-w-7xl bg-white/[0.01] backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative text-left">
          <div className="h-32 md:h-64 bg-gradient-to-br from-indigo-900/30 via-black to-purple-900/30 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#08080a]"></div>
          </div>

          <div className="px-6 md:px-16 pb-12 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 -mt-16 md:-mt-32 relative z-10">
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
                <div className="w-32 h-32 md:w-64 md:h-64 rounded-[2rem] md:rounded-[2.5rem] border-[4px] md:border-[6px] border-[#08080a] overflow-hidden shadow-2xl group relative">
                  <img src="https://tchinda-fogang.onrender.com/src/T2.0.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Profile" />
                </div>
                <div className="w-full bg-white/[0.02] backdrop-blur-3xl p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-xl">
                   <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3 text-cyan-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                        <Cpu size={16} /> {t.job.split(',')[0]}
                      </div>
                      <div className="flex justify-center lg:justify-start gap-3 md:gap-4 p-2">
                        {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                          <div key={i} className="p-2 md:p-3 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-xl transition-all cursor-pointer text-gray-400">
                            <Icon size={18} />
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col space-y-6 md:space-y-8 pt-2 lg:pt-0">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">Tchinda Fogang</h1>
                  <p className="text-gray-500 font-medium tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase mt-2">{t.job}</p>
                </div>
                <div className="bg-white/[0.03] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-inner relative group">
                  <h3 className="text-cyan-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-4 md:mb-6 flex items-center gap-3"><User2 size={14}/> {t.about.title}</h3>
                  <div className="space-y-4 text-gray-300 text-xs md:text-base leading-relaxed font-normal">
                    {t.about.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </div>
                  <div className="mt-6 md:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                    <button className="px-5 md:px-6 py-2.5 md:py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-black text-[9px] md:text-[10px] tracking-widest transition-all uppercase shadow-lg shadow-cyan-500/20">{t.about.hire}</button>
                    <button className="px-5 md:px-6 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 rounded-xl font-black text-[9px] md:text-[10px] tracking-widest border border-white/10 transition-all uppercase">{t.about.cv}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SKILLS (Avec Carousel Mobile Snap) */}
        <SectionContainer id="skills" title={t.skills.title} subtitle={t.skills.subtitle}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4">
            {t.skills.categories.map((cat, i) => (
              <div key={i} className="min-w-[85vw] md:min-w-0 snap-center bg-white/[0.02] backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden flex flex-col h-full text-left">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all">
                    {i === 0 ? <Layout size={22} className="text-cyan-400" /> : i === 1 ? <Server size={22} className="text-cyan-400" /> : i === 2 ? <Database size={22} className="text-cyan-400" /> : i === 3 ? <ShieldAlert size={22} className="text-cyan-400" /> : <Wrench size={22} className="text-cyan-400" />}
                  </div>
                  <h4 className="font-black text-[11px] tracking-[0.2em] text-white/90 uppercase">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {cat.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/20 transition-all group/skill h-9">
                      <div className="w-4 h-4 flex items-center justify-center">{getSkillIcon(skill)}</div>
                      <span className="text-[10px] font-black text-gray-500 group-hover/skill:text-cyan-400 uppercase tracking-tighter transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="hidden lg:flex bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md p-6 rounded-3xl border border-white/5 items-center justify-center border-dashed">
               <div className="text-center"><Zap size={24} className="text-cyan-400 mb-3 animate-pulse" /><p className="text-[10px] font-black tracking-widest text-cyan-500 uppercase">System_Active</p></div>
            </div>
          </div>
        </SectionContainer>

        {/* SECTION: PROJECTS (Avec Carousel Mobile Snap + Infos Détailées) */}
        <SectionContainer id="projects" title={t.projects.title} subtitle={t.projects.subtitle}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 text-left">
            {t.projects.items.map((proj, i) => (
              <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group relative bg-[#070708] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase italic">{proj.id_code}</span>
                  </div>
                </div>
                <div className="relative h-44 w-full overflow-hidden bg-black">
                  <img src={i === 0 ? "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80" : i === 1 ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" alt={proj.title} />
                  <div className="absolute bottom-3 left-5"><span className="text-[10px] font-black px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-[0.2em] backdrop-blur-md">{proj.type}</span></div>
                </div>
                <div className="p-6 flex flex-col flex-grow space-y-5">
                  <div className="space-y-3">
                    <h4 className="text-lg font-black text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{proj.title}</h4>
                    <p className="text-[11px] text-gray-400 font-mono leading-relaxed line-clamp-3">{proj.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div className="flex flex-col gap-1"><span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">_Stack</span><span className="text-[10px] text-gray-300 font-mono truncate">{proj.stack}</span></div>
                    <div className="flex flex-col border-l border-white/5 pl-4 gap-1"><span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">_Deployment</span><span className="text-[10px] text-gray-300 font-mono truncate">{proj.dep}</span></div>
                  </div>
                  <a href="#" className="group/btn relative w-full py-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 flex items-center justify-center gap-3 uppercase text-[10px] font-black text-gray-300 group-hover/btn:text-cyan-400 tracking-[0.4em]">
                    {t.projects.btn} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* SECTION: CERTIFICATIONS (Carousel Mobile) */}
        <SectionContainer id="certifications" title={t.certs.title} subtitle={t.certs.subtitle}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 text-left">
            {t.certs.items.map((cert, i) => (
              <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group flex flex-col bg-[#0d1117] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-cyan-500/20">
                <div className="h-40 bg-gradient-to-br from-[#1a2c2c] to-[#0d1515] flex items-center justify-center relative"><GraduationCap size={60} className="text-[#3d7a60] group-hover:scale-110 transition-transform duration-500" /></div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-[#16222a] rounded-full text-cyan-500 border border-white/5"><Monitor size={14} /></div>
                     <div className="flex flex-col"><span className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">Issuer</span><span className="text-xs font-black text-white tracking-wide">{cert.issuer}</span></div>
                  </div>
                  <h4 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">{cert.title}</h4>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed opacity-80 mb-6">{cert.desc}</p>
                  <div className="mt-auto pt-4 border-t border-white/5">
                     <a href="#" className="inline-block px-3 py-1.5 bg-[#1b2c24] border border-[#2d4d3e] rounded text-[#4ade80] text-[9px] font-black uppercase tracking-widest hover:bg-[#2d4d3e] hover:text-white transition-all">Verify_Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* SECTION: SERVICES (Carousel Mobile) */}
        <SectionContainer id="services" title={t.services.title} subtitle={t.services.subtitle}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 text-left">
            {t.services.items.map((service, i) => (
              <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group relative p-8 bg-[#0a0a0c] border border-white/5 rounded-[2rem] hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-6 text-cyan-400 group-hover:text-white transition-all">{i === 0 ? <Globe size={28} /> : i === 1 ? <ShieldAlert size={28} /> : <Server size={28} />}</div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-4">{service.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{service.desc}</p>
                </div>
                <span className="absolute bottom-4 right-8 text-4xl font-black text-white/[0.02] group-hover:text-cyan-500/5">0{i+1}</span>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* SECTION: CONTACT */}
        <SectionContainer id="contacts" title={t.contact.title} subtitle={t.contact.subtitle}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            <div className="lg:col-span-7">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden group h-full">
                <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t.contact.labels.name}</label>
                      <input type="text" placeholder={t.contact.placeholders.name} className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 transition-all text-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t.contact.labels.email}</label>
                      <input type="email" placeholder="NOM@DOMAINE.COM" className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 transition-all text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t.contact.labels.subject}</label>
                    <input type="text" placeholder={t.contact.placeholders.subject} className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 transition-all text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t.contact.labels.msg}</label>
                    <textarea rows={5} placeholder={t.contact.placeholders.msg} className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 transition-all text-gray-300 resize-none"></textarea>
                  </div>
                  <button className="px-10 py-4 bg-cyan-600/90 hover:bg-cyan-500 rounded-xl font-black text-[10px] tracking-[0.4em] text-white transition-all uppercase shadow-lg shadow-cyan-900/20">{t.contact.sendBtn}</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between h-full group">
                <div className="space-y-12">
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Secure_Channels</h4>
                  <div className="space-y-8">
                    <div className="flex items-center gap-5 group/item">
                      <div className="p-4 bg-cyan-500/5 border border-white/5 rounded-2xl group-hover/item:border-cyan-500/40 transition-all"><Mail className="text-cyan-400" size={20} /></div>
                      <div className="text-left"><p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">_Email</p><p className="text-xs font-black text-gray-300 uppercase tracking-tighter">tchindafogang@example.com</p></div>
                    </div>
                    <div className="flex items-center gap-5 group/item">
                      <div className="p-4 bg-emerald-500/5 border border-white/5 rounded-2xl group-hover/item:border-emerald-500/40 transition-all"><MapPin className="text-emerald-400" size={20} /></div>
                      <div className="text-left"><p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">_Base_Loc</p><p className="text-xs font-black text-gray-300 uppercase tracking-tighter">Yaoundé, CM</p></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-12">
                    {[Linkedin, Github, Twitter, Instagram].map((Icon, i) => (
                      <a key={i} href="#" className="flex items-center justify-center p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all group"><Icon size={20} className="text-gray-500 group-hover:text-cyan-400" /></a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>

      {/* --- FOOTER RESTAURE COMPLET --- */}
      <footer className="w-full bg-[#08080a] border-t border-white/5 pt-20 pb-10 px-4 md:px-10 relative text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2"><div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20"><Terminal size={18} className="text-cyan-400" /></div><span className="font-bold tracking-tighter text-lg uppercase">TCHINDA<span className="text-cyan-400">.OS</span></span></div>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed tracking-wide uppercase italic">{t.footer.desc}</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-cyan-500 pl-3">_Navigation</h4>
            <ul className="space-y-3">{t.nav.map((item, i) => (<li key={item}><a href={`#${["about", "skills", "projects", "certifications", "services", "contacts"][i]}`} className="text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-cyan-500 transition-all"></span>{item}</a></li>))}</ul>
          </div>
          <div className="space-y-6 md:col-span-2">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-emerald-500 pl-3">_Social_Network</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[Linkedin, Github, Twitter, Instagram].map((Icon, i) => (<a key={i} href="#" className="flex items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-cyan-500/20 transition-all group"><Icon size={18} className="text-gray-500 group-hover:text-cyan-400" /></a>))}
            </div>
            <button className="w-full py-4 bg-white/[0.03] border border-white/10 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] hover:bg-white/5 transition-all mt-4">{t.footer.cvBtn}</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center"><span className="text-gray-600 text-[10px] font-bold tracking-[0.6em] uppercase">© 2024 TCHINDA_SYSTEMS | ALL_RIGHTS_RESERVED</span></div>
      </footer>
    </div>
  );
}

function SectionContainer({ children, id, title, subtitle }) {
  return (
    <section id={id} className="w-full max-w-7xl bg-white/[0.01] backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl p-6 md:p-16 relative overflow-hidden group mb-16">
      <div className="absolute top-6 right-8 md:top-8 md:right-12 flex gap-2">
         <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-cyan-500/30 transition-colors"></div>
         <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-cyan-500/30 transition-colors"></div>
      </div>
      <div className="flex flex-col mb-10 md:mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-2">{title}</h2>
        <p className="text-gray-500 text-[9px] md:text-[10px] tracking-[0.4em] font-bold uppercase">{subtitle}</p>
        <div className="w-12 md:w-16 h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] mx-auto md:mx-0"></div>
      </div>
      {children}
    </section>
  );
}