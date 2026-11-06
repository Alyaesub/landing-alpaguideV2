# syntax=docker/dockerfile:1

# Image de base : Alpine + Node 22 déjà dedans, version figée (repro + surface d'attaque réduite)
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# 1) package*.json AVANT le reste -> le cache du "npm ci" ne saute que si les deps changent
COPY package*.json ./

# 2) Install reproductible, deps de PROD uniquement (exclut nodemon & co)
RUN npm ci --omit=dev

# 3) Puis le code (change souvent -> on le met après pour profiter du cache ci-dessus)
COPY . .

# 4) Dossier de logs accessible à l'utilisateur non-root "node"
RUN mkdir -p logs && chown -R node:node /app

# On ne tourne PAS en root (bonne pratique sécu)
USER node

EXPOSE 4000

# Healthcheck via la route /api/ping déjà présente dans app.js
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4000/api/ping || exit 1

# Pas de build : c'est du CommonJS pur, Node l'exécute tel quel -> on le lance directement
CMD ["node", "app.js"]