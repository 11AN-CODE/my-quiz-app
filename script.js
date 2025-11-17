const questions=[{
    'question':"Which is the larget animal in the world?😹",
    "answers":[
        
        {"answer":"Blue Whale",correct:true},
        {"answer":"Giraffe",correct:false},
        {"answer":"Elephant",correct:false},
        {"answer":"Shark",correct:false},

    ]

},

    {
    'question':"Which is the smallest animal in the world?😹",
    "answers":[
        
        {"answer":"Ant",correct:true},
        {"answer":"Snail",correct:false},
        {"answer":"Rabbit",correct:false},
        {"answer":"Snake",correct:false},

    ]

},
{
    'question':"Which is the smallest continent in the world?🌐",
    "answers":[
        
        {"answer":"Australia",correct:true},
        {"answer":"Africa",correct:false},
        {"answer":"Asia",correct:false},
        {"answer":"Arctic",correct:false},
    ]

},

];
const questionElement=document.querySelector("#question");
const answerButtons=document.querySelector("#answer-buttons");
const nextButton=document.querySelector("#next-btn");

let currentquestionIndex=0;
let score=0;

function startQuiz(){
    currentquestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();
}

function showquestion() {
    resetState();
    let currentQuestion = questions[currentquestionIndex];
    let questionNo = currentquestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(ans => { // Loop variable is 'ans'
        const button = document.createElement("button");
        button.innerHTML = ans.answer;
        button.classList.add("btn");
        
        // FIX: Change 'answer.correct' to 'ans.correct'
        if (ans.correct) {
            button.dataset.correct = ans.correct; // FIX: Change 'answer.correct' to 'ans.correct'
        }
        
        answerButtons.appendChild(button);
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");

        }
        button.disabled="true";
    });
    nextButton.style.display="block";

}


function showscore(){
    resetState();
    questionElement.innerHTML=`You score ${score} out of ${questions.length}`
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentquestionIndex++;
    if(currentquestionIndex<questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentquestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();