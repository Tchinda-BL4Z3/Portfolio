import React, { useState } from "react";
import { FolderGit2, Github, ExternalLink } from "lucide-react";
import { Project } from "../types";
import { useLanguage } from "../LanguageContext";

export default function Projects() {
  const { language, t } = useLanguage();
  const isFr = language === "FR";
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const projectsData: (Project & { image: string })[] = t("projects.list");

  const filteredProjects = selectedCategory === "Tous"
    ? projectsData
    : projectsData.filter((item) => {
        if (selectedCategory === "Fullstack") {
          return item.techStack.includes("Node.js") || item.techStack.includes("Express") || item.techStack.includes("Firebase");
        }
        const mappedCat = t(`projects.categories.${item.category}`);
        return item.category === selectedCategory || mappedCat === selectedCategory;
      });

  const categories = [
    t("projects.categories.Tous"),
    t("projects.categories.Web"),
    t("projects.categories.Mobile"),
    t("projects.categories.Impact Social"),
    t("projects.categories.Fullstack")
  ];

  // Pagination Logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const safestPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safestPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    if (cat === t("projects.categories.Tous")) {
      setSelectedCategory("Tous");
    } else if (cat === t("projects.categories.Web")) {
      setSelectedCategory("Web");
    } else if (cat === t("projects.categories.Mobile")) {
      setSelectedCategory("Mobile");
    } else if (cat === t("projects.categories.Impact Social")) {
      setSelectedCategory("Impact Social");
    } else if (cat === t("projects.categories.Fullstack")) {
      setSelectedCategory("Fullstack");
    } else {
      setSelectedCategory(cat);
    }
    setCurrentPage(1); // Reset page on filter switch
  };

  return (
    <section id="projets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-2">
            {t("projects.title")}
          </h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-3" />
          
          {/* Total counter badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-150 rounded-full text-slate-700 font-mono text-[11px] font-bold mt-1" id="projects-total-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>{isFr ? "Total :" : "Total:"}</span>
            <span className="text-teal-600">{projectsData.length}</span>
            <span>{isFr ? "projets" : "projects"}</span>
            {filteredProjects.length !== projectsData.length && (
              <>
                <span className="text-slate-300 mx-1">/</span>
                <span className="text-slate-500 font-normal">{filteredProjects.length} {isFr ? "filtrés" : "filtered"}</span>
              </>
            )}
          </div>

          <p className="font-sans text-slate-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat: string) => {
            const mappedSelected = selectedCategory === "Tous" ? t("projects.categories.Tous") : selectedCategory;
            const isSelected = mappedSelected === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe Tip Indicator */}
        {filteredProjects.length > 0 && (
          <div className="md:hidden flex items-center justify-center gap-1.5 text-slate-400 text-[9px] font-bold tracking-wider uppercase mb-5 font-mono" id="projects-swipe-indicator">
            <span className="animate-pulse">←</span>
            <span>{isFr ? "Glisser pour défiler" : "Swipe to navigate"}</span>
            <span className="animate-pulse">→</span>
          </div>
        )}

        {/* Projects Grid (Max 6 cases) */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between h-full bg-slate-50/40 hover:bg-white rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-350 overflow-hidden w-[235px] xs:w-[255px] sm:w-[295px] md:w-auto snap-center shrink-0"
            >
              <div>
                {/* Brand Visual Portrait / Photo Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 pt-[1px]">
                    <span className="inline-block px-2.5 py-1 text-[9px] font-bold font-mono tracking-wider uppercase bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-150 rounded-lg shadow-sm">
                      {t(`projects.categories.${project.category}`)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Top-right Links */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display font-semibold text-lg text-slate-900 group-hover:text-teal-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex gap-2.5 text-slate-400 shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-slate-900 p-1 bg-white hover:bg-slate-50 border border-slate-150 rounded-lg shadow-sm transition-all"
                          title="GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal-600 p-1 bg-white hover:bg-slate-50 border border-slate-150 rounded-lg shadow-sm transition-all"
                          title="Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technologies List Footer */}
              <div className="px-6 pb-6">
                <div className="pt-4 border-t border-slate-100/55 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-150"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 text-sm">
              {t("projects.empty")}
            </div>
          )}
        </div>

        {/* Pagination Navigation for Projects */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-12 pt-6 border-t border-slate-100/70" id="projects-pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={safestPage === 1}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all flex items-center justify-center gap-1 text-xs"
              title={isFr ? "Précédent" : "Previous"}
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">{isFr ? "Précédent" : "Prev"}</span>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, idx) => {
                const pNum = idx + 1;
                const isCurrent = pNum === safestPage;
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold font-mono transition-all border cursor-pointer ${
                      isCurrent
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={safestPage === totalPages}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all flex items-center justify-center gap-1 text-xs"
              title={isFr ? "Suivant" : "Next"}
            >
              <span className="hidden sm:inline">{isFr ? "Suivant" : "Next"}</span>
              <span>&rarr;</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
