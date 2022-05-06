let resultGamePerdu = "Perdu !";
let resultGameGagne = "Gagné !";
let resultGameNul = "Match nul";

let timeTimeout = 1000;

let classementBox = document.querySelector("#classement");
let resultBox = document.querySelector('#result_box');
let matchResultBox = document.querySelector('#result-text');
let iconAdversaireBox = document.querySelector('#adversaire-icon');

let choixAdver = document.getElementById("choixadvers")
let resultat = document.getElementById("resultat")

// Affichage du classement lors du chargement de la page
actualiserClassement()

function jouer(){
    let utilisateur = gestionUtilisateur();
    console.log(utilisateur);
    let resultatChoixJoueur = choixJoueur(); 
    console.log(resultatChoixJoueur);
    let resultatChoixOrdi = choixordi();
    console.log(resultatChoixOrdi);
    let resultatMatch = testResultatMatch(resultatChoixJoueur,resultatChoixOrdi);
    actualiserScore(resultatMatch, utilisateur)
    afficherStats(utilisateur)
    afficherResultat(resultatMatch, resultatChoixOrdi)
    actualiserClassement()
    
}

// Vérifier, créer ou récupérer le joueur
function gestionUtilisateur() {
    // Récupération des informations du joueur
    let userName = document.getElementById("pseudo").value;
    let tableUser;

    // Vérifier sur le pseudo est valide
    let userNameREGX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,100}$/u;
    let userNameResult = userNameREGX.test(userName);
    if(userNameResult == false)
    {
        alert('Votre pseudo est invalide !');
        return;
    }
    // Créer le joueur si il n'existe pas
    else if(localStorage.getItem(userName) === null){
        localStorage.setItem(userName, JSON.stringify({
            name : userName,
            games : 0, 
            victories : 0, 
            bestStreak : 0, 
            currentStreak : 0}));
        tableUser = JSON.parse(localStorage.getItem(userName));
        return tableUser;
    }
    // Récupérer le joueur si il existe
    else{
        tableUser = JSON.parse(localStorage.getItem(userName));
        return tableUser;
    }
}


// Récupérer le choix du joueur via le radio bouton checked
function choixJoueur() {
    const valeurChoixJoueur = document.querySelector('input[name=shifumi]:checked').value
    return valeurChoixJoueur 
} 


// Générer le choix de l'ordi via un random dans la liste des choix
function choixordi() {
    let listeChoixOrdi = ["pierre","feuille","ciseaux"]
    let valeurChoixOrdi = listeChoixOrdi[Math.floor(Math.random()*listeChoixOrdi.length)] 
    return valeurChoixOrdi
}


// Obtenir le résultat du match en comparant le choix du joueur et de l'ordi
function testResultatMatch(choixJoueur,choixOrdi) { 
    if (choixJoueur === choixOrdi) { 
        console.log(resultGameNul);
        return resultGameNul;
    }
    else if (choixJoueur === "pierre") {
        if (choixOrdi === "feuille"){
            return resultGamePerdu
        }
        else if (choixOrdi === "ciseaux"){
            return resultGameGagne
        }
    }
    else if (choixJoueur === "feuille") {
        if (choixOrdi === "ciseaux"){
            return resultGamePerdu
        }
        else if (choixOrdi === "pierre"){
            return resultGameGagne
        }
    }
    else if (choixJoueur === "ciseaux") {
        if (choixOrdi === "pierre"){
            return resultGamePerdu
        }
        else if (choixOrdi === "feuille"){
            return resultGameGagne
        }
    }
}

function actualiserScore(resultatMatch,utilisateur) { 
    console.log(resultatMatch);
    // Si l'utilisateur a perdu ou match nul on lui ajoute seulement une partie en plus et on réinitialise sa série en cours
    if(resultatMatch === resultGamePerdu || resultatMatch === resultGameNul){
        localStorage.setItem(utilisateur.name, JSON.stringify({
            name : utilisateur.name,
            games : utilisateur.games + 1, 
            victories : utilisateur.victories, 
            bestStreak : utilisateur.bestStreak, 
            currentStreak : 0}));
    }
    // Si l'utilisateur a gagné
    else if (resultatMatch === resultGameGagne){
        // Si l'utilisateur a gagné et que c'est sa meilleure série de victoire on actualise tout
        if (utilisateur.bestStreak === utilisateur.currentStreak){
            localStorage.setItem(utilisateur.name, JSON.stringify({
                name : utilisateur.name,
                games : utilisateur.games + 1, 
                victories : utilisateur.victories + 1, 
                bestStreak : utilisateur.currentStreak + 1, 
                currentStreak : utilisateur.currentStreak + 1}));

        }
        // Sinon on incrémente pas sa meilleure série
        else{
            localStorage.setItem(utilisateur.name, JSON.stringify({
                name : utilisateur.name,
                games : utilisateur.games + 1, 
                victories : utilisateur.victories + 1, 
                bestStreak : utilisateur.bestStreak, 
                currentStreak : utilisateur.currentStreak + 1}));

        }
    }

}


function afficherStats(utilisateur) { 
    
    // Récupération de l'utilisateuur à jour
    utilisateur = JSON.parse(localStorage.getItem(utilisateur.name));
    // Suppression du classement précédent
    let statsBox = document.getElementById("stats");
    if(statsBox.hasChildNodes()){
        while (statsBox.lastElementChild) {
            statsBox.removeChild(statsBox.lastElementChild);
        }
    }
    // Création du nouveau tableau de statistiques via un template
    var template = document.querySelector("#template-stats");
    var clone = document.importNode(template.content, true);
    var games = clone.querySelector("#stats-games");
    games.textContent = utilisateur.games
    var victories = clone.querySelector("#stats-victories");
    victories.textContent = utilisateur.victories
    var bestStreak = clone.querySelector("#stats-best-streak");
    bestStreak.textContent = utilisateur.bestStreak
    var currentStreak = clone.querySelector("#stats-current-streak");
    currentStreak.textContent = utilisateur.currentStreak
    
    // Ajout et affichage du tableau de statistiques
    statsBox.appendChild(clone)
}


function afficherResultat(resultatMatch,resultatChoixOrdi) { 
    // Récupérer l'icone à afficher
    let iconeOrdi = recupererIcone(resultatChoixOrdi);
    console.log(iconeOrdi);
    iconAdversaireBox.className = iconeOrdi; 

    // Ajout du texte du résultat
    matchResultBox.textContent = resultatMatch;
    // Colorisation du texte
    matchResultBox.style.color = "black" ;
    if (resultatMatch === resultGameGagne){
        matchResultBox.style.color = "green" ;
    }
    else if (resultatMatch === resultGamePerdu){
        matchResultBox.style.color = "red" ;
    }

    // Affichage du block
    resultBox.style.display = "block";

}

function recupererIcone(resultChoixOrdi) { 
    if (resultChoixOrdi === "pierre"){
        return 'fa-solid fa-hand-fist fa-3x'
    }
    else if(resultChoixOrdi === "feuille"){
        return 'fa-solid fa-hand fa-3x'
    }
    else if(resultChoixOrdi === "ciseaux"){
        return 'fa-solid fa-hand-scissors fa-3x'
    }
}


function actualiserClassement() {

    bestStreakTable()

}


function bestStreakTable() {

    // Récupérer toutes les utilisateurs et leurs stats
    let bestStreakTable = [];
    for(let i = 0; i < localStorage.length; i++){
        let tableUser = JSON.parse(localStorage.getItem(localStorage.key(i)));
        bestStreakTable.push({ name: localStorage.key(i), value: tableUser.bestStreak });
    }

    // Trier le tableau par leur meilleur série de victoires
    bestStreakTable.sort(function (b, a) {
        return a.value - b.value;
    });

    // Suppression de l'ancien classement
    if(classementBox.hasChildNodes()){
        while (classementBox.lastElementChild) {
            classementBox.removeChild(classementBox.lastElementChild);
        }
    }

    // Création de l'affichage du classement 
    var template = document.querySelector("#template-classement");
    var clone = document.importNode(template.content, true);
    var table = clone.querySelector("#classement_beststreak");

    // Création de chaque ligne
    for(let i = 0; i < bestStreakTable.length; i++){
        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = bestStreakTable[i].name;
        let value = document.createElement("td");
        value.textContent = bestStreakTable[i].value;
        row.appendChild(name);
        row.appendChild(value);
        table.appendChild(row);
    }
    classementBox.appendChild(clone)

}


