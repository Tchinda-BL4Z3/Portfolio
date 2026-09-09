import React, { useState, useEffect, useCallback } from "react";
import { 
  BookOpen, 
  Gamepad2, 
  Palette, 
  Heart, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Grid,
  Layers,
  Eye,
  ImageIcon
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface TranslatedPassion {
  id: string;
  title: string;
  description: string;
  images?: string[];
}

export default function Passions() {
  const { t } = useLanguage();
  const isFr = t("language") === "FR";

  const [activeCategory, setActiveCategory] = useState<string>("reading");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [layoutStyle, setLayoutStyle] = useState<"featured" | "grid">("featured");

  const passionsData: TranslatedPassion[] = Array.isArray(t("passions.categories"))
    ? t("passions.categories")
    : [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentPage(0);
    setLightboxIndex(null);
  };

  const activePassion = passionsData.find((p) => p.id === activeCategory) || passionsData[0];
  const allActiveImages = activePassion?.images || [];

  // Lightbox navigation handlers
  const handleNextImage = useCallback(() => {
    if (lightboxIndex !== null && allActiveImages.length > 0) {
      setLightboxIndex((prev) => (prev !== null && prev < allActiveImages.length - 1 ? prev + 1 : 0));
    }
  }, [lightboxIndex, allActiveImages]);

  const handlePrevImage = useCallback(() => {
    if (lightboxIndex !== null && allActiveImages.length > 0) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allActiveImages.length - 1));
    }
  }, [lightboxIndex, allActiveImages]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNextImage, handlePrevImage]);

  const getIconName = (id: string) => {
    if (id === "reading" || id === "lecture" || id === "photo") return "BookOpen";
    if (id === "gaming") return "Gamepad";
    if (id === "anime") return "Palette";
    return id;
  };

  const getPassionIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className={className || "w-4.5 h-4.5 text-teal-600 dark:text-teal-400"} />;
      case "Gamepad":
        return <Gamepad2 className={className || "w-4.5 h-4.5 text-blue-600 dark:text-blue-400"} />;
      case "Palette":
        return <Palette className={className || "w-4.5 h-4.5 text-purple-600 dark:text-purple-400"} />;
      default:
        return <BookOpen className={className || "w-4.5 h-4.5 text-teal-600 dark:text-teal-400"} />;
    }
  };

  const getIconContainerColor = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return "bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-950/50 dark:border-teal-800/60 dark:text-teal-300";
      case "Gamepad":
        return "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800/60 dark:text-blue-300";
      case "Palette":
        return "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/50 dark:border-purple-800/60 dark:text-purple-300";
      default:
        return "bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-950/50 dark:border-teal-800/60 dark:text-teal-300";
    }
  };

  const getTabTitle = (id: string, title: string) => {
    if (id === "reading" || id === "lecture" || id === "photo") return isFr ? "Lecture" : "Reading";
    if (id === "gaming") return "Gaming";
    if (id === "anime") return "Anime / Art";
    return title.split(" ")[0];
  };

  // Pagination parameters
  const imagesPerPage = layoutStyle === "featured" ? 7 : 8;
  const totalPages = Math.ceil(allActiveImages.length / imagesPerPage) || 1;
  const startIndex = currentPage * imagesPerPage;
  const visibleImages = allActiveImages.slice(startIndex, startIndex + imagesPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="passions" className="py-20 bg-slate-50/80 dark:bg-slate-950/90 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-black border border-slate-300 dark:bg-[#7cedeb]/10 dark:text-[#7cedeb] dark:border-[#7cedeb]/20 text-xs font-mono font-black mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-[#7cedeb]" />
            <span>{isFr ? "Galerie Visuelle & Univers Créatif" : "Creative Visual Gallery & Universe"}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-black dark:text-white tracking-tight mb-4 flex items-center justify-center gap-2">
            <span>{t("passions.title")}</span>
          </h2>
          <div className="w-12 h-1 bg-teal-600 dark:bg-[#7cedeb] mx-auto rounded-full" />
          <p className="font-sans text-black dark:text-slate-200 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-bold">
            {t("passions.subtitle")}
          </p>
        </div>

        {/* Top Passions Overview Cards - Carousel on Mobile / Grid on Desktop */}
        <div>
          {/* Mobile swipe helper badge */}
          <div className="md:hidden flex justify-end mb-3">
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-[#7cedeb] bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800 animate-pulse">
              {isFr ? "Glisser les thèmes ↔" : "Swipe themes ↔"}
            </span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 mb-12">
            {passionsData.map((passion) => {
              const iconName = getIconName(passion.id);
              const isTargeted = activeCategory === passion.id;
              const imgCount = passion.images?.length || 0;

              return (
                <div
                  key={passion.id}
                  onClick={() => {
                    handleCategoryChange(passion.id);
                    const showcase = document.getElementById("passions-gallery-showcase");
                    if (showcase) {
                      showcase.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border cursor-pointer transition-all duration-300 flex flex-col justify-between shrink-0 snap-center w-[85vw] max-w-[320px] md:w-auto md:max-w-none ${
                    isTargeted 
                      ? "border-teal-600 dark:border-[#7cedeb] ring-2 ring-teal-500/20 dark:ring-[#7cedeb]/20 shadow-md scale-[1.01]" 
                      : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg"
                  }`}
                >
                  <div>
                    {/* Top Bar: Icon, Title & Image Count Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl border ${getIconContainerColor(iconName)} shadow-sm`}>
                          {getPassionIcon(iconName, "w-5 h-5")}
                        </div>
                        <h3 className="font-display font-black text-base sm:text-lg text-black dark:text-white">
                          {passion.title}
                        </h3>
                      </div>

                      <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-mono font-extrabold bg-slate-100 text-black border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                        {imgCount} {isFr ? "visuels" : "images"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-black dark:text-slate-200 leading-relaxed mb-6 font-medium">
                      {passion.description}
                    </p>
                  </div>

                  {/* Footer status line */}
                  <div className="pt-4 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between text-black dark:text-slate-300 text-[11.5px] font-mono">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>{t("passions.signature")}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-[11px] font-black ${isTargeted ? "text-teal-700 dark:text-[#7cedeb]" : "text-slate-700 dark:text-slate-400"}`}>
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isTargeted ? (isFr ? "Sélectionné" : "Active") : (isFr ? "Explorer" : "Explore")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Showcase Gallery Main Block */}
        <div 
          id="passions-gallery-showcase" 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Gallery Header Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
            
            {/* Title & Active Passion Badge */}
            <div className="flex items-center gap-3">
              <div className={`p-2.5 sm:p-3 rounded-2xl border ${getIconContainerColor(getIconName(activeCategory))} shadow-sm`}>
                {getPassionIcon(getIconName(activeCategory), "w-5 h-5 sm:w-6 sm:h-6")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-lg sm:text-xl text-black dark:text-white">
                    {activePassion.title}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800">
                    {allActiveImages.length} {isFr ? "fichiers" : "files"}
                  </span>
                </div>
                <p className="font-sans text-xs text-black dark:text-slate-300 mt-0.5 font-bold">
                  {isFr ? "Toucher un visuel pour l'agrandir en plein écran" : "Tap any visual to expand in full-screen lightbox"}
                </p>
              </div>
            </div>

            {/* Controls Bar: Category Tabs & Layout Style Switcher */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              
              {/* Category Selector Tabs */}
              <div className="flex bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-1 rounded-2xl gap-1 shrink-0 w-full sm:w-auto overflow-x-auto no-scrollbar">
                {passionsData.map((passion) => {
                  const iconName = getIconName(passion.id);
                  const isActive = activeCategory === passion.id;
                  return (
                    <button
                      key={passion.id}
                      onClick={() => handleCategoryChange(passion.id)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all whitespace-nowrap flex-1 sm:flex-none ${
                        isActive
                          ? "bg-black text-white dark:bg-[#7cedeb] dark:text-black shadow-sm"
                          : "text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>
                        {getPassionIcon(iconName, `w-3.5 h-3.5 ${isActive ? "text-white dark:text-black" : "text-black dark:text-slate-300"}`)}
                      </span>
                      <span>{getTabTitle(passion.id, passion.title)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Layout Switcher (Featured vs Uniform Grid) */}
              <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-1 rounded-2xl gap-1">
                <button
                  onClick={() => { setLayoutStyle("featured"); setCurrentPage(0); }}
                  className={`p-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    layoutStyle === "featured"
                      ? "bg-black text-white dark:bg-[#7cedeb] dark:text-black shadow-sm"
                      : "text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                  title={isFr ? "Mode Vedette (Mise en avant)" : "Featured Layout"}
                >
                  <Layers className="w-4 h-4" />
                  <span className="text-[11px] font-mono">{isFr ? "Vedette" : "Hero"}</span>
                </button>

                <button
                  onClick={() => { setLayoutStyle("grid"); setCurrentPage(0); }}
                  className={`p-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    layoutStyle === "grid"
                      ? "bg-black text-white dark:bg-[#7cedeb] dark:text-black shadow-sm"
                      : "text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                  title={isFr ? "Grille Uniforme 4x2" : "Uniform Grid"}
                >
                  <Grid className="w-4 h-4" />
                  <span className="text-[11px] font-mono">{isFr ? "Grille" : "Grid"}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Interactive Photos Container */}
          <div className="relative flex items-center gap-2 sm:gap-4 select-none">
            
            {/* Left Side Navigation Button (Desktop Only) */}
            {totalPages > 1 && (
              <button
                onClick={prevPage}
                className="hidden sm:flex p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white transition-all shadow-sm cursor-pointer focus:outline-none items-center justify-center shrink-0 hover:scale-105 active:scale-95"
                title={isFr ? "Page précédente" : "Previous page"}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Photos Display - Mobile Carousel / Desktop Grid */}
            <div className="flex-1 w-full overflow-hidden">
              {layoutStyle === "featured" ? (
                /* FEATURED MAGAZINE GRID / MOBILE CAROUSEL */
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 auto-rows-[200px]">
                  {visibleImages.map((url, idx) => {
                    const actualIdx = startIndex + idx;
                    const isFirstHero = idx === 0;

                    return (
                      <div
                        key={actualIdx}
                        onClick={() => setLightboxIndex(actualIdx)}
                        className={`group/gallery relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-slate-900 cursor-pointer shadow-sm hover:border-teal-500 dark:hover:border-[#7cedeb] hover:shadow-xl transition-all duration-350 shrink-0 snap-center w-[84vw] max-w-[320px] h-[240px] sm:w-auto sm:max-w-none sm:h-auto ${
                          isFirstHero 
                            ? "sm:col-span-2 sm:row-span-2 aspect-auto" 
                            : "col-span-1 row-span-1"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`${activePassion.title} - ${actualIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-108"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Top corner photo number tag */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-black tracking-widest uppercase">
                          #{actualIdx + 1 < 10 ? `0${actualIdx + 1}` : actualIdx + 1}
                        </div>

                        {/* Expand Icon Badge on Mobile */}
                        <div className="sm:hidden absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1 text-[10px] font-mono font-bold">
                          <Maximize2 className="w-3 h-3 text-[#7cedeb]" />
                          <span>Plein écran</span>
                        </div>

                        {/* Hover Overlay Desktop */}
                        <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 flex-col justify-end p-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-[#7cedeb]" />
                              <span className="text-xs font-mono font-black uppercase tracking-wider">
                                {getTabTitle(activePassion.id, activePassion.title)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 bg-[#7cedeb] text-black px-2.5 py-1 rounded-lg font-mono text-[10px] font-black uppercase shadow-xs">
                              <Maximize2 className="w-3 h-3" />
                              <span>{isFr ? "Plein écran" : "Fullscreen"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* UNIFORM GRID / MOBILE CAROUSEL */
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
                  {visibleImages.map((url, idx) => {
                    const actualIdx = startIndex + idx;

                    return (
                      <div
                        key={actualIdx}
                        onClick={() => setLightboxIndex(actualIdx)}
                        className="group/gallery relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-slate-900 cursor-pointer shadow-sm hover:border-teal-500 dark:hover:border-[#7cedeb] hover:shadow-xl transition-all duration-350 shrink-0 snap-center w-[82vw] max-w-[300px] aspect-[4/3] sm:w-auto sm:max-w-none"
                      >
                        <img
                          src={url}
                          alt={`${activePassion.title} - ${actualIdx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-108"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Top corner photo number tag */}
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-black">
                          #{actualIdx + 1 < 10 ? `0${actualIdx + 1}` : actualIdx + 1}
                        </div>

                        {/* Expand Icon Badge on Mobile */}
                        <div className="sm:hidden absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1 text-[10px] font-mono">
                          <Maximize2 className="w-3 h-3 text-[#7cedeb]" />
                        </div>

                        {/* Hover Overlay Desktop */}
                        <div className="hidden sm:flex absolute inset-0 bg-black/50 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 items-center justify-center">
                          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-black uppercase">
                            <Maximize2 className="w-3.5 h-3.5 text-[#7cedeb]" />
                            <span>{isFr ? "Agrandir" : "Expand"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side Navigation Button (Desktop Only) */}
            {totalPages > 1 && (
              <button
                onClick={nextPage}
                className="hidden sm:flex p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white transition-all shadow-sm cursor-pointer focus:outline-none items-center justify-center shrink-0 hover:scale-105 active:scale-95"
                title={isFr ? "Page suivante" : "Next page"}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pagination Controls & Indicators under grid */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-5 text-xs text-black dark:text-slate-200 font-sans">
              
              <div className="flex items-center gap-2">
                <span className="font-mono bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1 rounded-xl text-black dark:text-white font-black">
                  {isFr ? `Page ${currentPage + 1} sur ${totalPages}` : `Page ${currentPage + 1} of ${totalPages}`}
                </span>
                <span className="font-bold">• {allActiveImages.length} {isFr ? "clichés au total" : "total shots"}</span>
              </div>

              {/* Page Bullets */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, pageIdx) => (
                  <button
                    key={pageIdx}
                    onClick={() => setCurrentPage(pageIdx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentPage === pageIdx 
                        ? "w-8 bg-black dark:bg-[#7cedeb]" 
                        : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                    }`}
                    aria-label={`Go to page ${pageIdx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next text buttons */}
              <div className="flex items-center gap-2 font-mono font-black">
                <button
                  onClick={prevPage}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 text-black dark:text-white cursor-pointer"
                >
                  &larr; {isFr ? "Préc." : "Prev"}
                </button>
                <button
                  onClick={nextPage}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 text-black dark:text-white cursor-pointer"
                >
                  {isFr ? "Suiv." : "Next"} &rarr;
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* FULL-FEATURED LIGHTBOX MODAL */}
      {lightboxIndex !== null && allActiveImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 animate-fade-in select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Modal Container */}
          <div 
            className="relative max-w-5xl w-full h-full max-h-[92vh] flex flex-col justify-between bg-black/90 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60 z-20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-[#7cedeb]">
                  {getPassionIcon(getIconName(activeCategory), "w-4 h-4")}
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base text-white">
                    {activePassion.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    {isFr ? `Cliché ${lightboxIndex + 1} sur ${allActiveImages.length}` : `Photo ${lightboxIndex + 1} of ${allActiveImages.length}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
                title={isFr ? "Fermer (Échap)" : "Close (Esc)"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Display Area with Left & Right Arrows */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden group/modal">
              
              {/* Previous Image Button */}
              {allActiveImages.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
                  title={isFr ? "Image précédente (Flèche Gauche)" : "Previous image (Left Arrow)"}
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              )}

              {/* Main Photo */}
              <img
                src={allActiveImages[lightboxIndex]}
                alt={`${activePassion.title} - ${lightboxIndex + 1}`}
                className="max-w-full max-h-[68vh] sm:max-h-[72vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Next Image Button */}
              {allActiveImages.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
                  title={isFr ? "Image suivante (Flèche Droite)" : "Next image (Right Arrow)"}
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              )}
            </div>

            {/* Bottom Lightbox Strip - Thumbnails Bar */}
            {allActiveImages.length > 1 && (
              <div className="p-3 border-t border-white/10 bg-black/80 flex items-center justify-center gap-2 overflow-x-auto">
                {allActiveImages.map((thumbUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-12 sm:w-16 h-10 sm:h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      lightboxIndex === idx 
                        ? "border-[#7cedeb] ring-2 ring-[#7cedeb]/50 scale-105" 
                        : "border-slate-800 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={thumbUrl} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
