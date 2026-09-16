import { describe, before, after, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";

// ── Point the DB to a temporary file BEFORE importing server ────────────────
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-test-"));
process.env.DATABASE_PATH = path.join(tmpDir, "test.db");
process.env.DATA_DIR = tmpDir;

const { app } = await import("../server.js");

let server: Server;
let baseUrl: string;

before(
  () =>
    new Promise<void>((resolve) => {
      server = app.listen(0, "127.0.0.1", () => {
        const addr = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    })
);

after(
  () =>
    new Promise<void>((resolve, reject) =>
      server.close((e) => (e ? reject(e) : resolve()))
    )
);

after(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

// ── Helpers ────────────────────────────────────────────────────────────────

async function api(
  method: string,
  route: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>
) {
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
  };
  if (body) opts.body = JSON.stringify(body);
  return fetch(`${baseUrl}${route}`, opts);
}

// ── Tests: blog CRUD + auth ────────────────────────────────────────────────

describe("GET /api/blog", () => {
  it("returns seeded posts on empty DB", async () => {
    const res = await api("GET", "/api/blog");
    assert.equal(res.status, 200);
    const posts = await res.json();
    assert.ok(Array.isArray(posts));
    assert.ok(posts.length >= 3);
    assert.ok(posts[0].title);
    assert.ok(posts[0].excerpt);
  });
});

describe("POST /api/blog auth", () => {
  const testKey = "test-admin-key-123";

  before(() => {
    process.env.ADMIN_KEY = testKey;
  });

  after(() => {
    delete process.env.ADMIN_KEY;
  });

  it("rejects with 503 when ADMIN_KEY is not set", async () => {
    delete process.env.ADMIN_KEY;
    const res = await api("POST", "/api/blog", {
      title: "X",
      excerpt: "X",
      content: "X",
    });
    assert.equal(res.status, 503);
    const body = await res.json();
    assert.ok(body.error.includes("ADMIN_KEY"));
  });

  it("rejects with 401 when no x-admin-key header", async () => {
    process.env.ADMIN_KEY = testKey;
    const res = await api("POST", "/api/blog", {
      title: "X",
      excerpt: "X",
      content: "X",
    });
    assert.equal(res.status, 401);
  });

  it("rejects with 401 when wrong key", async () => {
    const res = await api("POST", "/api/blog", { title: "X", excerpt: "X", content: "X" }, { "x-admin-key": "wrong" });
    assert.equal(res.status, 401);
  });

  it("returns 400 on missing fields", async () => {
    const res = await api("POST", "/api/blog", { title: "T" }, { "x-admin-key": testKey });
    assert.equal(res.status, 400);
  });

  it("returns 400 when title exceeds max length", async () => {
    const res = await api(
      "POST",
      "/api/blog",
      { title: "A".repeat(201), excerpt: "E", content: "C" },
      { "x-admin-key": testKey }
    );
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error.includes("title"));
  });

  it("creates post with valid data and correct key", async () => {
    const res = await api(
      "POST",
      "/api/blog",
      { title: "Test Post", excerpt: "Excerpt", content: "Content" },
      { "x-admin-key": testKey }
    );
    assert.equal(res.status, 201);
    const post = await res.json();
    assert.equal(post.title, "Test Post");
    assert.equal(post.id.startsWith("post-"), true);
  });

  it("verifies a correct admin key via /api/blog/verify", async () => {
    const res = await api("POST", "/api/blog/verify", {}, { "x-admin-key": testKey });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.ok, true);
  });

  it("rejects a wrong admin key via /api/blog/verify", async () => {
    const res = await api("POST", "/api/blog/verify", {}, { "x-admin-key": "wrong" });
    assert.equal(res.status, 401);
  });
});

// ── Tests: like + comment ──────────────────────────────────────────────────

describe("POST /api/blog/:id/like", () => {
  it("increments likes for a valid post", async () => {
    const posts = (await (await api("GET", "/api/blog")).json()) as any[];
    const id = posts[0].id;
    const before = posts[0].likes;
    const res = await api("POST", `/api/blog/${id}/like`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.likes, before + 1);
  });

  it("returns 404 for non-existent post", async () => {
    const res = await api("POST", "/api/blog/fake-id/like");
    assert.equal(res.status, 404);
  });
});

describe("POST /api/blog/:id/comment", () => {
  it("adds a comment to a valid post", async () => {
    const posts = (await (await api("GET", "/api/blog")).json()) as any[];
    const id = posts[0].id;
    const res = await api("POST", `/api/blog/${id}/comment`, {
      author: "Tester",
      text: "Nice!",
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.comment.author, "Tester");
  });

  it("returns 400 when author or text missing", async () => {
    const posts = (await (await api("GET", "/api/blog")).json()) as any[];
    const res = await api("POST", `/api/blog/${posts[0].id}/comment`, { author: "" });
    assert.equal(res.status, 400);
  });

  it("returns 400 when text exceeds max length", async () => {
    const posts = (await (await api("GET", "/api/blog")).json()) as any[];
    const res = await api(
      "POST",
      `/api/blog/${posts[0].id}/comment`,
      { author: "A", text: "B".repeat(2001) }
    );
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error.includes("text"));
  });
});

// ── Tests: delete comment (admin only) ─────────────────────────────────────

describe("DELETE /api/blog/comments/:id", () => {
  const adminKey = "test-admin-key-123";

  before(() => {
    process.env.ADMIN_KEY = adminKey;
  });

  after(() => {
    delete process.env.ADMIN_KEY;
  });

  it("rejects with 401 when the admin key is missing", async () => {
    const res = await api("DELETE", "/api/blog/comments/1");
    assert.equal(res.status, 401);
  });

  it("rejects with 401 when the admin key is wrong", async () => {
    const res = await api("DELETE", "/api/blog/comments/1", {}, { "x-admin-key": "wrong" });
    assert.equal(res.status, 401);
  });

  it("returns 400 for a non-numeric id", async () => {
    const res = await api("DELETE", "/api/blog/comments/abc", {}, { "x-admin-key": adminKey });
    assert.equal(res.status, 400);
  });

  it("returns 404 for a non-existent comment", async () => {
    const res = await api("DELETE", "/api/blog/comments/999999", {}, { "x-admin-key": adminKey });
    assert.equal(res.status, 404);
  });

  it("deletes an existing comment", async () => {
    const posts = (await (await api("GET", "/api/blog")).json()) as any[];
    const addRes = await api("POST", `/api/blog/${posts[0].id}/comment`, {
      author: "ToDelete",
      text: "Remove me",
    });
    assert.equal(addRes.status, 200);
    const created = (await addRes.json()).comment;
    assert.ok(created.id != null);

    const res = await api("DELETE", `/api/blog/comments/${created.id}`, {}, { "x-admin-key": adminKey });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);

    const after = (await (await api("GET", "/api/blog")).json()) as any[];
    const post = after.find((p: any) => p.id === posts[0].id);
    assert.ok(!post.comments.some((c: any) => c.id === created.id));
  });
});

describe("DELETE /api/blog/:id", () => {
  const adminKey = "test-admin-key-123";

  before(() => {
    process.env.ADMIN_KEY = adminKey;
  });

  after(() => {
    delete process.env.ADMIN_KEY;
  });

  it("rejects with 401 when the admin key is missing", async () => {
    const res = await api("DELETE", "/api/blog/post-1");
    assert.equal(res.status, 401);
  });

  it("rejects with 401 when the admin key is wrong", async () => {
    const res = await api("DELETE", "/api/blog/post-1", {}, { "x-admin-key": "wrong" });
    assert.equal(res.status, 401);
  });

  it("returns 404 for a non-existent post", async () => {
    const res = await api("DELETE", "/api/blog/post-does-not-exist", {}, { "x-admin-key": adminKey });
    assert.equal(res.status, 404);
  });

  it("deletes an existing article and its comments", async () => {
    const createRes = await api("POST", "/api/blog", {
      title: "ToDeletePost",
      excerpt: "Excerpt",
      content: "Body",
      category: "Admin",
      readTime: "1 min",
    }, { "x-admin-key": adminKey });
    assert.equal(createRes.status, 201);
    const created = (await createRes.json()) as any;

    await api("POST", `/api/blog/${created.id}/comment`, { author: "C", text: "c" });
    await api("DELETE", `/api/blog/${created.id}`, {}, { "x-admin-key": adminKey });

    const after = (await (await api("GET", "/api/blog")).json()) as any[];
    assert.ok(!after.some((p: any) => p.id === created.id));
  });

  it("keeps the local calendar date for the created post", async () => {
    const createRes = await api("POST", "/api/blog", {
      title: "DateCheck",
      excerpt: "Excerpt",
      content: "Body",
    }, { "x-admin-key": adminKey });
    assert.equal(createRes.status, 201);
    const created = (await createRes.json()) as any;
    const d = new Date();
    const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    assert.equal(created.date, local);
  });
});

// ── Tests: contact ─────────────────────────────────────────────────────────

describe("POST /api/contact", () => {
  it("returns 400 when required fields missing", async () => {
    const res = await api("POST", "/api/contact", { name: "N" });
    assert.equal(res.status, 400);
  });

  it("returns 400 on invalid email", async () => {
    const res = await api("POST", "/api/contact", {
      name: "N",
      email: "not-an-email",
      message: "M",
    });
    assert.equal(res.status, 400);
  });

  it("stores valid contact", async () => {
    const res = await api("POST", "/api/contact", {
      name: "Alice",
      email: "alice@test.com",
      subject: "Hello",
      message: "Test message",
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
  });

  it("returns 400 when message exceeds max length", async () => {
    const res = await api("POST", "/api/contact", {
      name: "N",
      email: "x@x.com",
      message: "M".repeat(5001),
    });
    assert.equal(res.status, 400);
  });
});

// ── Tests: chat simulated flag ─────────────────────────────────────────────

describe("POST /api/chat", () => {
  it("returns simulated:true when GEMINI_API_KEY is unset", async () => {
    delete process.env.GEMINI_API_KEY;
    const res = await api("POST", "/api/chat", {
      messages: [{ role: "user", content: "hello" }],
      isFr: false,
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.simulated, true);
    assert.ok(typeof body.text === "string");
  });

  it("returns 400 on invalid payload", async () => {
    const res = await api("POST", "/api/chat", { messages: "not-array" });
    assert.equal(res.status, 400);
  });
});
