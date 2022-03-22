
let resultGamePerdu = "Perdu !";
let resultGameGagne = "Gagné !";
let resultGameNul = "Match nul";
let timeTimeout = 1000;


function jouer()
{   
    // Récupération des informations du joueur
    let userName = document.getElementById("pseudo").value;


    // Vérifier, créer ou récupérer le joueur
    
    let userNameREGX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,100}$/u;
    let userNameResult = userNameREGX.test(userName);
    let tableUser;
    if(userNameResult == false)
    {
        alert('Votre pseudo est invalide !');
        return;
    }
    else if(localStorage.getItem(userName) === null){
        localStorage.setItem(userName, JSON.stringify({games : 0, victories : 0, bestStreak : 0, currentStreak : 0}));
        tableUser = JSON.parse(localStorage.getItem(userName));
        console.log(tableUser);
        console.log(tableUser.bestStreak);
    }
    else{
        tableUser = JSON.parse(localStorage.getItem(userName));
        console.log(tableUser);
        console.log(tableUser.bestStreak);
    }

    // Récupération des informations du choix du joueur
    let resultBox = document.getElementById("result_box");
    let choixButtons = document.getElementsByName("shifumi");

    // Vérification du choix du joueur
    for(var i = 0; i < choixButtons.length; i++){
        if(choixButtons[i].checked){
        choixPlayer = choixButtons[i].value;
        }
    }

    // Choix de l'adversaire
    let choixList = ["pierre", "papier", "ciseaux"];
    let choixComputer = choixList[Math.floor(Math.random()*choixList.length)];

    // Choix de l'icone de l'adversaire
    let choixComputerIcon;
    if(choixComputer === "pierre")
    {
        choixComputerIcon = '<i class="fa-solid fa-hand-fist fa-3x"></i>'; 
    }
    else if(choixComputer === "papier")
    {
        choixComputerIcon = '<i class="fa-solid fa-hand fa-3x"></i>';
    }
    else if(choixComputer === "ciseaux")
    {
        choixComputerIcon = '<i class="fa-solid fa-hand-scissors fa-3x"></i>';
    }

    // Test du résultat du match
    test(choixComputer); 

    // Incrémentation du score
    if(resultGame === "Perdu !"){
        let newTableUser = localStorage.setItem(userName, JSON.stringify({games : tableUser.games + 1, victories : tableUser.victories, bestStreak : tableUser.bestStreak, currentStreak : 0}));
    }
    else if (resultGame === "Gagné !"){
        if (tableUser.bestStreak === tableUser.currentStreak){
            let newTableUser = localStorage.setItem(userName, JSON.stringify({games : tableUser.games + 1, victories : tableUser.victories + 1, bestStreak : tableUser.currentStreak + 1, currentStreak : tableUser.currentStreak + 1}));

        }
        else{
            let newTableUser = localStorage.setItem(userName, JSON.stringify({games : tableUser.games + 1, victories : tableUser.victories + 1, bestStreak : tableUser.bestStreak, currentStreak : tableUser.currentStreak + 1}));

        }

    }
    else if (resultGame === "Match nul"){
        let newTableUser = localStorage.setItem(userName, JSON.stringify({games : tableUser.games + 1, victories : tableUser.victories, bestStreak : tableUser.bestStreak, currentStreak : 0}));
    }
    
    // Création du tableau de stats
    let newTableUser = JSON.parse(localStorage.getItem(userName));
    let statsTable = "<h1>STATISTIQUES</h1><table><tr><td>Parties jouées</td><td>"+newTableUser.games+"</td></tr><tr><td>Victoires</td><td>"+newTableUser.victories+"</td></tr><tr><td>Meilleure série</td><td>"+newTableUser.bestStreak+"</td></tr><tr><td>Série en cours</td><td>"+newTableUser.currentStreak+"</td></tr></table>";
    stats.innerHTML = statsTable;

    // Insertion du choix de l'adversaire et du résultat
    message.innerHTML = "Votre adversaire a joué ...";
    adversaire.innerHTML = choixComputerIcon;
    result.innerHTML = resultGame;

    // Colorisation du texte
    result.style.color = "black" ;
    if (resultGame === resultGameGagne){
        result.style.color = "green" ;
    }
    else if (resultGame === resultGamePerdu){
        result.style.color = "red" ;
    }

    // Affichage du block
    resultBox.style.display = "block";


    // Actualiser le classement
    // let classementBox = document.getElementById("classement");
    // for(var i = 0; i < 3; i++){
    //     if(choixButtons[i].checked){
    //     choixPlayer = choixButtons[i].value;
    //     }
    // }


}




// Test du résultat du match
function test(choixComputer)
{
    if(choixPlayer === choixComputer){
        resultGame = resultGameNul;
    }
    else if(choixPlayer === "pierre"){
        if (choixComputer === "ciseaux"){
            resultGame = resultGameGagne;
        }
        if (choixComputer === "papier"){
            resultGame = resultGamePerdu;
        }
    }
    else if(choixPlayer === "papier"){
        if (choixComputer === "pierre"){
            resultGame = resultGameGagne;
        }
        if (choixComputer === "ciseaux"){
            resultGame = resultGamePerdu;
        }
    }
    else if(choixPlayer === "ciseaux"){
        if (choixComputer === "papier"){
            resultGame = resultGameGagne;
        }
        if (choixComputer === "pierre"){
            resultGame = resultGamePerdu;
        }
    }
    return resultGame;

}
