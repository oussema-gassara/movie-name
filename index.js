import { movies } from "./data.js";
const genreOptions = document.getElementById("genre-options");
// Récupérer tous les genres
const grs = [];
for (const movie of movies) {
    grs.push(...movie.genres);
}
// Retirer les doublons
const filtredgenres = [];
for (let i = 0; i < grs.length; i++) {
    if (!filtredgenres.includes(grs[i])) {
        filtredgenres.push(grs[i]);
    }
}
// Générer les boutons radio
let html = "";
for (let i = 0; i < filtredgenres.length; i++) {
    const genre = filtredgenres[i];

    html += `
        <label class="genre-option" for="genre-${i}">
            <input
                type="radio"
                name="genre"
                id="genre-${i}"
                value="${genre}"
            >
            <span>${genre}</span>
        </label>
    `;
}
genreOptions.innerHTML = html;
// Récupérer les labels
const elements = document.getElementsByClassName("genre-option");
function Selectionne() {
    const selected = document.querySelector('input[name="genre"]:checked');
    return selected ? selected.value : null;
}
// Mettre en évidence le label sélectionné
genreOptions.addEventListener("change", function (e) {
    const genreselectionne = (e.target.value);
    const labelSelectionne = e.target.parentElement;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === labelSelectionne) {
            elements[i].classList.add("highlight");
        } else {
            elements[i].classList.remove("highlight");
        }
    }

});
//const selectionne=document.querySelector('input[type="radio"]:checked');
const select = document.getElementById('duration-filter');
const short=document.getElementById('short-only');
const selected = document.querySelector('input[name="genre"]:checked');
console.log("selected " + selected);
let res=[];

// Filtrer les films en combinant tous les critères.
function getMatchingMovies(genre, duration) {
    return movies.filter((movie) => {
        return movie.genres.includes(genre)
            && (!short.checked || movie.duration <= 90)
            && (duration === 0 || movie.duration <= duration);
    });
}

// Choisir un film par son indice aléatoire.
function getRandomMovie(matches, index) {
    return matches[index];
}

// Toutes les informations proviennent du même objet movie.
function renderMovie(movie) {
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-meta').textContent = `${movie.genres.join(' / ')} · ${movie.duration} min · ${movie.rating}/10`;
    document.getElementById('movie-description').textContent = movie.description;
    document.getElementById('movie-symbol').textContent = movie.symbol;
    document.getElementById('movie-cover').style.backgroundColor = movie.color;
    modal.style.display = 'flex';
}

document.getElementById('find-movie-btn').addEventListener('click', () => {
    const duration = Number(select.value);
    console.log("btn mv " + duration);
    console.log(short.checked);
    const genre = Selectionne();

    // Aucun genre sélectionné : ne pas ouvrir la fenêtre.
    if (genre === null) {
        document.getElementById('selection-message').textContent = 'Choisis un genre avant de continuer.';
        document.getElementById('selection-message').classList.add('error');
        return;
    }

    res=getMatchingMovies(genre, duration);
    console.log(res);
    if (res.length === 0) {
        document.getElementById('selection-message').textContent = 'Aucun film ne correspond à ces critères.';
        document.getElementById('selection-message').classList.add('error');
        modal.style.display = 'none';
        return;
    }

    document.getElementById('selection-message').textContent = '';
    document.getElementById('selection-message').classList.remove('error');

    if (res.length > 1) {
        const random = Math.floor(Math.random() * res.length);
        renderMovie(getRandomMovie(res, random));
        document.getElementById('another-movie-btn').disabled = false;
        document.getElementById('another-movie-btn').textContent = 'Une autre proposition ↻';
    } else {
        {
            const random = Math.floor(Math.random() * res.length);
            renderMovie(getRandomMovie(res, random));
            document.getElementById('another-movie-btn').textContent = "Pas d'autre film.";
            document.getElementById('another-movie-btn').disabled = true;
        }
    }
});

// Un seul écouteur : aucun événement dupliqué après plusieurs recherches.
document.getElementById('another-movie-btn').addEventListener('click', () => {
    if (res.length <= 1) return;

    res=getMatchingMovies(Selectionne(), Number(select.value));
    if (res.length === 0) {
        modal.style.display = 'none';
        document.getElementById('selection-message').textContent = 'Aucun film ne correspond à ces critères.';
        document.getElementById('selection-message').classList.add('error');
        return;
    }

    const rerandom=Math.floor(Math.random() * res.length)
    renderMovie(getRandomMovie(res, rerandom));
    document.getElementById('another-movie-btn').disabled = res.length <= 1;
});
console.log(res);
const txtcontent=document.getElementById('res')
{/*function displayMovies(movies) {
    if (res.length === 0) {
        document.getElementById('movie-modal').innerHTML = '<p>Aucun film trouvé.</p>';
    }
    else {
        const random = Math.floor(Math.random() * res.length);
        document.getElementById('movie-title')=`${res[random].title}`
        document.getElementById('movie-meta')=`${res[random].genre}+${res[random].duration}+${res[random].rating}`;
        document.getElementById('movie-description')=`${res[random].description}`;
    }   
}
displayMovies(res);*/}
const modal=document.getElementById("movie-modal");
document.getElementById("movie-close-btn").addEventListener('click',()=>{
    modal.style.display='none'
})
modal.addEventListener('click',(e)=>
{
    if (e.target === modal)
    {
        modal.style.display='none';
    }
})

// Activer / désactiver la vue compacte.
document.getElementById('compact-btn').addEventListener('click', () => {
    document.body.classList.toggle('compact');
});

// À chaque ouverture, revenir à l'écran du formulaire.
function openInviteModal() {
    if (document.getElementById('invite-close-btn').disabled) return;

    document.getElementById('invite-form-screen').classList.remove('hidden');
    document.getElementById('invite-form-screen').style.display = '';
    document.getElementById('invite-loading-screen').classList.add('hidden');
    document.getElementById('invite-loading-screen').style.display = '';
    document.getElementById('invite-success-screen').classList.add('hidden');
    document.getElementById('invite-success-screen').style.display = '';
    document.getElementById('invite-form').reset();
    document.getElementById('invite-modal').style.display = 'flex';
}

setTimeout(() => {
    // La fenêtre d'invitation ne remplace pas une proposition déjà ouverte.
    if (modal.style.display !== 'flex') {
        openInviteModal();
    }
}, 2000);
//console.log(random)

document.getElementById('open-invite-btn').addEventListener('click', () => {
    openInviteModal();
});

document.getElementById('invite-modal').addEventListener('click',(e)=>
{
    if (e.target.id === 'invite-modal' && !document.getElementById('invite-close-btn').disabled)
    {
        document.getElementById('invite-modal').style.display='none';
    }
})
document.getElementById('invite-close-btn').addEventListener('click',()=>{
    document.getElementById('invite-modal').style.display='none'
})
document.getElementById("invite-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    console.log(data);

    // Cacher uniquement l'écran du formulaire, pas la fenêtre parente.
    document.getElementById("invite-form-screen").classList.add("hidden");
    document.getElementById("invite-form-screen").style.display = "none";

    const loading = document.getElementById("invite-loading-screen");
    loading.classList.remove("hidden");
    loading.style.display = "";

    // Empêcher la fermeture ou une seconde soumission pendant le chargement.
    document.getElementById('invite-close-btn').disabled = true;
    document.getElementById('invite-submit-btn').disabled = true;
    document.getElementById('open-invite-btn').disabled = true;

    setTimeout(() => {
        loading.classList.add("hidden");
        loading.style.display = "";

        const success = document.getElementById("invite-success-screen");
        success.classList.remove("hidden");
        success.style.display = "";

        document.getElementById("invite-name").textContent = data.fullName;
        document.getElementById("invite-email").textContent = data.email;

        // Réactiver les boutons une fois la confirmation affichée.
        document.getElementById('invite-close-btn').disabled = false;
        document.getElementById('invite-submit-btn').disabled = false;
        document.getElementById('open-invite-btn').disabled = false;
    }, 1500);
});
