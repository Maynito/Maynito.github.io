# Portfolio Lucas Autret — mise en page

Système du portfolio de Lucas Autret, développeur full-stack (React 19 · Vite · Tailwind v4 · HashRouter · GitHub Pages). Deux couches : une **mise en page** affirmée, construite sur une grille de 12 colonnes visible, des schémas d'architecture générés et des études de cas en format article, posée sur le **motion system** déjà implémenté (tokens, courbes, entrées, micro-interactions, ⌘K, empreinte de build).

Ordre de lecture des sections : **Direction** → **Accueil** (écran par écran, mesures à 1440 / 1024 / 375px) → **Projets** (composants, données, état sans capture) → **Étude de cas** → **Code de la mise en page** (tokens, Tailwind, JSX, ordre d'implémentation) → **Motion**, **Moments wow**, **Code du motion** (couche déjà en place).

Le groupe d'aperçus **Mise en page** contient les vraies pages rendues à chaque largeur, dans les deux thèmes.

## Règles d'usage

- Tout contenu se place sur la grille : `site` + `grid-site`, des placements en colonnes, jamais de largeur en pixels arbitraire. 4 colonnes sous 640px, 8 jusqu'à 1023px, 12 au-delà ; largeur max `container` (1200px).
- Un seul geste de débordement : les médias des projets en vedette sortent de la colonne jusqu'au bord de l'écran (`bleed-r` / `bleed-l`), en alternant gauche et droite. Rien d'autre ne déborde, sauf les figures `wide` des études de cas et la bande Parcours.
- Une seule échelle extrême par écran : `name` (hero), `case-title` (étude de cas), `cta` (footer). Les titres de section sont en `h2` (56px), les projets en `project` (40px) ou `row` (24px).
- Le libellé mono (`label`) porte toute la métadonnée : numéros de section, libellés de fiche, groupes, légendes. Jamais pour du texte courant.
- Un projet sans capture affiche son `ArchSchematic`, généré depuis `projects.js`. Ne jamais réintroduire de monogramme ni d'image de remplissage.
- L'ordre du DOM est l'ordre de lecture sur toutes les largeurs. Un `h1` par page.

## Couleur

Inchangée. `bg`, `surface`, `heading`, `text`, `text-muted` (AA : 5,6:1 en sombre, 5,05:1 en clair), filets `border` / `border-strong`.

- **Un accent, `galaxy`** (#7c9cff en sombre, #3b5bdb en clair), à quatre endroits seulement : anneau de focus, soulignement des liens de prose, touche ↵ de la palette ⌘K, hash de commit du footer. Ni la grille, ni les schémas, ni les titres ne le prennent.
- `surface` sert de fond aux schémas, à la bande Parcours, à la figure d'ouverture des études de cas et aux cartes ADR. Ce sont les seuls aplats de la page.
- `success` n'apparaît que sur le point « disponible » (barre, hero, frise).
- `text-grey` (#757676) reste en dessous de 4,5:1 : ne l'utilise que pour du texte de 24px ou plus.

## Typographie

Inter pour tout, la police mono système pour la métadonnée. Les tailles sont fluides (`clamp`) : la valeur du token est celle de 1440px, la note de chaque style donne la formule et la taille à 375px.

| Rôle | Style | 1440px | 375px |
|---|---|---|---|
| Nom du hero | `name` | 160px / 0,88 | 72px |
| Titre d'étude de cas | `case-title` | 131px / 0,9 | 56px |
| Phrase d'appel du footer | `cta` | 94px / 0,98 | 40px |
| Titre de section | `h2` | 56px / 1,02 | 32px |
| Projet en vedette | `project` | 40px / 1,08 | 28px |
| Titre dans un article | `prose-h2` | 32px / 1,15 | 24px |
| Ligne d'index | `row` | 24px / 30 | 20px |
| Chapô | `chapo` | 24px / 1,45 | 20px |
| Accroche du hero | `lede` | 20px / 1,6 | 18px |
| Corps d'article | `article` | 18px / 1,7 | 17px |
| Texte | `body` / `body-sm` | 16 / 14px | idem |
| Légendes, colophon | `caption` | 13px | idem |
| Métadonnée | `label` / `mono` | 12px mono | idem |

## Images

- Captures : WebP 2× au ratio 16/10, moins de 150 Ko, `width`/`height` explicites, `object-position: left top`. Droites, jamais inclinées.
- Cadre : filet `border`, `radius-lg` du côté du contenu uniquement quand le média déborde, `shadow-frame`.
- Pas de capture : `ArchSchematic` ; dans une étude de cas, un emplacement à rayures « Capture à venir » réserve la place.

## Mouvement réduit

En plus des règles du motion system : la grille du hero est affichée sans tracé, les couches des schémas apparaissent en simple fondu, le sommaire défile sans animation.

## Accessibilité

- Focus `:focus-visible` en `galaxy`, 2px, décalé de 3px, sur fond `bg` comme `surface`.
- Les schémas ont `role="img"` et un `aria-label` qui décrit toutes les couches. Le panneau d'aperçu de l'index est `aria-hidden` : il ne fait que répéter ces schémas.
- La barre collante fait 56px : `scroll-margin-top: 96px` sur les titres atteints par une ancre.
- Cibles tactiles d'au moins 44px de haut (boutons, lignes d'index).

---

# Direction : le portfolio comme un document d'ingénierie

**En 5 lignes.**

1. Le site est construit sur une grille de 12 colonnes **visible** : au chargement, les colonnes se tracent en filigrane, puis le nom vient s'y poser en très grand (160px). On voit en 2 secondes que la page est construite, pas décorée.
2. Le nom est cassé sur deux lignes, la seconde décalée de deux colonnes. C'est la seule asymétrie du hero, et elle suffit à rendre la page reconnaissable.
3. Sous le nom, une **fiche technique** (Formation, Expérience, Front, Back, Statut) en tableau mono : ce qu'un recruteur cherche, lisible en 3 secondes, comme un `package.json` humain.
4. Chaque projet est illustré par **son schéma d'architecture, généré en SVG à partir des données** (`projects.js`). Il n'y a plus de placeholder : un projet sans capture montre comment il est construit, et ça devient sa vraie illustration.
5. Les études de cas se lisent comme un article technique : sommaire collant, figures numérotées, décisions au format ADR. C'est le format qu'un lead dev lit tous les jours, et le sujet de conversation tout trouvé en entretien.

## Pourquoi ça parle à un recruteur technique plutôt qu'à un designer

- Le « wow » vient de la **rigueur** (grille, mesures, données), pas d'un effet : rien ne bouge en dehors du tracé des colonnes et des entrées déjà en place.
- Les schémas montrent qu'on pense en systèmes : couches, flux, infra. Une capture montre une interface, un schéma montre une compréhension.
- Les décisions techniques (ADR) et le tableau qualité (tests, CI, déploiement) répondent aux questions d'un entretien technique avant qu'il ait lieu.
- Le colophon du footer (« React 19, Vite, Tailwind v4, sans librairie d'animation · code source ↗ ») et l'empreinte de build ferment la page sur une preuve.

## Ce qui disparaît

- La grille de cartes identiques en 2 colonnes : remplacée par **2 projets en vedette** (Kamas, FedIA, qui ont une étude de cas) et un **index** en lignes pour les 4 autres.
- Les monogrammes : remplacés par les schémas générés. Le motif à rayures ne sert plus que pour l'emplacement d'une capture à venir, dans une étude de cas.
- La photo ronde dans la barre de navigation : elle passe sur la page About, en grand.
- La largeur 840px : le site passe à 1200px sur 12 colonnes, avec une colonne de lecture de 690px pour les textes longs.

## Les quatre gestes de mise en page

| Geste | Où | Effet |
|---|---|---|
| Grille visible | Hero (filigrane) | « Construit » en 2 secondes |
| Échelle extrême | Nom 160px, titre d'étude de cas 136px, CTA de footer 96px | Une hiérarchie qu'on ne peut pas rater |
| Débordement | Médias des projets en vedette, qui sortent de la colonne jusqu'au bord de l'écran, alternés gauche/droite | Rupture de rythme, asymétrie maîtrisée |
| Bande pleine largeur | Parcours sur fond `surface` | Respiration entre les projets et le contact |

## Aperçus

Les aperçus du groupe **Mise en page** sont la page réelle, rendue à 1440, 1024 et 375px, en sombre et en clair (bascule du thème de la page). La capture de Kamas vient de ta page actuelle, en basse résolution : remplace-la par un export WebP 2× (1824 × 1140px). Les schémas sont générés en direct. Les couches de FedIA, Paint App et PLÉ sont mes hypothèses : corrige-les dans `projects.js`.

---

# Accueil, écran par écran

## La grille

| | 375px | 1024px | 1440px |
|---|---|---|---|
| Colonnes | 4 | 12 (8 entre 640 et 1023) | 12 |
| Marge latérale | 20px | 40px | 120px (le conteneur plafonne) |
| Largeur utile | 335px | 944px | 1200px |
| Gouttière | 16px | 20px | 24px |
| Largeur d'une colonne | 71,75px | 60,3px | 78px |
| Espace entre sections | 96px | 146px | 179px (`clamp(6rem, 4rem + 8vw, 12rem)`) |

`--page-margin: clamp(1.25rem, 4vw, 2.5rem)` · `--site: min(75rem, 100vw - 2 × marge)` · `--bleed: (100vw − site) / 2`, c'est-à-dire la distance entre le bord du conteneur et le bord de l'écran, utilisée pour faire déborder les médias.

Ordre de lecture = ordre du DOM sur toutes les largeurs : les placements en colonnes ne réordonnent jamais le contenu. Un seul `h1` par page (le nom), puis `h2` par section, `h3` par projet.

## Écran 0 · Barre de navigation (collante, 56px)

| Élément | Spec |
|---|---|
| Conteneur | `position: sticky; top: 0`, hauteur 56px, fond `bg` à 86 % + `backdrop-filter: blur(12px)`, filet bas `border` |
| Gauche | « Lucas Autret », Inter 15px / 600, `heading`. Plus de photo ni de sous-titre |
| Centre-droite | Projets · Parcours · Contact, 14px, `text-muted` → `heading` au survol ; page active en `heading` soulignée 1px à 6px |
| Droite (≥ 1024px) | point vert + « Dispo. oct. 2026 » en mono 12px · touche `⌘K` |
| 375px | nom + 3 liens tiennent sur une ligne (≈ 300px), pas de menu burger. Pastille et ⌘K masquées |

Les libellés passent en français (Projets, Parcours) puisque tout le site l'est.

## Écran 1 · Hero (hauteur de l'écran, contenu calé en bas)

Le contenu est aligné **en bas** de l'écran : le haut reste vide, et c'est là qu'on voit la grille.

| Bloc | 1440px | 1024px | 375px |
|---|---|---|---|
| Grille en filigrane | 12 colonnes, filets `border` de chaque côté de chaque colonne, pleine hauteur du hero | 12 colonnes | 4 colonnes |
| Ligne de tête (label mono 12px) | « Développeur full-stack » à gauche, « ● Disponible en octobre 2026 » à droite, 40px au-dessus du nom | idem | les deux s'empilent |
| Nom `h1` | 160px, interligne 0,88, -0,05em, 600 ; « Autret » décalé de 2 colonnes (204px) | 118px, décalé de 2 colonnes | 72px, décalé de 1 colonne (88px) |
| Accroche | colonnes 1–5 (486px), 20px / 32 | colonnes 1–5 | pleine largeur, 18px / 29 |
| Fiche technique `dl` | colonnes 7–12 (588px), sur 2 rangées, 5 lignes séparées par des filets, libellé mono 12px caps sur 104px | colonnes 7–12 | pleine largeur, après l'accroche |
| Boutons | colonnes 1–5, rangée 2, calés en bas : « Voir les projets ↓ » (plein), « Me contacter », lien texte « GitHub ↗ » | idem | « Voir les projets » pleine largeur, puis « Me contacter » et GitHub côte à côte |
| Espacements | 72px nom → accroche ; padding bas 72px | 54px ; 51px | 40px ; 40px |

Fiche technique (contenu réel, rien à inventer) : Formation · Expérience · Front · Back · Statut.

**Animation au chargement** : les 12 colonnes se tracent de haut en bas (`scaleY` 0 → 1, 900ms, `ease-out-quint`, 30ms d'écart, donc environ 1,2s au total), et pendant ce temps la cascade existante fait entrer label, « Lucas », « Autret », accroche, fiche puis boutons (80 → 480ms). Avec mouvement réduit, les filets sont statiques.

## Écran 2 · 01 — Projets (2 projets en vedette)

En-tête de section (même structure pour toutes les sections) :

| | 1440 / 1024px | 375px |
|---|---|---|
| Numéro (label mono) | colonnes 1–2, calé sur la ligne de base du titre | au-dessus du titre |
| Titre `h2` | colonnes 3–9, 56px / 50px, interligne 1,02, -0,035em | 32px |
| Note (14px `text-muted`) | colonnes 10–12, calée en bas | sous le titre |
| Marge sous l'en-tête | 72px / 51px | 48px |

Puis deux blocs **Feature** alternés (voir la section Projets pour le composant) :

| | 1440px | 1024px | 375px |
|---|---|---|---|
| Kamas : texte | colonnes 1–4 (384px), centré verticalement | colonnes 1–4 | pleine largeur |
| Kamas : média | colonnes 5–12 **+ débord à droite jusqu'au bord de l'écran** : 912 × 570px | 663 × 414px | bord à bord, 375 × 234px, sous le texte |
| FedIA | miroir : média colonnes 1–8 + débord à gauche, texte colonnes 9–12 | idem | comme Kamas |
| Écart entre les deux | 130px | 92px | 80px |

## Écran 3 · 02 — Index (4 autres projets)

| | 1440px | 1024px | 375px |
|---|---|---|---|
| Liste | colonnes 1–7 (690px) | colonnes 1–7 | pleine largeur |
| Panneau d'aperçu | colonnes 9–12 (384 × 240px), **collant** à 88px du haut, affiche le schéma (ou la capture) de la ligne survolée ou focalisée | idem | absent |
| Groupes | « Récent », « Précédents » en label mono | idem | idem |
| Ligne | numéro (36px) · titre 24px + description 14px + stack mono 12px · année + ↗ | titre 22px | titre 20px, année masquée |

## Écran 4 · 03 — Parcours (bande pleine largeur)

Fond `surface` d'un bord à l'autre de l'écran, filets `border` en haut et en bas, padding vertical 101px (64px à 375px).

| | ≥ 1024px | 375px |
|---|---|---|
| Frise | horizontale : 3 étapes de 4 colonnes chacune, filet `border-strong` en haut, pastille à gauche | verticale : filet à gauche, pastilles alignées |
| Étape | label mono (Diplôme / Stage · 6 mois / Octobre 2026), titre 20px, texte 14px `text-muted` | idem |
| Dernière étape | la pastille est le point vert « disponible » avec son halo | idem |

## Écran 5 · 04 — Contact + footer

| Bloc | 1440px | 1024px | 375px |
|---|---|---|---|
| Phrase d'appel `h2` | colonnes 1–10, 94px, interligne 0,98 : « Un poste full-stack à pourvoir ? Parlons-en. » | 71px | 40px |
| Ligne de contact | adresse mail en 28px soulignée + bouton Copier (comportement existant) + LinkedIn ↗ · GitHub ↗ | 24px | 19px, retour à la ligne si besoin |
| Colophon | filet, puis 4 zones : © + empreinte de build (colonnes 1–4) · Réseaux (5–6) · Pages (7–8) · Colophon + bouton de thème (9–12) | idem | © pleine largeur, Réseaux et Pages côte à côte, Colophon pleine largeur |

La page Contact devient presque redondante : garde-la, avec la même phrase d'appel et les 3 lignes (mail, LinkedIn, GitHub) en grand.

## Pages About et 404

- **About** : à partir de 1024px, photo colonnes 1–4 (ratio 4/5, `radius-lg`, collante à 88px du haut) ; texte colonnes 6–12, 18px / 30. Parcours et outils réutilisent la fiche technique (`dl` en lignes séparées par des filets). À 375px : photo pleine largeur au ratio 1/1, puis le texte.
- **404** : la grille du hero en filigrane, « 404 » à la taille du nom (160px), une ligne « Cette page n'existe pas. », bouton « Retour aux projets ». Aucun nouveau composant.

---

# Présentation des projets

Une seule source de données, `src/data/projects.js`, et trois composants qui la lisent : **Feature** (projets en vedette), **IndexRow** (les autres) et **ArchSchematic** (le schéma généré).

## Le modèle de données

```js
// src/data/projects.js
export const projects = [
  {
    slug: 'kamas',
    name: 'Kamas',
    featured: true,             // a une étude de cas → bloc Feature
    group: 'recent',            // 'recent' | 'previous' → groupes de l'index
    year: '2026',
    summary: "Outil de suivi des prix Dofus qui lit les données du jeu par OCR et repère les crafts les plus rentables.",
    role: 'Conception et développement, seul',
    type: 'Projet personnel',
    stack: ['Python', 'FastAPI', 'Tesseract', 'SQLite', 'JavaScript'],
    cover: { src: '/captures/kamas.webp', alt: 'Tableau de bord Kamas : bénéfices et liste des crafts', caption: 'Tableau de bord des crafts' },
    layers: [
      { label: 'Client', nodes: ['JavaScript', 'Interface web'] },
      { label: 'API', nodes: ['FastAPI'] },
      { label: 'Traitement', nodes: ['Tesseract OCR', 'Calcul des crafts'] },
      { label: 'Données', nodes: ['SQLite'] },
    ],
    infra: [],                  // facultatif : bande pointillée sous le schéma
  },
  {
    slug: 'smokelab', name: 'SmokeLab', featured: false, group: 'recent', year: '2026',
    summary: 'Outil de visualisation et de stratégie pour Counter-Strike 2.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Steam Auth'],
    cover: null,                // pas encore de capture : c'est le schéma qui s'affiche
    layers: [
      { label: 'Client', nodes: ['React', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Back-end', nodes: ['Supabase', 'PostgreSQL'] },
      { label: 'Auth', nodes: ['Steam OpenID'] },
    ],
  },
  // fedia, taskforge, paint, ple… (couches proposées dans les aperçus, à vérifier)
];
```

Règle d'écriture des couches : 2 à 4 couches, 1 à 3 nœuds par couche, des nœuds de 20 caractères maximum. Ce sont des faits que tu connais déjà, aucune illustration à produire.

## Composant 1 · Feature (projets avec étude de cas)

| Partie | Contenu | Style |
|---|---|---|
| Kicker | `01` + « Étude de cas » | label mono 12px caps |
| Titre `h3` | nom du projet | 40px / 1,08, -0,03em, 600 (28px à 375) |
| Description | `summary` | 16px / 26, `text` |
| Méta `dl` | Rôle · Stack · Type | 3 lignes, filets `border`, libellé mono sur 88px, valeur 13px |
| Lien | « Lire l'étude de cas → » | 14px / 500 `heading`, la flèche avance de 3px au survol du bloc |
| Média | `cover` si présent, sinon `<ArchSchematic>` | 16/10, déborde jusqu'au bord de l'écran (≥ 1024px), coins arrondis seulement côté contenu, filet `border` sauf côté écran |
| Légende | `cover.caption` ou « Architecture, générée depuis projects.js » + type (Capture / Schéma) | mono 12px `text-muted` |

**Variantes**

- `Feature` : texte à gauche (colonnes 1–4), média à droite (5–12 + débord).
- `Feature reverse` : média à gauche (1–8 + débord), texte à droite (9–12). Alterner pour chaque projet en vedette.
- À 375px, les deux variantes deviennent identiques : texte, puis média bord à bord (sans arrondi, filets haut et bas seulement).

**Interactions** : tout le bloc n'est pas un lien (deux cibles : le titre et « Lire l'étude de cas »). Survol du média : image `scale(1.02)` en 600ms `ease-out-quint`, dans un cadre `overflow: hidden`. Entrée au défilement : texte puis média décalé de 80ms (le `Reveal` existant).

## Composant 2 · IndexRow (les autres projets)

| Partie | 1440px | 375px |
|---|---|---|
| Numéro | mono 12px, colonne de 36px, `text-muted` → `heading` au survol | idem |
| Titre `h3` | 24px / 30, 600, glisse de 6px vers la droite au survol (400ms) | 20px |
| Description | 14px / 22 `text-muted` | idem |
| Stack | mono 12px, séparée par « · » | idem, retour à la ligne |
| À droite | année en mono + ↗ (translate 2px, -2px au survol) | ↗ seul |
| Séparateurs | filet `border` en haut de chaque ligne, et en bas de la dernière | idem |

Toute la ligne est un seul `<a>`. Au survol **et au focus clavier**, la ligne devient active et le **panneau d'aperçu** (≥ 1024px, collant) affiche son schéma ou sa capture avec un fondu de 200ms. Le panneau est `aria-hidden` : c'est une illustration, pas une information exclusive (le schéma est repris dans l'étude de cas ou la page du projet).

## Composant 3 · ArchSchematic

Un SVG généré à partir de `layers` et `infra`. Pas de librairie, environ 80 lignes.

| Élément | Spec |
|---|---|
| Fond | `surface` + grille de points 1,8px tous les `fs × 1,6`, en `border-strong` à 70 % |
| Libellés de couche | `01 CLIENT`, mono `fs × 0,78`, `text-muted`, +0,06em |
| Nœud | rectangle `bg`, filet 1px `border-strong`, rayon `fs × 0,45`, texte mono `fs` en `heading` ; la police rétrécit si le libellé est trop long |
| Flux | flèche 1,2px `text-muted` d'une couche à la suivante |
| Infra | rectangle pointillé (4 4) sous toutes les couches : `INFRA · Docker · OpenAPI` |
| Variante horizontale | couches en colonnes, conteneur ≥ 560px (vedettes, panneau, en-tête d'étude de cas) |
| Variante verticale | couches en rangées, flèches vers le bas, hauteur automatique : conteneur < 560px (mobile) |
| Accessibilité | `role="img"` + `aria-label` complet : « Architecture de Kamas : Client (JavaScript, Interface web) → API (FastAPI) → … » |
| Thèmes | toutes les couleurs sont des variables CSS : le schéma suit le mode clair ou sombre sans re-rendu |
| Animation | chaque couche entre avec la keyframe `enter` existante, 120ms d'écart (opacity + transform seulement) |

## Le cycle de vie d'un projet

| État | Accueil | Étude de cas |
|---|---|---|
| Aujourd'hui (pas de capture) | Schéma dans le média de la Feature ou dans le panneau | Schéma en figure d'ouverture ; les figures de captures affichent un emplacement à rayures « Capture à venir » |
| Une capture arrive | `cover` renseigné : la capture remplace le schéma sur l'accueil | La capture devient la figure d'ouverture ; le schéma descend dans la section Architecture |
| Captures complètes | Rien ne change dans le code | Les emplacements à rayures disparaissent d'eux-mêmes (`src` présent) |

Le site est donc **complet dans l'état intermédiaire**, et chaque capture ajoutée l'améliore sans toucher à la mise en page.

**Captures** : export WebP 2× au ratio 16/10 (1824 × 1140px pour un média de 912px), < 150 Ko, `width`/`height` explicites, `loading="lazy"` sauf Kamas. Ne recadre jamais une capture d'interface en dessous de sa zone utile : `object-position: left top`.

---

# Étude de cas : un article technique

Objectif : **5 minutes de lecture, 600 à 900 mots**. Pas besoin d'en écrire 3000 : la structure fait le travail, chaque section a un rôle précis et une longueur cible.

## Structure

| # | Bloc | Contenu | Longueur | Mise en page (1440px) |
|---|---|---|---|---|
| 0 | Fil d'Ariane | « ← Projets » à gauche, « 02 / 06 » à droite | — | label mono, pleine largeur, 86px sous la barre |
| 1 | En-tête | label « Étude de cas », titre `h1`, chapô | 1 à 2 phrases | titre 131px / 0,9, -0,05em ; chapô colonnes 1–9, 24px / 1,45 |
| 2 | Méta | Rôle · Contexte · Durée · Stack | 4 valeurs courtes | 4 blocs de 3 colonnes, filet au-dessus, libellé mono |
| 3 | Figure d'ouverture | capture principale, ou schéma d'architecture tant qu'il n'y en a pas | — | bande `surface` pleine largeur, contenu sur 1200px, légende « Fig. 1 — … » |
| 4 | Corps | sommaire + texte | — | sommaire colonnes 1–2 (collant à 88px du haut) ; texte colonnes 4–10 (690px) |
| 4.1 | Contexte | qui, quel problème, pourquoi l'existant ne suffisait pas | 80–120 mots | |
| 4.2 | Ce que j'ai construit | le parcours principal, une capture par étape | 100–150 mots + 1 à 3 figures | figures « larges » : colonnes 4–12 + débord à droite |
| 4.3 | Architecture | une phrase par flèche du schéma | 80–120 mots + schéma | le schéma en figure large si la figure d'ouverture est une capture |
| 4.4 | Décisions techniques | 2 ou 3 ADR : Contexte / Décision / Compromis | 3 × 50 mots | cartes `surface`, filet, `radius-lg`, libellés mono sur 120px |
| 4.5 | Qualité & déploiement | tableau Tests · Intégration continue · Déploiement · Analyse statique | 4 lignes | `table` à filets, en-têtes de ligne en mono |
| 4.6 | Bilan | Ce qui fonctionne / Ce que je referais autrement | 2 × 2 puces | 2 colonnes à partir de 640px |
| 5 | Projet suivant | label + nom du projet en 88px + flèche | — | lien pleine largeur, la flèche avance de 12px au survol |

Les blocs « Le projet / Architecture / Qualité & déploiement » existants s'y retrouvent (4.1–4.2, 4.3, 4.5). Les cartes icône + titre + texte disparaissent : en article, du texte continu et un tableau se lisent mieux.

## Typographie de l'article

| Élément | 1440px | 375px |
|---|---|---|
| Titre `h1` | 131px / 0,9, -0,05em | 56px |
| Chapô | 24px / 1,45 | 20px |
| `h2` de section | 32px / 1,15, -0,025em, précédé du numéro en mono 12px | 24px |
| Texte | 18px / 1,7 (31px), largeur max 40em | 17px |
| `code` en ligne | mono 0,9em, fond `surface`, filet `border`, rayon 4px | idem |
| Légendes | mono 12px / 18 `text-muted`, « Fig. n — » | idem |

## Sommaire collant

- Les `h2` du corps, numérotés. L'entrée de la section visible passe en `heading` et son tiret s'allonge (`scaleX` 1 → 2, 240ms). La section active est repérée par un `IntersectionObserver` (`rootMargin: '-30% 0px -60% 0px'`).
- `aria-current="true"` sur l'entrée active ; `scroll-margin-top: 96px` sur les `h2` pour que la barre collante ne les masque pas.
- Masqué sous 1024px : le texte prend toute la largeur, les figures larges passent bord à bord.

## Types de figures

| Classe | Largeur à 1440px | Usage |
|---|---|---|
| `fig` | colonne de texte (690px) | capture de détail, schéma simple |
| `fig wide` | colonnes 4–12 + débord droit (1014px) | capture d'écran complète |
| Figure d'ouverture | bande pleine largeur, contenu 1200px | capture principale ou schéma |
| Emplacement « Capture à venir » | même cadre, fond à rayures, libellé mono | tant que `src` est vide |

## À 375px

Fil d'Ariane, titre 56px, chapô, méta en 2 × 2, figure d'ouverture en schéma vertical, puis le texte en pleine largeur. Les figures larges et les ADR passent bord à bord ou en pleine largeur, le tableau Qualité garde ses 2 colonnes (34 % / 66 %).

## Comment remplir sans inventer

Les textes de l'aperçu sont des **consignes d'écriture** placées à l'endroit où ira le texte : remplace-les par tes propres phrases. Les valeurs entre crochets ([n], [x] mois) sont à compléter. Rien sur cette page ne demande un chiffre que tu n'as pas.

---

# Code de la mise en page

## Ordre d'implémentation (du plus structurant au plus cosmétique)

| # | Étape | Fichiers | Effort |
|---|---|---|---|
| 1 | Grille : tokens `--page-margin`, `--gutter`, `--cols`, `--site`, `--bleed`, utilitaires `site`, `grid-site`, `bleed-*`, `overflow-x: clip` sur `body` | `index.css` | 30 min |
| 2 | Nouvelle échelle typographique (`text-name`, `text-h2`…) | `index.css` | 20 min |
| 3 | `projects.js` : une seule source de données avec `layers` | `src/data/projects.js` | 45 min |
| 4 | `ArchSchematic` | `src/components/ArchSchematic.jsx` | 1 h 30 |
| 5 | Barre de navigation collante | `NavBar.jsx` | 30 min |
| 6 | Hero : nom, accroche, fiche technique, boutons | `Home.jsx` | 1 h |
| 7 | `Feature` ×2 avec débord | `Feature.jsx` | 1 h |
| 8 | Index + panneau collant | `ProjectIndex.jsx` | 1 h 30 |
| 9 | Gabarit d'étude de cas + sommaire collant, puis migration de Kamas et FedIA | `CaseStudy.jsx` | ½ journée (avec l'écriture) |
| 10 | Bande Parcours + footer (phrase d'appel, colophon) | `Home.jsx`, `Footer.jsx` | 1 h |
| 11 | About, Contact, 404 sur la nouvelle grille | pages | 1 h |
| 12 | Tracé de la grille du hero + vérifications : 375px, mode clair, clavier, mouvement réduit | — | 1 h |

## Ce qui change dans les tokens

| Token | Avant | Après |
|---|---|---|
| Largeur de contenu | `90%`, max `840px` | `min(1200px, 100vw − 2 × marge)` |
| Marge latérale | 5 % implicite | `clamp(1.25rem, 4vw, 2.5rem)` : 20 → 40px |
| Colonnes | aucune | 4 / 8 / 12 (seuils 640 et 1024px) |
| Gouttière | 24px (grille de cartes) | 16 / 20 / 24px (seuils 640 et 1280px) |
| Colonne de lecture | 840px | 690px (7 colonnes) |
| Espace entre sections | 96px | `clamp(6rem, 4rem + 8vw, 12rem)` : 96 → 179px |
| `display` (nom) | 48px | `name` : `clamp(4.5rem, 1rem + 10vw, 10rem)` : 72 → 160px |
| `page-title` | 36px | `case-title` : `clamp(3.5rem, 1rem + 8vw, 8.5rem)` : 56 → 131px |
| `section-title` | 20px | `h2` : `clamp(2rem, 1.25rem + 3vw, 3.5rem)` : 32 → 56px |
| — | — | `project` 28 → 40px · `row` 20 → 24px · `prose-h2` 24 → 32px · `cta` 40 → 94px |
| — | — | `lede` 18 → 20px · `article` 17 → 18px, interligne 1,7 |
| Couleurs, courbes, durées | — | **inchangées** |

## 1. Grille et typographie : à ajouter dans `index.css`

```css
/* ---------- Grille ---------- */
:root {
  --page-margin: clamp(1.25rem, 4vw, 2.5rem);
  --gutter: 1rem;
  --cols: 4;
  --site: min(75rem, 100vw - 2 * var(--page-margin));
  --bleed: calc((100vw - var(--site)) / 2);   /* bord du conteneur → bord de l'écran */
  --section-y: clamp(6rem, 4rem + 8vw, 12rem);
  --hdr: 56px;
}
@media (width >= 40rem) { :root { --gutter: 1.25rem; --cols: 8; } }
@media (width >= 64rem) { :root { --cols: 12; } }
@media (width >= 80rem) { :root { --gutter: 1.5rem; } }

/* 100vw inclut la barre de défilement sous Windows : on coupe le débordement */
body { overflow-x: clip; }

@utility site { width: var(--site); margin-inline: auto; }
@utility grid-site {
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  column-gap: var(--gutter);
}
@utility bleed-r { margin-right: calc(-1 * var(--bleed)); }
@utility bleed-l { margin-left: calc(-1 * var(--bleed)); }
@utility bleed-x { margin-inline: calc(-1 * var(--bleed)); }
@utility py-section { padding-block: var(--section-y); }
@utility pt-section { padding-top: var(--section-y); }

/* ---------- Échelle typographique ---------- */
@theme {
  --text-name: clamp(4.5rem, 1rem + 10vw, 10rem);
  --text-name--line-height: 0.88;  --text-name--letter-spacing: -0.05em;  --text-name--font-weight: 600;
  --text-case-title: clamp(3.5rem, 1rem + 8vw, 8.5rem);
  --text-case-title--line-height: 0.9;  --text-case-title--letter-spacing: -0.05em;  --text-case-title--font-weight: 600;
  --text-cta: clamp(2.5rem, 1rem + 5.4vw, 6rem);
  --text-cta--line-height: 0.98;  --text-cta--letter-spacing: -0.045em;  --text-cta--font-weight: 600;
  --text-h2: clamp(2rem, 1.25rem + 3vw, 3.5rem);
  --text-h2--line-height: 1.02;  --text-h2--letter-spacing: -0.035em;  --text-h2--font-weight: 600;
  --text-project: clamp(1.75rem, 1.25rem + 1.5vw, 2.5rem);
  --text-project--line-height: 1.08;  --text-project--letter-spacing: -0.03em;  --text-project--font-weight: 600;
  --text-prose-h2: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --text-prose-h2--line-height: 1.15;  --text-prose-h2--letter-spacing: -0.025em;  --text-prose-h2--font-weight: 600;
  --text-row: clamp(1.25rem, 1rem + 0.6vw, 1.5rem);
  --text-row--line-height: 1.875rem;  --text-row--letter-spacing: -0.02em;  --text-row--font-weight: 600;
  --text-lede: clamp(1.125rem, 1rem + 0.4vw, 1.25rem);
  --text-lede--line-height: 1.6;
  --text-chapo: clamp(1.25rem, 1rem + 0.6vw, 1.5rem);
  --text-chapo--line-height: 1.45;  --text-chapo--letter-spacing: -0.01em;
  --text-article: clamp(1.0625rem, 1rem + 0.2vw, 1.125rem);
  --text-article--line-height: 1.7;
}

/* Décalage de « Autret » : 1 colonne en 4 colonnes, 2 au-delà */
@utility name-offset {
  --off: 1;
  padding-left: calc((100% + var(--gutter)) / var(--cols) * var(--off));
  @media (width >= 40rem) { --off: 2; }
}

/* Libellé mono réutilisé partout */
@utility label {
  font: 500 12px/16px var(--font-mono);
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted);
}

/* Tracé des colonnes du hero */
@keyframes grid-draw { from { transform: scaleY(0); } }
@media (prefers-reduced-motion: reduce) { .gridlines > * { animation: none !important; } }
```

## 2. NavBar

```jsx
<header className="sticky top-0 z-20 h-14 border-b border-border bg-bg/85 backdrop-blur-md">
  <div className="site flex h-full items-center gap-6">
    <Link to="/" className="mr-auto text-[15px] font-semibold tracking-[-0.01em] text-heading">Lucas Autret</Link>
    <nav aria-label="Principale" className="flex gap-5 text-sm text-muted">
      {links.map(l => (
        <NavLink key={l.to} to={l.to} className={({ isActive }) =>
          `transition-colors duration-160 hover:text-heading ${isActive ? 'text-heading underline decoration-1 underline-offset-[6px]' : ''}`}>{l.label}</NavLink>
      ))}
    </nav>
    <div className="hidden items-center gap-4 font-mono text-xs text-muted lg:flex">
      <span className="flex items-center gap-2"><Dot /> Dispo. oct. 2026</span>
      <button onClick={openPalette} className="rounded-md border border-border bg-surface px-1.5 py-1">⌘K</button>
    </div>
  </div>
</header>
```

`bg-bg/85` fonctionne parce que `--color-bg` pointe vers une variable : Tailwind v4 génère `color-mix()`.

## 3. Hero

```jsx
function GridLines() {
  return (
    <div aria-hidden className="gridlines site grid-site pointer-events-none absolute inset-y-0 inset-x-0
         max-sm:[&>:nth-child(n+5)]:hidden sm:max-lg:[&>:nth-child(n+9)]:hidden">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} style={{ animation: `grid-draw 900ms var(--ease-out-quint) ${i * 30}ms both` }}
              className="origin-top border-x border-border" />
      ))}
    </div>
  );
}

<section className="relative flex min-h-[max(600px,calc(100svh-var(--hdr)))] items-end border-b border-border
                    pt-[clamp(3rem,6vw,6rem)] pb-[clamp(2.5rem,5vw,4.5rem)]">
  <GridLines />
  <div className="site grid-site relative">
    <p className="label col-span-full mb-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap justify-between gap-x-6 gap-y-2">
      <span>Développeur full-stack</span>
      <span className="inline-flex items-center gap-2.5"><Dot /> Disponible en octobre 2026</span>
    </p>
    <h1 className="col-span-full text-name text-heading">
      <span className="block">Lucas</span>
      <span className="name-offset block">Autret</span>
    </h1>
    <div className="col-span-full mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-subgrid gap-y-8">
      <p className="col-span-full max-w-[36em] text-lede text-text sm:col-span-6 lg:col-span-5 lg:row-start-1">…</p>
      <dl className="col-span-full border-t border-border lg:col-start-7 lg:col-end-13 lg:row-span-2 lg:row-start-1">
        {spec.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[104px_1fr] gap-4 border-b border-border py-[11px]">
            <dt className="label leading-[22px]">{k}</dt>
            <dd className="text-sm leading-[22px] text-text">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="col-span-full grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap lg:col-span-5 lg:row-start-2 lg:self-end">
        <a href="#projets" className="btn btn-primary col-span-2">Voir les projets ↓</a>
        <Link to="/contact" className="btn">Me contacter</Link>
        <a href={GITHUB} className="justify-self-center text-sm text-muted underline decoration-border-strong underline-offset-[5px] hover:text-heading">GitHub ↗</a>
      </div>
    </div>
  </div>
</section>
```

Les classes `btn` reprennent les boutons existants (hauteur 44px, pilule). La cascade d'entrée existante s'applique aux mêmes éléments (80 → 480ms).

## 4. En-tête de section (réutilisé 4 fois)

```jsx
function SectionHead({ num, title, note }) {
  return (
    <div className="site grid-site mb-[clamp(3rem,5vw,5rem)] items-end gap-y-3">
      <p className="label col-span-full lg:col-span-2 lg:pb-2.5">{num}</p>
      <h2 className="col-span-full text-h2 text-heading lg:col-start-3 lg:col-end-10">{title}</h2>
      {note && <p className="col-span-full text-sm text-muted lg:col-start-10 lg:col-end-13 lg:pb-2">{note}</p>}
    </div>
  );
}
```

## 5. Feature

```jsx
export function Feature({ p, index, reverse }) {
  const media = p.cover
    ? <img src={p.cover.src} alt={p.cover.alt} width="1824" height="1140" className="size-full object-cover object-left-top transition-transform duration-[600ms] ease-out-quint group-hover:scale-[1.02]" />
    : <ArchSchematic project={p} />;
  return (
    <article className="group site grid-site items-center gap-y-7 [&+&]:mt-[clamp(5rem,9vw,10rem)]">
      <Reveal className={`col-span-full sm:col-span-6 lg:row-start-1 ${reverse ? 'lg:col-start-9 lg:col-end-13' : 'lg:col-start-1 lg:col-end-5'}`}>
        <p className="label flex gap-3"><span>{String(index).padStart(2, '0')}</span><span>Étude de cas</span></p>
        <h3 className="my-3.5 text-project text-heading"><Link to={`/${p.slug}`}>{p.name}</Link></h3>
        <p className="text-base leading-[26px] text-text">{p.summary}</p>
        <dl className="mt-6 border-t border-border">{/* Rôle, Stack, Type : grille [88px_1fr] */}</dl>
        <Link to={`/${p.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-heading">
          Lire l'étude de cas <span aria-hidden className="transition-transform duration-240 group-hover:translate-x-[3px]">→</span>
        </Link>
      </Reveal>
      <Reveal as="figure" col={1} className={`max-lg:bleed-x col-span-full lg:row-start-1 ${reverse ? 'lg:col-start-1 lg:col-end-9 lg:bleed-l' : 'lg:col-start-5 lg:col-end-13 lg:bleed-r'}`}>
        <div className={`relative aspect-[16/10] overflow-hidden border-y border-border bg-surface shadow-frame
             ${reverse ? 'lg:rounded-r-xl lg:border-r' : 'lg:rounded-l-xl lg:border-l'}`}>{media}</div>
        <figcaption className={`flex justify-between gap-4 pt-3 font-mono text-xs text-muted max-lg:px-[var(--bleed)] ${reverse ? 'lg:pl-[var(--bleed)]' : ''}`}>
          <span>{p.cover?.caption ?? 'Architecture, générée depuis projects.js'}</span><span>{p.cover ? 'Capture' : 'Schéma'}</span>
        </figcaption>
      </Reveal>
    </article>
  );
}
```

## 6. Index + panneau

```jsx
export function ProjectIndex({ items }) {
  const [active, setActive] = useState(items[0].slug);
  const current = items.find(p => p.slug === active);
  const groups = [['recent', 'Récent'], ['previous', 'Précédents']];
  return (
    <div className="site grid-site items-start">
      <ul className="col-span-full lg:col-span-7">
        {groups.map(([g, label]) => (
          <Fragment key={g}>
            <li aria-hidden className="label pb-2.5 pt-7 first:pt-0">{label}</li>
            {items.filter(p => p.group === g).map(p => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`} onMouseEnter={() => setActive(p.slug)} onFocus={() => setActive(p.slug)}
                      data-active={active === p.slug || undefined}
                      className="group grid grid-cols-[36px_1fr_auto] gap-x-4 gap-y-1 border-t border-border py-5">
                  <span className="font-mono text-xs leading-[30px] text-muted transition-colors group-hover:text-heading group-data-active:text-heading">{p.num}</span>
                  <div>
                    <h3 className="text-row text-heading transition-transform duration-400 ease-out-quint motion-safe:group-hover:translate-x-1.5 motion-safe:group-focus-visible:translate-x-1.5">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-muted">{p.summary}</p>
                    <p className="mt-2 font-mono text-xs text-muted">{p.stack.join(' · ')}</p>
                  </div>
                  <span className="flex gap-4 font-mono text-xs leading-[30px] text-muted">
                    <span className="max-sm:hidden">{p.year}</span><span aria-hidden>↗</span>
                  </span>
                </Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <figure aria-hidden className="sticky top-[calc(var(--hdr)+32px)] col-start-9 col-end-13 hidden lg:block">
        <div key={active} className="aspect-[16/10] overflow-hidden rounded-xl border border-border animate-[enter_200ms_var(--ease-out-quint)_both]">
          {current.cover ? <img src={current.cover.src} alt="" className="size-full object-cover object-left-top" /> : <ArchSchematic project={current} W={480} H={300} fs={13} />}
        </div>
        <figcaption className="mt-3 flex justify-between font-mono text-xs text-muted"><span>{current.name}</span><span>{current.cover ? 'Capture' : 'Schéma généré'}</span></figcaption>
      </figure>
    </div>
  );
}
```

Ajouter une bordure basse à la dernière ligne : `[&>li:last-child>a]:border-b`.

## 7. ArchSchematic

```jsx
import { useId } from 'react';

const label = p => `Architecture de ${p.name} : ` + p.layers.map(l => `${l.label} (${l.nodes.join(', ')})`).join(' → ')
  + (p.infra?.length ? ` ; infrastructure : ${p.infra.join(', ')}` : '');

function Defs({ id, fs }) {
  return (
    <defs>
      <pattern id={`${id}d`} width={fs * 1.6} height={fs * 1.6} patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" className="fill-border-strong" /></pattern>
      <marker id={`${id}m`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth={fs * .55} markerHeight={fs * .55} orient="auto"><path d="M0 0L8 4L0 8z" className="fill-muted" /></marker>
    </defs>
  );
}
const Bg = ({ id, W, H }) => (<><rect width={W} height={H} className="fill-surface" /><rect width={W} height={H} fill={`url(#${id}d)`} opacity=".7" /></>);
const layerStyle = i => ({ animation: `enter 560ms var(--ease-out-quint) ${i * 120}ms both` });

function Horizontal({ p, W, H, fs, id }) {
  const n = p.layers.length, pad = W * .06, gap = W * .055, infH = p.infra?.length ? fs * 3.2 : 0;
  const colW = (W - 2 * pad - (n - 1) * gap) / n, bh = fs * 2.6, bs = fs * .9, lblY = pad + fs;
  const cy = (lblY + fs * 2 + H - pad - infH - (infH ? fs * 1.2 : 0)) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label(p)} className="block size-full font-mono">
      <Defs id={id} fs={fs} /><Bg id={id} W={W} H={H} />
      {p.layers.map((l, i) => {
        const x = pad + i * (colW + gap), y0 = cy - (l.nodes.length * bh + (l.nodes.length - 1) * bs) / 2;
        return (
          <g key={l.label} style={layerStyle(i)}>
            <text x={x} y={lblY} fontSize={fs * .78} letterSpacing=".06em" className="fill-muted">{String(i + 1).padStart(2, '0')} {l.label.toUpperCase()}</text>
            {l.nodes.map((t, j) => {
              const y = y0 + j * (bh + bs), f = Math.min(fs, (colW - fs) / (t.length * .62));
              return (<g key={t}><rect x={x} y={y} width={colW} height={bh} rx={fs * .45} className="fill-bg stroke-border-strong" />
                <text x={x + colW / 2} y={y + bh / 2 + f * .36} fontSize={f} textAnchor="middle" className="fill-heading">{t}</text></g>);
            })}
            {i < n - 1 && <path d={`M${x + colW + fs * .5} ${cy}H${x + colW + gap - fs * .6}`} strokeWidth="1.2" markerEnd={`url(#${id}m)`} className="fill-none stroke-muted" />}
          </g>
        );
      })}
      {infH > 0 && (
        <g style={layerStyle(n)}>
          <rect x={pad} y={H - pad - infH} width={W - 2 * pad} height={infH} rx={fs * .45} strokeDasharray="4 4" className="fill-none stroke-border-strong" />
          <text x={pad + fs} y={H - pad - infH / 2 + fs * .32} fontSize={fs * .78} className="fill-muted">INFRA · {p.infra.join('  ·  ')}</text>
        </g>
      )}
    </svg>
  );
}

function Vertical({ p, W = 340, fs = 13, id }) {
  const pad = fs * 1.4, bh = fs * 2.5, g = fs * .6;
  let y = pad; const parts = [];
  p.layers.forEach((l, i) => {
    const items = [<text key="l" x={pad} y={y + fs * .8} fontSize={fs * .78} className="fill-muted">{String(i + 1).padStart(2, '0')} {l.label.toUpperCase()}</text>];
    y += fs * 1.6; let x = pad;
    l.nodes.forEach(t => {
      const w = t.length * fs * .62 + fs * 1.6;
      if (x + w > W - pad) { x = pad; y += bh + g; }
      items.push(<g key={t}><rect x={x} y={y} width={w} height={bh} rx={fs * .45} className="fill-bg stroke-border-strong" />
        <text x={x + w / 2} y={y + bh / 2 + fs * .36} fontSize={fs} textAnchor="middle" className="fill-heading">{t}</text></g>);
      x += w + g;
    });
    y += bh;
    if (i < p.layers.length - 1) { items.push(<path key="a" d={`M${pad + fs} ${y + fs * .4}V${y + fs * 2.2}`} strokeWidth="1.2" markerEnd={`url(#${id}m)`} className="fill-none stroke-muted" />); y += fs * 2.8; }
    parts.push(<g key={l.label} style={layerStyle(i)}>{items}</g>);
  });
  const H = y + pad;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label(p)} className="block h-auto w-full font-mono">
      <Defs id={id} fs={fs} /><Bg id={id} W={W} H={H} />{parts}
    </svg>
  );
}

export function ArchSchematic({ project, W = 880, H = 550, fs = 15, variant = 'auto' }) {
  const id = useId().replace(/:/g, '');
  if (variant === 'horizontal') return <Horizontal p={project} W={W} H={H} fs={fs} id={id} />;
  if (variant === 'vertical') return <Vertical p={project} id={id} />;
  return (<>
    <div className="hidden size-full sm:block"><Horizontal p={project} W={W} H={H} fs={fs} id={id + 'h'} /></div>
    <div className="sm:hidden"><Vertical p={project} id={id + 'v'} /></div>
  </>);
}
```

En variante `auto`, le parent ne doit pas imposer `aspect-[16/10]` sous 640px : ajoute `max-sm:aspect-auto` au cadre. Avec mouvement réduit, la keyframe `enter` est déjà réduite à un fondu de 150ms par le CSS du motion system.

## 8. Étude de cas : squelette

```jsx
<article>
  <header className="site grid-site pt-[clamp(3rem,6vw,6rem)]">
    <nav aria-label="Fil d'Ariane" className="label col-span-full mb-[clamp(2.5rem,6vw,5rem)] flex justify-between">
      <Link to="/" className="hover:text-heading">← Projets</Link><span>{num} / {total}</span>
    </nav>
    <p className="label col-span-full">Étude de cas</p>
    <h1 className="col-span-full mt-4 text-case-title text-heading">{p.name}</h1>
    <p className="col-span-full mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[34em] text-chapo text-text lg:col-span-9">{p.chapo}</p>
    <dl className="col-span-full mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-subgrid gap-y-6">
      {meta.map(([k, v]) => (
        <div key={k} className="col-span-2 border-t border-border pt-3 lg:col-span-3">
          <dt className="label">{k}</dt><dd className="mt-1.5 text-sm text-text">{v}</dd>
        </div>
      ))}
    </dl>
  </header>

  <figure className="mt-[clamp(3rem,6vw,5rem)] border-y border-border bg-surface py-[clamp(1.5rem,4vw,3rem)]">
    <div className="site">
      {p.cover ? <img … className="w-full rounded-xl border border-border" /> : <ArchSchematic project={p} W={1200} H={440} />}
      <figcaption className="mt-3 font-mono text-xs text-muted">Fig. 1 — …</figcaption>
    </div>
  </figure>

  <div className="site grid-site items-start pt-[clamp(4rem,7vw,7rem)]">
    <TableOfContents className="sticky top-[calc(var(--hdr)+32px)] col-span-2 hidden lg:block" />
    {/* prose en subgrid : les figures « wide » peuvent sortir de la colonne de texte */}
    <div className="prose-cs col-span-full grid grid-cols-subgrid lg:col-start-4 lg:col-end-13
                    [&>*]:col-span-full lg:[&>*]:col-span-7 lg:[&>.wide]:col-span-full lg:[&>.wide]:bleed-r max-lg:[&>.wide]:bleed-x">
      {children}
    </div>
  </div>

  <Link to={`/${next.slug}`} className="group site mt-section block border-t border-border py-[clamp(3rem,6vw,5rem)]">
    <span className="label">Projet suivant · {next.num}</span>
    <span className="mt-3.5 flex items-baseline gap-5 text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-none tracking-[-0.045em] text-heading">
      {next.name} <span aria-hidden className="font-normal transition-transform duration-400 ease-out-quint group-hover:translate-x-3">→</span>
    </span>
  </Link>
</article>
```

Styles du corps (à mettre dans `@layer components`) : `h2` en `text-prose-h2` avec `mt-[clamp(3.5rem,6vw,5rem)] mb-5 scroll-mt-24` et un `<small>` numéroté en label mono ; `p` en `text-article max-w-[40em] mb-5`. Le CSS vanilla complet des aperçus (fichiers `preview.html` des composants du groupe Mise en page) sert de référence pour chaque valeur.

## 9. Sommaire collant

```jsx
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
// <a aria-current={active === id ? 'true' : undefined} className="flex items-center gap-3 py-1.5 text-[13px] text-muted aria-[current]:text-heading
//     before:h-px before:w-3 before:origin-left before:bg-border-strong before:transition-transform aria-[current]:before:scale-x-200 aria-[current]:before:bg-heading">
```

Attention, avec `HashRouter`, un lien `#c1` changerait de route : utilise un `onClick` qui appelle `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`, et `'auto'` si le mouvement est réduit.

## 10. Vérifications avant de publier

- 375px : aucun défilement horizontal (`document.documentElement.scrollWidth === innerWidth`), nom sur 2 lignes sans coupure.
- Mode clair : schémas, bande Parcours et filets visibles (les aperçus sont testés dans les deux thèmes).
- Clavier : Tab parcourt barre → boutons du hero → titres des vedettes → lignes de l'index (le panneau suit le focus) → contact. Focus `galaxy` visible partout.
- Titres : un seul `h1` par page, puis `h2` de section, `h3` de projet. Pas de saut de niveau.
- Mouvement réduit : grille statique, couches du schéma en fondu simple.

---

Schéma d'architecture d'un projet, généré en SVG à partir de ses `layers` et de son `infra` dans `projects.js`.

- **Fournir** : `project` (avec `name`, `layers: [{ label, nodes[] }]`, `infra[]` facultatif), et en option `W`, `H`, `fs` pour la variante horizontale.
- **Variantes** : horizontale (couches en colonnes) dans un conteneur de 560px ou plus ; verticale (couches en rangées, hauteur automatique) en dessous. `variant="auto"` bascule à 640px.
- **Usage** : média des projets en vedette sans capture, panneau d'aperçu de l'index, figure d'ouverture ou section Architecture des études de cas.
- Couleurs : `surface`, `bg`, `border-strong`, `heading`, `text-muted`, donc il suit les deux thèmes. Pas d'accent.
- Accessibilité : `role="img"` et un `aria-label` qui liste toutes les couches et tous les nœuds.
- À éviter : plus de 4 couches, plus de 3 nœuds par couche, des libellés de plus de 20 caractères.
