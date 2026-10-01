# Portfolio Motion System

Couche de finition pour un portfolio de développeur existant (React 19 · Vite · Tailwind v4). Rien n'est refait : on ajoute du mouvement, des retours d'interaction et un seul accent, en gardant la DA sombre, grise et Inter. Le test à passer : un recruteur technique pense « soigné », jamais « chargé ».

Sections de ce système : **Motion** (tableau complet des animations), **Moments wow** (⌘K et empreinte de build), **Implémentation** (`@theme`, CSS, hooks, avis Framer Motion, priorisation).

## Ce que montre la page d'accueil actuelle

Relevé sur les captures de Home.jsx (1920px, mode sombre) :

- **Hiérarchie trop plate.** « Projets récents » est en ~13px gris semi-gras, à peine plus visible que les descriptions. Les titres de carte (~14px) sont plus petits que le paragraphe du hero (~15px). → passer les titres de section en `section-title` (20px, `heading`) et les titres de carte en `card-title` (16px, 500).
- **Ligne de stack à ~11px** en `text-grey` : difficile à lire et sous AA. → `mono` 12px en `text-muted`.
- **Monogrammes** : fond à rayures diagonales et lettres espacées en gris. Le traitement est bon et cohérent, on le garde ; seule la couleur des lettres passe en `text-muted` à 60 % pour rester discrète, et le survol M10 s'y ajoute.
- **Footer décalé** : son trait et ses colonnes sont plus étroits d'une dizaine de pixels de chaque côté que la zone de contenu (padding interne en plus). → même conteneur `w-[90%] max-w-[840px] mx-auto` sans padding horizontal.
- **Liens du footer soulignés en permanence** : bruit visuel répété 6 fois. → retirer le soulignement au repos et utiliser `link-underline` (trait `heading` qui se trace au survol) ; le contexte de navigation suffit à les identifier comme liens.
- **Bouton de thème** : carré gris plein, le seul bloc rempli de la page, il attire l'œil. → bouton rond 36px, bordure `border`, fond transparent, icône `text-muted` (composant ThemeToggle).
- **Hero** : le vide au-dessus du nom est voulu, la cascade d'entrée le rend vivant. Le trait de fin à ~1020px est le bon candidat pour E7.
- **Grilles impaires** (3 + 3 cartes) : la carte orpheline à gauche est normale ; ne pas l'étirer.

## Principes

1. **Le mouvement explique, il ne décore pas.** Chaque animation répond à une question : d'où vient cet élément, est-ce que mon clic a marché, où suis-je ? Sinon, elle saute.
2. **Une seule direction.** Tout entre par le bas (`translateY` positif → 0) et s'atténue en opacité. Jamais de gauche/droite, de rotation d'entrée ou de rebond (sauf la coche ✓).
3. **Court et décroissant.** Survols 160–400ms, entrées 560ms, rien au-delà de 800ms. Courbe par défaut `ease-out-quint`.
4. **Seulement `transform` et `opacity`** pour ce qui bouge. Les changements de couleur (`background-color`, `border-color`, `color`) sont autorisés en transition car ils ne déclenchent que du repaint, jamais de layout.
5. **Une seule fois.** Les apparitions au défilement ne rejouent pas en remontant. La cascade du hero ne joue qu'au premier chargement de l'app.
6. **Le contenu existe sans JS.** Les états masqués ne s'appliquent que sous `html.js`.

## Couleur

- Garder `bg`, `heading`, `text` exactement comme aujourd'hui.
- Remplacer `text-grey` (#757676) par `text-muted` pour tout texte < 24px : #757676 fait 4.21:1 en sombre et 4.36:1 en clair, sous le seuil AA. `text-muted` (#8a8b8b / #6b6c6c) est visuellement quasi identique et passe à 5.6:1 / 5.05:1.
- **Un accent, `galaxy`** (#7c9cff en sombre, #3b5bdb en clair). Quatre endroits, pas un de plus :
  1. l'anneau de focus clavier (`outline: 2px solid var(--galaxy); outline-offset: 3px`) ;
  2. le soulignement des liens dans la prose (About, études de cas), le texte reste `text` ;
  3. la touche ↵ de l'item actif dans la palette ⌘K ;
  4. le hash de commit dans l'empreinte de build du footer.
- `galaxy-subtle` sert uniquement au fond de `::selection` : c'est le cinquième contact, invisible tant qu'on ne sélectionne pas.
- Jamais d'accent sur les boutons, les titres, les cartes ou en dégradé. Le bouton primaire reste `heading` sur `bg`.
- `success` reste réservé au point « Disponible » et va toujours avec son texte.

## Typographie

Inter pour tout, `mono` système pour les données techniques (stack, kbd, commit). L'échelle crée le contraste qui manque aujourd'hui : chaque palier est au moins 1,25× le suivant.

| Rôle | Style | Taille / interligne | Graisse | Tailwind |
|---|---|---|---|---|
| Nom du hero | `display` | 48/52 (36/40 mobile) | 600, -0.03em | `text-4xl sm:text-5xl font-semibold tracking-[-0.03em]` |
| Titre de page | `page-title` | 36/40 (30/36 mobile) | 600, -0.025em | `text-3xl sm:text-4xl font-semibold tracking-[-0.025em]` |
| Titre de section | `section-title` | 20/28 | 600, -0.01em | `text-xl font-semibold tracking-[-0.01em]` |
| Titre de carte | `card-title` | 16/24 | 500 | `text-base font-medium` |
| Texte courant | `body` | 16/26 | 400 | `text-base leading-[26px]` |
| Description | `body-sm` | 14/22 | 400, `text-muted` | `text-sm leading-[22px] text-muted` |
| Légende, footer | `caption` | 13/20 | 400 | `text-[13px] leading-5` |
| Label | `label` | 12/16 caps | 500, +0.06em | `text-xs font-medium uppercase tracking-[0.06em]` |
| Stack, kbd | `mono` | 12/18 | 400 | `font-mono text-xs` |

Activer `font-feature-settings: "cv11", "ss01"` sur Inter (chiffres et « a » plus nets) et `font-variant-numeric: tabular-nums` sur les dates et le commit.

## Captures d'écran

- Cadre : `border` 1px, `radius-lg` (12px), fond `surface`, ombre `shadow-frame`. L'image remplit le cadre en `object-cover`, ratio 16/10.
- **Pas d'inclinaison ni de perspective** : ça lit « Dribbble », ça déforme le texte des captures et ça trahit qu'on cache quelque chose. Les captures restent droites et nettes.
- Pages d'étude de cas seulement : une barre de fenêtre de 28px au-dessus de la capture (fond `surface`, 3 points de 6px en `border-strong`, pas les couleurs feu tricolore). Sur la grille d'accueil, pas de barre.
- Monogramme (projets sans capture) : garder les rayures diagonales actuelles (`repeating-linear-gradient` à 135°, traits 1px en `border` tous les 12px sur `surface`), initiales en `display` espacées (+0.2em), couleur `text-muted` à 60 %.
- Exporter en WebP 2×, `loading="lazy"` sauf les 2 premières cartes, `width`/`height` explicites pour éviter tout décalage de layout.

## Mouvement réduit

Sous `prefers-reduced-motion: reduce` :

- **Désactivé** : toutes les translations et mises à l'échelle (entrées, survol des cartes, flèche ↗, icône de thème, panneaux), le halo du point vert, le tracé du trait du hero, le crossfade de thème, la transition de page.
- **Conservé** : les fondus d'opacité d'entrée raccourcis à 150ms sans décalage, les changements de couleur au survol, le changement d'icône et de libellé « Copié » (instantané), l'anneau de focus.

## Accessibilité

- Focus : `:focus-visible` uniquement, anneau `galaxy` 2px décalé de 3px, rayon hérité. Jamais `outline: none` sans remplaçant. 7.35:1 / 5.43:1 sur `bg`.
- Cartes projet : tout le bloc est un seul `<a>` ; l'anneau se pose sur le cadre de l'image (`group-focus-visible:`).
- Panneau email et palette : `Échap` ferme et rend le focus au déclencheur ; « Adresse copiée » est annoncé via une région `aria-live="polite"`.
- Cibles tactiles ≥ 40px de haut à 375px (pilules de nav : `h-10`).

## 375px

- Grille de cartes en une colonne, sans décalage d'apparition.
- Boutons du hero : « Voir mes projets » pleine largeur, les deux autres côte à côte à 50 %.
- NavBar : masquer la ligne « Développeur full-stack » sous 420px (le hero la répète), garder photo + nom + pilules ; l'indice ⌘K est masqué sans clavier (`@media (hover: none)`).
- Footer en 2 colonnes, l'empreinte de build sur sa propre ligne.

---

# Motion

Toutes les durées en ms. « Quint » = `ease-out-quint` `cubic-bezier(0.22, 1, 0.36, 1)`. Les délais sont mesurés depuis le déclencheur. `--i` = index de l'élément dans sa cascade.

## Tableau récapitulatif

| # | Élément | Déclencheur | Propriétés : départ → arrivée | Durée | Courbe | Délai / décalage |
|---|---|---|---|---|---|---|
| **Entrées : hero** | | | | | | |
| E1 | NavBar (bloc entier) | Chargement | opacity 0 → 1 | 400 | quint | 0 |
| E2 | Nom | Chargement | opacity 0 → 1 · translateY 12px → 0 | 560 | quint | 80 |
| E3 | Ligne rôle + pastille | Chargement | idem E2 | 560 | quint | 160 |
| E4 | Paragraphe | Chargement | idem E2 | 560 | quint | 240 |
| E5 | Boutons (×3) | Chargement | idem E2 | 560 | quint | 320 · 380 · 440 (pas de 60) |
| E6 | Point vert « Disponible » | Chargement | halo `::after` scale 1 → 2.4 · opacity 0.5 → 0 | 1600 | ease-out | 900, puis 3 itérations et arrêt |
| E7 | Trait de fin du hero | Chargement | scaleX 0 → 1, `transform-origin: left` | 800 | ease-in-out | 500 |
| **Entrées : défilement** (IntersectionObserver, seuil 0.15, `rootMargin: 0px 0px -10% 0px`, une seule fois) | | | | | | |
| E8 | Titre de section | Entrée dans l'écran | opacity 0 → 1 · translateY 16px → 0 | 560 | quint | 0 |
| E9 | Carte projet | Entrée dans l'écran | idem E8 | 560 | quint | col. gauche 0, col. droite 80 ; chaque ligne observée séparément ; 1 colonne : 0 |
| E10 | Captures d'étude de cas (×3) | Chargement | idem E8 | 560 | quint | 240 · 320 · 400 (après le titre) |
| E11 | Carte d'étude de cas (icône + titre + texte) | Entrée dans l'écran | idem E8 | 480 | quint | `--i × 60`, plafonné à 240 |
| E12 | Ligne de liste (About, Contact) | Entrée dans l'écran | opacity 0 → 1 · translateY 8px → 0 | 400 | quint | `--i × 40`, plafonné à 320 |
| **Micro-interactions** | | | | | | |
| M1 | Bouton primaire | Survol | background-color `heading` → `heading` à 88 % | 160 | quint | 0 |
| M2 | Bouton secondaire | Survol | background transparent → `surface-hover` · border `border` → `border-strong` | 160 | quint | 0 |
| M3 | Tous les boutons et pilules | `:active` (clic) | scale 1 → 0.97 | 100 | quint | 0 (relâche : 160) |
| M4 | Icône ↓ de « Voir mes projets » / ↗ de GitHub | Survol du bouton | translateY 0 → 2px / translate(2px, -2px) | 240 | quint | 0 |
| M5 | Pilule de nav (inactive) | Survol | `::before` opacity 0 → 1 (fond `surface-hover`) · color `text-muted` → `heading` | 160 | quint | 0 |
| M6 | Indicateur de lien actif (option) | Changement de route | translateX + width de l'indicateur vers le nouveau lien | 320 | quint | 0 |
| M7 | Lien texte (prose, footer) | Survol / focus | `::after` scaleX 0 → 1 origine gauche ; sortie origine droite | 240 | quint | 0 |
| M8 | Cadre de carte projet | Survol | scale 1 → 0.97 (existant, timing précisé) | 400 | quint | 0 |
| M9 | Image de carte | Survol | opacity 1 → 0.8 (existant) | 400 | quint | 0 |
| M10 | Monogramme | Survol | scale 1 → 1.04 (contre-mouvement du cadre) | 400 | quint | 0 |
| M11 | Flèche ↗ | Survol de la carte | flèche A : translate(0,0) → (14px,-14px), opacity → 0 ; flèche B : (-14px,14px) → (0,0), opacity 0 → 1 ; color `text-muted` → `heading` | 280 | quint | A : 0 ; B : 40 |
| M12 | Carte projet | Focus clavier | anneau `galaxy` 2px offset 4px sur le cadre + M8 à M11 | 0 | — | 0 |
| M13 | Panneau email | Clic sur l'enveloppe | opacity 0 → 1 · scale 0.96 → 1 · translateY -4px → 0, origine haut-droite | 180 | quint | 0 |
| M13b | Panneau email | Fermeture (clic dehors, Échap) | inverse | 120 | ease-in | 0 |
| M14 | Bouton copier | Clic (succès) | icône copie : scale 1 → 0.6, opacity → 0 · icône ✓ : scale 0.6 → 1, opacity 0 → 1 · libellé « Copier » → « Copié » · couleur `text-muted` → `heading` | 100 + 240 | ease-in puis ease-pop | ✓ à 60 ; retour à l'état initial après 2000 (160, quint) |
| M15 | Icône du bouton de thème | Clic | sortante : rotate 0 → -90°, scale 1 → 0.5, opacity → 0 · entrante : rotate 90° → 0, scale 0.5 → 1, opacity 0 → 1 | 320 | quint | 0 |
| M16 | Couleurs de la page | Clic sur le thème | crossfade View Transition de `root` | 240 | ease-in-out | 0 |
| M17 | Carte d'étude de cas | Survol | border-color `border` → `border-strong` | 200 | quint | 0 |
| **Transitions de page** | | | | | | |
| P1 | `<main>` (clé = pathname) | Changement de route | opacity 0 → 1 · translateY 8px → 0 ; pas d'animation de sortie | 240 | quint | 0 |
| P2 | Défilement | Changement de route | retour en haut instantané avant peinture (`useLayoutEffect`) | 0 | — | 0 |
| **Moment wow ⌘K** | | | | | | |
| W1 | Voile de la palette | ⌘K / Ctrl+K / clic sur l'indice | opacity 0 → 1 | 160 | quint | 0 (fermeture : 120, ease-in) |
| W2 | Panneau de la palette | idem | opacity 0 → 1 · scale 0.98 → 1 · translateY 8px → 0 | 200 | quint | 0 (fermeture : 120, ease-in) |
| W3 | Item actif | Flèches ↑↓ / survol | fond `surface-hover` instantané · touche ↵ opacity 0 → 1 | 0 / 120 | quint | 0 |

## Pourquoi ces valeurs

- **12px pour le hero, 16px au défilement, 8px entre pages.** Assez pour que l'œil perçoive une direction, trop peu pour qu'on « voie » l'animation. Au-delà de 24px, l'effet devient une démonstration.
- **560ms en `ease-out-quint`.** Avec cette courbe, 90 % du déplacement est fait en ~250ms : la page semble prête tout de suite, la fin est juste soyeuse.
- **Cascade du hero : 80ms, terminée à 1000ms.** Le dernier bouton est cliquable en moins d'une seconde ; personne n'attend.
- **Pas d'animation de sortie de page.** Une sortie retarde la navigation de toute sa durée. On entre vite, on ne s'en va pas lentement.
- **Pas de décalage à 375px.** Sur une colonne, chaque carte arrive seule dans l'écran : la cascade n'apporte rien.

## Transitions de page : la décision

`HashRouter` (routeur déclaratif) ne supporte pas la prop `viewTransition` de `<Link>`, réservée aux routeurs « data ». Deux niveaux :

1. **Maintenant (recommandé)** : P1 + P2. Un `key={pathname}` sur un wrapper rejoue une animation CSS d'entrée de 240ms. Coût : 10 lignes, zéro dépendance, aucun délai de navigation.
2. **Plus tard (option)** : migrer vers `createHashRouter` + `<RouterProvider>`, passer `viewTransition` sur les `<Link>` des cartes, et donner `view-transition-name: project-kamas` à la miniature et à la première capture de l'étude de cas. La miniature se transforme alors en capture : c'est la seule transition partagée qui vaille la migration. Navigateurs sans support : navigation normale.

## `prefers-reduced-motion: reduce`

| Groupe | Comportement |
|---|---|
| E1–E5, E8–E12, P1 | opacity seule, 150ms, sans délai ni décalage |
| E6 (halo) | supprimé, point fixe |
| E7 (trait) | affiché directement |
| M3, M4, M8, M10, M11, M13, M15, W2 | transforms supprimés ; M11 devient un simple changement de couleur |
| M1, M2, M5, M7, M9, M17 | conservés (couleur et opacité seulement) |
| M14 | changement d'icône et de libellé instantané |
| M16 | pas de View Transition, bascule immédiate |

---

# Moments wow

Deux, pas plus. Aucun n'est visuel au sens « designer » : ce sont des **fonctionnalités** qu'un développeur reconnaît comme du travail d'ingénierie.

## 1. Palette de commandes ⌘K

**Ce que c'est.** `⌘K` (Mac) ou `Ctrl+K` ouvre une palette centrée : un champ de recherche et une liste filtrable.

| Groupe | Items |
|---|---|
| Naviguer | Work · About · Contact · Kamas · FedIA |
| Actions | Copier l'adresse email · Basculer le thème · Télécharger le CV |
| Liens | GitHub ↗ · LinkedIn ↗ |

**Découverte.** Une touche `⌘K` discrète (style `mono`, fond `surface`, bordure `border`, `radius-sm`) placée avant l'enveloppe dans la NavBar, masquée sur écran tactile. Dans le footer, colonne préférences : « Astuce : ⌘K pour tout le site ». Rien d'autre : ceux qui la trouvent sont exactement ceux qu'on veut impressionner.

**Comportement.**

- Ouverture : W1 + W2 (200ms). Le focus va dans le champ.
- ↑↓ déplace l'item actif (fond `surface-hover`, touche ↵ en `galaxy` qui apparaît en 120ms). `↵` exécute. `Échap` ou clic sur le voile ferme (120ms) et rend le focus à l'élément d'origine.
- Filtre : correspondance insensible aux accents (`normalize('NFD')`), sans librairie.
- « Copier l'adresse » ferme la palette et réutilise le retour M14 dans une annonce `aria-live`.
- Largeur : `min(560px, 100% - 32px)`, à 20vh du haut ; à 375px elle prend toute la largeur moins 16px de chaque côté.
- Accessibilité : `role="dialog" aria-modal="true"`, champ `role="combobox" aria-expanded aria-controls aria-activedescendant`, liste `role="listbox"`, items `role="option" aria-selected`. Focus piégé, `inert` sur le reste de la page.

**Pourquoi ça marche auprès d'un recruteur.** Les recruteurs techniques utilisent cette interaction tous les jours (VS Code, GitHub, Linear, Raycast). La retrouver sur un portfolio dit trois choses sans un mot : tu penses clavier et accessibilité (le pattern combobox ARIA est réputé difficile), tu sais gérer un état global proprement (raccourci, focus, overlay), et tu as le goût des outils bien faits. C'est aussi un sujet d'entretien tout trouvé : « comment as-tu géré le piège de focus ? ». Et c'est optionnel : un visiteur pressé ne la voit jamais, rien ne le gêne.

**Effort.** Une demi-journée, ~150 lignes, zéro dépendance.

## 2. Empreinte de build dans le footer

**Ce que c'est.** Une ligne en `mono` 12px, `text-muted`, sous le copyright :

```
v1.4.0 · a1b2c3d · déployé le 28 sept. 2026
```

Le hash est en `galaxy` et pointe vers le commit sur GitHub. Il est injecté au build par Vite (`define`), donc toujours vrai.

**Interaction.** Survol du hash : soulignement M7. Rien d'autre.

**Pourquoi ça marche.** C'est le clin d'œil d'un développeur à un développeur : le site est versionné, déployé par une chaîne automatisée, et tu l'assumes au point d'exposer le commit. Un recruteur qui clique arrive sur ton dépôt, ton historique, tes messages de commit : la preuve la plus directe de ta façon de travailler. Zéro bruit visuel, ~20 lignes.

**Ne pas faire** : afficher un score Lighthouse ou des chiffres de performance « en dur ». Tout ce qui est affiché doit être calculé.

## Écartés, et pourquoi

| Idée | Raison |
|---|---|
| Nom du hero qui « se décode » lettre à lettre | Gadget vu partout, retarde la lecture du nom, mauvais pour les lecteurs d'écran |
| Curseur personnalisé, effet aimant | Lit « portfolio de designer », casse les attentes d'utilisabilité |
| Fond étoilé / dégradé bleu-violet animé | Le cliché IA par excellence, coûteux en GPU, contraire à la sobriété |
| Halo lumineux qui suit la souris sur les cartes | Joli mais déjà très répandu ; le survol actuel (0.97 + 80 %) suffit |
| Captures inclinées en 3D | Déforme le texte des captures, lit « Dribbble » |

---

# Implémentation

## Priorisation : fort impact, faible effort d'abord

| Ordre | Changement | Effort | Pourquoi d'abord |
|---|---|---|---|
| **1** | Échelle typographique + `text-muted` + focus `galaxy` + `::selection` | ~30 min, CSS seul | Tout le site paraît plus « dessiné » d'un coup, et le gris passe AA |
| **2** | Cascade du hero (E1–E7) + apparitions au défilement (E8–E12) | ~1 h, 1 keyframe + 1 hook | C'est la première impression : le site semble vivant sans rien ajouter |
| **3** | Cartes (flèche ↗ qui s'échange, timings, focus) + bouton copier avec ✓ | ~1 h | Les deux interactions que chaque visiteur déclenche |
| 4 | Empreinte de build dans le footer | ~30 min | Moment wow n°2, presque gratuit |
| 5 | Palette ⌘K | ~½ journée | Moment wow n°1 |
| 6 | Transition de page P1 + crossfade de thème M16 + icône M15 | ~30 min | Finition |
| 7 | (Option) `createHashRouter` + miniature → capture en View Transition | ~2 h | Seulement si tout le reste est fait |

## Framer Motion : non, pas maintenant

Le CSS couvre 100 % de ce système. Motion (le nouveau nom de Framer Motion, importé depuis `motion/react`) apporterait trois choses, et aucune n'est nécessaire ici :

- **Animations de sortie** (`AnimatePresence`) : volontairement écartées, elles ralentissent la navigation. Pour les overlays, `<dialog>` + `@starting-style` + `transition-behavior: allow-discrete` font la sortie en CSS natif.
- **Animations de layout** (`layoutId`) : l'API View Transitions fait le morph carte → étude de cas nativement.
- **Ressorts physiques** : une seule courbe à dépassement (`ease-pop`) suffit pour la coche.

En face, c'est du JavaScript chargé sur chaque page pour un site statique. Savoir ne pas ajouter une dépendance est aussi un signal de séniorité qu'un recruteur technique remarque. À reconsidérer si tu ajoutes du glisser-déposer, des gestes ou des chorégraphies interruptibles.

## 1. Le thème : `src/index.css`

```css
@import "tailwindcss";

/* ---------- Valeurs brutes : sombre par défaut ---------- */
:root {
  color-scheme: dark;
  --bg: #0f0f0f;
  --surface: #161616;
  --surface-hover: rgb(255 255 255 / 0.06);
  --border: rgb(255 255 255 / 0.08);
  --border-strong: rgb(255 255 255 / 0.16);
  --heading: #fafafa;
  --text: #e4e8ef;
  --text-grey: #757676;     /* existant : réservé aux textes >= 24px */
  --text-muted: #8a8b8b;    /* 5.61:1 sur #0f0f0f */
  --galaxy: #7c9cff;        /* 7.35:1 sur #0f0f0f */
  --galaxy-subtle: rgb(124 156 255 / 0.22);
  --success: #22c55e;
  --backdrop: rgb(0 0 0 / 0.5);
  --ds-shadow-frame: inset 0 1px 0 rgb(255 255 255 / 0.04);
  --ds-shadow-overlay: 0 0 0 1px rgb(255 255 255 / 0.08), 0 24px 64px -16px rgb(0 0 0 / 0.7);
}
:root.light {
  color-scheme: light;
  --bg: #fafafa;
  --surface: #f2f2f2;
  --surface-hover: rgb(15 15 15 / 0.05);
  --border: rgb(15 15 15 / 0.08);
  --border-strong: rgb(15 15 15 / 0.16);
  --heading: #0f0f0f;
  --text: #0f0f0f;
  --text-muted: #6b6c6c;    /* 5.05:1 sur #fafafa */
  --galaxy: #3b5bdb;        /* 5.43:1 sur #fafafa */
  --galaxy-subtle: rgb(59 91 219 / 0.16);
  --success: #15803d;
  --backdrop: rgb(15 15 15 / 0.25);
  --ds-shadow-frame: 0 1px 2px rgb(15 15 15 / 0.04), 0 12px 32px -16px rgb(15 15 15 / 0.14);
  --ds-shadow-overlay: 0 0 0 1px rgb(15 15 15 / 0.08), 0 24px 64px -16px rgb(15 15 15 / 0.22);
}

/* ---------- Exposés à Tailwind (bg-bg, text-muted, border-border…) ---------- */
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-hover: var(--surface-hover);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-heading: var(--heading);
  --color-text: var(--text);
  --color-grey: var(--text-grey);
  --color-muted: var(--text-muted);
  --color-galaxy: var(--galaxy);
  --color-galaxy-subtle: var(--galaxy-subtle);
  --color-success: var(--success);
  --shadow-frame: var(--ds-shadow-frame);
  --shadow-overlay: var(--ds-shadow-overlay);
}

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Échelle typographique : text-display, text-page, text-section… */
  --text-display: 3rem;      --text-display--line-height: 3.25rem; --text-display--letter-spacing: -0.03em;  --text-display--font-weight: 600;
  --text-display-sm: 2.25rem; --text-display-sm--line-height: 2.5rem; --text-display-sm--letter-spacing: -0.03em; --text-display-sm--font-weight: 600;
  --text-page: 2.25rem;      --text-page--line-height: 2.5rem;     --text-page--letter-spacing: -0.025em;    --text-page--font-weight: 600;
  --text-page-sm: 1.875rem;  --text-page-sm--line-height: 2.25rem; --text-page-sm--letter-spacing: -0.025em; --text-page-sm--font-weight: 600;
  --text-section: 1.25rem;   --text-section--line-height: 1.75rem; --text-section--letter-spacing: -0.01em;  --text-section--font-weight: 600;
  --text-card: 1rem;         --text-card--line-height: 1.5rem;     --text-card--font-weight: 500;
  --text-body: 1rem;         --text-body--line-height: 1.625rem;
  --text-body-sm: 0.875rem;  --text-body-sm--line-height: 1.375rem;
  --text-caption: 0.8125rem; --text-caption--line-height: 1.25rem;
  --text-label: 0.75rem;     --text-label--line-height: 1rem;      --text-label--letter-spacing: 0.06em;     --text-label--font-weight: 500;

  /* Courbes : ease-out-quint, ease-in-out, ease-in, ease-pop */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Animations : animate-enter, animate-page, animate-draw, animate-halo */
  --animate-enter: enter 560ms var(--ease-out-quint) both;
  --animate-page: page 240ms var(--ease-out-quint) both;
  --animate-draw: draw 800ms var(--ease-in-out) 500ms both;
  --animate-halo: halo 1600ms ease-out 900ms 3 both;

  @keyframes enter { from { opacity: 0; transform: translateY(12px); } }
  @keyframes page  { from { opacity: 0; transform: translateY(8px); } }
  @keyframes draw  { from { transform: scaleX(0); } }
  @keyframes halo  { from { transform: scale(1); opacity: 0.5; } to { transform: scale(2.4); opacity: 0; } }
}

/* enter-delay-80 → animation-delay: 80ms */
@utility enter-delay-* { animation-delay: calc(--value(integer) * 1ms); }

/* Lien qui se souligne : footer (heading), prose (galaxy via [--underline:var(--galaxy)]) */
@utility link-underline {
  position: relative;
  &::after {
    content: ""; position: absolute; inset-inline: 0; bottom: -2px; height: 1px;
    background: var(--underline, var(--heading));
    transform: scaleX(0); transform-origin: right;
    transition: transform 240ms var(--ease-out-quint);
  }
  &:hover::after, &:focus-visible::after { transform: scaleX(1); transform-origin: left; }
}

@layer base {
  html { background: var(--bg); color: var(--text); font-feature-settings: "cv11", "ss01"; }
  :focus-visible { outline: 2px solid var(--galaxy); outline-offset: 3px; }
  ::selection { background: var(--galaxy-subtle); }
  /* Liens de prose : soulignés au repos (pas seulement la couleur), trait galaxie au survol */
  .prose a { --underline: var(--galaxy); text-decoration: underline 1px var(--border-strong); text-underline-offset: 4px; }
}

/* ---------- Apparition au défilement ---------- */
[data-reveal] {
  transition: opacity 560ms var(--ease-out-quint), transform 560ms var(--ease-out-quint);
  transition-delay: var(--reveal-delay, 0ms);
}
html.js [data-reveal]:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (min-width: 640px) { [data-reveal-col="1"] { --reveal-delay: 80ms; } }

/* ---------- Bascule de thème ---------- */
::view-transition-old(root), ::view-transition-new(root) {
  animation-duration: 240ms; animation-timing-function: var(--ease-in-out);
}

/* ---------- Mouvement réduit ---------- */
@media (prefers-reduced-motion: reduce) {
  @keyframes enter { from { opacity: 0; } }
  @keyframes page  { from { opacity: 0; } }
  .animate-enter, .animate-page { animation-duration: 150ms; animation-delay: 0ms; }
  .animate-draw, .animate-halo { animation: none; }
  html.js [data-reveal]:not(.is-in) { transform: none; }
  [data-reveal] { transition: opacity 150ms linear; transition-delay: 0ms; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```

Dans `index.html`, avant le script de l'app (le contenu reste visible si le JS échoue) :

```html
<script>document.documentElement.classList.add('js')</script>
```

Règle pour tous les survols qui déplacent ou redimensionnent : préfixer par `motion-safe:` (`motion-safe:group-hover:scale-[0.97]`). Tailwind v4 n'applique `hover:` que sur les appareils qui survolent vraiment, rien ne reste « bloqué » au toucher.

## 2. Hero : cascade au premier chargement uniquement

```jsx
let heroPlayed = false; // module : survit aux navigations, pas au rechargement

export function Hero() {
  const [animate] = useState(() => !heroPlayed);
  useEffect(() => { heroPlayed = true; }, []);
  const a = (delay) => (animate ? `animate-enter enter-delay-${delay}` : '');
  // Tailwind doit voir les classes complètes : liste-les telles quelles
  return (
    <section className="flex min-h-svh flex-col justify-center">
      <h1 className={`text-display-sm sm:text-display text-heading ${animate ? 'animate-enter enter-delay-80' : ''}`}>Lucas Autret</h1>
      <div className={`mt-3 flex flex-wrap items-center gap-3 ${animate ? 'animate-enter enter-delay-160' : ''}`}>
        <span className="text-body text-muted">Développeur full-stack</span>
        <span className="inline-flex h-7 items-center gap-2 rounded-full border border-border px-3 text-caption text-text">
          <span className="relative flex size-2">
            <span className={`absolute inset-0 rounded-full bg-success ${animate ? 'animate-halo' : ''}`} />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          Disponible en octobre 2026
        </span>
      </div>
      <p className={`mt-6 max-w-[60ch] text-body text-text ${animate ? 'animate-enter enter-delay-240' : ''}`}>…</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
        <a className={`col-span-2 … ${animate ? 'animate-enter enter-delay-320' : ''}`}>Voir mes projets</a>
        <a className={`… ${animate ? 'animate-enter enter-delay-380' : ''}`}>Me contacter</a>
        <a className={`… ${animate ? 'animate-enter enter-delay-440' : ''}`}>GitHub</a>
      </div>
      <hr className={`mt-auto h-px origin-left border-0 bg-border ${animate ? 'animate-draw' : ''}`} />
    </section>
  );
}
```

La NavBar reçoit `animate-enter` avec un `@keyframes` d'opacité seule si tu veux être strict (E1), ou simplement `animate-page` au premier rendu.

## 3. Apparition au défilement : un observateur partagé

```jsx
// src/hooks/Reveal.jsx
import { useEffect, useRef } from 'react';

let io;
function observer() {
  io ??= new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  return io;
}

export function Reveal({ as: Tag = 'div', col, delay, style, ...props }) {
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; observer().observe(el); return () => observer().unobserve(el); }, []);
  return <Tag ref={ref} data-reveal="" data-reveal-col={col} style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style} {...props} />;
}
```

```jsx
<Reveal as="h2" className="text-section text-heading">Projets récents</Reveal>
<div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2">
  {projects.map((p, i) => <Reveal key={p.slug} col={i % 2}><ProjectCard {...p} /></Reveal>)}
</div>
{/* Cartes d'étude de cas : delay={Math.min(i * 60, 240)} — Listes : delay={Math.min(i * 40, 320)} */}
```

## 4. Carte projet

```jsx
<Link to={`/${slug}`} className="group block outline-none">
  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface shadow-frame
                  transition-transform duration-400 ease-out-quint
                  motion-safe:group-hover:scale-[0.97] motion-safe:group-active:scale-[0.96]
                  group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-galaxy">
    {image
      ? <img src={image} alt="" width="1600" height="1000" loading={eager ? 'eager' : 'lazy'}
             className="size-full object-cover transition-opacity duration-400 ease-out-quint group-hover:opacity-80" />
      : <div className="monogram grid size-full place-items-center text-display text-muted transition-transform duration-400 ease-out-quint motion-safe:group-hover:scale-[1.04]">{initials}</div>}
  </div>
  <div className="mt-3 flex items-start justify-between gap-4">
    <div>
      <h3 className="text-card text-heading">{title}</h3>
      <p className="mt-1 text-body-sm text-muted">{description}</p>
      <p className="mt-2 font-mono text-xs text-muted">{stack.join(' · ')}</p>
    </div>
    <span aria-hidden className="relative mt-1 size-4 shrink-0 overflow-hidden text-muted transition-colors duration-200 group-hover:text-heading group-focus-visible:text-heading">
      <span className="absolute inset-0 grid place-items-center transition-[translate,opacity] duration-280 ease-out-quint
                       group-hover:opacity-0 motion-safe:group-hover:translate-x-3.5 motion-safe:group-hover:-translate-y-3.5">↗</span>
      <span className="absolute inset-0 grid place-items-center opacity-0 transition-[translate,opacity] delay-40 duration-280 ease-out-quint
                       motion-safe:-translate-x-3.5 motion-safe:translate-y-3.5
                       group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
    </span>
  </div>
</Link>
```

```css
/* Garde tes rayures actuelles ; seules les couleurs passent par les tokens */
.monogram {
  background-color: var(--surface);
  background-image: repeating-linear-gradient(135deg, var(--border) 0 1px, transparent 1px 12px);
  letter-spacing: 0.2em; color: color-mix(in srgb, var(--text-muted) 60%, transparent);
}
```

Note : en Tailwind v4, `translate-x-*` utilise la propriété CSS `translate` (d'où `transition-[translate,opacity]`), `scale-*` la propriété `scale`. Les deux restent composités par le GPU.

## 5. Bouton copier l'adresse

```jsx
const [copied, setCopied] = useState(false);
const timer = useRef();
async function copy() {
  try { await navigator.clipboard.writeText(EMAIL); }
  catch { window.getSelection().selectAllChildren(emailRef.current); return; } // repli : texte sélectionné
  setCopied(true); clearTimeout(timer.current);
  timer.current = setTimeout(() => setCopied(false), 2000);
}

<button onClick={copy} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-caption
                                  text-muted transition-colors duration-160 hover:bg-surface-hover hover:text-heading
                                  data-[copied=true]:text-heading motion-safe:active:scale-[0.97]" data-copied={copied}>
  <span className="relative size-4">
    <FiCopy  className={`absolute inset-0 transition-[scale,opacity] ${copied ? 'scale-60 opacity-0 duration-100 ease-in' : 'duration-160 ease-out-quint'}`} />
    <FiCheck className={`absolute inset-0 transition-[scale,opacity] ${copied ? 'scale-100 opacity-100 delay-60 duration-240 ease-pop' : 'scale-60 opacity-0 duration-160'}`} />
  </span>
  {/* Les deux libellés empilés dans la même cellule : la largeur ne bouge pas */}
  <span className="grid">
    <span className={`col-start-1 row-start-1 transition-opacity duration-160 ${copied ? 'opacity-0' : ''}`}>Copier</span>
    <span className={`col-start-1 row-start-1 transition-opacity duration-160 ${copied ? '' : 'opacity-0'}`}>Copié</span>
  </span>
</button>
<span role="status" aria-live="polite" className="sr-only">{copied ? 'Adresse copiée dans le presse-papiers' : ''}</span>
```

Panneau de l'adresse (M13) : garder le panneau monté et piloter `data-open` :

```jsx
<div data-open={open} inert={!open} className="absolute right-0 top-full mt-2 origin-top-right rounded-xl bg-surface p-3 shadow-overlay
     transition-[opacity,scale,translate,visibility] duration-180 ease-out-quint
     data-[open=false]:invisible data-[open=false]:opacity-0 data-[open=false]:duration-120 data-[open=false]:ease-in
     motion-safe:data-[open=false]:scale-96 motion-safe:data-[open=false]:-translate-y-1">
```

## 6. Thème : crossfade + icône

```js
import { flushSync } from 'react-dom';

export function switchTheme(setTheme, next) {
  const apply = () => flushSync(() => setTheme(next)); // ton effet existant pose/retire .light
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) return apply();
  document.startViewTransition(apply);
}
```

```jsx
<button onClick={() => switchTheme(setTheme, theme === 'dark' ? 'light' : 'dark')} aria-label="Basculer le thème"
        className="relative grid size-9 place-items-center rounded-full border border-border text-muted transition-colors duration-160 hover:text-heading hover:bg-surface-hover">
  <FiMoon className={`absolute size-4 transition-[rotate,scale,opacity] duration-320 ease-out-quint ${theme === 'dark' ? '' : 'opacity-0 motion-safe:-rotate-90 motion-safe:scale-50'}`} />
  <FiSun  className={`absolute size-4 transition-[rotate,scale,opacity] duration-320 ease-out-quint ${theme === 'light' ? '' : 'opacity-0 motion-safe:rotate-90 motion-safe:scale-50'}`} />
</button>
```

Si le thème vient de `localStorage`, le poser dans le script inline de `index.html` (avant React) pour éviter le flash du mauvais thème.

## 7. Transition de page

```jsx
// Dans ton layout, autour de <Outlet /> ou de <Routes>
let firstRender = true;
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [skip] = useState(() => firstRender);
  useEffect(() => { firstRender = false; }, []);
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <div key={pathname} className={skip ? '' : 'animate-page'}>{children}</div>;
}
```

Au premier chargement c'est la cascade du hero qui joue ; ensuite, chaque page entre en 240ms sans retarder le clic.

## 8. Empreinte de build

```js
// vite.config.js
import { execSync } from 'node:child_process';
const sha = process.env.GITHUB_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA
  ?? execSync('git rev-parse HEAD').toString().trim();

export default defineConfig({
  define: {
    __BUILD__: JSON.stringify({ version: process.env.npm_package_version, sha, date: new Date().toISOString() }),
  },
  // …
});
```

```jsx
const b = __BUILD__; // déclarer /* global __BUILD__ */ pour ESLint
<p className="font-mono text-xs tabular-nums text-muted">
  v{b.version} · <a href={`https://github.com/<toi>/<repo>/commit/${b.sha}`} className="link-underline text-galaxy [--underline:var(--galaxy)]">{b.sha.slice(0, 7)}</a>
  {' '}· déployé le {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(b.date))}
</p>
```

## 9. Palette ⌘K sur `<dialog>` natif

`<dialog>` + `showModal()` donne gratuitement le piège de focus, `Échap`, le reste de la page inerte, le retour du focus et `::backdrop`.

```jsx
const norm = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export function CommandPalette({ commands }) { // [{ id, group, label, run }]
  const ref = useRef(null);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const items = useMemo(() => commands.filter((c) => norm(c.label).includes(norm(q))), [commands, q]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const d = ref.current; d.open ? d.close() : d.showModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => setActive(0), [q]);

  const run = (c) => { ref.current.close(); c.run(); };
  const onKeyDown = (e) => {
    if (!items.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % items.length); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((i) => (i - 1 + items.length) % items.length); }
    if (e.key === 'Enter')     { e.preventDefault(); run(items[active]); }
  };

  return (
    <dialog ref={ref} className="palette" aria-label="Palette de commandes"
            onClose={() => setQ('')} onClick={(e) => e.target === ref.current && ref.current.close()}>
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
             role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-activedescendant={items[active] && `cmdk-${items[active].id}`}
             placeholder="Rechercher une page, une action…" className="h-12 w-full border-b border-border bg-transparent px-4 text-body text-heading outline-none placeholder:text-muted" />
      <ul id="cmdk-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
        {items.map((c, i) => (
          <li key={c.id} id={`cmdk-${c.id}`} role="option" aria-selected={i === active}
              onMouseMove={() => setActive(i)} onClick={() => run(c)}
              className="flex h-10 cursor-pointer items-center justify-between rounded-md px-3 text-body-sm text-text aria-selected:bg-surface-hover aria-selected:text-heading">
            {c.label}
            <kbd className={`font-mono text-xs text-galaxy transition-opacity duration-120 ${i === active ? '' : 'opacity-0'}`}>↵</kbd>
          </li>
        ))}
        {!items.length && <li className="px-3 py-6 text-center text-body-sm text-muted">Aucun résultat</li>}
      </ul>
    </dialog>
  );
}
```

```css
.palette {
  margin: 20vh auto 0; width: min(560px, 100% - 32px); padding: 0; border: 0;
  border-radius: 12px; background: var(--surface); color: var(--text); box-shadow: var(--ds-shadow-overlay);
  opacity: 0; transform: translateY(8px) scale(0.98);
  transition: opacity 120ms var(--ease-in), transform 120ms var(--ease-in),
              overlay 120ms allow-discrete, display 120ms allow-discrete;
}
.palette[open] { opacity: 1; transform: none; transition-duration: 200ms; transition-timing-function: var(--ease-out-quint); }
@starting-style { .palette[open] { opacity: 0; transform: translateY(8px) scale(0.98); } }
.palette::backdrop { background: transparent; transition: background-color 120ms, overlay 120ms allow-discrete, display 120ms allow-discrete; }
.palette[open]::backdrop { background: var(--backdrop); transition-duration: 160ms; }
@starting-style { .palette[open]::backdrop { background: transparent; } }
@media (prefers-reduced-motion: reduce) { .palette, .palette[open] { transform: none; } }
```

Le raccourci, l'indice `⌘K` de la NavBar (`ref.current.showModal()` au clic) et l'item « Copier l'adresse » partagent la même fonction `copy()` que le panneau email. Afficher `Ctrl K` au lieu de `⌘K` hors Mac (`navigator.platform` ou `userAgentData`).

---

# Composants

## Button

Boutons en pilule du hero : un primaire plein (`heading` sur `bg`), des secondaires bordés.

- **Fournir** : un libellé, une icône optionnelle (↓ pour une ancre, ↗ pour un lien externe), `href` ou `onClick`.
- **Survol** : couleur seule en 160ms (M1, M2). **Clic** : `scale(0.97)` en 100ms (M3). **Icône** : 2px vers sa direction en 240ms (M4).
- Hauteur 40px, `radius-full`, texte 14px / 500.
- À 375px : le primaire prend toute la largeur, les deux secondaires se partagent la ligne suivante.
- Jamais de couleur `galaxy` sur un bouton. Les transforms sont préfixés `motion-safe:`.

## ProjectCard

Carte de projet de la grille d'accueil : visuel 16/10 (capture ou monogramme), titre, description, stack, flèche ↗.

- **Fournir** : `slug`, `title`, `description` (une ligne), `stack[]`, `image` ou `initials`, `eager` pour les deux premières.
- **Survol / focus** : cadre `scale(0.97)` et image à 80 % en 400ms (M8, M9, existant), monogramme `scale(1.04)` (M10), la flèche ↗ sort en haut à droite et une seconde entre par le bas à gauche en 280ms (M11).
- **Focus clavier** : anneau `galaxy` sur le cadre, offset 4px (M12). Toute la carte est un seul lien.
- **Apparition** : envelopper dans `<Reveal col={i % 2}>` (E9).
- Titre en `card-title` (16px) : plus grand qu'aujourd'hui, c'est le principal gain de hiérarchie de la page.

## CopyEmail

Panneau de l'adresse email ouvert par l'enveloppe de la NavBar, avec bouton copier.

- **Fournir** : l'adresse, l'élément déclencheur (pour lui rendre le focus).
- **Ouverture** : opacité + `scale(0.96 → 1)` + 4px, origine haut-droite, 180ms ; fermeture 120ms `ease-in` (M13). `Échap` et clic extérieur ferment.
- **Après la copie** : l'icône copie rétrécit et disparaît (100ms), une coche ✓ apparaît avec un léger dépassement (`ease-pop`, 240ms, +60ms), « Copier » devient « Copié » sans changer la largeur, le texte passe en `heading`. Retour à l'état initial après 2000ms. Annonce `aria-live` « Adresse copiée dans le presse-papiers ».
- **Échec du presse-papiers** : sélectionner l'adresse pour un ⌘C manuel.

## ThemeToggle

Bouton de bascule clair/sombre du footer, en remplacement du carré gris plein actuel.

- Rond 36px, bordure `border`, fond transparent, icône `text-muted` → `heading` au survol.
- **Clic** : la lune et le soleil s'échangent par rotation de 90° et `scale(0.5)` en 320ms (M15) ; la page entière fait un fondu enchaîné de 240ms via `document.startViewTransition` (M16).
- Mouvement réduit ou navigateur sans View Transitions : bascule immédiate.
- Poser le thème depuis `localStorage` dans un script inline de `index.html` pour éviter le flash.

## CommandPalette

Palette de commandes ⌘K / Ctrl+K : moment wow n°1, navigation et actions au clavier.

- **Fournir** : une liste `{ id, group, label, run }` (pages, copier l'email, basculer le thème, CV, liens externes).
- Construite sur `<dialog>` + `showModal()` : piège de focus, `Échap`, retour du focus et fond inerte natifs.
- **Ouverture** : voile 160ms, panneau `scale(0.98 → 1)` + 8px en 200ms ; fermeture 120ms (W1, W2). Item actif : fond `surface-hover` instantané, touche ↵ en `galaxy` en 120ms (W3).
- Filtre insensible aux accents, pattern ARIA combobox + listbox.
- Indice `⌘K` dans la NavBar, masqué sur écran tactile ; afficher `Ctrl K` hors Mac.

## BuildStamp

Empreinte de build du footer : version, hash de commit et date de déploiement, injectés par Vite au build.

- `mono` 12px en `text-muted` ; le hash en `galaxy`, lien vers le commit GitHub, soulignement qui se trace au survol (M7).
- Valeurs calculées uniquement (`GITHUB_SHA`, `git rev-parse`, date du build) : ne jamais afficher de chiffre écrit à la main.
- À 375px : sur sa propre ligne sous le copyright.
