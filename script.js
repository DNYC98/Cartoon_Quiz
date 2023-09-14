//  QUIZ CLASS TO KEEP THINGS ORGANIZED 
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex = function() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        } else {
            quizTime -= 60;
        }
        this.questionIndex++;
    }
    
    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i], quiz);
        }

        showProgress();
    }
};

// GUESS ANSWER

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "What song do Timon and Pumba teach Simba in the “The Lion King?”", ["You got a friend in me", "Life is a highway", "Let it go", "Hakuna Matata"], "Hakuna Matata"
    ),
    new Question(
        "What animals raised Tarzan?", ["Wolfs", "Bears", "Gorillas", "Penguins"], "Gorillas"
    ),
    new Question(
        "What is the name of the fictional city in the film “Monsters, Inc.?", ["Monstropolis", "Salt Lake", "Arizona", "Las vegas"], "Monstropolis"
    ),
    new Question(
        "What is the name of Disneys first African-American princess?", ["Tiana", "SnowWhite", "Elsa", "Ariel"], "Tiana"
    ),
    new Question(
        "What type of animal is Winnie the Pooh", ["Bird", "Wolf", "Bear", "Elephant"], "Bear"
    )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// CountDown for the Quiz
let time = 5;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            if (quizTime <= 3) {
                counting.className = 'timer-danger';
            } else if (quizTime <= 2) {
                counting.className = 'timer-warning';
            } else {
                counting.className = 'timer-normal';
            }

            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();