import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Instagram, Twitter, Terminal, MoreHorizontal, ExternalLink, 
  Layers, Code2, Award, Mail, User2, Cpu, Rocket, GraduationCap, Phone,
  Database, Globe, Server, Smartphone, Zap, CheckCircle2, 
  ShieldAlert, Wrench, FileCode, Braces, Search, Lock, Monitor, HardDrive,
  Layout, Boxes, FileJson, Coffee, Binary, Send, MapPin
} from 'lucide-react';

// --- DONNÉES DU PORTFOLIO ---
const myData = {
  name: "Tchinda Fogang",
  fullName: "TCHINDA",
  job: "Développeur Web, Programmeur et Analyste Sécurité",
  bio: [
    "Bienvenue sur mon portfolio ! Je suis Tchinda Fogang, un développeur web passionné et analyste en sécurité, dédié à la création d'écosystèmes numériques robustes et sécurisés.",
    "Ma mission est de transformer des idées complexes en solutions élégantes et fonctionnelles, en mettant l'accent sur les bonnes pratiques de développement, la performance et l'expérience utilisateur.",
    "Que ce soit pour des projets front-end interactifs, des back-ends puissants ou l'optimisation des infrastructures, je suis toujours prêt à relever de nouveaux défis. Explorez mes compétences, mes certifications et mes projets pour découvrir mon travail et n'hésitez pas à me contacter !"
  ],
  skillCategories: [
    {
      title: "Langages de Programmation",
      icon: <Code2 size={22} className="text-cyan-400" />,
      skills: ["HTML", "CSS", "JavaScript", "JSON", "PHP", "Python", "Node.js", "Java", "React", "C / C++", "SQL"]
    },
    {
      title: "Bases de Données",
      icon: <Database size={22} className="text-cyan-400" />,
      skills: ["MySQL", "PGSQL"]
    },
    {
      title: "Cybersécurité",
      icon: <ShieldAlert size={22} className="text-cyan-400" />,
      skills: ["Analyse de vulnérabilités", "Tests d'intrusion"]
    },
    {
      title: "Gestions Système et Serveurs",
      icon: <Monitor size={22} className="text-cyan-400" />,
      skills: ["Linux", "Powershell", "Apache", "Docker", "GitHub", "Markdown"]
    },
    {
      title: "Outils & Autres",
      icon: <Wrench size={22} className="text-cyan-400" />,
      skills: ["VS Code", "Postman", "Méthodes Agiles"]
    }
  ],
  projects: [
    { 
      id: "p1", 
      id_code: "PROJ-001",
      title: "TCHINDA-OS V1", 
      type: "SYSTEM DESIGN",
      stack: "React / Tailwind", 
      dep: "Vercel",
      desc: "Interface de portfolio immersive simulant un système d'exploitation... futuriste", 
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80" 
    },
    { 
      id: "p2", 
      id_code: "PROJ-002",
      title: "NEXUS SECURE", 
      type: "CYBER SECURITY",
      stack: "Python / Kali", 
      dep: "Local Host",
      desc: "Outil d'analyse de vulnérabilités réseau avec tableau de bord en temps réel.", 
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
    },
    { 
      id: "p3", 
      id_code: "PROJ-003",
      title: "QUANTUM API", 
      type: "BACKEND ARCH",
      stack: "Node.js / PGSQL", 
      dep: "Docker / AWS",
      desc: "Infrastructure micro-services hautement disponible pour traitement massif.", 
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
    }
  ]
};

const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  let iconPath = "";
  let needsInvert = false; 

  if (n.includes('html')) iconPath = "html5/html5-original.svg";
  else if (n.includes('css')) iconPath = "css3/css3-original.svg";
  else if (n.includes('javascript') || n === 'js') iconPath = "javascript/javascript-original.svg";
  else if (n.includes('typescript') || n === 'ts') iconPath = "typescript/typescript-original.svg";
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
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`} 
        alt={name}
        className={`w-4 h-4 object-contain transition-all duration-300 ${needsInvert ? 'invert brightness-200' : 'brightness-100'} group-hover/skill:scale-110`}
      />
    );
  }
  return <Cpu size={14} className="text-cyan-400" />;
};

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = { root: null, rootMargin: '-20% 0px -75% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, observerOptions);
    sections.forEach((section) => { if (section.id) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
      {/* Background Glows */}
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
              {myData.fullName}<span className="text-cyan-400">@Portfolio</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {["ABOUT", "SKILLS", "PROJECTS", "CERTIFICATIONS", "SERVICES", "CONTACTS"].map((name) => {
              const id = name.toLowerCase();
              return (
                <a key={name} href={`#${id}`} className={`text-[10px] font-bold tracking-[0.25em] transition-all relative group ${activeSection === id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                  {name}
                  {activeSection === id && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>}
                </a>
              );
            })}
          </div>

          <button className="hidden sm:block border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-cyan-400 transition-all">
            TERMINAL_ACCESS
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-24 pb-20 px-4 md:px-10 flex flex-col items-center gap-12 md:gap-16">
        
        {/* SECTION: ABOUT */}
        <section id="about" className="w-full max-w-7xl bg-white/[0.01] backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
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
                        <Cpu size={16} /> {myData.job.split(',')[0]}
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
                  <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                    {myData.name}
                  </h1>
                  <p className="text-gray-500 font-medium tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase mt-2">
                    {myData.job}
                  </p>
                </div>
                <div className="bg-white/[0.03] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-inner relative group">
                  <h3 className="text-cyan-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-4 md:mb-6 flex items-center gap-3">
                    <User2 size={14}/> Identity_Brief
                  </h3>
                  <div className="space-y-4 text-gray-300 text-xs md:text-base leading-relaxed font-normal">
                    {myData.bio.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </div>
                  <div className="mt-6 md:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                    <button className="px-5 md:px-6 py-2.5 md:py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-black text-[9px] md:text-[10px] tracking-widest transition-all uppercase shadow-lg shadow-cyan-500/20">Hire Me</button>
                    <button className="px-5 md:px-6 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 rounded-xl font-black text-[9px] md:text-[10px] tracking-widest border border-white/10 transition-all uppercase">Download CV</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: SKILLS (CAROUSEL MOBILE) --- */}
        <SectionContainer id="skills" title="Core_Capabilities" subtitle="MON ÉCOSYSTÈME TECHNIQUE">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
            {myData.skillCategories.map((cat, i) => (
              <div key={i} className="min-w-[85%] md:min-w-0 snap-center bg-white/[0.02] backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden text-left flex flex-col h-full min-h-[200px] md:min-h-[220px]">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all shadow-inner">
                    {cat.icon}
                  </div>
                  <h4 className="font-black text-[11px] tracking-[0.2em] text-white/90 uppercase">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-3 relative z-10">
                  {cat.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/[0.06] transition-all group/skill h-9">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">{getSkillIcon(skill)}</div>
                      <span className="text-[10px] font-black text-gray-500 group-hover/skill:text-cyan-400 uppercase tracking-tighter transition-colors whitespace-nowrap">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none group-hover:-translate-y-2 group-hover:-translate-x-2">
                   {React.cloneElement(cat.icon, { size: 120 })}
                </div>
              </div>
            ))}
            
            <div className="hidden lg:flex bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md p-6 rounded-3xl border border-white/5 items-center justify-center border-dashed relative overflow-hidden group">
               <div className="text-center relative z-10">
                  <div className="inline-flex p-4 bg-cyan-500/10 rounded-full mb-4 animate-pulse border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Zap size={24} className="text-cyan-400" />
                  </div>
                  <p className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">System_Active</p>
               </div>
            </div>
          </div>
        </SectionContainer>

        {/* --- SECTION: PROJECTS (CAROUSEL MOBILE & DÉTAILS AGRANDIS) --- */}
<SectionContainer id="projects" title="Selected_Works" subtitle="ARCHIVES_PROJETS_V1.0">
  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-6 md:pb-0">
    {myData.projects.map((proj) => (
      <div key={proj.id} className="min-w-[88%] md:min-w-0 snap-center group relative bg-[#070708] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/40 flex flex-col shadow-2xl">
        
        {/* Barre de titre style Terminal - Texte agrandi à 10px */}
        <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase italic">{proj.id_code}</span>
          </div>
          <div className="flex gap-1.5 opacity-30">
            <div className="w-3 h-[2px] bg-white"></div>
            <div className="w-3 h-[2px] bg-white"></div>
          </div>
        </div>

        {/* Image Area - Hauteur augmentée pour équilibrer la police */}
        <div className="relative h-40 w-full overflow-hidden bg-black">
          <img 
            src={proj.img} 
            className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" 
            alt={proj.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent"></div>
          
          {/* Badge de Type - Texte agrandi à 10px */}
          <div className="absolute bottom-3 left-5">
            <span className="text-[10px] font-black px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-[0.2em] backdrop-blur-md">
              {proj.type}
            </span>
          </div>
        </div>

        {/* Content Area - Augmentation générale de la police */}
        <div className="p-6 flex flex-col flex-grow space-y-5">
          <div className="space-y-3">
            {/* Titre agrandi à text-base (16px) */}
            <h4 className="text-base md:text-lg font-black text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
              {proj.title}
            </h4>
            
            {/* Description ajoutée et agrandie à 11px/12px */}
            <p className="text-[11px] md:text-xs text-gray-400 font-mono leading-relaxed line-clamp-3">
              {proj.desc}
            </p>
          </div>

          {/* Specs Grid - Labels 9px et Contenu 10px */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">_Stack</span>
              <span className="text-[10px] text-gray-300 font-mono truncate">{proj.stack}</span>
            </div>
            <div className="flex flex-col border-l border-white/5 pl-4 gap-1">
              <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">_Deployment</span>
              <span className="text-[10px] text-gray-300 font-mono truncate">{proj.dep}</span>
            </div>
          </div>

          {/* Bouton de Lien (Vérification) - Agrandi et interactif */}
          <a 
            href={proj.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group/btn relative w-full py-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 flex items-center justify-center gap-3"
          >
            <div className="absolute inset-0 bg-cyan-500/0 group-hover/btn:bg-cyan-500/5 transition-colors"></div>
            <span className="relative text-[10px] md:text-xs font-black text-gray-300 group-hover/btn:text-cyan-400 tracking-[0.4em] uppercase transition-colors">
              Project_Live
            </span>
            <ExternalLink size={14} className="relative text-gray-600 group-hover/btn:text-cyan-400 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>

        {/* Décoration d'angle Cyber */}
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 right-0 w-[1px] h-6 bg-cyan-500"></div>
          <div className="absolute top-0 right-0 w-6 h-[1px] bg-cyan-500"></div>
        </div>
      </div>
    ))}
  </div>
</SectionContainer>

        {/* --- SECTION: CERTIFICATIONS (CAROUSEL MOBILE AVEC DESCRIPTIONS & LIENS) --- */}
<SectionContainer id="certifications" title="Verified_Credentials" subtitle="ACCRÉDITATIONS & DIPLÔMES">
  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
    {[
      { 
        title: "Web Dev Basic", 
        issuer: "Coursera / Google", 
        date: "2024", 
        desc: "Fondamentaux du développement web: HTML, CSS, JavaScript et responsive design.",
        link: "#" // Remplace par ton vrai lien
      },
      { 
        title: "Cybersecurity Essentials", 
        issuer: "Cisco Academy", 
        date: "2024", 
        desc: "Principes fondamentaux de la sécurité informatique, protection des réseaux et données.",
        link: "#" // Remplace par ton vrai lien
      },
      { 
        title: "Fullstack JavaScript", 
        issuer: "Meta Professional", 
        date: "2023", 
        desc: "Maîtrise de l'écosystème React, Node.js et des architectures d'applications modernes.",
        link: "#" // Remplace par ton vrai lien
      }
    ].map((cert, i) => (
      <div key={i} className="min-w-[85%] md:min-w-0 snap-center group flex flex-col bg-[#0d1117] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-cyan-500/20">
        
        {/* Header Graphique */}
        <div className="h-40 md:h-45 bg-gradient-to-br from-[#1a2c2c] to-[#0d1515] flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <GraduationCap size={60} className="text-[#3d7a60] group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Contenu de la carte */}
        <div className="p-5 flex flex-col flex-grow bg-[#0d1117]">
          
          {/* Bloc Issuer */}
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-[#16222a] rounded-full text-cyan-500 border border-white/5">
                <Monitor size={14} />
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">Issuer</span>
                <span className="text-xs font-black text-white tracking-wide">{cert.issuer}</span>
             </div>
          </div>

          {/* Titre & Description */}
          <div className="mb-6 flex-grow">
            <h4 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
              {cert.title}
            </h4>
            <p className="text-[11px] text-gray-400 font-mono leading-relaxed opacity-80">
              {cert.desc}
            </p>
          </div>

          {/* Footer : Bouton de vérification & Date */}
          <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
             <a 
               href={cert.link} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1.5 bg-[#1b2c24] border border-[#2d4d3e] rounded text-[#4ade80] text-[9px] font-black uppercase tracking-widest hover:bg-[#2d4d3e] hover:text-white transition-all group/link"
             >
                <CheckCircle2 size={10} />
                <span>Verify_Now</span>
                <ExternalLink size={8} className="opacity-50 group-hover/link:translate-x-0.5 transition-transform" />
             </a>
             <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">
                Issued: {cert.date}
             </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</SectionContainer>

        {/* --- SECTION: SERVICES (CAROUSEL MOBILE) --- */}
        <SectionContainer id="services" title="Professional_Services" subtitle="SOLUTIONS & EXPERTISES TECHNIQUES">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
            {[
              { title: "Développement Fullstack", desc: "Conception d'applications web modernes, réactives et scalables utilisant les dernières architectures.", icon: <Globe size={24} />, tags: ["React", "Next.js", "Node.js"] },
              { title: "Audit & Sécurité", desc: "Analyse de vulnérabilités, tests d'intrusion et sécurisation des infrastructures numériques.", icon: <ShieldAlert size={24} />, tags: ["Pentest", "SSL", "Security Fix"] },
              { title: "Architecture Système", desc: "Mise en place d'environnements virtualisés, gestion de serveurs Linux et déploiement Docker.", icon: <Server size={24} />, tags: ["Docker", "Linux", "Cloud"] }
            ].map((service, i) => (
              <div key={i} className="min-w-[85%] md:min-w-0 snap-center group relative p-6 md:p-8 bg-[#0a0a0c] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-6 text-cyan-400 group-hover:text-white transition-all">{service.icon}</div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-4">{service.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="text-[8px] font-black tracking-widest uppercase px-2 py-1 bg-white/5 border border-white/10 text-gray-500 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="absolute bottom-4 right-8 text-4xl font-black text-white/[0.02] group-hover:text-cyan-500/5 transition-colors">0{i+1}</span>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* --- SECTION: CONTACTS (TACTICAL DUAL-PANEL) --- */}
                <SectionContainer id="contacts" title="Contact_Protocol" subtitle="ESTABLISHING_COMMUNICATION_V2.0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
                    
                    {/* GAUCHE : FORMULAIRE DE TRANSMISSION */}
                    <div className="lg:col-span-7">
                      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden group h-full">
                        {/* Décoration d'angle Cyber */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-cyan-500/30 rounded-tl-[2rem] pointer-events-none group-hover:border-cyan-500/60 transition-colors duration-500"></div>
                        
                        <form className="space-y-6 relative z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">_Identity_Name</label>
                              <input 
                                type="text" 
                                placeholder="EX: TCHINDA FOGANG"
                                className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 transition-all placeholder:text-gray-800 text-gray-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">_Access_Email</label>
                              <input 
                                type="email" 
                                placeholder="NOM@DOMAINE.COM"
                                className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 transition-all placeholder:text-gray-800 text-gray-300"
                              />
                            </div>
                          </div>
        
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">_Signal_Subject</label>
                            <input 
                              type="text" 
                              placeholder="COLLABORATION / SÉCURITÉ / DÉVELOPPEMENT"
                              className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 transition-all placeholder:text-gray-800 text-gray-300"
                            />
                          </div>
        
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">_Transmission_Data</label>
                            <textarea 
                              rows={5}
                              placeholder="ENTREZ VOTRE MESSAGE ICI..."
                              className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/10 transition-all placeholder:text-gray-800 text-gray-300 resize-none"
                            ></textarea>
                          </div>
        
                          <button className="group/btn relative w-full md:w-max px-10 py-4 bg-cyan-600/90 hover:bg-cyan-500 rounded-xl overflow-hidden transition-all shadow-lg shadow-cyan-900/20 active:scale-95">
                            <div className="relative z-10 flex items-center justify-center gap-3">
                              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Transmit_Signal</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                            </div>
                          </button>
                        </form>
                      </div>
                    </div>
        
                    {/* DROITE : CANAUX DE COMMUNICATION */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      
                      {/* Panel Info Directes */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                        <div className="space-y-8">
                          <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-8">Secure_Channels</h4>
                          
                          <div className="space-y-6">
                            <div className="flex items-center gap-5 group/item">
                              <div className="p-4 bg-cyan-500/5 border border-white/5 rounded-2xl group-hover/item:border-cyan-500/40 transition-all group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                <Mail className="text-cyan-400" size={20} />
                              </div>
                              <div className="text-left">
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">_Email</p>
                                <p className="text-xs font-black text-gray-300 uppercase tracking-tighter">tchinda@example.com</p>
                              </div>
                            </div>
        
                            <div className="flex items-center gap-5 group/item">
                              <div className="p-4 bg-purple-500/5 border border-white/5 rounded-2xl group-hover/item:border-purple-500/40 transition-all">
                                <Phone className="text-purple-400" size={20} />
                              </div>
                              <div className="text-left">
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">_Secure_Line</p>
                                <p className="text-xs font-black text-gray-300 uppercase tracking-tighter">+237 6XX XXX XXX</p>
                              </div>
                            </div>
        
                            <div className="flex items-center gap-5 group/item">
                              <div className="p-4 bg-emerald-500/5 border border-white/5 rounded-2xl group-hover/item:border-emerald-500/40 transition-all">
                                <MapPin size={20} className="text-emerald-400" />
                              </div>
                              <div className="text-left">
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">_Base_Loc</p>
                                <p className="text-xs font-black text-gray-300 uppercase tracking-tighter">Yaoundé, CM</p>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        {/* Grille des Réseaux Sociaux */}
                        <div className="grid grid-cols-2 gap-3 mt-12">
                          {[
                            { label: "LinkedIn", icon: <Linkedin size={16} />, color: "group-hover:text-blue-400" },
                            { label: "GitHub", icon: <Github size={16} />, color: "group-hover:text-white" },
                            { label: "Twitter", icon: <Twitter size={16} />, color: "group-hover:text-cyan-400" },
                            { label: "Instagram", icon: <Instagram size={16} />, color: "group-hover:text-pink-400" }
                          ].map((social, idx) => (
                            <a 
                              key={idx}
                              href="#"
                              className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl transition-all hover:bg-white/[0.05] hover:border-white/20 group"
                            >
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-white">{social.label}</span>
                              <div className={`text-gray-700 transition-colors ${social.color}`}>
                                {social.icon}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
        
                  </div>
                </SectionContainer>

      </main>

      {/* --- FOOTER: SYSTEM ARCHIVE & LINKS --- */}
            <footer className="w-full bg-[#08080a] border-t border-white/5 pt-20 pb-10 px-4 md:px-10 relative overflow-hidden">
              {/* Background Déco */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
                  
                  {/* Colonne 1: Identité & Status */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <Terminal size={18} className="text-cyan-400" />
                      </div>
                      <span className="font-bold tracking-tighter text-lg">
                        {myData.fullName}<span className="text-cyan-400">.OS</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed tracking-wide uppercase italic">
                      Architecte de solutions numériques sécurisées et performantes. Dédié à l'innovation continue et à la robustesse des systèmes.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">System_Online_V2.0</span>
                    </div>
                  </div>
      
                  {/* Colonne 2: Navigation Rapide */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-cyan-500 pl-3">_Navigation</h4>
                    <ul className="space-y-3">
                      {["About", "Skills", "Projects", "Certifications", "Services", "Contacts"].map((item) => (
                        <li key={item}>
                          <a href={`#${item.toLowerCase()}`} className="text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                            <span className="w-0 group-hover:w-2 h-[1px] bg-cyan-500 transition-all"></span>
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
      
                  {/* Colonne 3: Écosystème Tech */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-purple-500 pl-3">_Ecosystem</h4>
                    <ul className="space-y-3">
                      {[
                        { name: "GitHub Repositories", link: "#" },
                        { name: "NPM Packages", link: "#" },
                        { name: "Research Lab", link: "#" },
                        { name: "Documentation", link: "#" },
                        { name: "Source Code", link: "#" }
                      ].map((item) => (
                        <li key={item.name}>
                          <a href={item.link} className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                            <ExternalLink size={10} className="text-gray-700" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
      
                  {/* Colonne 4: Communication & Social */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-emerald-500 pl-3">_Social_Network</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <Linkedin size={16} />, label: "LinkedIn" },
                        { icon: <Github size={16} />, label: "GitHub" },
                        { icon: <Twitter size={16} />, label: "X-Twitter" },
                        { icon: <Instagram size={16} />, label: "Instagram" }
                      ].map((social) => (
                        <a key={social.label} href="#" className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all group">
                          <span className="text-gray-500 group-hover:text-cyan-400 transition-colors">{social.icon}</span>
                          <span className="text-[8px] font-black text-gray-600 group-hover:text-white uppercase tracking-tighter">{social.label}</span>
                        </a>
                      ))}
                    </div>
                    <button className="w-full py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                      Download_Full_Resume.PDF
                    </button>
                  </div>
                </div>
      
                {/* BARRE FINALE: COPYRIGHT & CREDITS */}
              </div>
            </footer>
          </div>
        );
      }

function SectionContainer({ children, id, title, subtitle }) {
  return (
    <section id={id} className="w-full max-w-7xl bg-white/[0.01] backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl p-6 md:p-16 relative overflow-hidden group">
      <div className="absolute top-6 right-8 md:top-8 md:right-12 flex gap-2">
         <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-cyan-500/30 transition-colors"></div>
         <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-cyan-500/30 transition-colors"></div>
      </div>
      <div className="flex flex-col mb-10 md:mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-2">{title}</h2>
        <p className="text-gray-500 text-[9px] md:text-[10px] tracking-[0.4em] font-bold">{subtitle}</p>
        <div className="w-12 md:w-16 h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] mx-auto md:mx-0"></div>
      </div>
      {children}
    </section>
  );
}