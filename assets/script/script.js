const score = {
   correct: 0,
   wrong: 0,
};
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

start.addEventListener("click", startTest);
nextQuestionButtons.forEach((button) => {
   button.addEventListener("click", nextQuestion);
});
function startTest() {
   startContainer.classList.add("hidden");
   questions[0].classList.remove("hidden");
   startTimer();
}

function nextQuestion() {
   if (currentQuestion < questions.length) {
      questions[currentQuestion].classList.remove("hidden");
      currentQuestion++;
      console.log(currentQuestion);
   }
   if (currentQuestion != 0) {
      hideQuestion();
   }
}

function startTimer() {
   timer.innerHTML = timeLeft;
   if (timeLeft === 0) {
      timerContainer.classList.add("hidden");
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
}

function hideQuestion() {
   if (currentQuestion !== previousQuestion) {
      questions[previousQuestion].classList.add("hidden");
      previousQuestion++;
   }
   if (currentQuestion === 10) {
      endTest();
   }
}
