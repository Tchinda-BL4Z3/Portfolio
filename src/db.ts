import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, "portfolio.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    category TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id TEXT NOT NULL,
    author TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

export interface CommentRow {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface PostRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  likes: number;
}

export function toPublicPost(post: PostRow) {
  const comments = getAllComments(post.id);
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    readTime: post.read_time,
    category: post.category,
    likes: post.likes,
    comments,
  };
}

export function getAllPosts() {
  const rows = db.prepare("SELECT * FROM posts ORDER BY date DESC").all() as PostRow[];
  return rows.map(toPublicPost);
}

export function getPostById(id: string) {
  const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow | undefined;
  return row ? toPublicPost(row) : undefined;
}

export function toggleLike(id: string): number | null {
  const post = db.prepare("SELECT id, likes FROM posts WHERE id = ?").get(id) as { id: string; likes: number } | undefined;
  if (!post) return null;
  const likes = post.likes + 1;
  db.prepare("UPDATE posts SET likes = ? WHERE id = ?").run(likes, id);
  return likes;
}

export function getAllComments(postId: string): CommentRow[] {
  return db
    .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC")
    .all(postId) as CommentRow[];
}

export function addComment(postId: string, author: string, text: string) {
  const date = new Date().toISOString().split("T")[0];
  const info = db
    .prepare("INSERT INTO comments (post_id, author, text, date) VALUES (?, ?, ?, ?)")
    .run(postId, author, text, date);
  const row = db
    .prepare("SELECT * FROM comments WHERE id = ?")
    .get(info.lastInsertRowid) as CommentRow;
  return row;
}

export function createPost(input: {
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
}) {
  const id = `post-${Date.now()}`;
  const date = new Date().toISOString().split("T")[0];
  db.prepare(
    `INSERT INTO posts (id, title, excerpt, content, date, read_time, category, likes)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
  ).run(
    id,
    input.title,
    input.excerpt,
    input.content,
    date,
    input.readTime || "3 min",
    input.category || "Général"
  );
  return getPostById(id)!;
}

export function saveContact(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const date = new Date().toISOString();
  const info = db
    .prepare("INSERT INTO contacts (name, email, subject, message, date) VALUES (?, ?, ?, ?, ?)")
    .run(input.name, input.email, input.subject, input.message, date);
  return info.lastInsertRowid;
}