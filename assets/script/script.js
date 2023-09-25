let score = 0;
const correctAnswers = ["q1a", "q2d", "q3d", "q4a", "q5a", "q6b", "q7b", "q8b", "q9a", "q10c"];
let questions = document.querySelectorAll('[id*="question"]');
const start = document.getElementById("start-test");
const startContainer = document.getElementById("start");
let currentQuestion = 1;
let previousQuestion = 0;
const timer = document.getElementById("timer");
let timeLeft = 200;
const timerContainer = document.querySelector(".timer-container");
const timesUp = document.getElementById("time-up");
const allDone = document.getElementById("end");
const nextQuestionButtons = document.querySelectorAll(".button-question");
const retakeTest = document.getElementById("retake-test");
const submitScore = document.getElementById("submit-score");
const allScores = document.getElementById("high-score");
let highScores = [];
let isCorrect = false;

document.getElementById("view-high-scores").addEventListener("click", () => {
    retrieveHighScore();
    endTest();
    allDone.classList.add("hidden");
    allScores.classList.remove("hidden");
    startContainer.classList.add("hidden");
    timerContainer.classList.add("timer-hidden");
    timeLeft = 0;
});

document.getElementById("start-over").addEventListener("click", restart);

submitScore.addEventListener("click", updateHighScore);

retakeTest.addEventListener("click", restart);

start.addEventListener("click", startTest);

nextQuestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        checkQuestion(button);
        if (isCorrect) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        setTimeout(() => {
            nextQuestion();
            button.classList.remove("correct");
            button.classList.remove("wrong");
        }, 500);
    });
});
function startTest() {
    startContainer.classList.add("hidden");
    questions[0].classList.remove("hidden");
    timerContainer.classList.remove("timer-hidden");
    timeLeft = 200;
    startTimer();
}

function nextQuestion() {
    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.remove("hidden");

        console.log(currentQuestion);
    }
    if (currentQuestion != 0) {
        currentQuestion++;

        hideQuestion();
    }
}

function startTimer() {
    timer.innerHTML = timeLeft;
    if (!allScores.classList.contains("hidden")) {
        return;
    } else if (timeLeft <= 0 || currentQuestion === 11) {
        timerContainer.classList.add("timer-hidden");
        endTest();
    } else {
        timeLeft--;
        setTimeout(startTimer, 1000);
    }
}

function endTest() {
    for (let i = 0; i < questions.length; i++) {
        questions[i].classList.add("hidden");
    }
    allDone.classList.remove("hidden");
    document.getElementById("user-score").innerHTML = score;
}

function hideQuestion() {
    if (currentQuestion !== previousQuestion) {
        questions[previousQuestion].classList.add("hidden");
        previousQuestion++;
    }
    if (currentQuestion === 11) {
        endTest();
    }
}

function checkQuestion(e) {
    isCorrect = false;
    if (currentQuestion < 10) {
        for (let i = 0; i < correctAnswers.length; i++) {
            if (e.id === correctAnswers[i]) {
                isCorrect = true;
            }
        }
        if (isCorrect) {
            score++;
        }
        if (!isCorrect) {
            timeLeft = timeLeft - 20;
        }
    }
}

function restart() {
    currentQuestion = 1;
    previousQuestion = 0;
    score = 0;
    allDone.classList.add("hidden");
    allScores.classList.add("hidden");

    startTest();
}

function updateHighScore() {
    let name = document.getElementById("score").value.trim();
    if (name === "") {
        alert("Please enter your initials");
    } else {
        let newHighScore = { [name]: score };
        retrieveHighScore(newHighScore);
        allDone.classList.add("hidden");
        allScores.classList.remove("hidden");
    }
}

function retrieveHighScore(e) {
    highScores = [];
    let highScoreList = document.getElementById("scores");
    let retrievedScores = localStorage.getItem("highScores");

    if (!retrievedScores && !e) {
        highScoreList.innerHTML = "No High Scores available";
        return;
    } else if (retrievedScores) {
        highScores = JSON.parse(retrievedScores);
    }

    if (e) {
        highScores.push(e);
    }
    highScores = highScores.filter((item) => item !== null);
    highScores.sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]]);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    highScoreList.innerHTML = "";
    console.log(highScores);
    for (let i = 0; i < highScores.length; i++) {
        let element = document.createElement("li");

        element.textContent = Object.keys(highScores[i])[0] + ": " + Object.values(highScores[i])[0];
        highScoreList.appendChild(element);
    }
}
