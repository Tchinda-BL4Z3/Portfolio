import React, { useState } from "react";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { Certification } from "../types";
import { useLanguage } from "../LanguageContext";

export default function Certifications() {
  const { language, t } = useLanguage();
  const isFr = language === "FR";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const certificationsData: Certification[] = t("certifications.list");

  // Pagination Configuration
  const itemsPerPage = 6;
  const totalPages = Math.ceil(certificationsData.length / itemsPerPage);
  const safestPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safestPage - 1) * itemsPerPage;
  const paginatedCertifications = certificationsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-2">
            {t("certifications.title")}
          </h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-3" />
          
          {/* Total counter badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-150 rounded-full text-slate-700 font-mono text-[11px] font-bold mt-1" id="certifications-total-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>{isFr ? "Total :" : "Total:"}</span>
            <span className="text-teal-600">{certificationsData.length}</span>
            <span>{isFr ? "certifications" : "certifications"}</span>
          </div>

          <p className="font-sans text-slate-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("certifications.subtitle")}
          </p>
        </div>

        {/* Mobile Swipe Tip Indicator */}
        {paginatedCertifications.length > 0 && (
          <div className="md:hidden flex items-center justify-center gap-1.5 text-slate-400 text-[9px] font-bold tracking-wider uppercase mb-5 font-mono" id="certifications-swipe-indicator">
            <span className="animate-pulse">←</span>
            <span>{isFr ? "Glisser pour défiler" : "Swipe to navigate"}</span>
            <span className="animate-pulse">→</span>
          </div>
        )}

        {/* Certifications Grid (Max 6 cases) */}
        <div className="flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {paginatedCertifications.map((cert) => (
            <div
              key={cert.id}
              className="group card-glow p-5 sm:p-6 rounded-3xl bg-slate-50/40 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-[235px] xs:w-[255px] sm:w-[295px] md:w-auto snap-center shrink-0"
            >
              <div>
                {/* Visual Certificate Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-2xl mb-5 border border-slate-150 shadow-sm">
                  <img
                    src="/src/assets/images/cert_diploma_1779368313219.png"
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-505 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 pt-[1px]">
                    <div className="p-2 bg-white/95 backdrop-blur-xs border border-slate-150 rounded-xl text-teal-600 shadow-sm">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Verification badge */}
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-slate-500">{t("certifications.verified") || (isFr ? "Vérifié" : "Verified")}</span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-display font-semibold text-base text-slate-900 mb-1 leading-snug group-hover:text-teal-650 transition-colors">
                  {cert.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 font-medium mb-4">
                  {cert.issuer}
                </p>
                
                {/* Meta details */}
                <div className="space-y-1.5 mb-5 border-t border-slate-100/70 pt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t("certifications.acquired") || (isFr ? "Obtenu en" : "Acquired in")} {cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <span>ID : </span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-sm select-all">{cert.credentialId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-750 font-medium text-xs transition-all cursor-pointer"
                >
                  <span className="font-sans">{t("certifications.verify_button") || (isFr ? "Vérifier la certification" : "Verify Certification")}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Navigation for Certifications */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-12 pt-6 border-t border-slate-100/70" id="certifications-pagination">
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
