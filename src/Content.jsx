import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Menu, X, Languages, Heart, Image, Music, Gamepad2, 
  ChevronLeft, ChevronRight, Play, Pause, Volume2, Star, Camera,
  Smile, Coffee, Plane, Book, Headphones, Tv, Sparkles
} from 'lucide-react';

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1.1) * 100,
    y: seededRandom(i * 2.2) * 100,
    size: seededRandom(i * 3.3) * 3 + 1,
    duration: seededRandom(i * 4.4) * 20 + 10,
    delay: seededRandom(i * 5.5) * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-500/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-4 h-4 border border-purple-400 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${isClicking ? 1.5 : 1})`,
        }}
      />
      <div
        className="fixed top-0 left-0 w-1 h-1 bg-purple-400 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
        }}
      />
    </>
  );
};

const translations = {
  FR: {
    nav: ["PASSIONS", "GALERIE", "DIVERTISSEMENT"],
    title: "AU_DELA_DU_CODE",
    subtitle: "DECOUVRIR_MA_PERSONNE",
    passion: {
      title: "Mes_Passions",
      subtitle: "CE QUI M'ANIME",
      items: [
        { icon: Coffee, title: "Café & Discussion", desc: "Discussions enrichissantes autour d'un bon café" },
        { icon: Plane, title: "Voyages", desc: "Découvrir de nouvelles cultures et horizons" },
        { icon: Book, title: "Lecture", desc: "Livres sur la technologie, la philosophie et l'histoire" },
        { icon: Music, title: "Musique", desc: "Ambiance électronique, jazz et classique" },
        { icon: Gamepad2, title: "Jeux Vidéo", desc: "RPG, stratégie et exploración" },
        { icon: Heart, title: "Partage", desc: "Mentorat et transmission de connaissances" }
      ]
    },
    gallery: {
      title: "Galerie_Photo",
      subtitle: "INSTANTS_CAPTURES",
      seeAll: "Voir_Tout",
      photos: [
        { id: 1, title: "Code Session", category: "DEV" },
        { id: 2, title: "Team Work", category: "COLLAB" },
        { id: 3, title: "Hackathon", category: "EVENT" },
        { id: 4, title: "Conference", category: "EVENT" },
        { id: 5, title: "Project Launch", category: "DEV" },
        { id: 6, title: "Networking", category: "COLLAB" }
      ]
    },
    entertainment: {
      title: "Divertissement",
      subtitle: "LOISIRS_ET_DIVERTISSEMENT",
      movies: { title: "Films_Favoris", desc: "Mes recommendations cinématographiques" },
      music: { title: "Playlists", desc: "Ce que j'écoute en codant" },
      games: { title: "Jeux_Preferences", desc: "Mes compagnons virtuels" },
      items: {
        movies: ["Inception", "The Matrix", "Interstellar", "Dark Knight", "Mr. Robot"],
        music: ["Electronic Beats", "Lo-Fi Study", "Classical Focus", "Jazz Nights"],
        games: ["Cyberpunk 2077", "Elden Ring", "Mass Effect", "Civilization VI", "Hades"]
      }
    }
  },
  EN: {
    nav: ["PASSIONS", "GALLERY", "ENTERTAINMENT"],
    title: "BEYOND_CODE",
    subtitle: "DISCOVER_THE_PERSON",
    passion: {
      title: "My_Passions",
      subtitle: "WHAT_DRIVES_ME",
      items: [
        { icon: Coffee, title: "Coffee & Chat", desc: "Enriching discussions over good coffee" },
        { icon: Plane, title: "Travel", desc: "Discovering new cultures and horizons" },
        { icon: Book, title: "Reading", desc: "Books on technology, philosophy and history" },
        { icon: Music, title: "Music", desc: "Electronic, jazz and classical vibes" },
        { icon: Gamepad2, title: "Gaming", desc: "RPG, strategy and exploration" },
        { icon: Heart, title: "Sharing", desc: "Mentorship and knowledge transfer" }
      ]
    },
    gallery: {
      title: "Photo_Gallery",
      subtitle: "CAPTURED_MOMENTS",
      seeAll: "See_All",
      photos: [
        { id: 1, title: "Code Session", category: "DEV" },
        { id: 2, title: "Team Work", category: "COLLAB" },
        { id: 3, title: "Hackathon", category: "EVENT" },
        { id: 4, title: "Conference", category: "EVENT" },
        { id: 5, title: "Project Launch", category: "DEV" },
        { id: 6, title: "Networking", category: "COLLAB" }
      ]
    },
    entertainment: {
      title: "Entertainment",
      subtitle: "HOBBIES_AND_FUN",
      movies: { title: "Favorite_Movies", desc: "My cinematic recommendations" },
      music: { title: "Playlists", desc: "What I listen to while coding" },
      games: { title: "Preferred_Games", desc: "My virtual companions" },
      items: {
        movies: ["Inception", "The Matrix", "Interstellar", "Dark Knight", "Mr. Robot"],
        music: ["Electronic Beats", "Lo-Fi Study", "Classical Focus", "Jazz Nights"],
        games: ["Cyberpunk 2077", "Elden Ring", "Mass Effect", "Civilization VI", "Hades"]
      }
    }
  }
};

export default function Content() {
  const [activeSection, setActiveSection] = useState('passion');
  const [lang, setLang] = useState('FR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1);
  const t = translations[lang];
  
  const itemsPerPage = 6;
  const totalGalleryPages = Math.ceil(t.gallery.photos.length / itemsPerPage);
  
  const currentPhotos = t.gallery.photos.slice((currentGalleryPage - 1) * itemsPerPage, currentGalleryPage * itemsPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -75% 0px' });
    document.querySelectorAll('section').forEach((section) => { if (section.id) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      
      <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-purple-500/30 relative overflow-x-hidden">
        
        {/* Background Glows */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-pink-500/10 blur-[80px] md:blur-[120px] rounded-full"></div>
        </div>

        {/* --- NAVBAR --- */}
        <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl z-50">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl relative">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="p-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                <Terminal size={18} className="text-purple-400" />
              </div>
              <span className="font-bold tracking-tighter text-sm md:text-xl bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                TCHINDA<span className="text-purple-400">@content</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {t.nav.map((name, i) => {
                const ids = ["passion", "gallery", "entertainment"];
                return (
                  <a key={name} href={`#${ids[i]}`} className={`text-[10px] font-bold tracking-[0.25em] transition-all relative group ${activeSection === ids[i] ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                    {name}
                    {activeSection === ids[i] && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_#a855f7]"></div>}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-purple-500/10 transition-all group">
                <Languages size={14} className="text-purple-400" />
                <span className="text-[10px] font-black text-gray-300 tracking-widest">{lang}</span>
              </button>
              <button onClick={() => window.location.href = '/'} className="hidden sm:flex items-center justify-center w-9 h-9 border border-purple-500/30 hover:border-purple-400 bg-purple-500/5 hover:bg-purple-500/20 rounded-full transition-all cursor-pointer">
                <Terminal size={16} className="text-purple-400" />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-[110%] left-0 w-full bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 lg:hidden flex flex-col gap-4 shadow-3xl animate-in slide-in-from-top duration-300">
                {t.nav.map((name, i) => {
                  const ids = ["passion", "gallery", "entertainment"];
                  return (
                    <a key={name} href={`#${ids[i]}`} onClick={() => setIsMenuOpen(false)} className={`text-[11px] font-black tracking-widest p-3 rounded-xl transition-all uppercase border border-white/5 ${activeSection === ids[i] ? 'bg-purple-500/10 text-purple-400' : 'text-gray-400 hover:bg-white/5'}`}>
                      {name}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <main className="pt-24 pb-20 px-4 md:px-10 flex flex-col items-center gap-12 md:gap-16">
          
          {/* HEADER INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-7xl text-center py-10"
          >
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent uppercase mb-4">
              {t.title}
            </h1>
            <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase">
              {t.subtitle}
            </p>
          </motion.div>

          {/* SECTION: PASSIONS */}
          <SectionContainer id="passion" title={t.passion.title} subtitle={t.passion.subtitle} accentColor="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {t.passion.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-purple-500/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="mb-4 text-purple-400 group-hover:text-white transition-all">
                      <item.icon size={32} />
                    </div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-3 group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium uppercase">
                      {item.desc}
                    </p>
                  </div>
                  <span className="absolute bottom-4 right-8 text-4xl font-black text-white/[0.02] group-hover:text-purple-500/5">
                    0{i+1}
                  </span>
                </motion.div>
              ))}
            </div>
          </SectionContainer>

          {/* SECTION: GALLERY */}
          <SectionContainer id="gallery" title={t.gallery.title} subtitle={t.gallery.subtitle} accentColor="pink">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {currentPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-square bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-pink-500/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 group-hover:from-purple-900/20 group-hover:to-pink-900/20 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={40} className="text-white/20 group-hover:text-white/60 transition-all" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[10px] font-black px-3 py-1 bg-pink-500/20 border border-pink-500/30 text-pink-400 uppercase tracking-widest">
                      {photo.category}
                    </span>
                    <h4 className="text-lg font-black text-white uppercase mt-2 group-hover:text-pink-400 transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/30 rounded-2xl transition-all"></div>
                </motion.div>
              ))}
            </div>

            {t.gallery.photos.length > itemsPerPage && (
              <div className="mt-8 md:mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <button onClick={() => currentGalleryPage > 1 && setCurrentGalleryPage(currentGalleryPage - 1)} disabled={currentGalleryPage === 1} className={`p-2 md:p-3 rounded-xl border border-white/10 transition-all ${currentGalleryPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 text-gray-400'}`}>
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: totalGalleryPages }, (_, i) => i + 1).map((num) => (
                    <button key={num} onClick={() => setCurrentGalleryPage(num)} className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl font-bold text-xs transition-all duration-300 ${currentGalleryPage === num ? 'bg-pink-500 text-black shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'border border-white/10 text-gray-500 hover:border-white/30'}`}>
                      {num}
                    </button>
                  ))}
                  <button onClick={() => currentGalleryPage < totalGalleryPages && setCurrentGalleryPage(currentGalleryPage + 1)} disabled={currentGalleryPage === totalGalleryPages} className={`p-2 md:p-3 rounded-xl border border-white/10 transition-all ${currentGalleryPage === totalGalleryPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/5 text-gray-400'}`}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </SectionContainer>

          {/* SECTION: ENTERTAINMENT */}
          <SectionContainer id="entertainment" title={t.entertainment.title} subtitle={t.entertainment.subtitle} accentColor="fuchsia">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* Movies */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-fuchsia-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20 group-hover:bg-fuchsia-500/20 transition-all">
                    <Tv size={24} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter">{t.entertainment.movies.title}</h4>
                    <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{t.entertainment.movies.desc}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {t.entertainment.items.movies.map((movie, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-fuchsia-500/30 transition-all">
                      <Play size={12} className="text-fuchsia-400" />
                      <span className="text-xs font-black text-gray-300 uppercase">{movie}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Music */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                    <Headphones size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter">{t.entertainment.music.title}</h4>
                    <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{t.entertainment.music.desc}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {t.entertainment.items.music.map((playlist, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all">
                      <Volume2 size={12} className="text-purple-400" />
                      <span className="text-xs font-black text-gray-300 uppercase">{playlist}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Games */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-pink-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20 group-hover:bg-pink-500/20 transition-all">
                    <Gamepad2 size={24} className="text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter">{t.entertainment.games.title}</h4>
                    <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{t.entertainment.games.desc}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {t.entertainment.items.games.map((game, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5 hover:border-pink-500/30 transition-all">
                      <Sparkles size={12} className="text-pink-400" />
                      <span className="text-xs font-black text-gray-300 uppercase">{game}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionContainer>

        </main>

        {/* --- FOOTER --- */}
        <footer className="w-full bg-[#08080a] border-t border-white/5 pt-20 pb-10 px-4 md:px-10 relative text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Terminal size={18} className="text-purple-400" />
                </div>
                <span className="font-bold tracking-tighter text-lg">TCHINDA<span className="text-purple-400">.content</span></span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed tracking-wide uppercase italic">
                {lang === 'FR' ? "Passionné par la technologie et l'innovation" : "Passionate about technology and innovation"}
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-purple-500 pl-3">_Navigation</h4>
              <ul className="space-y-3">
                {t.nav.map((item, i) => (
                  <li key={item}>
                    <a href={`#${["passion", "gallery", "entertainment"][i]}`} className="text-[10px] font-bold text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-purple-500 transition-all"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-l-2 border-pink-500 pl-3">_Quick_Link</h4>
              <a href="/" className="inline-block text-[10px] font-bold text-gray-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
                ← {lang === 'FR' ? "Retour au portfolio" : "Back to portfolio"}
              </a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center">
            <span className="text-gray-600 text-[10px] font-bold tracking-[0.6em] uppercase">© 2026 TCHINDA_SYSTEMS | ALL_RIGHTS_RESERVED</span>
          </div>
        </footer>

      </div>
    </>
  );
}

function SectionContainer({ children, id, title, subtitle, accentColor = "cyan" }) {
  const getColorStyle = (color) => {
    const colors = {
      cyan: { bg: "rgba(6,182,212,0.5)", text: "text-cyan-500", border: "border-cyan-500" },
      purple: { bg: "rgba(168,85,247,0.5)", text: "text-purple-500", border: "border-purple-500" },
      pink: { bg: "rgba(236,72,153,0.5)", text: "text-pink-500", border: "border-pink-500" },
      fuchsia: { bg: "rgba(232,121,249,0.5)", text: "text-fuchsia-500", border: "border-fuchsia-500" }
    };
    return colors[color] || colors.cyan;
  };

  const colorStyle = getColorStyle(accentColor);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl bg-white/[0.01] backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl p-6 md:p-16 relative overflow-hidden group mb-16"
    >
      <div className="absolute top-6 right-8 md:top-8 md:right-12 flex gap-2">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-purple-500/30 transition-colors"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10 group-hover:bg-purple-500/30 transition-colors"></div>
      </div>
      <div className="flex flex-col mb-10 md:mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-2">{title}</h2>
        <p className="text-gray-500 text-[9px] md:text-[10px] tracking-[0.4em] font-bold uppercase">{subtitle}</p>
        <div className={`w-12 md:w-16 h-1 ${colorStyle.text} mt-4 rounded-full shadow-[0_0_10px_${colorStyle.bg}] mx-auto md:mx-0`}></div>
      </div>
      {children}
    </motion.section>
  );
}
