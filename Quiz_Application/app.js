// Create array of object. which store question, four options and correct answer.
const questions = [
    {
        question: "In which year did MS Dhoni make his ODI debut?",
        answers:[
            { text: "2003", correct: false},
            { text: "2004", correct: true},
            { text: "2005", correct: false},
            { text: "2002", correct: false},
        ]
    },
    {
        question: "Which Indian state was MS Dhoni born in?",
        answers:[
            { text: "Uttar Pradesh", correct: false},
            { text: "Gujarat", correct: false},
            { text: "Bihar", correct: true},
            { text: "Karnataka", correct: false},
        ]
    },
    {
        question: "What was MS Dhoni's job before becoming a professional cricketer?",
        answers:[
            { text: "Teacher", correct: false},
            { text: "Police Officer", correct: false},
            { text: "Banker", correct: false},
            { text: "Travelling Ticket Examiner", correct: true},
        ]
    },
    {
        question: "How many ICC trophies has MS Dhoni won as a captain?",
        answers:[
            { text: "3", correct: true},
            { text: "4", correct: false},
            { text: "5", correct: false},
            { text: "2", correct: false},
        ]
    },
    {
        question: "Which civilian award did MS Dhoni receive from the Government of India in 2018?",
        answers:[
            { text: "Padma Vibhushan", correct: false},
            { text: "Padma Shri", correct: false},
            { text: "Padma Bhushan", correct: true},
            { text: "Bharat Ratna", correct: false},
        ]
    },
    {
        question: "In the Indian Premier League, MS Dhoni captained which team?",
        answers:[
            { text: "Chennai Super Kings", correct: true},
            { text: "Deccan Chargers", correct: false},
            { text: "Rajasthan Royals", correct: false},
            { text: "Delhi Daredevils", correct: false},
        ]
    },
    {
        question: "What is MS Dhoni's honorary rank in the Indian Territorial Army?",
        answers:[
            { text: "Captain", correct: false},
            { text: "Lieutenant Colonel", correct: true},
            { text: "Major", correct: false},
            { text: "Colonel", correct: false},
        ]
    },
    {
        question: "How many times has MS Dhoni led Chennai Super Kings to IPL victory?",
        answers:[
            { text: "6", correct: false},
            { text: "4", correct: false},
            { text: "5", correct: true},
            { text: "3", correct: false},
        ]
    },
    {
        question: "Against which team did MS Dhoni make his Test debut?",
        answers:[
            { text: "Pakistan", correct: false},
            { text: "South Africa", correct: false},
            { text: "Australia", correct: false},
            { text: "Sri Lanka", correct: true},
        ]
    },
    {
        question: "What is MS Dhoni's batting style?",
        answers:[
            { text: "Switch-hitter", correct: false},
            { text: "Left-handed", correct: false},
            { text: "Ambidextrous", correct: false},
            { text: "Right-handed", correct: true},
        ]
    },
];

// This array store user answer to evalute score and feedback 
let feedbackAns =[];

// To display questions
const questionElement = document.getElementById("question");

// To display options
const answerButtons  = document.getElementById("answerButtons");

// hide and unhide 'Next' button
const nextButton = document.getElementById("nextBtn");

// Get question h1 tag to display Question number.
const questionNumber = document.getElementById("questionNo");

// get score h1 tag to display live update score
const scoreDisplay = document.getElementById("score");

// start button from introduction page
const startBtn = document.getElementById("startBtn");

// introduction Section
const introduction = document.getElementById("introductionSection");

//Quiz Application Container
const quizAppContainer = document.getElementById("quizAppContainer");
// default display none to Quiz container
quizAppContainer.style.display = "none";

const scoreText = document.getElementById("scoreText");
// declaring Score and Question Index
let currentQuestionIndex = 0;
let score = 0;


// When user click start button, it hide Introduction container and unhide Quiz Application container.
startBtn.addEventListener("click", ()=>{
    introduction.style.display = "none";
    quizAppContainer.style.display = "flex";
    startQuiz();
});


// start the quiz and initiate zero to the question index and score.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    console.log("Start Quizz");
}

// Display Question and options
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    // display question no.
    questionNumber.innerHTML = 'Question ' + questionNo + ' of '+ questions.length;
    
    // initialing score card display
    if(score==0){
    // display score text
    scoreText.innerHTML = 'Score: '
    // display score zero
    scoreDisplay.innerHTML = score;
    }

    // Display Question
    questionElement.innerHTML = currentQuestion.question; //questionNo + ". " +

    // This loop add options button
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
            console.log( button.dataset.correct);
        }
        button.addEventListener("click", selectionAnswer)
    });
}

// ResetState function Remove all option buttons and hide the next button.
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// check if user select correct option or not and disabled buttons.
function selectionAnswer(e){
    const selectedBtn = e.target;
    
    feedbackAns.push(selectedBtn.innerText);        // storing user inputs in an array for generator feedback.
    // console.log(selectedBtn.innerText);
    // console.log(e.target);
    if(selectedBtn.dataset.correct === "true"){
        selectedBtn.classList.add("correct");       // add class that changes the background colour to green
        score++;                                    // increment score
        // display score
        scoreDisplay.innerHTML = score;
    }else{
        selectedBtn.classList.add("incorrect");     // add class that changes the background colour to red
    }

    Array.from(answerButtons.children).forEach(button => {      // If the user selects wrong answer, Only the 'incorrect' class is added, but the application also
        if(button.dataset.correct === "true"){                  //  shows which option is correct by adding the 'correct' class and disabled buttons (options).
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";             // After the user selects the option, The next button will show.
}

// report btn, default display none 
const report = document.getElementById("report");

// Score Card, Display user scored and feedback
function showScore(){
    resetState();
    // Remove Question No and Score from card
    questionNumber.innerHTML = '';
    scoreDisplay.innerHTML = '';
    scoreText.innerHTML = '';
    // Display score
    questionNumber.innerHTML = `You Scored ${score} out of ${questions.length}`;

    // feedback base on score.
    if(score==questions.length){
        questionElement.innerHTML = "Excellent job! You're a true MS Dhoni enthusiast. Congratulations on a perfect score!";
    }else if(score>questions.length/2 && score<questions.length){
        questionElement.innerHTML = "Well done! You're knowledgeable about MS Dhoni. Keep up the great work!";
    }else if(score>questions.length/2 -1 && score<=questions.length/2 ){
        questionElement.innerHTML = "Good effort! You're on the right track. Keep practicing to enhance your understanding.";
    }else if(score<=questions.length/2 -1 ){
        questionElement.innerHTML = "Keep exploring! You're just getting started. Try again to improve your knowledge.";
    }
    
    // unhide the report btn & restart btn
    report.style.display = "block";
    nextButton.innerText = 'Restart';
    nextButton.style.display = "block"
    let parent = nextButton.parentElement;
    parent.classList.add("nextCenter");

    // calling feedback report function, to be ready before user click report btn
    result();
}

// When user click the report button, unhide the feedback container.
const feedback = document.getElementById("feedback");
report.addEventListener("click", ()=>{
    quizAppContainer.style.marginTop = "2rem"
    feedback.style.display = "block";
});


// This function handles the next button, which displays the next question or score card.
function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// If the question index is less than the array of questions length, it means handle next button function will execute or start the quiz from the beginning.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        startQuiz();
        resetFeedback();
    }
});

// Remove feedback container children
function resetFeedback(){
    feedbackAns =[];                        //Remove all user inputs from array
    report.style.display = "none"           //hide report btn
    feedback.style.display = "none";        //hide feedback container
    while(feedbackContainer.firstChild){
        feedbackContainer.removeChild(feedbackContainer.firstChild);
    }
    quizAppContainer.style.marginTop = "auto"
}

// feedback
const feedbackContainer = document.getElementById("feedbackContainer");

function result(){
    // Question Number
    let questionCount = 0;

    // Loop array of objects question and options
    questions.forEach(obj =>{
        const questionDisplayTag = document.createElement("h2");                //Create <h2> tag, set inner text question No and question, and lastly append child to Feedback Container. 

        questionDisplayTag.style.marginTop = "1rem";
        questionDisplayTag.innerHTML = questionCount + 1+'. ' +obj.question;
        feedbackContainer.appendChild(questionDisplayTag);

        // Loop four options
        obj.answers.forEach(answer =>{
            const option = document.createElement("p");                       //Create the <p> tag, set the options text, and add the class 'correct' or 'incorrect'.
            option.innerHTML = answer.text;
            option.classList.add("answer");                                    //add button style class 

            if(feedbackAns[questionCount] === answer.text && answer.correct === true){
                option.classList.add("correct");
            }
            if(feedbackAns[questionCount] === answer.text && answer.correct === false){
                option.classList.add("incorrect");
            }else if(answer.correct === true){
                option.classList.add("correct");
            }
            
            feedbackContainer.appendChild(option);
        });
        questionCount++;     //Increment Question No.
    });
}