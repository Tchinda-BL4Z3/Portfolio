export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: "Web" | "Mobile" | "Fullstack" | "Impact Social";
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Base de données" | "DevOps & Outils";
  level: number; // 1 to 5 stars or progress bar indicators
  descriptionFr?: string;
  descriptionEn?: string;
}

export interface EducationExperience {
  id: string;
  title: string;
  organization: string;
  location: string;
  duration: string;
  description: string[];
  type: "work" | "education";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  credentialId?: string;
  url?: string;
  image?: string;
  pdfPath?: string;
}

export interface Passion {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  likes: number;
  comments: BlogComment[];
}

export interface BlogComment {
  author: string;
  text: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}
