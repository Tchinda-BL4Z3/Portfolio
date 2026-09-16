# Problèmes de fond — Portfolio & Blog Dev Fullstack

> Audit réalisé le 2026-09-14 sur la branche `Site`.
> Constats vérifiés dans le code, pas d'hypothèses.
> Les références sont au format `fichier:ligne`.
>
> **Dernière vérification : 2026-09-14** — les 4 problèmes de fond et les
> défauts secondaires #7, #8 ont été corrigés. Voir les descriptions pour les
> détails de chaque correctif.

---

## Contexte

Le site se présente comme le portfolio d'un **« Développeur Web, Programmeur & Analyste Sécurité »**
(`server.ts:155`), avec la mitigation OWASP Top 10 mise en avant dans le profil affiché.

Or la posture sécurité réelle du code ne suit pas cette promesse. Les points ci-dessous sont
classés par gravité décroissante : les quatre premiers sont des **problèmes de fond**, les
suivants des défauts secondaires.

---

## 1. `POST /api/blog` est entièrement ouvert — aucune authentification

**CORRIGÉ** (2026-09-14) — `server.ts` (middleware `requireAdmin`).

**Fichier :** `server.ts:457` (ancien) → `server.ts:519` (nouveau, route déplacée).

N'importe qui peut publier un article sur le portfolio. La route accepte un `POST` et écrit
directement en base, sans aucune vérification d'identité :

```ts
app.post("/api/blog", (req, res) => {
  const { title, excerpt, content, category, readTime } = req.body;
  if (!title || !excerpt || !content) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }
  const newPost = createPost({ title, excerpt, content, category, readTime });
  res.status(201).json(newPost);
});
```

J'ai relu l'intégralité des routes du serveur (`server.ts:383`, `430`, `434`, `443`, `457`, `467`) :
**aucun middleware d'authentification n'existe**, le seul middleware monté est `express.json()`
(`server.ts:22`).

**Impact :** un visiteur peut publier un contenu arbitraire sous votre nom de domaine, en une
seule requête `curl`. Sur un site destiné aux recruteurs, c'est le défaut le plus visible.

**Correctif :** middleware `requireAdmin` avec comparaison constant-time (`safeEqual`) d'un
header `x-admin-key` contre la variable d'env `ADMIN_KEY`. 503 si non configurée, 401 si clé
absente ou incorrecte. Le champ `adminKey` a été ajouté dans le drawer de création d'article
(Blog.tsx) avec un champ `type="password"`. Le fallback local client a été supprimé pour
empêcher les posts « fantômes ».

---

## 2. L'assistant IA ment en silence

**CORRIGÉ** (2026-09-14) — `server.ts` (logs + `simulated: true`), `ChatAI.tsx` (badge UI), `src/types.ts`.

**Fichiers :** `server.ts:178` (générateur simulé), `server.ts:390-394` et `server.ts:418-422` (déclenchement)

C'est le point le plus problématique du projet, non pas techniquement mais sur le plan de
l'intégrité. L'argument de vente du site est un **« assistant IA interactif pour les recruteurs »**
(`metadata.json`). En réalité, quand Gemini est indisponible, `getSimulatedResponse()`
(`server.ts:178`) renvoie une **réponse fabriquée par une recherche de mots-clés**, présentée au
visiteur exactement comme une réponse de l'IA.

Deux chemins y mènent :

- **Clé absente** (`server.ts:390`) — le serveur démarre normalement et bascule en mode simulation.
- **Appel Gemini en échec** (`server.ts:418`) — l'erreur est capturée dans `_geminiError` puis
  **silencieusement ignorée**, sans aucun log ni remontée d'alerte.

```ts
} catch (_geminiError: any) {
  // Fallback seamlessly using local smart response generator
  const simulatedResponse = getSimulatedResponse(messages, isFr);
  return res.json({ text: simulatedResponse });
}
```

**Impact double :**

1. Un recruteur dialogue avec une table de correspondance en croyant parler à une IA.
2. En production, **vous ne saurez jamais que Gemini est tombé** : ni log, ni erreur, ni
   surveillance. La panne est invisible par construction.

Le fait que le serveur démarre sans `GEMINI_API_KEY` (`server.ts:134-151`) sans erreur bloquante
aggrave le tout : une erreur de configuration en production se traduit par un chatbot
silencieusement faux, jamais par une alerte.

**Correctif :** le champ `simulated: true/false` est renvoyé dans la réponse JSON. Côté serveur,
un `console.warn` est émis à chaque fallback (clé absente ou appel Gemini échoué). Côté client,
`ChatAI.tsx` affiche un badge discret « Réponse dégradée (mode local) » sous les réponses
simulées, grâce au champ `simulated` ajouté à l'interface `ChatMessage` dans `src/types.ts`.

---

## 3. Aucune limitation de débit sur les routes publiques

**CORRIGÉ** (2026-09-14) — `server.ts` (middleware `rateLimit` maison, sans dépendance externe).

**Fichiers :** `server.ts:383` (chat), `server.ts:467` (contact)

`/api/chat` relaie vers une **API payante** (Gemini) sans aucun throttling. N'importe qui peut
appeler l'endpoint en boucle et faire exploser la facture Google, ou épuiser le quota.

Le formulaire de contact (`server.ts:467`) n'a ni honeypot, ni CAPTCHA, ni limitation : il est
ouvert au spam, et chaque soumission écrit en base **et** déclenche un envoi d'email.

**Correctif :** un middleware `rateLimit` glissant en mémoire (fenêtre coulissante, nettoyage
périodique avec `unref()`) a été ajouté. Pas de dépendance externe. Taux appliqués :
- `/api/chat` : 20 req/min par IP
- `/api/contact` : 10 req/min par IP
- `/api/blog/:id/comment` : 10 req/min par IP
- `/api/blog/:id/like` : 30 req/min par IP
- `POST /api/blog` : 5 req/min par IP (protection brute-force sur la clé admin)

---

## 4. Aucun test, aucune intégration continue

**CORRIGÉ** (2026-09-14) — `tests/api.test.ts` (18 tests), `package.json` (script `npm test`).

**Fichier :** `package.json:6-12`

Aucun framework de test n'est présent dans les dépendances, aucune suite de tests n'existe, et
aucun workflow CI n'est configuré. Le script `lint` se limite à `tsc --noEmit`
(vérification de types, pas de comportement).

**Impact :** sur un portfolio qui met en avant la rigueur et la sécurité, l'absence totale de
tests est un manque très visible pour un profil technique.

**Correctif :** 18 tests avec `node:test` (natif, pas de dépendance externe) exécutés via
`tsx --test`. Le serveur est importé en isolant la base dans un répertoire temporaire (`os.tmpdir()`).
Couverture : auth admin (503/401), validation des champs, longueurs max, CRUD blog complet,
likes, commentaires, contact, chat (flag `simulated`). Script : `npm test`.

---

## Points secondaires

| # | Problème | Référence | Détail |
|---|----------|-----------|--------|
| 5 | `toggleLike()` n'est pas un toggle | `src/db.ts:91` | Le nom est trompeur : la fonction **incrémente systématiquement**. Aucune déduplication, donc un même visiteur peut spammer les likes à l'infini. *(Non corrigé : le comportement d'incrémentation est le comportement UX souhaité — un vrai toggle nécessiterait un tracking par visiteur.)* |
| 6 | Contenu incohérent entre base et code | `src/components/*.tsx` | Le blog est persisté en SQLite, mais Projets, Compétences et Certifications sont **codés en dur dans les composants**. Modifier une ligne du CV impose un rebuild et un redéploiement. *(Hors scope : les composants sont volontairement statiques pour ce portfolio.)* |
| 7 | ~~Validation d'entrée minimale~~ | `server.ts:459`, `server.ts:446` | **CORRIGÉ** (2026-09-14) : limites de longueur ajoutées (`LIMITS` constant) — title: 200, excerpt: 500, content: 50 000, author: 100, comment: 2 000, contactName: 100, contactSubject: 200, contactMessage: 5 000 chars. |
| 8 | ~~Configuration fragile au démarrage~~ | `server.ts:20`, `server.ts:546` | **CORRIGÉ** (2026-09-14) : `PORT` lu depuis `process.env.PORT \|\| 3000`. Documenté dans `.env.example`. |
| 9 | README resté au template | `README.md` | Contient encore le texte générique d'AI Studio (« Run and deploy your AI Studio app »). Il ne décrit ni le projet, ni la configuration SMTP, ni les variables d'environnement. *(Hors scope : à mettre à jour manuellement avec la doc du projet.)* |

---

## À préserver lors des corrections

Ces points sont corrects et ne doivent pas être cassés par les correctifs ci-dessus :

- **Toutes les requêtes SQL sont préparées** (`src/db.ts`) — aucun risque d'injection SQL.
- **Aucun `dangerouslySetInnerHTML`** — les commentaires utilisateurs passent par l'échappement
  React, donc pas de XSS stocké.
- **Le seed de la base est idempotent et transactionnel** (`server.ts:97-131`).
- **Le SMTP dégrade proprement** : le message est stocké même si l'email échoue (`server.ts:518-525`).

---

## Priorités recommandées

Toutes corrigées le 2026-09-14 :

1. ✅ **Protéger `POST /api/blog`** — middleware `requireAdmin` + clé de longueur constante.
2. ✅ **Rendre le fallback IA transparent** — flag `simulated`, logs serveur, badge UI.
3. ✅ **Limiter le débit** sur `/api/chat` et `/api/contact` — middleware maison glissant.
4. ✅ **Ajouter des tests** — 18 tests `node:test` couvrant auth, validation, CRUD, chat.
