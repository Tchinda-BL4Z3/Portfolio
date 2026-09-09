import React, { useState } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar, ArrowRight } from "lucide-react";
import { EducationExperience } from "../types";
import { useLanguage } from "../LanguageContext";

export default function About() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");
  const { t } = useLanguage();

  const timelineData: EducationExperience[] = t("about.timeline");

  const filteredTimeline = timelineData.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section id="parcours" className="py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            {t("about.title")}
          </h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 mt-4 max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Brand Profile + Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Who Am I */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <h3 className="font-display font-semibold text-xl text-slate-900 mb-4 flex items-center gap-2">
              <span>{t("about.identity_title")}</span>
            </h3>
            <div className="card-glow p-6 rounded-2xl bg-white shadow-xs">
              <p className="font-sans text-slate-600 leading-relaxed mb-4">
                {t("about.identity_p1")}
              </p>
              <p className="font-sans text-slate-600 leading-relaxed mb-4">
                {t("about.identity_p2")}
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-mono text-xs">{t("about.statut_label")}</span>
                  <span className="text-teal-600 font-semibold font-sans">{t("about.statut_value")}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-mono text-xs">{t("about.localisation_label")}</span>
                  <span className="text-slate-700 font-medium font-sans">{t("about.localisation_value")}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium font-mono text-xs">{t("about.dispo_label")}</span>
                  <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-100 rounded-full font-semibold text-xs animate-pulse-subtle">{t("about.dispo_value")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Timeline */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="font-display font-semibold text-lg lg:text-xl text-slate-900">
                {t("about.timeline_title")}
              </h3>
              
              {/* Filter Tabs */}
              <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    filter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t("about.filter_all")}
                </button>
                <button
                  onClick={() => setFilter("work")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    filter === "work" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t("about.filter_work")}
                </button>
                <button
                  onClick={() => setFilter("education")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    filter === "education" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t("about.filter_edu")}
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-10">
              {filteredTimeline.map((item, index) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Icon Marker */}
                  <div className="absolute -left-11 top-1.5 bg-white border border-slate-200 p-2 rounded-full shadow-xs group-hover:border-teal-500 group-hover:bg-teal-50/50 transition-all">
                    {item.type === "work" ? (
                      <Briefcase className="w-4 h-4 text-slate-705 group-hover:text-teal-600 transition-colors" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-slate-705 group-hover:text-teal-600 transition-colors" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="card-glow p-6 rounded-2xl bg-white shadow-xs group-hover:border-slate-200 group-hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-display font-semibold text-base sm:text-lg text-slate-900 group-hover:text-teal-600 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-slate-700 font-medium text-xs sm:text-sm">
                          {item.organization}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-start sm:items-end text-xs text-slate-500 gap-1">
                        <div className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 mt-4">
                      {item.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 text-slate-600 text-sm leading-relaxed items-start">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-teal-500/80 rounded-full shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              {filteredTimeline.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-sm font-sans">
                  {t("about.empty_timeline")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
