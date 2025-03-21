const gameDiv = document.getElementById("game");
const sizeCaseWidth = 28;
const scoreHtml = document.getElementById("score");
const directions = {
    Haut: 0,
    Bas: 1,
    Droite: 2,
    Gauche: 3
};
let score = 0;
let pacmanCanEatGhost = false;
let intervalFantome = null;
let intervalPacman = null;
let currentDirectionPacman = directions.Gauche;

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

document.getElementById("Play").addEventListener("click", ()=> {
    stopPartie();
    creerPlateau();
});



function creerPlateau(){
    score = 0;
    gameDiv.innerHTML = "";
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
    intervalFantome = setInterval(deplacerFantomes, 500);

    intervalPacman = setInterval(DeplacerPacman, 500);

    document.addEventListener("keyup", onKeyupAction);
}

function onKeyupAction(event){
    switch(event.key){
        case "ArrowUp" :
            currentDirectionPacman = directions.Haut;
        break;
        case "ArrowRight" :
            currentDirectionPacman = directions.Droite;
        break;
        case "ArrowLeft" :
            currentDirectionPacman = directions.Gauche;
            break;
        case "ArrowDown" :
            currentDirectionPacman = directions.Bas;
        default : 
            break;
    };
    console.log(currentDirectionPacman);
}

function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numerocase='"+index+"']");
    return caseGame;
}

function DeplacerPacman(){
    let pacmanDiv = document.querySelector(".pacman");
    let pacManCase = pacmanDiv.dataset.numerocase;
    let caseDestination = null;
    caseDestination = getNumeroCaseDestination(pacManCase, currentDirectionPacman);

    if(caseDestination != null){
        if(checkDirectionMur(caseDestination)){
            pacmanDiv.classList.remove("pacman");
            pacmanDiv.dataset.direction = "";
            caseDestination.classList.add("pacman");
            caseDestination.dataset.direction = currentDirectionPacman;
            if(caseDestination.classList.contains("point-puissance")){
                //Pacman peut manger les fantômes
                caseDestination.classList.remove("point-puissance");
                pacmanCanEatGhost = true;
                gameDiv.classList.add("pacmanCanEatGhost");
                //au bout de 5 secondes, ne plus pouvoir manger de fantômes
                setTimeout(()=>{
                    pacmanCanEatGhost = false;
                    gameDiv.classList.remove("pacmanCanEatGhost");
                }, 5000);
            }
            if(!checkPacmanEatedByGhost(caseDestination)){
                checkPointEating(caseDestination);
            }
        }
        else{
            pacmanDiv.dataset.direction = currentDirectionPacman;
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

function checkPacmanEatedByGhost(caseToCheck){
    let containsPacman = caseToCheck.classList.contains("pacman");
    let containsGhost = caseToCheck.classList.contains("fantome");

    if(containsPacman && containsGhost)
    {
        if(pacmanCanEatGhost){
            caseToCheck.classList.remove("fantome");
        }
        else{
            stopPartie();
            alert("PERDU !!!");
        }
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
        stopPartie();
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
        let fantomeCaseId = fantome.dataset.numerocase;


        let allDirectionsPossibles = [
            directions.Haut,
            directions.Bas,
            directions.Gauche,
            directions.Droite
        ];

        let allGoodDirections = [];

        allDirectionsPossibles.forEach(direction => {
            let isPossible = true
            let casePossible = getNumeroCaseDestination(fantomeCaseId, direction)
            if(!checkDirectionMur(casePossible)){
                isPossible = false;
            }
            if(CheckFantomeCollision(casePossible)){
                isPossible = false;
            }

            if(isPossible){
                allGoodDirections.push(direction);
            }
        });

        if(allGoodDirections.length > 1){
            //Plusieurs direction possible, j'élimine celle qui ne va pas avec previous directrion
            let previousDirection = fantome.dataset.previousDirection;
            
            allGoodDirections.forEach(goodDirection =>  {
                if(!CheckFantomeNotGoBack(parseInt(previousDirection), goodDirection)){
                    const index = allGoodDirections.indexOf(goodDirection);
                    if (index > -1) { // only splice array when item is found
                        allGoodDirections.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }
            });
        }

        //J'ai un tableau allGoodDirection, qui contiens toutes les bonnes directions possibles
        //Il en faut une au hasard
        let elementOfTable = getRandomNumber(allGoodDirections.length);
        let direction = allGoodDirections[elementOfTable];
        caseDestination = getNumeroCaseDestination(fantomeCaseId, direction);

        fantome.classList.remove("fantome");
        fantome.removeAttribute("data-previous-direction");
        caseDestination.classList.add("fantome");
        caseDestination.dataset.previousDirection = direction;
        checkPacmanEatedByGhost(caseDestination);
        goodDirectionFinded = true;
    });
}

function CheckFantomeNotGoBack(previousDirection, direction){
    let canMove = false;
    
    switch(previousDirection){
        case directions.Haut:
            direction == directions.Bas ? canMove = false : canMove = true;
            break;
        case directions.Bas:
            direction == directions.Haut ? canMove = false : canMove = true;
            break;
        case directions.Gauche:
            direction == directions.Droite ? canMove = false : canMove = true;
            break;
        case directions.Droite:
            direction == directions.Gauche ? canMove = false : canMove = true;
            break;
        default:
            canMove = true;
    }
    return canMove;
}

function getNumeroCaseDestination(caseActuelle, direction){
    let caseDestination = null;
    let directionInt = parseInt(direction);
    let caseActuelleInt = parseInt(caseActuelle);
    if(caseActuelleInt == 364 && direction == directions.Gauche){
        caseDestination =  getCaseByIndex(caseActuelleInt + 27)
    }
    else if(caseActuelleInt == 391 && direction == directions.Droite){
        caseDestination = getCaseByIndex(caseActuelleInt - 27)
    }
    else{
        switch(directionInt){
            case directions.Haut :
                //Déplacer la case contenant pacman de 1 vers le haut
                caseDestination =  getCaseByIndex(caseActuelleInt - sizeCaseWidth);
            break;
            case directions.Droite :
                //Déplacer la case contenant pacman de 1 vers la droite
                caseDestination =  getCaseByIndex(caseActuelleInt + 1);
            break;
            case directions.Gauche :
                //Déplacer la case contenant pacman de 1 vers la gauche
                caseDestination =  getCaseByIndex(caseActuelleInt - 1);
            break;
            case directions.Bas :
                caseDestination =  getCaseByIndex(caseActuelleInt + sizeCaseWidth);
            default : 
                break;
        };
    }
    
    return caseDestination;
}

//Supprimer les écouteurs d'évènements pour déplacer pacman
//OK Arrêter le déplacement des fantômes
function stopPartie(){
    if(intervalFantome != null){
        clearInterval(intervalFantome);
    }
    if(intervalPacman != null){
        clearInterval(intervalPacman);
    }

    document.removeEventListener("keyup", onKeyupAction);
}
