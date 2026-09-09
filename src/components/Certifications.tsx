import React, { useState } from "react";
import { Award, ExternalLink, ShieldCheck, X, FileText } from "lucide-react";
import { Certification } from "../types";
import { useLanguage } from "../LanguageContext";

export default function Certifications() {
  const { language, t } = useLanguage();
  const isFr = language === "FR";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewerCert, setViewerCert] = useState<Certification | null>(null);
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
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-5 border border-slate-150 shadow-sm ${
                    cert.pdfPath ? "bg-slate-100 cursor-pointer hover:border-teal-400 group/pdf" : "bg-slate-100"
                  }`}
                  onClick={() => {
                    if (cert.pdfPath) setViewerCert(cert);
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center transition-transform duration-505 group-hover/pdf:scale-103"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
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
                  <div className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                    <span className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-500 rounded-full bg-teal-500/15 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-teal-500" />
                    </span>
                    <span>{cert.description}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <span>ID : </span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-sm select-all">{cert.credentialId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 flex flex-col gap-2">
                {cert.pdfPath && (
                  <button
                    onClick={() => setViewerCert(cert)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-medium text-xs transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-sans">{isFr ? "Voir la certification" : "View certification"}</span>
                  </button>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-medium text-xs transition-all cursor-pointer"
                  >
                    <span className="font-sans">{t("certifications.verify_button") || (isFr ? "Vérifier la certification" : "Verify Certification")}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
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

      {/* PDF Viewer Modal */}
        {viewerCert && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-4 p-5 border-b border-slate-100 shrink-0">
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-base text-slate-900 truncate">
                    {viewerCert.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500">
                    {viewerCert.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setViewerCert(null)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full border border-slate-150 transition-colors cursor-pointer shrink-0"
                  title={isFr ? "Fermer" : "Close"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* PDF Embed */}
              <div className="flex-1 min-h-[60vh] bg-slate-100">
                <iframe
                  src={viewerCert.pdfPath}
                  title={viewerCert.title}
                  className="w-full h-full min-h-[60vh]"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-slate-100 shrink-0">
                <span className="font-mono text-[11px] text-slate-400">
                  {viewerCert.credentialId ? `ID : ${viewerCert.credentialId}` : ""}
                </span>
                <div className="flex items-center gap-2">
                  {viewerCert.url && (
                    <a
                      href={viewerCert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isFr ? "Vérifier sur Coursera" : "Verify on Coursera"}</span>
                    </a>
                  )}
                  <a
                    href={viewerCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isFr ? "Ouvrir le PDF" : "Open PDF"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
