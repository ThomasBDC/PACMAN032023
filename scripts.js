const gameDiv = document.getElementById("game");
const sizeCaseWidth = 28;
const scoreHtml = document.getElementById("score");
let score = 0;
/*
OK Créer le plateau (dynamique)
OK Créer notre pacman
OK Gérer ses déplacements (sans contrainte)
OK Contraintes de déplacement (pas dans les murs)
OK Pièces à manger
OK  Générer les fantômes
Déplacer les fantômes : Moyen, en aléatoire, déplacement pas top
Gérer collision pacman et un fantome
Gérer les power-pellet (un mode ou pacman peut manger un fantome)
*/

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

creerPlateau();

document.addEventListener("keyup", (event) =>{
    DeplacerPacman(event.key);
});

function creerPlateau(){
    let cptCase = 0;
    scoreHtml.innerHTML = score;
    layout.forEach(caseLayout => {
        let casePlateau = document.createElement("div");
        casePlateau.dataset.numerocase = cptCase;
        switch(caseLayout){
            case 0 :
                casePlateau.classList.add("point");
                break;
            case 1 :
                casePlateau.classList.add("mur");
                break;
            case 2 :
                casePlateau.classList.add("fantome-area");
                break;
            case 3 :
                casePlateau.classList.add("point-puissance");
                break;
            case 4 :
                
                break;
        }
        gameDiv.appendChild(casePlateau);
        cptCase++;
    });
    
    getCaseByIndex(489).classList.add("pacman");
    generateFantome();

    //Déplacement fantome aleatoire
    setInterval(deplacerFantomes, 1000)

}

function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numerocase='"+index+"']");
    return caseGame;
}

function DeplacerPacman(direction){
    let pacmanDiv = document.querySelector(".pacman");
    let pacManCase = pacmanDiv.dataset.numerocase;
    let caseDestination = null;
    switch(direction){
        case "ArrowUp" :
            //Déplacer la case contenant pacman de 1 vers le haut
            caseDestination = getNumeroCaseDestination(pacManCase, directions.Haut);
        break;
        case "ArrowRight" :
            //Déplacer la case contenant pacman de 1 vers la droite
            caseDestination = getNumeroCaseDestination(pacManCase, directions.Droite);
        break;
        case "ArrowLeft" :
            //Déplacer la case contenant pacman de 1 vers la gauche
            caseDestination = getNumeroCaseDestination(pacManCase, directions.Gauche);
            break;
        case "ArrowDown" :
            caseDestination = getNumeroCaseDestination(pacManCase, directions.Bas);
        default : 
            break;
    };
    if(caseDestination != null){
        if(checkDirectionMur(caseDestination)){
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman");
            checkPointEating(caseDestination)
        }
    }
}

//return faux si je peux pas aller la où je veux
//return vrai si je peux
function checkDirectionMur(caseDestination)
{
    if(caseDestination.classList.contains("mur")){
        return false;
    }
    else{
        
        return true;
    }
}

//return true si on est en collision avec un fantome
function CheckFantomeCollision(caseDestination)
{
    if(caseDestination.classList.contains("fantome")){
        return true;
    }
    else{
        
        return false;
    }
}

function checkPointEating(caseDestination){
    if(caseDestination.classList.contains("point")){
        incrementScore();
        caseDestination.classList.remove("point");
    }
}

function incrementScore(){
    score++;
    scoreHtml.innerHTML = score;
    let allpoints = layout.filter(l=> l==0);
    if(score == allpoints.length){
        alert("C'est gagné");
    }
}

function generateFantome(){
    for(let i=0; i<4; i++){
        //Je récupère les cases qui peuvent supporter la génération d'un fantôme
        //elles ont la classe fantome-area, et n'ont pas la classe fantome
        let casePotentialForFantome = document.querySelectorAll(".fantome-area:not(.fantome)");

        //Parmis les cases dispo, j'en prends une au hasard
        let caseForFantome = casePotentialForFantome[getRandomNumber(casePotentialForFantome.length)];

        //J'ajoute la classe fantome à mon fantome
        caseForFantome.classList.add("fantome");
    }
}

function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}

function deplacerFantomes(){
    //Récupérer tous mes fantômes
    let allFantomes = document.querySelectorAll(".fantome");
    allFantomes.forEach(fantome =>  {
        let goodDirectionFinded = false;

        while(!goodDirectionFinded){
            let direction = getRandomNumber(4);
            let fantomeCaseId = fantome.dataset.numerocase;
            console.log(direction);
            switch(direction){
                case 0 ://haut
                    caseDestination = getNumeroCaseDestination(fantomeCaseId, directions.Haut);
                    break;
                case 1 ://bas
                    caseDestination = getNumeroCaseDestination(fantomeCaseId, directions.Bas);
                break;
                case 2 ://gauche
                    caseDestination = getNumeroCaseDestination(fantomeCaseId, directions.Gauche);
                    break;
                case 3 ://droite
                    caseDestination = getNumeroCaseDestination(fantomeCaseId, directions.Droite);
                break;
            }
            
            //Vérifier si je peux aller dans cette direction (pas un mur)
            if(checkDirectionMur(caseDestination) && !CheckFantomeCollision(caseDestination)){
                fantome.classList.remove("fantome");
                caseDestination.classList.add("fantome");
                goodDirectionFinded = true;
            }   
        }
    });
}

function getNumeroCaseDestination(caseActuelle, direction){
    let caseDestination = null;
    switch(direction){
        case directions.Haut :
            //Déplacer la case contenant pacman de 1 vers le haut
            caseDestination =  getCaseByIndex(parseInt(caseActuelle) - sizeCaseWidth);
            
        break;
        case directions.Droite :
            //Déplacer la case contenant pacman de 1 vers la droite
            caseDestination =  getCaseByIndex(parseInt(caseActuelle) + 1);
        break;
        case directions.Gauche :
            //Déplacer la case contenant pacman de 1 vers la gauche
            caseDestination =  getCaseByIndex(parseInt(caseActuelle) - 1);
        break;
        case directions.Bas :
            caseDestination =  getCaseByIndex(parseInt(caseActuelle) + sizeCaseWidth);
        default : 
            break;
    };
    return caseDestination;
}

const directions = {
    Haut: 1,
    Bas: 2,
    Droite: 3,
    Gauche: 4
};