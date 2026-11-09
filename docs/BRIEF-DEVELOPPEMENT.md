# CODISCO GIBAT · Brief de développement du one-page (version VA)

> **Référence unique :** le cadre Figma « CODISCO GIBAT · Accueil one-page (desktop 1440) VA ». L'autre maquette du fichier (en Montserrat) n'est **pas** à développer.
> **Préparé par :** sOmedia, novembre 2026.

---

## 1. Objectif et périmètre

- Un site **one-page** pour CODISCO GIBAT, sans aucune page supplémentaire. Tout le détail (projets, vidéos) s'ouvre par-dessus la page.
- Message central : **3 services, 1 seul interlocuteur**. Les services sont : travaux et maintenance des infrastructures, climatisation et réfrigération, hygiène 3D. L'offre phare est le contrat global multitechnique.
- Publics visés : entreprises clientes (industrie, pétrole, port, tertiaire), **partenaires** et **candidats**. C'est pour ça que tous les appels à l'action disent « Contact » et non « Demander un devis », et que le formulaire propose un objet « Partenariat » et un objet « Candidature ».
- Le hero n'a **volontairement aucun bouton**. C'est une introduction, pas un appel à l'action.

## 2. Stack recommandée

| Choix | Pourquoi |
|---|---|
| **Next.js 16** (App Router, TypeScript) | Page générée en statique (chargement rapide sur les réseaux mobiles du Congo), composants réutilisables, évolutions faciles (multilingue FR/EN, CMS pour les réalisations, une page par projet). |
| Route API Node `/api/contact` | Réception du formulaire et envoi par SMTP authentifié (nodemailer), sans PHP. |
| Hébergement compatible Node.js | Vercel, Netlify, ou cPanel avec « Setup Node.js App ». |

Extensions VS Code conseillées (proposées automatiquement à l'ouverture du dossier) : ESLint, Prettier, Code Spell Checker avec le dictionnaire français.

## 3. Structure de la page

| # | Section | Ancre | Contenu clé | Fichier export |
|---|---|---|---|---|
| 1 | En-tête collant | n/a | Logo, menu (Accueil, Nos services, Contrat global, Réalisations, Références), bouton **Contact** | `sections/01-en-tete@2x.png` |
| 2 | Hero | `#accueil` | Étiquette, titre, texte, 2 chiffres (+30 ans, 24/7), visuel avec 2 badges flottants. **Pas de bouton.** | `02-hero` |
| 3 | Bandeau défilant | n/a | 5 domaines en boucle | `03-bandeau-defilant` |
| 4 | Nos services | `#services` | Onglets à gauche, 3 panneaux détaillés à droite (`#service-travaux`, `#service-clim`, `#service-hygiene`) | `04-nos-services` |
| 5 | À propos | `#a-propos` | 2 photos, badge +30, 2 cartes (sécurité, agréments) | `05-a-propos` |
| 6 | Réalisations | `#realisations` | Filtres par service, fiches projets, **tiroir de détail** | `06-realisations` |
| 7 | Contrat global et références | `#contrat`, `#references` | Bloc vert, 5 avantages, visuel, bandeau de logos clients | `07-contrat-global-references` |
| 8 | Méthode et vidéo | `#methode` | 4 étapes, bloc vidéo « Découvrez nos équipes » | `08-methode-et-video` |
| 9 | FAQ | `#faq` | 5 questions en accordéon | `09-faq` |
| 10 | Contact | `#contact` | Coordonnées, WhatsApp, formulaire | `10-contact` |
| 11 | Pied de page | n/a | Logo, accroche, 3 colonnes de liens, mentions | `11-pied-de-page` |

## 4. Comportements interactifs

Tout est déjà codé dans les composants React de `src/components/` (les interactions sont dans les composants marqués `"use client"`).

### 4.1 En-tête
- Collant en haut de page, fond blanc légèrement transparent avec flou (`backdrop-filter: blur(24px)`), ombre qui apparaît après quelques pixels de défilement.
- Le lien du menu correspondant à la section visible passe en vert.
- Sous 900 px : bouton burger, menu déroulant plein écran, le bouton Contact disparaît (le lien du menu suffit).

### 4.2 Hero : animation « glitch » (à développer)
Le visuel de droite fait défiler des objets métier avec une courte transition glitch (décalage RGB et découpe en bandes, 300 à 400 ms). L'étiquette du badge change avec l'objet :

| Objet affiché | Étiquette |
|---|---|
| Casque et niveau laser | Travaux et maintenance |
| Tableau électrique | Travaux et maintenance |
| Groupe VRV | Climatisation et réfrigération |
| Conteneur frigorifique | Climatisation et réfrigération |
| Robot nettoyeur | Hygiène 3D |
| Pulvérisateur | Hygiène 3D |

Recommandations : des PNG ou WebP détourés de même cadrage, un changement toutes les 2,5 à 3 s, l'effet en CSS (`clip-path` et pseudo-éléments décalés) ou en canvas léger. L'animation se coupe si `prefers-reduced-motion` est actif. Le starter affiche pour l'instant un portrait fixe en attente.

### 4.3 Nos services
- Onglets à gauche, **une seule carte affichée** à droite. Un clic sur un onglet fait apparaître sa carte (fondu, photo dévoilée de gauche à droite, textes en cascade). Flèches du clavier, Début et Fin pour passer d'un onglet à l'autre.
- Dans chaque carte, la photo occupe toute la hauteur à gauche, le texte est à droite. Sous 900 px, la photo devient un bandeau en tête de carte.
- Sous les onglets, un encart renvoie vers le contrat global.
- Les liens `#service-travaux`, `#service-clim` et `#service-hygiene` (pied de page) ouvrent directement le bon onglet.
- Sous 900 px, la section devient un **accordéon** : la carte s'ouvre juste sous son titre et décale les suivants (un nouveau clic la referme). Chaque titre est un bouton `aria-expanded` relié à sa région, dans les deux présentations.

### 4.4 Réalisations (sans page supplémentaire)
- Les fiches sont générées depuis `src/data/projets.ts`. **Pour ajouter un projet, on ajoute un objet dans ce fichier**, sans toucher aux composants.
- Des filtres par service (Tous, Travaux, Climatisation, Hygiène 3D, Contrat global) permettent d'avoir beaucoup de projets sans allonger la page. Ces filtres ne sont pas dans la maquette : c'est une proposition.
- « Voir le projet » ouvre un **tiroir latéral** (panneau qui glisse depuis la droite) contenant la galerie, le client, le lieu, l'année, le contexte, ce qui a été fait, le résultat et un bouton Contact.
- Chaque projet a son **ancre partageable** : `#projet-slug`. Un lien envoyé par WhatsApp ouvre directement le bon projet. Le bouton Retour du navigateur et la touche Échap referment le tiroir. Le focus clavier reste dans le tiroir tant qu'il est ouvert.
- Variante possible : une fenêtre plein écran si le client a beaucoup de photos ou une vidéo par projet.

### 4.5 Vidéos
- Le bouton lecture du bloc « Découvrez nos équipes » et le lien « Voir la vidéo du robot TEINOVA » ouvrent une fenêtre vidéo (`<dialog>`).
- Fichiers attendus : `public/videos/equipes.mp4` et `public/videos/teinova.mp4`, en H.264, 1080p, moins de 15 Mo chacune. Si la vidéo est hébergée sur YouTube, remplacer la balise `<video>` par un iframe `youtube-nocookie.com`.

### 4.6 FAQ
Accordéon accessible (boutons `aria-expanded`). Une seule réponse est ouverte à la fois. L'ouverture et la fermeture sont animées en hauteur, en CSS (`grid-template-rows` de `0fr` à `1fr`). La question ouverte passe sur fond vert, comme dans la maquette.

### 4.7 Formulaire
- Champs : nom et société, email, téléphone, objet (liste), message. Un champ piège invisible bloque les robots.
- Validation côté navigateur, puis envoi en `fetch` vers `/api/contact` (`src/app/api/contact/route.ts`), qui revalide avec les mêmes règles (`src/lib/contact-schema.ts`). Le message de confirmation ou d'erreur s'affiche sous le bouton.
- Les boutons « Parler de mon contrat », « Nous contacter » et « Recrutement » pré-remplissent l'objet.
- En cas d'échec, le message renvoie vers le téléphone et WhatsApp.

### 4.8 Animations générales
- Loader d'ouverture (`src/components/ui/Loader.tsx`), autour du message « +30 ans d'expérience » : un anneau se remplit pendant qu'une lumière tourne autour, le compteur central monte de 0 à 30 et les trois métiers s'allument à 10, 20 et 30. À la fin, le « +30 » quitte le loader et vient se poser à sa place dans les chiffres du hero (s'il n'est pas visible à l'écran, sur mobile par exemple, il s'efface sur place). Durée : environ 2,4 s puis 0,9 s d'atterrissage, au plus 4 s d'attente. Sans JavaScript, le loader disparaît seul après 5,5 s.
- Hero : entrée en cascade à la fin du loader. Le « +30 ans » du hero n'est plus animé en compteur : c'est celui du loader qui vient s'y poser.
- Compteurs : « +30 ans » monte de 0 à 30 quand il arrive à l'écran (`src/components/ui/CountUp.tsx`), dans le bloc À propos et le contrat global.
- Blocs : apparition douce au défilement, en cascade entre blocs voisins (`src/components/ui/RevealOnScroll.tsx`). Les blocs déjà visibles au chargement ne sont jamais masqués, donc aucun clignotement.
- Méthode : frise **pilotée par le défilement** (`src/components/sections/MethodTimeline.tsx`). En descendant, l'étape 1 s'allume, sa jauge se remplit, puis l'étape 2 s'allume, etc. Si on remonte, la frise s'éteint dans l'ordre inverse. Sur grand écran, le titre et la frise restent **épinglés** à l'écran (sticky) pendant toute la séquence : la page ne reprend son défilement qu'une fois les 4 étapes allumées. Sous 900 px, la frise devient **verticale, de haut en bas** (rail à gauche, jauge verticale) et reste pilotée par le défilement de la page.
- Bandeaux en boucle (pause au survol), légère élévation des cartes au survol.
- Tout est désactivé quand `prefers-reduced-motion` est actif.

## 5. Design system

Les tokens sont dans `src/styles/tokens.css` (variables CSS) et `design/tokens.json`.

- **Police :** Plymouth (Regular, Medium, Bold, ExtraBold), chargée par `next/font` depuis `src/app/fonts/`. Il n'existe pas de DemiBold droit dans les fichiers fournis : la graisse 600 s'affiche en Bold. Titres en ExtraBold, avec un interlettrage légèrement négatif.
- **Couleurs :** vert `#3C6E34` (action, contrat), marine `#0F2234` (titres, blocs sombres), bleu `#265483` (accents), fond `#F4F6FA`.
- **Rayons :** 12, 20, 28, 32 px, et pilule.
- **Grille :** conteneur de 1216 px, marges de 32 px. Le cadre Figma s'appelle « 1440 » mais mesure 1280 px.

**À harmoniser :** la maquette utilise 5 tailles différentes pour les titres de section (36, 44, 48, 52, 54 px). Le starter les ramène à 3 niveaux : `display` pour le hero, `h2` pour les grands titres de section et `h2-sm` pour les sections secondaires. C'est plus cohérent et plus simple à maintenir. Si tu veux coller au pixel près, les valeurs exactes sont dans `design/tokens.json`.

## 6. Responsive

La VA n'existe qu'en desktop. Les adaptations proposées :

| Largeur | Adaptations |
|---|---|
| plus de 1100 px | Maquette d'origine |
| 900 à 1100 px | Onglets des services en ligne horizontale, méthode sur 2 colonnes |
| moins de 900 px | Menu burger, toutes les grilles en 1 colonne, visuel du hero au-dessus du texte |
| moins de 600 px | Chiffres du hero empilés, formulaire sur 1 colonne, méthode sur 1 colonne |

Tailles de texte fluides grâce à `clamp()`. Tester en priorité sur Android d'entrée de gamme (Tecno, Itel, Samsung A) avec Chrome, sur une connexion 3G et 4G.

## 7. Contenus et médias à fournir

| Élément | Format conseillé | Où |
|---|---|---|
| Police Plymouth en web | woff2 déjà générés, **licence web à vérifier** | `src/app/fonts/` |
| Logo | SVG, ou PNG 512 px (l'actuel ne fait que 280 px) | `public/images/logo-codisco-gibat.png` |
| Favicon | PNG 512 × 512 | `src/app/icon.png` |
| Image de partage | JPG 1200 × 630 | `public/images/og-image.jpg` |
| Portrait détouré du hero et 6 objets glitch | PNG ou WebP transparents, 1200 px de haut | `public/images/hero/` |
| Photos des 3 services | WebP, 1600 px de large | `public/images/services/` |
| Photos À propos (2) et contrat global (1) | WebP | `public/images/a-propos/` |
| Photos des projets (3 à 6 chacun) | WebP, 1600 px de large | `public/images/projets/` |
| Logos des références | PNG en couleur sur pastille blanche (les 11 sont en place), **avec l'accord des marques** | `public/images/references/` |
| Vidéos équipes et robot TEINOVA | MP4 H.264 ou lien YouTube | `public/videos/` |

## 8. Accessibilité

- Lien d'évitement, structure en `header`, `main`, `section` et `footer`, un seul `h1`.
- Contrastes : le texte blanc sur vert `#3C6E34` passe le niveau AA. **Ne pas** mettre de texte bleu `#265483` sur fond marine : c'était le cas des étiquettes des panneaux dans la maquette, c'est corrigé.
- Focus visible partout, tiroir et vidéo utilisables au clavier, textes alternatifs à remplir sur toutes les vraies photos.

## 9. SEO et partage

- Balises title, description et Open Graph déjà en place (à ajuster au domaine final), données structurées `LocalBusiness`.
- Un seul `h1` (« 3 services, 1 seul interlocuteur. »), des `h2` par section.
- `sitemap.xml` et `robots.txt` sont générés par `src/app/sitemap.ts` et `src/app/robots.ts`. Créer la fiche Google Business Profile et lier le site.
- Les ancres de projets (`#projet-...`) ne sont pas indexées séparément. Si le référencement des projets devient un enjeu, ajouter une route `src/app/projets/[slug]/page.tsx` avec une page par projet.

## 10. Performance

- Viser moins de 1,5 Mo au premier chargement et un LCP sous 2,5 s en 4G.
- Images en WebP ou AVIF avec `srcset`, `loading="lazy"` sous la ligne de flottaison, dimensions toujours indiquées.
- Polices en `woff2`, préchargées automatiquement par `next/font`, `font-display: swap`.
- Images via `next/image` (redimensionnement et WebP automatiques).

## 11. Formulaire, emails et données

- Variables d'environnement (voir `.env.example`) : `CONTACT_TO` (réception), `CONTACT_FROM` (une adresse du domaine) et les accès SMTP. L'envoi passe par SMTP authentifié (nodemailer).
- Configurer SPF, DKIM et DMARC sur le domaine.
- Mentions légales et politique de confidentialité : à rédiger (raison sociale, RCCM, NIU, hébergeur, finalité des données du formulaire, durée de conservation). Elles peuvent s'ouvrir dans le même tiroir que les projets pour rester en one-page.
- Mesure d'audience : Plausible ou Matomo, sans cookie, pour éviter un bandeau de consentement.

## 12. Points à valider avec CODISCO GIBAT avant mise en ligne

1. Le chiffre des reefers : « 80 à 90 % des dépannages sur le port de Pointe-Noire ».
2. Le numéro relié à WhatsApp (le starter utilise le 06 621 38 38).
3. Les réponses 2 à 5 de la FAQ, rédigées en brouillon et marquées « [à valider] ».
4. Les mentions « techniciens certifiés » et « Sécurité certifiée » : quelles certifications exactement ?
5. L'autorisation d'afficher les noms et logos des références (TotalEnergies, Maersk, CMA CGM...).
6. Les vrais projets pour les fiches Réalisations.
7. Le domaine définitif, l'adresse email de réception du formulaire, les liens LinkedIn et Facebook.

## 13. Check-list de mise en ligne

- [ ] Licence web de la police Plymouth vérifiée
- [ ] Logo, favicon et image de partage en place
- [ ] Les blocs gris `.ph` remplacés par les vraies photos (rechercher `data-label` dans `src/components/`)
- [ ] `src/data/projets.ts` rempli avec les vrais projets
- [ ] Les réponses FAQ validées et les marqueurs « [à valider] » retirés
- [ ] Le formulaire testé de bout en bout (réception, réponse, spam)
- [ ] Les liens `tel:` et WhatsApp testés sur téléphone
- [ ] Mentions légales et confidentialité rédigées
- [ ] Test Lighthouse : performance, accessibilité, SEO
- [ ] Test réel sur Android d'entrée de gamme
- [ ] HTTPS actif, redirection www et non-www
- [ ] Google Business Profile relié au site

## 14. Écarts volontaires entre la VA et le starter

| Maquette VA | Starter | Raison |
|---|---|---|
| Onglets services + 3 panneaux empilés | Onglets, une seule carte affichée avec entrée animée | Page plus courte, photo mieux mise en valeur. |
| Fiches réalisations fixes | Fiches générées et **filtres** ajoutés | La liste peut grandir sans toucher au HTML. |
| « Voir le projet » sans destination | **Tiroir latéral** avec ancre partageable | One-page tenu, projets partageables. |
| 5 tailles de titres de section | 3 niveaux | Cohérence et maintenance. |
| Étiquettes des panneaux en bleu sur bleu | Texte blanc | Lisibilité. |
| Icônes Font Awesome | Sprite SVG intégré | Aucune dépendance, plus léger. |
