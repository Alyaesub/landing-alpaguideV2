# Alpaguide — Landing page & API

Landing page de présentation du projet **Alpaguide** et son API de contact / mailing.
Monorepo : un front statique (`client/`) et une API Node.js / Express (`server/`), conteneurisée et déployée en continu sur un VPS.

> **Alpaguide** met en relation guides, accompagnateurs et professionnels de l'outdoor avec des utilisateurs selon leurs valeurs, leur territoire et leur niveau. Cette landing sert de vitrine produit et d'outil de pré-validation (collecte de bêta-testeurs).

## Sommaire

- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Développement local](#développement-local)
- [Variables d'environnement](#variables-denvironnement)
- [API](#api)
- [Déploiement (CI/CD)](#déploiement-cicd)
- [Sécurité](#sécurité)

## Architecture

Deux composants servis séparément derrière Nginx :

```
VPS Hostinger — Nginx (reverse proxy) + SSL Let's Encrypt
│
├─ alpaguide.fr       →  fichiers statiques  (/srv/projects/lp-alpaguide/client)
└─ api.alpaguide.fr   →  reverse proxy → conteneur « alpaguide-api » (127.0.0.1:4000)
```

- **Front (`client/`)** : fichiers statiques servis directement par Nginx.
- **API (`server/`)** : conteneur Docker (Node 22 Alpine, utilisateur non-root), joignable uniquement sur la loopback et exposé via le reverse proxy.

## Stack technique

| Couche | Technologies |
|---|---|
| Front | HTML5, CSS / SCSS custom, JavaScript Vanilla (ES6), responsive mobile-first |
| API | Node.js 22, Express 5, Nodemailer |
| Sécurité API | Helmet, CORS, express-rate-limit, validator, sanitization anti-XSS (middleware custom) |
| Conteneurisation | Docker (image Alpine non-root), Docker Compose |
| Infra | VPS Hostinger (Linux), Nginx, SSL Let's Encrypt (Certbot) |
| CI/CD | GitHub Actions → GHCR → déploiement VPS |

## Structure du projet

```
landing-alpaguideV2/
├── client/                      # Front statique (servi par Nginx)
│   ├── index.html
│   ├── 404.html / cgu-cgv.html / mentions.html
│   ├── asset/                   # images, og.jpg
│   ├── style/                   # CSS / SCSS
│   └── js/                      # app.js, modules/, utils/
├── server/                      # API Express
│   ├── app.js                   # point d'entrée
│   ├── routes/                  # contact.routes.js
│   ├── controllers/             # contact.controller.js
│   ├── middlewares/             # validate, rateLimit, logger, sanitize
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml           # compose de TEST LOCAL (build local de l'API)
├── compose.prod.yml             # compose de PROD (image GHCR) — utilisé par la CI
├── sitemap.xml / robots.txt
└── .github/workflows/deploy.yml # pipeline CI/CD
```

## Développement local

**Prérequis :** Node.js ≥ 22 (Docker optionnel pour l'API).

### API

```bash
cd server
# créer server/.env (voir Variables d'environnement)
npm install
npm run dev          # nodemon — écoute sur http://localhost:4000
```

Alternative via Docker (compose de test local) :

```bash
docker compose up -d --build   # build + lance l'API sur 127.0.0.1:4000
```

### Front

```bash
cd client
npx serve            # ou l'extension Live Server
```

En local, le front appelle l'API sur `http://localhost:4000`.

## Variables d'environnement

À renseigner dans `server/.env` (jamais commité) :

| Variable | Description |
|---|---|
| `PORT` | Port d'écoute de l'API (défaut : 4000) |
| `EMAIL_HOST` | Hôte SMTP |
| `EMAIL_PORT` | Port SMTP |
| `EMAIL_SECURE` | `true` / `false` (TLS) |
| `EMAIL_USER` | Identifiant SMTP |
| `EMAIL_PASS` | Mot de passe SMTP |
| `TARGET_EMAIL` | Adresse de réception des messages |

## API

Base : `/api`

| Méthode | Endpoint | Description | Protection |
|---|---|---|---|
| GET | `/api/ping` | Healthcheck | — |
| POST | `/api/contact/beta` | Inscription bêta | rate-limit · `validateBeta` · sanitize |
| POST | `/api/contact/cta` | Formulaire CTA | rate-limit · `validateCta` · sanitize |
| GET | `/api/contact/test` | Endpoint de test | — |

Les réponses sont au format JSON. Les envois de mail passent par Nodemailer (SMTP).

## Déploiement (CI/CD)

Déploiement continu via **GitHub Actions** à chaque `push` sur `main` (`.github/workflows/deploy.yml`) :

1. **build-and-push** — build de l'image API depuis `server/` → push sur **GHCR** (`ghcr.io/alyaesub/alpaguide-api`, tags `latest` + SHA du commit).
2. **deploy** —
   - synchronisation du front `client/` vers le webroot Nginx du VPS ;
   - envoi de `compose.prod.yml` ;
   - `docker compose -f compose.prod.yml pull && up -d` (bascule de l'API sur la nouvelle image).

Le `.env` de production reste sur le VPS et n'est jamais commité. Rollback possible via les images taguées par SHA.

> Au quotidien : **`git push` sur `main` = déploiement**.

## Sécurité

- API en conteneur **non-root** (user `node`), image Alpine à surface d'attaque réduite, port bindé sur la **loopback** (`127.0.0.1:4000`) — jamais exposé directement sur Internet.
- **Helmet** (headers HTTP sécurisés), **CORS**, **rate limiting** sur `/api/contact`, **validation** des entrées et **sanitization anti-XSS** des payloads.
- Secrets hors du dépôt (`.env` sur le VPS uniquement), déploiement via une **clé SSH dédiée**.
- HTTPS via Let's Encrypt.

## Auteur

**Pascal Reynier** — projet personnel.
