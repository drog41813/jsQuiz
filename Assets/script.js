const timerElement = document.getElementById("timer");
const leaderboard = [];
const quizQuestions = [
{
  question: "question 1",
  options: ["Right","Wrong","Wrong","Wrong"],
  answer: 0,
},
{
  question: "question 2",
  options: ["Wrong","Right","Wrong","Wrong"],
  answer: 1,
},
{
  question: "question 3",
  options: ["Wrong","Wrong","Wrong","Right"],
  answer: 3,
},
{
  question: "question 4",
  options: ["Wrong","Wrong","Right","Wrong"],
  answer: 2,
},
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
var endTime;

const startElement = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitElement = document.getElementById("submit-button");
const textboxElement = document.getElementById("initials");

startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);

submitElement.style.display = "none";
textboxElement.style.display = "none";

function startButtonClicked() {
  setQuestion();
  startElement.style.display = "none";
  timerInterval = setInterval(updateTimer, 1175);
};

function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
};

function setQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const choice = document.createElement("li");
    choice.textContent = currentQuestion.options[i];
    choice.addEventListener("click", () => {
      checkAnswer(i);
    });
    optionsElement.appendChild(choice);
  };
};

function checkAnswer(answerIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (timeLeft <= 0){
    endQuiz();
  };

  if (answerIndex === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    setQuestion();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  endTime = timeLeft;
  timerElement.style.display = "none";
  optionsElement.style.display = "none";
  textboxElement.style.display = "block";
  submitElement.style.display = "block";
  questionElement.textContent = "Your score is " + score + " out of 4, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
};

function saveScore() {
  var initials = textboxElement.value;
  leaderboard.push(["user: " + initials, "score: " + score, "time left: " + endTime]);
  console.log(leaderboard);
}