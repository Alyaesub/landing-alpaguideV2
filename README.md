# 🌄 Alpaguide – Landing Page Technique

Landing page officielle du projet **Alpaguide**, conçue pour présenter l’application, collecter les premiers utilisateurs et préparer le futur MVP.  
Ce README décrit **la stack technique**, **la structure**, **les optimisations SEO**, **le système de mailing**, et **un résumé clair du projet Alpaguide**.

---

## 📌 Résumé du projet

**Alpaguide** est une future plateforme qui met en relation **guides, accompagnateurs, moniteurs et pros outdoor** avec des utilisateurs **selon leurs valeurs, leur territoire, leur niveau et leur style d’accompagnement**.

Objectifs :

-   Remettre **l'humain**, le **local** et la **transparence** au centre.
-   Permettre aux pros de choisir leur modèle : Freemium, Abonnement ou Commission+Wallet.
-   Offrir une expérience simple, claire et directe sans algorithmes opaques.

---

## 🧱 Stack Technique

### **Front-end**

-   **HTML5**
-   **CSS / SCSS** entièrement custom
-   **JavaScript Vanilla ES6**
-   **Responsive mobile-first**
-   Lazy-loading natif (`loading="lazy"`)
-   Icons premium (SVG optimisés)
-   Thèmes dynamiques via JS (`theme-switcher`)

### **Back-end (en cours / à venir)**

-   **Node.js + Express**
-   Middleware custom pour :
    -   validation des formulaires
    -   anti-bots (honeypot)
    -   logging serveur
-   Service d’envoi de mail (SMTP ou API tierce)
-   Sécurisation :
    -   Rate limiting
    -   Nettoyage du payload (XSS)
    -   Headers sécurisés (helmet)

### **Hébergement**

-   VPS **Hostinger** (Linux)
-   Serveur **Nginx** en reverse-proxy
-   SSL via Let’s Encrypt
-   Déploiement Git + CI/CD léger

---

## 🌐 SEO & Performance

La landing est optimisée pour une mise en production propre et indexable par Google.

### 🔍 SEO Inclus

-   Balises `<title>` + `<meta name="description">` optimisées
-   **OpenGraph complet**
-   **Twitter Cards**
-   Fichier **sitemap.xml** généré
-   Fichier **robots.txt**
-   Balise canonical (`<link rel="canonical">`)
-   Hierarchie H1 → H2 → H3 optimisée
-   Keywords pertinents (montagne, guides, AMM, randonnée…)
-   Texte naturel et orienté intention utilisateur

### ⚡ Performance

-   Lazy loading d’images
-   Images compressées / optimisées
-   SVG inline pour réduire les requêtes
-   CSS unique pour limiter les requêtes HTTP
-   Utilisation des attributs ARIA

---

## ✉️ Mailing (Back-end)

Un système de mailing est prévu pour gérer :

### **Formulaire bêta :**

-   Prénom / Nom
-   Email
-   Type de profil
-   Message optionnel

### **Fonctionnement technique (à venir) :**

-   Endpoint `/api/beta`
-   Validation du schéma via `Joi` ou validator custom
-   Envoi mail via :
    -   NodeMailer en direct
-   Enregistrement dans un fichier JSON ou base de données
-   Protection :
    -   Honeypot
    -   Limite de fréquence par IP
    -   Nettoyage anti-XSS
-   Réponse JSON `{ success: true }`

---

## 🤝 Objectif de la Landing

Cette landing a été créée pour :

-   présenter clairement Alpaguide
-   rassurer pros & utilisateurs
-   expliquer les 3 modèles économiques
-   montrer la vision et les valeurs
-   collecter :
    -   bêta testeurs
    -   avis
    -   questionnaires pros + utilisateurs

Elle sert de **vitrine**, d’outil de **prévalidation produit**, et de **point d’entrée SEO** avant le MVP.

---

## 🚀 Roadmap

### ✔️ Fait

-   Structure HTML
-   Rédaction optimisée
-   SCSS complet
-   SEO avancé
-   FAQ Pros, FAQ Users, FAQ Wallet
-   Page Mentions légales + Politique de confidentialité

### 🔜 À venir

-   Système complet de mailing
-   Tracking analytics (Plausible)
-   Cookie banner RGPD
-   Mini API Express pour formulaire bêta
-   Déploiement final sur Hostinger

---

## 📬 Contact

**Email officiel :**  
📧 alpaguide.contact@gmail.com

---
