var timerElement = document.getElementById("timer");
var leaderboards = [];
// this represents an array of all questions included in quiz
var quizQuestions = [
{
  question: "Which JS data type represents a series of characters?",
  options: ["String","Number","Boolean", "Null"],
  answer: 0,
},
{
  question: "which built-in method returns the length of a string?",
  options: ["size()","length()","index()","None of the above."],
  answer: 1,
},
{
  question: "Which of the following function of Number object returns the number's value?",
  options: ["toString()","toPrecision()","toLocaleString()","valueOf()"],
  answer: 3,
},
{
  question: "JavaScript is what kind of language",
  options: ["Object-Based","Procedural","Object-Oriented","None of the above"],
  answer: 2,
},
];

// all variables to be utilized
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
var endTime;

// all const connected to html IDs
const startElement = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitElement = document.getElementById("submit-button");
const textboxElement = document.getElementById("initials");

startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);

submitElement.style.display = "none";
textboxElement.style.display = "none";

// this function initiates when start button is clicked
function startButtonClicked() {
  setQuestion();
  startElement.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
};

// this function updates the timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
};

// this function allows for user to go through all questions
function setQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = currentQuestion.options[i];
    choice.addEventListener("click", () => {
      checkAnswer(i);
    });
    optionsElement.appendChild(choice);
  };
};

// this function checks for correct answer
function checkAnswer(answerIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
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

// this function is carried out once quiz is finished
function endQuiz() {
  clearInterval(timerInterval);
  endTime = timeLeft;
  timerElement.style.display = "none";
  optionsElement.style.display = "none";
  textboxElement.style.display = "block";
  submitElement.style.display = "block";
  questionElement.textContent = "Your score is " + score + " out of 4, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
};

submitElement.addEventListener("click", saveScore);

// function will display high score
function displayHighscore() {
  var storedHighScore = localStorage.getItem("leaderboards");
  if (storedHighScore) {
    score = parseInt(storedHighScore);
  } 

  H.textContent = score.toString();
}

function init() {
  var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));

  if (storedHighScores != null) {
      leaderboards = storedHighScores;
      console.log(leaderboards);
  }
}

// function will save score
function saveScore() {
  var initials = textboxElement.value;
  var initials = initials.toUpperCase();
  var totalScore = {
    Initials: initials,
    Score: score,
    Time: endTime
  };
  leaderboards.push(totalScore);
  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
};

// this function lists the high scores
function listHighScores() {
  console.log(leaderboards)
  for (var i = 0; i < leaderboards.length; i++) {
      var highScores = leaderboards[i];
      var li = document.createElement("li");
      li.textContent = highScores.Initials + " your score is " + highScores.Score + " out of 4";
      leaderboards.appendChild(li);
  }
}

// this function displays the high score
function displayHighscore() {
  var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
  if (storedHighScores != null) {
      leaderboards = storedHighScores;
  }
  listHighScores()
}
displayHighscore()