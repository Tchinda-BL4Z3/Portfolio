import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle2, MessageSquare, Clipboard, Facebook, Loader2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopyEmail, setIsCopyEmail] = useState(false);

  const isFr = t("language") === "FR";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || isSubmitting) return;

    setIsSubmitting(true);
    setIsError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur d'envoi du message");
      }
      setIsSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Contact submission failed:", err);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("pierre.tchinda@facsciences-uy1.cm");
    setIsCopyEmail(true);
    setTimeout(() => setIsCopyEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full" />
          <p className="font-sans text-slate-600 mt-4 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">
              {t("contact.sidebar_title")}
            </h3>
            
            {/* Direct Email Card */}
            <div className="card-glow p-6 rounded-2xl bg-white border border-slate-100/80 hover:border-slate-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-teal-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-xs text-slate-400 uppercase tracking-wider mb-0.5">
                    {t("contact.sidebar_subtitle")}
                  </h4>
                  <p className="font-sans font-bold text-sm text-slate-800 break-all">
                    pierre.tchinda@facsciences-uy1.cm
                  </p>
                </div>
              </div>

              {/* Copy Indicator */}
              <button
                onClick={copyEmailToClipboard}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{isCopyEmail ? (isFr ? "Copié !" : "Copied!") : (isFr ? "Copier l'adresse de Pierre" : "Copy Pierre's email")}</span>
              </button>
            </div>

            {/* Platform Links Card */}
            <div className="card-glow p-6 rounded-2xl bg-white border border-slate-100/80 hover:border-slate-200 transition-all space-y-4">
              <h4 className="font-sans font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">
                {isFr ? "Profils & Réseaux Professionnels" : "Professional Profiles & Socials"}
              </h4>
              
              <div className="space-y-3">
                {/* Gmail Box */}
                <a
                  href="mailto:pierre.tchinda@facsciences-uy1.cm"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 hover:border-teal-200 transition-all text-slate-700 hover:text-teal-700 cursor-pointer text-xs font-semibold font-sans group"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                    <span>Gmail (Pro)</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 truncate max-w-[140px]">pierre.tchinda@...</span>
                </a>

                {/* Facebook Box */}
                <a
                  href="https://facebook.com/pierre.tchinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 hover:border-blue-200 transition-all text-slate-700 hover:text-blue-700 cursor-pointer text-xs font-semibold font-sans group"
                >
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span>Facebook</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">Pierre Tchinda</span>
                </a>

                {/* LinkedIn Box */}
                <a
                  href="https://linkedin.com/in/pierre-tchinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 hover:border-teal-200 transition-all text-slate-700 hover:text-teal-700 cursor-pointer text-xs font-semibold font-sans group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">@pierre-tchinda</span>
                </a>

                {/* GitHub Box */}
                <a
                  href="https://github.com/pierre-tchinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-slate-700 hover:text-slate-900 cursor-pointer text-xs font-semibold font-sans group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
                    <span>GitHub Code Pool</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">@pierre-tchinda</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/50 card-glow p-8 rounded-3xl border border-slate-200">
            <h3 className="font-display font-semibold text-xl text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-500" />
              <span>{isFr ? "Envoyer un message" : "Send a message"}</span>
            </h3>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-semibold text-lg text-emerald-900">
                  {isFr ? "Message envoyé avec succès !" : "Message sent successfully!"}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-emerald-700 max-w-md leading-relaxed">
                  {t("contact.success")}
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-full transition-all cursor-pointer"
                >
                  {isFr ? "Envoyer un nouveau message" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {isError && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-700 text-xs font-medium">
                    {t("contact.error")}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("contact.field_name")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isFr ? "Ex: Stéphane Dembélé" : "e.g. John Doe"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("contact.field_email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={isFr ? "Ex: rh@entreprise.com" : "e.g. hr@company.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {t("contact.field_subject")}
                  </label>
                  <input
                    type="text"
                    placeholder={isFr ? "Ex: Proposition de stage Master ou projet Freelance" : "e.g. Master Internship offer or Freelance Project"}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {t("contact.field_msg")}
                  </label>
                  <textarea
                    required
                    placeholder={isFr ? "Détaillez ici l'objet de votre prise de contact..." : "Write down the details of your request here..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-teal-500 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                        <span>{t("contact.btn_submitting")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-teal-400" />
                        <span>{t("contact.btn_submit")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
