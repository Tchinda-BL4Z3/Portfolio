import React, { useState, useEffect } from "react";
import { 
  BookOpen, Calendar, Clock, ThumbsUp, MessageSquare, CornerDownRight, 
  Plus, X, Send, BookMarked, User 
} from "lucide-react";
import { BlogPost, BlogComment } from "../types";
import { useLanguage } from "../LanguageContext";

const DEFAULT_FALLBACK_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Pourquoi React Native est le choix idéal pour lancer un MVP en 2026",
    excerpt: "Comment optimiser le cycle de développement mobile de votre startup grâce à un code source unique, tout en conservant une expérience utilisateur 100% native.",
    content: `Le lancement d'un produit Minimum Viable (MVP) est une étape cruciale pour toute startup ou nouveau projet de développement. En tant que développeur Full Stack, j'ai vu à quel point le choix de la technologie influence la réussite de cette étape.

### Qu'est-ce qui rend React Native incontournable ?

1. **Un seul code source pour deux plateformes**
L'écriture d'une application distincte pour iOS (Swift) et Android (Kotlin/Java) double le coût et le temps de développement. React Native permet de partager jusqu'à 90% du code source.

2. **Performance quasi-native avec l'Architecture Moderne**
Grâce au nouveau moteur JSI (JavaScript Interface) et à Fabric, React Native communique directement avec les modules natifs sans passer par l'ancien pont asynchrone, offrant d'excellentes performances graphiques à 60 FPS.

3. **Écosystème de composants robustes (Expo)**
L'ensemble de frameworks 'Expo' accélère l'accès au matériel (caméra, géolocalisation, notifications push, capteurs) avec une stabilité impressionnante.

Choisir le bon framework dépend bien sûr de vos besoins spécifiques, mais pour 95% des applications d'affaires et de commerce, React Native offre le rapport vitesse/qualité le plus élevé du marché.`,
    date: "2026-05-18",
    readTime: "4 min",
    category: "Mobile",
    likes: 12,
    comments: [
      { author: "Stéphane", text: "Super article ! Entièrement d'accord sur le rôle d'Expo dans la rapidité de prototypage.", date: "2026-05-19" }
    ]
  },
  {
    id: "post-2",
    title: "Comprendre TypeScript : Le guide ultime vers le typage strict et sécurisé",
    excerpt: "Pourquoi le passage de JavaScript à TypeScript est indispensable pour la pérennité de vos architectures backend Node.js et vos projets React.",
    content: `Beaucoup de développeurs voient TypeScript comme une contrainte supplémentaire à cause du temps investi à déclarer des types et des interfaces. Pourtant, c'est l'investissement le plus rentable pour une application de production robuste.

### Les avantages immédiats pour les applications Fullstack :

* **Zéro bug de type 'undefined is not a function' au runtime**
* **Autocomplétion intelligente et puissante** dans l'éditeur
* **Refactoring serein** des bases de code complexes sans avoir peur de tout casser
* **Documentation vivante** intégrée directement au code source

Si vous écrivez du Node/Express sur le backend, associer TypeScript rend vos routes ultra-sûres en validant les payloads JSON d'entrée en amont. C'est l'assurance d'un code robuste que les équipes adorent maintenir !`,
    date: "2026-04-30",
    readTime: "6 min",
    category: "TypeScript",
    likes: 8,
    comments: []
  },
  {
    id: "post-3",
    title: "Optimiser les requêtes PostgreSQL avec Node.js et Express",
    excerpt: "Découvrez des astuces simples de pooling de connexions et d'indexation pour multiplier par 10 les performances de vos APIs REST.",
    content: `La lenteur d'une API est rarement due aux performances intrinsèques de Node.js. Dans 80% des cas, le goulot d'étranglement réside dans la base de données ou dans la manière dont elle est sollicitée.

### 3 règles d'or pour vos bases PostgreSQL :

1. **Utiliser un Connection Pool**
Ne recréez pas une connexion pour chaque requête HTTP. Utilisez le module \`pg\` avec l'objet \`Pool\` pour réutiliser les sessions ouvertes.
2. **Indexer intelligemment vos clés étrangères**
Si vous faites des jointures fréquentes ou des filtres sur des colonnes spécifiques, ajoutez des index circulaires.
3. **Éviter le piège du SELECT * **
Ne demandez que les colonnes dont l'interface a besoin. Vous économiserez de la bande passante et de la mémoire vive sur le serveur.

En appliquant ces trois méthodes sur l'un de mes projets d'école, la vitesse de réponse de notre affichage de catalogue de produits est passée de 320ms à seulement 28ms !`,
    date: "2026-03-12",
    readTime: "5 min",
    category: "Backend",
    likes: 15,
    comments: [
      { author: "Marie", text: "L'explication sur le Connection Pool est très claire. Merci Pierre !", date: "2026-03-15" }
    ]
  }
];

export default function Blog() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Detailed view state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Comment submission form state
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // New Post Creator Drawer state
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Mobile");
  const [newReadTime, setNewReadTime] = useState("4 min");
  const [submittingPost, setSubmittingPost] = useState(false);

  const isFr = t("language") === "FR";

  // Fetch blog posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/blog");
      if (!res.ok) {
        throw new Error("Erreur de récupération des articles");
      }
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      if (import.meta.env.DEV) console.error("Fetch blog failed, using fallback static articles:", err);
      setPosts(DEFAULT_FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(`/api/blog/${postId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: data.likes } : p));
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => prev ? { ...prev, likes: data.likes } : null);
        }
        return;
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Failed to like post via API, falling back to local update:", err);
    }
    // Local fallback update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !authorName.trim() || !commentText.trim()) return;

    const newCommentObj: BlogComment = {
      author: authorName,
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      setSubmittingComment(true);
      const res = await fetch(`/api/blog/${selectedPost.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: authorName, text: commentText })
      });

      if (res.ok) {
        const data = await res.json();
        const appendedComment: BlogComment = data.comment || newCommentObj;
        const updatedComments = [...selectedPost.comments, appendedComment];
        setSelectedPost(prev => prev ? { ...prev, comments: updatedComments } : null);
        setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, comments: updatedComments } : p));
        setCommentText("");
        return;
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Failed to comment via API, falling back to local update:", err);
    } finally {
      setSubmittingComment(false);
    }

    // Local fallback update
    const updatedComments = [...selectedPost.comments, newCommentObj];
    setSelectedPost(prev => prev ? { ...prev, comments: updatedComments } : null);
    setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, comments: updatedComments } : p));
    setCommentText("");
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim() || !newContent.trim()) return;

    const newPostObj: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      excerpt: newExcerpt,
      content: newContent,
      category: newCategory,
      readTime: newReadTime,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: []
    };

    try {
      setSubmittingPost(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          excerpt: newExcerpt,
          content: newContent,
          category: newCategory,
          readTime: newReadTime
        })
      });

      if (res.ok) {
        await fetchPosts();
        setIsCreatorOpen(false);
        setNewTitle("");
        setNewExcerpt("");
        setNewContent("");
        return;
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Failed to compile new post via API, falling back to local update:", err);
    } finally {
      setSubmittingPost(false);
    }

    // Local fallback update
    setPosts(prev => [newPostObj, ...prev]);
    setIsCreatorOpen(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 border-b border-slate-100 pb-8">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-2">
              {t("blog.title")}
            </h2>
            <p className="font-sans text-slate-600 max-w-2xl text-sm sm:text-base">
              {t("blog.subtitle")}
            </p>
          </div>

          <button
            onClick={() => setIsCreatorOpen(true)}
            className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs px-5 py-3 rounded-full border border-teal-200 cursor-pointer transition-all shrink-0 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>{isFr ? "Rédiger un article" : "Write an article"}</span>
          </button>
        </div>

        {/* Loading / Error Indicators */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="font-sans text-slate-500 text-sm">
              {isFr ? "Chargement des publications..." : "Loading papers & articles..."}
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 p-6 bg-rose-50 border border-rose-200 rounded-3xl max-w-lg mx-auto">
            <p className="text-rose-700 font-medium mb-3 text-sm">{error}</p>
            <button
              onClick={fetchPosts}
              className="bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
            >
              {isFr ? "Réessayer" : "Retry"}
            </button>
          </div>
        )}

        {/* Regular Posts Carousel on Mobile / Grid on Desktop */}
        {!loading && !error && (
          <div>
            {/* Mobile swipe helper badge */}
            <div className="md:hidden flex justify-end mb-3">
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 animate-pulse">
                {isFr ? "Glisser les articles ↔" : "Swipe articles ↔"}
              </span>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
              {posts.map((post) => (
                <div key={post.id} className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none flex">
                  <article
                    onClick={() => setSelectedPost(post)}
                    className="w-full group card-glow rounded-3xl bg-slate-50/40 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg hover:scale-[1.01] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-8">
                      {/* Tags & Metadata */}
                      <div className="flex items-center justify-between mb-4 text-xs">
                        <span className="px-2.5 py-1 font-mono font-bold uppercase tracking-wider text-[10px] text-teal-700 bg-teal-50 border border-teal-150 rounded-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title & Excerpt */}
                      <h3 className="font-display font-semibold text-base sm:text-lg text-slate-900 group-hover:text-teal-600 transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer items with likes and interactions */}
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex items-center justify-between border-t border-slate-100/60 pt-4">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>

                      <div className="flex justify-end gap-4 text-slate-500">
                        <button
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center gap-1 text-xs hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}

              {posts.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                  {isFr 
                    ? "Aucun article publié pour le moment. Soyez le premier à en rédiger un !"
                    : "No technical articles yet. Be the first to compose one!"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FULL ARTICLE VIEW DIALOG / MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setAuthorName("");
                  setCommentText("");
                }}
                className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full border border-slate-150 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label={isFr ? "Fermer l'article" : "Close article"}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Main Content inside Modal */}
              <div className="p-8 sm:p-10">
                {/* Header detail */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <span className="px-2.5 py-1 font-mono font-bold uppercase tracking-wider text-[10px] text-teal-700 bg-teal-50 border border-teal-150 rounded-sm">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedPost.readTime} {isFr ? "de lecture" : "read"}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6 leading-snug">
                  {selectedPost.title}
                </h3>

                {/* Body Content of Post */}
                <div className="font-sans text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed border-b border-slate-100 pb-8 mb-8">
                  {selectedPost.content}
                </div>

                {/* Bottom Actions inside viewing panel */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">
                      {isFr ? "Cet article vous a plu ?" : "Did you like this article?"}
                    </span>
                    <button
                      onClick={() => handleLike(selectedPost.id)}
                      className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold px-4 py-2 rounded-full border border-teal-100 text-xs cursor-pointer transition-all"
                    >
                      <ThumbsUp className="w-4 h-4 fill-teal-100" />
                      <span>{isFr ? "Soutenir" : "Like"} ({selectedPost.likes})</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Section: Comments List */}
                <div className="mb-8">
                  <h4 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                    <span>{isFr ? "Commentaires" : "Comments"} ({selectedPost.comments.length})</span>
                  </h4>

                  <div className="space-y-4">
                    {selectedPost.comments.map((comment, index) => (
                      <div key={index} className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/70 items-start">
                        <div className="p-2 bg-white rounded-xl border border-slate-150 text-slate-600 shadow-2xs">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="font-sans font-semibold text-xs text-slate-900">{comment.author}</span>
                             <span className="font-mono text-[10px] text-slate-400">{comment.date}</span>
                          </div>
                          <p className="font-sans text-xs text-slate-600 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}

                    {selectedPost.comments.length === 0 && (
                      <p className="font-sans text-slate-400 text-xs italic">
                        {isFr ? "Aucun commentaire rédigé pour le moment. Partagez votre opinion !" : "No comments yet. Write down your comments below!"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-Section: Comment Form */}
                <form onSubmit={submitComment} className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-150">
                  <h5 className="font-display font-semibold text-sm text-slate-900">
                    {isFr ? "Ajouter votre contribution" : "Add your comment contribution"}
                  </h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        {isFr ? "Votre Nom" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isFr ? "Ex: Stéphane" : "e.g. Stephen"}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-440 focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      placeholder={isFr ? "Votre avis constructif..." : "Your constructive observation..."}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-440 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-lg text-xs cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingComment ? (isFr ? "Envoi..." : "Sending...") : (isFr ? "Publier le commentaire" : "Publish Comment")}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* DRAWER / SLIDE-IN: REACTION WRITER (CREATE POST) */}
        {isCreatorOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end z-50">
            <div className="bg-white w-full max-w-xl h-full shadow-2xl relative border-l border-slate-100 flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Header inside drawer */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-teal-600" />
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {isFr ? "Rédiger un nouvel article" : "Write a New Article"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreatorOpen(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full cursor-pointer transition-colors"
                aria-label={isFr ? "Fermer l'éditeur" : "Close editor"}
              >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content Scrolling Container */}
              <form onSubmit={createPost} className="p-6 flex-1 overflow-y-auto space-y-5">
                
                {/* Information Callout */}
                <div className="bg-teal-50/60 border border-teal-150 p-4 rounded-xl text-teal-800 text-xs leading-relaxed font-sans">
                  {isFr
                    ? "Cet éditeur vous permet d'alimenter le blog technique ! Votre publication est enregistrée de façon permanente dans la base de données du serveur (SQLite) et visible par tous les visiteurs."
                    : "This authoring panel feeds the technical blog posts. Your publication is permanently stored in the server database (SQLite) and immediately rendered for all visitors."}
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {isFr ? "Titre De l'Article" : "Article Title"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isFr ? "Ex: Maîtriser le typage strict avec TypeScript" : "e.g. Unlocking Strict Types in TypeScript"}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      {isFr ? "Catégorie" : "Category"}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500 transition-colors"
                    >
                      <option value="Mobile">Mobile (React Native)</option>
                      <option value="TypeScript">TypeScript</option>
                      <option value="Backend">Backend / API</option>
                      <option value="Web">Ingénierie Web</option>
                      <option value="Général">Général / General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                      {isFr ? "Temps de Lecture" : "Read duration"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 min"
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {isFr ? "Accroche / Extrait court" : "Excerpt / Brief summary"}
                  </label>
                  <textarea
                    required
                    placeholder={isFr ? "Une courte phrase d'introduction qui résume l'article..." : "A concise header introduction summarizing this article..."}
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                    {isFr ? "Contenu complet de la publication" : "Complete publication markdown body"}
                  </label>
                  <textarea
                    required
                    placeholder={isFr ? "Rédigez ici votre réflexion technique..." : "Formulate your full engineering essay here..."}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={10}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors font-sans leading-relaxed"
                  />
                </div>

                {/* Submit action buttons footer inside drawer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatorOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {isFr ? "Annuler" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={submittingPost}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {submittingPost ? (isFr ? "Création..." : "Creating...") : (isFr ? "Publier l'article" : "Publish Article")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
