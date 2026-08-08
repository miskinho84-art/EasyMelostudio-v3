# EasyMelo Studio 🎵

Plateforme SaaS permettant de générer des chansons grâce à l'intelligence
artificielle. Ce dépôt contient l'architecture technique du projet — la
base sur laquelle toutes les fonctionnalités seront construites.

> **Statut actuel : Étape 1 — Architecture et fondations techniques (auditée et validée).**
> Aucune fonctionnalité métier (génération, paiement, auth) n'est encore
> implémentée. Voir la feuille de route ci-dessous.
>
> Un audit complet a été effectué : compatibilité React 19 / React Three
> Fiber corrigée, navigation mobile (menu hamburger + drawer) ajoutée,
> configuration TypeScript stricte validée, configuration ESLint corrigée.

## Stack technique

| Domaine        | Technologie                              |
| -------------- | ----------------------------------------- |
| Framework      | Next.js 15 (App Router) + React 19        |
| Langage        | TypeScript (strict)                        |
| Style          | Tailwind CSS                                |
| Animations     | Framer Motion, React Three Fiber / Three.js |
| Formulaires    | React Hook Form + Zod                       |
| Data fetching  | TanStack Query                              |
| État global    | Zustand                                     |
| Icônes         | Lucide React                                |
| Backend / DB   | Supabase (PostgreSQL)                       |
| Déploiement    | Vercel                                      |
| Qualité        | ESLint + Prettier                           |

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local
# puis renseigner les valeurs (Supabase, etc. — non requis à cette étape)

# 3. Lancer le serveur de développement
npm run dev
```

Le projet est accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Commande               | Description                          |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Démarre le serveur de développement   |
| `npm run build`         | Build de production                   |
| `npm run start`         | Démarre le serveur en mode production |
| `npm run lint`          | Vérifie le code avec ESLint           |
| `npm run lint:fix`      | Corrige automatiquement les erreurs   |
| `npm run format`        | Formate le code avec Prettier         |
| `npm run type-check`    | Vérifie les types TypeScript          |

## Architecture des dossiers

```
src/
 ├── app/                    # Routes Next.js (App Router)
 │    ├── (marketing)/       # Pages publiques (Navbar + Footer)
 │    └── (app)/             # Pages applicatives (Sidebar)
 ├── components/
 │    ├── ui/                # Composants de base réutilisables
 │    ├── layout/             # Navbar, Sidebar, Footer
 │    ├── dashboard/          # Composants spécifiques au dashboard
 │    ├── landing/            # Composants de la landing page (étape 2)
 │    ├── music/              # Composants liés à la génération musicale
 │    └── shared/             # Container, Section, etc.
 ├── hooks/                  # Hooks React personnalisés
 ├── services/               # AuthService, SongService, etc.
 ├── lib/                    # Clients externes (Supabase, etc.)
 ├── utils/                  # Fonctions utilitaires (cn, etc.)
 ├── types/                  # Types TypeScript (dont le schéma DB)
 ├── providers/              # Providers React (Query, futurs Auth/Theme)
 ├── store/                  # État global (Zustand)
 ├── styles/                 # CSS global
 ├── config/                 # Configuration de l'application
 ├── constants/              # Constantes (navigation, etc.)
 ├── database/               # Schéma SQL et migrations Supabase
 └── middleware.ts           # Middleware Next.js (passthrough pour l'instant)
```

## Pages actuelles

Toutes les pages ci-dessous existent avec un contenu temporaire et sont
accessibles via la navigation :

- Accueil (`/`)
- Connexion (`/connexion`)
- Inscription (`/inscription`)
- Dashboard (`/dashboard`)
- Créer une chanson (`/creer-une-chanson`)
- Bibliothèque (`/bibliotheque`)
- Historique (`/historique`)
- Tarifs (`/tarifs`)
- Paramètres (`/parametres`)
- Contact (`/contact`)
- FAQ (`/faq`)
- Politique de confidentialité (`/confidentialite`)
- Conditions générales (`/conditions`)

## Base de données (Supabase)

Le schéma se trouve dans `src/database/schemas/schema.sql` et les types
correspondants dans `src/types/database.ts`. Tables : `profiles` (liée
1-1 à `auth.users`, créée automatiquement à l'inscription via un
trigger), `songs`, `song_history`, `favorites`, `credits`,
`subscriptions`, `settings`. Row Level Security est activé sur toutes
les tables : chaque utilisateur ne peut lire/modifier que ses propres
lignes.

Pour appliquer le schéma : coller le contenu de `schema.sql` dans
l'éditeur SQL de votre projet Supabase (ou via `supabase db push` si
vous utilisez la CLI avec des migrations).

## Dashboard (Étape 4)

Le Dashboard (`/dashboard`) et l'écrin qui l'entoure (Sidebar, topbar
mobile) reprennent désormais le thème premium sombre de la landing
(glassmorphism, émeraude/doré, Framer Motion) pour une expérience
cohérente dès la connexion.

- **Header** (`GreetingHeader`) : salutation dynamique selon l'heure,
  avatar avec halo, badge Premium, horloge en direct, citation du jour.
- **Cartes statistiques** (`StatsGrid` / `StatCard`) : 6 cartes
  (chansons créées, favoris, bibliothèque, crédits IA, série actuelle,
  temps gagné) avec compteur animé, glow permanent, effet de bascule 3D
  au survol et barre de progression.
- **Création rapide** (`QuickCreateCard`) : grande carte avec halo
  animé en boucle et bouton vers `/creer-une-chanson`.
- **Activité récente** (`ActivityTimeline`) et **Objectifs du jour**
  (`DailyGoals`, cases à cocher interactives avec progression animée).
- **Assistant IA** (`AiSuggestionCard`) : suggestions de styles/genres.
- **Graphiques** (`ChartsSection`) : évolution des créations (ligne
  SVG animée), crédits utilisés (anneau SVG), activité de la semaine
  (barres animées) — construits en SVG pur, sans dépendance
  supplémentaire.
- **Scène 3D d'ambiance** (`components/dashboard/three/`) : icônes
  musicales flottantes, égaliseur 3D, particules — chargée en lazy
  (`next/dynamic`, `ssr:false`), désactivée si `prefers-reduced-motion`.
- **Skeleton premium** (`DashboardSkeleton`) affiché pendant le (bref)
  chargement initial.

**Toutes les données affichées sont simulées** (aucune connexion à
Supabase pour les statistiques/graphiques à ce stade) — conformément au
périmètre de l'étape 4, centré sur le design. Le branchement aux
données réelles (crédits, historique, bibliothèque) viendra avec les
étapes 5 et 6.

## Authentification (Étape 3 — validée)

Authentification complète via Supabase Auth :

- **Inscription** (`/inscription`) : nom, prénom optionnel, e-mail, mot
  de passe (8+ caractères, 1 majuscule, 1 chiffre), confirmation,
  acceptation des CGU. Validation Zod + React Hook Form.
- **Vérification d'e-mail** (`/verifier-email`) : page d'attente avec
  renvoi possible de l'e-mail. Le clic sur le lien de confirmation
  passe par `/auth/callback` (Route Handler) qui échange le code
  contre une session, puis redirige vers `/dashboard`.
- **Connexion** (`/connexion`) : e-mail, mot de passe, "se souvenir de
  moi", lien mot de passe oublié.
- **Mot de passe oublié** (`/mot-de-passe-oublie`) → e-mail avec lien
  → **Réinitialisation** (`/reinitialiser-mot-de-passe`).
- **Changement de mot de passe** : depuis `/parametres` (utilisateur
  connecté), avec vérification du mot de passe actuel.
- **Déconnexion** : bouton dans la Sidebar du dashboard.
- **Session** : gérée par `@supabase/ssr` (cookies httpOnly), rafraîchie
  automatiquement par le middleware à chaque requête. En cas
  d'expiration/révocation du token, l'utilisateur est automatiquement
  déconnecté et redirigé (`AuthProvider`, événement `SIGNED_OUT`).
- **Protection des routes** : `/dashboard`, `/creer-une-chanson`,
  `/bibliotheque`, `/historique`, `/parametres` nécessitent une session
  active (redirection serveur vers `/connexion?redirect=...` sinon,
  gérée dans `src/middleware.ts`). Un utilisateur déjà connecté qui
  visite `/connexion` ou `/inscription` est renvoyé vers `/dashboard`.

**Variables d'environnement requises** (voir `.env.example`) :
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_APP_URL` (utilisé pour construire les liens de redirection
d'e-mail). Tant que ces variables ne sont pas renseignées, le site reste
utilisable (landing, navigation) mais les fonctionnalités d'auth
afficheront une erreur au lieu de fonctionner — pas de plantage global.

**Sécurité** : Row Level Security sur toutes les tables, validation Zod
sur tous les formulaires, mots de passe jamais stockés/gérés côté
applicatif (délégué à Supabase Auth), clé `service_role` jamais exposée
côté client (uniquement dans `.env.local`, non préfixée `NEXT_PUBLIC_`).
La protection CSRF s'appuie sur les cookies `SameSite` gérés par
`@supabase/ssr` plutôt que sur un jeton CSRF custom.

## Design & Landing Page (Étape 2)

La landing page (`src/app/(marketing)/page.tsx`) est un design premium sombre :

- **Palette** : bleu nuit / noir profond (`midnight`), vert émeraude (`emerald`), doré léger (`gold`), blanc — définie dans `tailwind.config.ts`.
- **Typographies** : Space Grotesk (titres, `font-display`) + Inter (texte courant), chargées via `next/font`.
- **Scène 3D** (`src/components/landing/three/`) : sphère lumineuse pulsante, particules flottantes et notes de musique stylisées, en React Three Fiber. Chargée en lazy (`next/dynamic`, `ssr:false`) pour ne pas ralentir le premier rendu, et remplacée par un halo statique si l'utilisateur a activé `prefers-reduced-motion`.
- **Sections** : Hero, Comment ça fonctionne, Catégories, Pourquoi EasyMelo, Fonctionnalités, Tarifs, Témoignages, FAQ (accordéons animés), CTA final.
- **Animations** : Framer Motion pour les apparitions au scroll (`Reveal`), le menu mobile animé (Navbar et Sidebar) et les interactions au survol (`GlassCard`).
- **SEO** : metadata complet (Open Graph, Twitter Card), `robots.ts` et `sitemap.ts` générés dynamiquement, `manifest.webmanifest`, favicon SVG. Les images `og-image.png` et `apple-touch-icon.png` sont des placeholders unis à remplacer par de vrais visuels de marque avant mise en production.
- **Accessibilité** : navigation clavier sur les menus et l'accordéon (`aria-expanded`, `aria-controls`), contrastes vérifiés sur fond sombre, respect de `prefers-reduced-motion`.

Le dashboard (`(app)`) garde volontairement son thème clair simple : le design premium ne concerne que la partie publique à ce stade.

## Déploiement

Le projet est prêt à être poussé sur GitHub et déployé sur Vercel sans
configuration additionnelle (voir `vercel.json`). Les variables
d'environnement devront être renseignées dans le dashboard Vercel avant
le déploiement des étapes suivantes.

## Feuille de route

- [x] Étape 1 : Architecture et fondations techniques
- [x] Étape 2 : Design premium + Landing Page + animations 3D
- [x] Étape 3 : Authentification avec Supabase
- [x] Étape 4 : Dashboard
- [ ] Étape 5 : Générateur de chansons
- [ ] Étape 6 : Bibliothèque et historique
- [ ] Étape 7 : Offres Premium et crédits
- [ ] Étape 8 : Intégration de l'API musicale
- [ ] Étape 9 : Optimisation, tests et déploiement
