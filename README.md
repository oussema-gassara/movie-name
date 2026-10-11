# Movie Night — exercice JavaScript

Tu as terminé les parties « Cookie Consent » et « Meme App ». Ton objectif est de réutiliser ces notions dans une nouvelle application : un sélecteur de films avec un formulaire d'invitation simulée.

**Le HTML, le CSS et les données sont complets. Le JavaScript est à écrire dans `index.js`.** Les boutons ne fonctionnent pas tant que tu n'as pas écrit leur logique. Les films sont fictifs et aucune donnée n'est envoyée.

## Démarrer

1. Extrais le dossier `movie-night` et ouvre-le dans VS Code.
2. Lance `index.html` avec Live Server si tu utilises déjà cette extension.
3. Autre possibilité, si Python est installé : ouvre un terminal dans le dossier, lance `python -m http.server 8000`, puis ouvre `http://localhost:8000`.
4. Travaille dans `index.js` et garde la console du navigateur ouverte.

Utilise un serveur local : l'import de `data.js` est un module JavaScript et peut être bloqué lorsque tu ouvres simplement le HTML par double-clic.

## Programme consulté

Source : le cours de Scrimba publié sur Coursera, **Build Mini Projects in JavaScript**, modules **Build an Annoying Cookie Consent** et **Build a Cat Meme Picker** :

https://www.coursera.org/learn/essential-javascript-mini-projects

Consulté le 6 octobre 2026. La présentation Coursera compte 31 éléments pour Cookie Consent et 37 pour Meme Picker ; ton tableau de bord Scrimba en compte 26 et 37. Les découpages diffèrent : je me base sur les notions indiquées dans les deux modules, pas sur une égalité des nombres de leçons.

| Partie | Notions réutilisées dans l'exercice |
| --- | --- |
| Cookie Consent | `setTimeout`, modification de `element.style`, formulaires et attributs de validation, événement `submit`, `preventDefault`, `FormData` et `.get()`, éléments désactivés, `classList.toggle` |
| Meme App | `for...of` et boucles imbriquées, `import`/`export`, boutons radio, `.includes()`, `e.target`, `parentElement`, `classList.add/remove`, `getElementsByClassName`, `querySelector`, checkbox, `.filter()`, choix aléatoire, fenêtre modale, élément `select` |

Écris ce projet en JavaScript natif. Les données sont déjà présentes : tu peux terminer tout l'exercice avec ces notions et les bases de JavaScript. Aucune API, aucun framework, aucune base de données à configurer.

## Ce que l'utilisateur doit pouvoir faire

- Choisir un genre parmi les genres présents dans les données.
- Demander uniquement des films courts et/ou limiter la durée.
- Obtenir un film au hasard qui respecte les critères.
- Voir son titre, ses informations, sa description et son symbole dans une fenêtre.
- Demander une autre proposition et fermer la fenêtre.
- Passer en vue compacte.
- Ouvrir un formulaire d'invitation et obtenir une confirmation personnalisée après une courte attente.

## Mission 1 — Lire les données et préparer le DOM

Importe le tableau `movies` exporté par `data.js`. Chaque objet contient :

| Propriété | Contenu |
| --- | --- |
| `id` | Identifiant numérique |
| `title` | Titre du film |
| `genres` | Tableau de genres ; un film peut en avoir plusieurs |
| `duration` | Durée en minutes |
| `rating` | Note sur 10 |
| `symbol` | Emoji représentant le film |
| `color` | Couleur du fond de l'affiche |
| `description` | Résumé |

Prépare tes références aux éléments que tu vas utiliser. Pour commencer, sélectionne `genre-options`, `find-movie-btn`, `short-only`, `duration-filter` et `selection-message`.

**Vérification :** le tableau contient 12 films et tu peux lire le titre du premier dans la console.

## Mission 2 — Générer les genres sans doublons

1. Crée un tableau vide pour les genres uniques.
2. Parcours les films avec `for...of`.
3. Pour chaque film, parcours son tableau `genres` avec une deuxième boucle.
4. Utilise `.includes()` pour vérifier si un genre existe déjà avant de l'ajouter.
5. Construis les boutons radio dans `genre-options` avec une chaîne HTML. Remplace le message de départ.

La structure de chaque option doit être : un `label` de classe `genre-option`, contenant un `input` radio, puis un `span` avec le nom du genre. Tous les radios ont `name="genre"` ; leur `value` correspond exactement au genre dans les données. Donne-leur des `id` uniques.

**Vérification :** tu obtiens 6 genres : action, science-fiction, comédie, animation, aventure et thriller. Aucun doublon. Un seul genre peut être coché à la fois.

## Mission 3 — Montrer le genre sélectionné

Écoute l'événement `change` du conteneur `genre-options`.

- Récupère le radio sélectionné avec `e.target`.
- Retire `highlight` des anciennes options avec `getElementsByClassName`, une boucle et `classList.remove`.
- Ajoute `highlight` au `parentElement` du radio sélectionné.

**Vérification :** une seule option possède le contour orange. Le contour suit la sélection.

## Mission 4 — Appliquer les filtres

Au clic sur « Choisir mon film » :

1. Cherche le radio coché avec `querySelector`.
2. Si aucun genre n'est choisi, affiche « Choisis un genre avant de continuer. » dans `selection-message`. Ajoute la classe `error` et n'ouvre pas la fenêtre.
3. Sinon, utilise `.filter()` pour conserver les films dont `genres` contient le genre choisi.
4. Si `short-only.checked` est vrai, garde seulement les films de **90 minutes ou moins**.
5. Lis la valeur du `select` `duration-filter`. `0` signifie aucune limite ; les autres valeurs imposent une durée maximale.
6. Applique les trois critères ensemble. La valeur d'un `select` est une chaîne : pense à la convertir avec `Number()` pour la comparer à un nombre.
7. Si aucun film ne correspond, affiche « Aucun film ne correspond à ces critères. » et laisse la fenêtre fermée. Efface les anciens messages d'erreur après une sélection valide.

**Vérification :** « thriller » + films courts donne zéro résultat. « animation » + 60 minutes donne un seul film. « comédie » sans limite en donne plusieurs.

## Mission 5 — Tirer un film au hasard et l'afficher

Écris des fonctions distinctes pour filtrer, choisir et afficher.

- Zéro résultat : affiche le message prévu à la mission 4.
- Un résultat : choisis ce film.
- Plusieurs résultats : choisis un indice entier entre `0` et `length - 1`, avec `Math.random()` et `Math.floor()`.

Remplis les éléments suivants :

| Élément | Contenu attendu |
| --- | --- |
| `movie-title` | Titre du film |
| `movie-meta` | Genres, durée et note, par exemple « animation / aventure · 88 min · 8.1/10 » |
| `movie-description` | Résumé |
| `movie-symbol` | Symbole |
| `movie-cover` | Couleur du fond, via `style.backgroundColor` |

Pour afficher les genres, tu peux construire une chaîne avec une boucle. Utilise `textContent` pour les textes. Ouvre `movie-modal` en mettant `style.display` à `flex`.

**Vérification :** le film montré respecte tous les critères. Chaque propriété affichée vient du même objet.

## Mission 6 — Gérer les interactions de la fenêtre

- Au clic sur `movie-close-btn`, ferme `movie-modal` avec `style.display = 'none'`.
- Au clic sur `another-movie-btn`, propose à nouveau un film avec les filtres actuels. Réutilise tes fonctions.
- Ferme aussi la fenêtre si l'utilisateur clique sur le fond sombre. Compare `e.target` au conteneur de la fenêtre : cliquer sur le contenu ne doit pas la fermer.
- Au clic sur `compact-btn`, utilise `document.body.classList.toggle('compact')`. Les styles correspondants sont déjà écrits.

Le hasard peut proposer deux fois le même film : cela reste correct dans l'exercice principal.

**Vérification :** la fermeture, la nouvelle proposition et la vue compacte fonctionnent à plusieurs reprises.

## Mission 7 — Réutiliser les notions de Cookie Consent

### Affichage et fermeture

- Affiche `invite-modal` après **2 secondes** avec `setTimeout`.
- Si une autre fenêtre est déjà ouverte quand le délai se termine, laisse-la affichée et n'ouvre pas l'invitation automatiquement.
- `open-invite-btn` permet d'ouvrir l'invitation manuellement.
- `invite-close-btn` la ferme.
- Quand tu rouvres le formulaire, affiche `invite-form-screen` et cache les deux autres écrans.

### Soumission

1. Écoute `submit` sur `invite-form` et empêche le rechargement avec `preventDefault()`.
2. Crée un `FormData` à partir du formulaire.
3. Lis le prénom avec `.get('fullName')` et l'e-mail avec `.get('email')`. Ces clés sont les attributs `name`, pas les `id`.
4. Cache `invite-form-screen`, affiche `invite-loading-screen` et désactive les boutons de fermeture et de soumission, ainsi que `open-invite-btn`.
5. Après **1,5 seconde**, cache le chargement et affiche `invite-success-screen`.
6. Mets le prénom dans `invite-name` et l'e-mail dans `invite-email` avec `textContent`.
7. Réactive les boutons. La fermeture doit de nouveau fonctionner.

La classe `hidden` est déjà disponible : utilise `classList.add('hidden')` et `classList.remove('hidden')` pour gérer les écrans.

Le HTML gère déjà `required`, `minlength` et `type="email"`. Le formulaire est une simulation : le délai remplace le traitement, et aucun message n'est envoyé.

**Vérification :** les champs invalides empêchent la soumission ; la page ne se recharge pas ; la fermeture est désactivée pendant l'attente ; la confirmation affiche les valeurs saisies.

## Organisation possible des fonctions

Ces noms sont des pistes, pas une solution à recopier :

- `getUniqueGenres()` : retourne les genres sans doublons.
- `renderGenres()` : crée les radios.
- `highlightSelectedGenre(event)` : met à jour le contour.
- `getMatchingMovies()` : retourne les films correspondant aux critères.
- `getRandomMovie(matches)` : choisit un objet parmi les résultats.
- `renderMovie(movie)` : remplit et ouvre la fenêtre.
- `openInviteModal()` : prépare et affiche le formulaire.
- `handleInviteSubmit(event)` : gère les trois écrans de soumission.

Commence par la mission 1, puis avance dans l'ordre. Fais fonctionner chaque mission avant d'ajouter la suivante.

## Vérifications finales

- [ ] 6 genres uniques, générés à partir des données.
- [ ] Un seul radio sélectionné et une seule option mise en évidence.
- [ ] Message explicite quand aucun genre n'est sélectionné.
- [ ] Genre, case à cocher et durée appliqués ensemble.
- [ ] Zéro résultat géré sans erreur ni fenêtre vide.
- [ ] Un résultat géré correctement.
- [ ] Plusieurs résultats : choix aléatoire valide.
- [ ] Toutes les informations du film affichées et mises à jour.
- [ ] La croix et le fond sombre ferment la fenêtre ; le contenu reste cliquable.
- [ ] Nouvelle proposition et vue compacte utilisables plusieurs fois.
- [ ] Invitation visible après le délai ou via son bouton.
- [ ] Validation native et `preventDefault()` fonctionnels.
- [ ] Chargement, boutons désactivés, confirmation et réouverture fonctionnels.
- [ ] Aucune erreur dans la console.

## Bonus facultatifs

1. Empêcher deux propositions identiques consécutives quand plusieurs films correspondent.
2. Afficher le nombre de films disponibles après un changement de filtre.
3. À l'aide des événements déjà étudiés, faire fermer une fenêtre avec la touche Échap.

Ces bonus sont facultatifs. Termine d'abord les sept missions.
