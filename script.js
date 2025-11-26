let question = document.querySelector(".question_current");
let propositions = document.querySelectorAll(".propo");
let explication = document.querySelector(".explication");
let url = "";
let list_question = [];
let indexQuestionActuelle = 0;
let nuber_actu = document.querySelector(".nuber_actu");
let total = document.querySelector(".total");
let passer = document.querySelector(".passer");
let recommencer = document.querySelector(".btn-recommencer")

let victoire = 0;

// -------------------------------------
card_all = document.querySelector(".card-all");
card_python= document.querySelector(".card-python");
card_java= document.querySelector(".card-java");
card_php= document.querySelector(".card-php");
card_js= document.querySelector(".card-js");

let principal = document.querySelector(".principal");
let container = document.querySelector(".container");
// console.log(container);

function chargerDonneesQuiz() {
    if (url === "") {
        return; 
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            list_question = data;
            total.textContent = list_question.length;
            chargerQuestion(indexQuestionActuelle);
        })
}

function putPrincipalNone(){
    principal.style.display="none";
}

function putQuizBlock(){
    container.style.display="block";
}

card_all.addEventListener("click", () => {
    url = "quiz.json";
    indexQuestionActuelle = 0;
    chargerDonneesQuiz()
    putPrincipalNone()
    putQuizBlock()
    
});
card_python.addEventListener("click", () => {
    url = "python.json";
    indexQuestionActuelle = 0;
    chargerDonneesQuiz()
    putPrincipalNone()
    putQuizBlock()
});

card_java.addEventListener("click", () => {
    url = "java.json";
    indexQuestionActuelle = 0;
    chargerDonneesQuiz()
    putPrincipalNone()
    putQuizBlock()
    
});
card_php.addEventListener("click", () => {
    url = "php.json";
    indexQuestionActuelle = 0;
    chargerDonneesQuiz()
    putPrincipalNone()
    putQuizBlock()
  
});

card_js.addEventListener("click", () => { 
    url = "js.json";
    indexQuestionActuelle = 0;
    chargerDonneesQuiz()
    putPrincipalNone()
    putQuizBlock()
});


//----------------SONG----------------------
// const sonVictoire = new Audio('victoire.mp3');
// sonVictoire.volume = 0.8;

// const sonDefaite = new Audio('defaite.wav');
// sonDefaite.volume = 0.6;

// function victoire1() {
//     try {
//         sonVictoire.currentTime = 0; 
//         sonVictoire.play();
//     } catch (error) {
//         console.error("Erreur lors de la lecture du son de victoire:", error);
//     }
// }
// function defaite() {
//     sonDefaite.play();
// }

//----------------END SONG-----------





//----------------PASSER-RECOMMENCER-----------
passer.addEventListener("click", () => {
    indexQuestionActuelle++;
    chargerQuestion(indexQuestionActuelle);
});

recommencer.addEventListener("click", ()=>{
    window.location.reload();
})
//----------------PASSER-RECOMMENCER-----------





//-------------------------TIME-----------------------
// const timerElement = document.querySelector(".compteur");

// function demarrerCompteARebours(secondes) {
//     const miseAJour = () => {
//         if (secondes > 0) {
//             timerElement.textContent = secondes + " s";

//             secondes--;

//             setTimeout(miseAJour, 1000);
//         } else {
//             indexQuestionActuelle++;
//             chargerQuestion(indexQuestionActuelle);

//         }
//     };
//     miseAJour();
// }

//-------------------------TIME-----------------------



//

fetch(url)
    .then(response => response.json())
    .then(data => {
        list_question = data;
        total.textContent = list_question.length;
        chargerQuestion(indexQuestionActuelle);
    });

function chargerQuestion(index) {
    //demarrerCompteARebours(10);
    if (index >= list_question.length) {
        question.textContent = "Le quiz est terminé !";
        propositions.forEach(prop => prop.style.display = 'none');
        explication.textContent = "nombre de victoire "+victoire; 
        return;
    }
    nuber_actu.textContent = index + 1;

    const currentQ = list_question[index];
    question.textContent = currentQ.question;
    explication.textContent = "";

    propositions.forEach((prop, i) => {
        prop.textContent = currentQ.options[i];
        prop.style.background = "#a79d10ff";
        prop.style.pointerEvents = "auto";
    });
}

function checkResponse(checkIndex) {
   
    const currentQ = list_question[indexQuestionActuelle];
    const correctIndex = currentQ.correctAnswerIndex;

    propositions.forEach(prop => prop.style.pointerEvents = "none");

    if (checkIndex === correctIndex) {
        propositions[checkIndex].style.background = "green";
        victoire++
        //console.log(victoire);
        victoire1()
    } else {
        propositions[checkIndex].style.background = "red";
        propositions[correctIndex].style.background = "green";
    }

    explication.textContent = currentQ.explication;

    setTimeout(() => {
        indexQuestionActuelle++;
        chargerQuestion(indexQuestionActuelle);
    }, 7000);
}


propositions.forEach((propo, index) => {
    propo.addEventListener("click", () => {
        checkResponse(index);
    });
});



