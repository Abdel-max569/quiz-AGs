let question = document.querySelector(".question_current");
let propositions = document.querySelectorAll(".propo"); 
let explication = document.querySelector(".explication");
let url = "quiz.json";
let list_question = []; 
let indexQuestionActuelle = 0; 
fetch(url)
    .then(response => response.json())
    .then(data => {
        list_question = data; 
        chargerQuestion(indexQuestionActuelle); 
    });

function chargerQuestion(index) {
    if (index >= list_question.length) {
        question.textContent = "Le quiz est terminé !";
        propositions.forEach(prop => prop.style.display = 'none'); 
        return;
    }

    const currentQ = list_question[index];
    question.textContent = currentQ.question;
    explication.textContent = ""; 

    propositions.forEach((prop, i) => {
        prop.textContent = currentQ.options[i];
        prop.style.background = "#47acb9ff"; 
        prop.style.pointerEvents = "auto"; 
    });
}

function checkResponse(checkIndex) {
    const currentQ = list_question[indexQuestionActuelle];
    const correctIndex = currentQ.correctAnswerIndex;

    propositions.forEach(prop => prop.style.pointerEvents = "none");

    if (checkIndex === correctIndex) {
        propositions[checkIndex].style.background = "green";
    } else {
        propositions[checkIndex].style.background = "red";
        propositions[correctIndex].style.background = "green";
    }

    explication.textContent = currentQ.explication;

    setTimeout(() => {
        indexQuestionActuelle++;
        chargerQuestion(indexQuestionActuelle);
    }, 5000); 
}


propositions.forEach((propo, index) => {
    propo.addEventListener("click", () => {
        checkResponse(index);
    });
});



