let question = document.querySelector(".question_current");
let propositions = document.querySelectorAll(".propo");
let explication = document.querySelector(".explication");
let url = "quiz.json";
let list_question = [];
let indexQuestionActuelle = 0;
let nuber_actu = document.querySelector(".nuber_actu");
let total = document.querySelector(".total");
let passer = document.querySelector(".passer");
let recommencer = document.querySelector(".btn-recommencer")

let victoire = 0;

// -------------------------------------
card_python= document.querySelector(".card-python");
card_java= document.querySelector(".card-java");
card_php= document.querySelector(".card-php");
card_js= document.querySelector(".card-js");
//console.log(card_python,card_js)

card_python.addEventListener("click", () => {
    url = "quiz_python.json";
    indexQuestionActuelle = 0;
    alert("Quiz Python sélectionné !");
});

card_java.addEventListener("click", () => {
    url = "quiz_java.json";
    indexQuestionActuelle = 0;
    alert("Quiz Java sélectionné !");
});
card_php.addEventListener("click", () => {
    url = "quiz_php.json";
    indexQuestionActuelle = 0;
    alert("Quiz PHP sélectionné !");
});

card_js.addEventListener("click", () => { 
    url = "quiz_php.json";
    indexQuestionActuelle = 0;
    alert("Quiz PHP sélectionné !");
});


//--------------------------------------

// const sonVictoire = new Audio('victoire.wav');
// sonVictoire.volume = 0.8;

// const sonDefaite = new Audio('defaite.wav');
// sonDefaite.volume = 0.6;

// function victoire() {
//     sonVictoire.play();
// }

// function defaite() {
//     sonDefaite.play();
// }




passer.addEventListener("click", () => {
    indexQuestionActuelle++;
    chargerQuestion(indexQuestionActuelle);
});

recommencer.addEventListener("click", ()=>{
    window.location.reload();
})


const timerElement = document.querySelector(".compteur");

function demarrerCompteARebours(secondes) {
    const miseAJour = () => {
        if (secondes > 0) {
            timerElement.textContent = secondes + " s";

            secondes--;

            setTimeout(miseAJour, 1000);
        } else {
            indexQuestionActuelle++;
            chargerQuestion(indexQuestionActuelle);

        }
    };
    miseAJour();
}





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
        console.log(victoire);
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



