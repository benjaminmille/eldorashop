# 🛒 EldoraShop — Projet e-commerce full-stack (React + Symfony)

EldoraShop est un projet visant à concurrencer des plateformes comme Leboncoin en combinant des technologies modernes :
- 🔍 Recherche intelligente (via Elasticsearch + ChatGPT)
- ⚙️ Architecture modulaire en Docker
- 🧩 Stack Symfony (API) + React (front)
- ☁️ Prévu pour le cloud (GCP, AWS)

---

## 📦 Technologies utilisées

| Côté | Stack |
|------|-------|
| Frontend | React 18 + Vite + Node.js 20 |
| Backend | Symfony 7.3 (PHP 8.3) |
| Database | MariaDB 10.11 |
| Recherche | Elasticsearch 8.13 |
| Infra | Docker + Docker Compose |
| Reverse proxy | NGINX |

---

## 🚀 Démarrage rapide

### 1. Cloner le dépôt et construire les conteneurs

```bash
git clone https://github.com/ton-utilisateur/eldorashop.git
cd eldorashop
docker-compose build
docker-compose up -d
```

### 2. Accès

- 🌐 Symfony (API + accueil) : [http://localhost](http://localhost)
- 🔁 React (via Vite) : [http://localhost:5173](http://localhost:5173)
- ⚙️ Elasticsearch : [http://localhost:9200](http://localhost:9200)

---

## 📁 Arborescence du projet

```
eldorashop/
│
├── backend/
│   └── codebase/           # Projet Symfony
│       ├── src/
│       ├── public/
│       └── ...
│
├── frontend/               # Projet React
│   ├── src/
│   ├── package.json
│   └── ...
│
├── docker/
│   └── nginx/
│       └── nginx.conf
│
├── docker-compose.yml
└── Dockerfile (php)
```

---

## ⚙️ NGINX : routage

- `/api/*` → Symfony (`php-fpm`)
- `/` → React (SPA), fallback vers `index.html`

---

## 🧪 Tests & debug

- 🧪 Symfony :
  - Créer un contrôleur test :
    ```bash
    docker-compose exec php bash
    php bin/console make:controller Api/TestController
    ```
  - Accès : [http://localhost/api/test](http://localhost/api/test)

- 🧪 React :
  - Le frontend utilise Vite :
    ```bash
    docker-compose exec node sh
    npm install
    npm run dev
    ```

---

## 🧠 Fonctionnalité maître (à venir)

Une barre de recherche "intelligente" pilotée par ChatGPT, permettant par exemple :

```
"Je cherche une PS5 à Rennes en main propre"
```

➡️ Génère dynamiquement une requête Elasticsearch via l’API OpenAI, avec mapping des champs auto.

---

## 🧰 Commandes utiles (prochainement dans un Makefile)

```bash
make up         # Démarrer tous les services
make stop       # Stopper les conteneurs
make php        # Entrer dans le conteneur PHP
make node       # Entrer dans le conteneur Node
make logs       # Voir les logs PHP
make build      # Build des services
```

---

## 📌 À venir

- [ ] Admin Symfony
- [ ] Authentification utilisateur
- [ ] Système de favoris / messages
- [ ] Integration OpenAI / Elasticsearch / filtres
- [ ] Déploiement Cloud GCP / AWS

---

## 👨‍💻 Auteur

EldoraShop — projet personnel d’apprentissage & démonstration technique.
