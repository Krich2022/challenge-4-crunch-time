const score = {
   correct: 0,
   wrong: 0,
};
let questions = document.querySelectorAll('[id*="question"]');
const start = document.getElementById("start-test");
const startContainer = document.getElementById("start");
let currentQuestion = 0;
const timer = document.getElementById("timer");
let timeLeft = 200;
const timerContainer = document.querySelector(".timer-container");
const timesUp = document.getElementById("time-up");
const allDone = document.getElementById("end");

start.addEventListener("click", startTest);
document.querySelectorAll("button").forEach((button) => {
   button.addEventListener("click", nextQuestion);
});
function startTest() {
   startContainer.classList.add("hidden");
   startTimer();
}

function nextQuestion() {
   if (currentQuestion < questions.length) {
      questions[currentQuestion].classList.remove("hidden");
      currentQuestion++;
   }
}

function startTimer() {
   timer.innerHTML = timeLeft;
   if (timeLeft === 0) {
      timerContainer.classList.add("hidden");
      timesUp.classList.remove("hidden");
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
