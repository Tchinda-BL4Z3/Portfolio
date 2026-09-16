import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Sparkles, Send, Bot, User, Smartphone, GraduationCap, Zap, Briefcase } from "lucide-react";
import { ChatMessage } from "../types";
import { useLanguage } from "../LanguageContext";

interface ChatAIProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAI({ isOpen, onClose }: ChatAIProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isFr = t("language") === "FR";

  // Suggested questions with background vector icons
  const suggestedQuestions = isFr 
    ? [
        { text: "Quels sont ses projets en React Native ?", icon: Smartphone },
        { text: "Quel est son parcours universitaire ?", icon: GraduationCap },
        { text: "Quelles sont ses compétences clés ?", icon: Zap },
        { text: "Pierre est-il disponible pour un stage/freelance ?", icon: Briefcase }
      ]
    : [
        { text: "What are his core React Native projects?", icon: Smartphone },
        { text: "What is his academic path?", icon: GraduationCap },
        { text: "What are his key competencies?", icon: Zap },
        { text: "Is Pierre available for internship or freelance work?", icon: Briefcase }
      ];

  // Load welcome message on first open or language switch
  useEffect(() => {
    if (messages.length === 0 || messages[0]?.id === "welcome") {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: isFr 
            ? "Bonjour ! Je suis l'assistant IA de Pierre Tchinda.\n\nJe connais parfaitement son parcours, ses certifications, ses passions et ses projets phares. Comment puis-je vous renseigner aujourd'hui ? N'hésitez pas à cliquer sur l'une des questions suggérées ci-dessous !"
            : "Hello! I am Pierre Tchinda's AI engineering assistant.\n\nI know all about his academic background, professional certifications, creative passions, and portfolio projects. How can I guide you today? Feel free to tap one of the suggested questions below!",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, isFr]);

  // Adjust scroll position after messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `m-user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg("");
    setLoading(true);

    try {
      // Package payload messages according to backend expectation
      const payloadMessages = [...messages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages, isFr })
      });

      if (!res.ok) {
        throw new Error("Erreur de communication avec l'IA");
      }

      const data = await res.json();
      
      const responseMsg: ChatMessage = {
        id: `m-model-${Date.now()}`,
        role: "model",
        content: data.text || (isFr 
          ? "Désolé, je n'ai pas pu générer de réponse intelligible." 
          : "Sorry, I was unable to compile a clear response at this moment."),
        timestamp: new Date(),
        simulated: !!data.simulated
      };

      setMessages(prev => [...prev, responseMsg]);
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      setMessages(prev => [
        ...prev,
        {
          id: `m-err-${Date.now()}`,
          role: "model",
          content: isFr 
            ? "Oops! Une erreur s'est produite lors de la connexion avec le serveur Gemini. Vous pouvez essayer de me reposer la question, ou contacter directement Pierre par mél !"
            : "Oops! An error occurred while communicating with the Gemini helper gateway. Please try rephrasing your topic, or contact Pierre directly via email!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMsg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:max-w-md h-full sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-8 duration-300">
      
      {/* Widget Header */}
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 hover:border-teal-500 transition-colors">
            <Sparkles className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide">
              {isFr ? "Assistant IA de Pierre T." : "Pierre T.'s AI Recruiter"}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] text-teal-400 font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
              <span>{isFr ? "Propulsé par Gemini" : "Powered by Gemini"}</span>
            </div>
          </div>
        </div>

        {/* Close trigger button */}
        <button
          onClick={onClose}
          className="p-1 px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md cursor-pointer transition-colors"
          title={isFr ? "Fermer la discussion" : "Close Chat"}
        >
          <span className="font-sans text-xs">{isFr ? "Fermer" : "Close"}</span>
        </button>
      </div>

      {/* Messages Scrolling Body */}
      <div
        ref={scrollRef}
        className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-4 font-sans text-xs sm:text-sm"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar indicator */}
            <div
              className={`p-2 rounded-xl shrink-0 h-9 w-9 flex items-center justify-center border shadow-sm ${
                msg.role === "user"
                  ? "bg-teal-600 border-teal-500 text-white"
                  : "bg-white border-slate-150 text-slate-700"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-teal-600" />}
            </div>

            {/* Bubble itself */}
            <div
              className={`rounded-2xl p-4 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap shadow-sm ${
                msg.role === "user"
                  ? "bg-slate-900 text-white rounded-tr-none"
                  : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
              }`}
            >
              {msg.content}
              {msg.simulated && (
                <div className={`mt-2 pt-2 border-t text-[10px] font-mono font-medium ${
                  msg.role === "user"
                    ? "border-slate-700 text-slate-300"
                    : "border-slate-100 text-slate-400"
                }`}>
                  {isFr ? "Réponse dégradée (mode local)" : "Degraded response (local mode)"}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing bubble loading indicator */}
        {loading && (
          <div className="flex gap-3 mr-auto max-w-[85%] items-center">
            <div className="p-2 rounded-xl shrink-0 h-9 w-9 bg-white border border-slate-150 flex items-center justify-center">
              <Bot className="w-4 h-4 text-teal-600" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Input Prompting Blocks */}
      {messages.length < 3 && (
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
          <p className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-2 px-1">
            {isFr ? "Recommandations de questions :" : "Suggested question prompts:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.map((q) => {
              const Icon = q.icon;
              return (
                <button
                  key={q.text}
                  onClick={() => handleSendMessage(q.text)}
                  className="relative overflow-hidden p-2.5 bg-white hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 text-left rounded-xl transition-all shadow-sm cursor-pointer group flex flex-col justify-between min-h-[56px]"
                >
                  {/* Subtle Background Icon - Icône de fond */}
                  <div className="absolute -right-1.5 -bottom-1.5 text-slate-200 group-hover:text-teal-200/90 transition-colors pointer-events-none">
                    <Icon className="w-10 h-10 stroke-[1.2] opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all" />
                  </div>

                  {/* Clean text without emoji stickers */}
                  <span className="relative z-10 font-sans text-[11px] font-medium text-slate-700 group-hover:text-teal-950 leading-snug line-clamp-2">
                    {q.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Message Text Input Form Footer */}
      <form
        onSubmit={handleFormSubmit}
        className="p-4 border-t border-slate-100 bg-white flex gap-2 items-center shrink-0"
      >
        <input
          type="text"
          placeholder={isFr ? "Posez-moi des questions sur Pierre..." : "Ask me anything about Pierre..."}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          disabled={loading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-450 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim() || loading}
          className="p-3 bg-slate-900 hover:bg-teal-600 disabled:bg-slate-100 text-white disabled:text-slate-400 rounded-xl transition-all cursor-pointer hover:scale-[1.02]"
          title={isFr ? "Envoyer la question" : "Send question"}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
