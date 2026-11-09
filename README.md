# CODISCO GIBAT · Site one-page (version VA)

Site vitrine one-page en **Next.js 16** (App Router, TypeScript), construit à partir de la maquette Figma **VA**.

## Démarrer

```bash
npm install          # une seule fois
cp .env.example .env.local   # puis remplir les valeurs SMTP (facultatif en local)
npm run dev          # http://localhost:3000, rechargement automatique
```

Dans VS Code : ouvrir le dossier `codisco/`, accepter les extensions recommandées (ESLint, Prettier, correcteur français).

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` puis `npm start` | version de production |
| `npm run lint` | vérification du code |
| `npm run format` | mise en forme automatique (Prettier) |

## Organisation

```
codisco/
├── src/
│   ├── app/
│   │   ├── layout.tsx            balises SEO, police Plymouth (next/font)
│   │   ├── page.tsx              la page : assemble les sections dans l'ordre de la maquette
│   │   ├── globals.css           importe les styles de src/styles/
│   │   ├── api/contact/route.ts  réception du formulaire, envoi de l'email (SMTP)
│   │   ├── robots.ts, sitemap.ts générés automatiquement
│   │   ├── icon.png              favicon
│   │   └── fonts/                Plymouth en woff2 (400, 500, 700, 800)
│   ├── components/
│   │   ├── layout/               Header, Footer
│   │   ├── sections/             Hero, Services, About, Realisations (+ tiroir), Contract, Method, Faq, Contact
│   │   ├── ui/                   icônes, bandeau défilant, boutons vidéo et contact, animations
│   │   └── SiteProvider.tsx      état partagé : objet du formulaire, fenêtre vidéo
│   ├── data/
│   │   ├── site.ts               coordonnées, menu, textes SEO
│   │   ├── projets.ts            LES RÉALISATIONS : un objet par projet
│   │   └── faq.ts                questions fréquentes
│   ├── lib/
│   │   ├── contact-schema.ts     règles de validation du formulaire (zod)
│   │   └── mailer.ts             envoi SMTP (nodemailer)
│   └── styles/
│       ├── tokens.css            couleurs, typo, espacements, ombres (relevés dans Figma)
│       └── main.css              styles des composants et des sections, responsive
├── public/
│   ├── images/                   logo et logos clients (en place), hero/, services/, projets/, a-propos/ (à remplir)
│   └── videos/                   equipes.mp4, teinova.mp4 (à ajouter)
├── design/                       références de design, jamais publiées
│   ├── maquette/                 maquette VA complète (PDF, PNG)
│   ├── sections/                 chaque section en @2x, pour comparer au pixel
│   ├── logo/                     logo SVG et PNG d'origine
│   ├── references-sources/       logos clients d'origine (Wikimedia Commons, sites officiels)
│   ├── polices-sources/          fichiers TTF Plymouth d'origine
│   ├── data/textes-va-figma.json tous les textes de la VA (section, police, taille)
│   ├── tokens.json               design tokens au format JSON
│   └── contenus.md               tous les textes, pour la relecture client
└── docs/BRIEF-DEVELOPPEMENT.md   orientations, interactions, responsive, SEO, check-list
```

Seul `public/` est servi tel quel : le dossier `design/` (environ 35 Mo) reste dans le projet sans jamais être mis en ligne.

## Tâches courantes

| Je veux... | Fichier |
|---|---|
| Ajouter ou modifier un projet | `src/data/projets.ts` (photos dans `public/images/projets/`) |
| Changer une couleur ou une taille de texte | `src/styles/tokens.css` |
| Modifier un texte | le composant de la section dans `src/components/sections/` (et `design/contenus.md`) |
| Modifier une question de la FAQ | `src/data/faq.ts` |
| Changer téléphone, adresse, WhatsApp | `src/data/site.ts` |
| Changer l'adresse qui reçoit les demandes | `.env.local`, variable `CONTACT_TO` |
| Remplacer un bloc gris par une photo | chercher `data-label` dans `src/components/` |

## Formulaire de contact

Le formulaire envoie vers `/api/contact`, qui revalide les champs (mêmes règles que le navigateur, `src/lib/contact-schema.ts`) puis envoie l'email par SMTP authentifié.

- **En local sans SMTP** : la demande s'affiche dans le terminal, rien n'est envoyé.
- **En production** : renseigner `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `CONTACT_FROM` chez l'hébergeur. Configurer SPF, DKIM et DMARC sur le domaine.

## Hébergement

Le site a besoin de Node.js pour la route `/api/contact` : Vercel, Netlify, ou un hébergement compatible Node (beaucoup de cPanel le proposent via « Setup Node.js App »).
