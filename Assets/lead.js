var leaderBoard = document.getElementById("leaderboard-list");
var highScores = leaderboards.length;
var leaderboards = [];

// this function will allow for scores and info to be added in leaderboard
function listHighScores() {
    console.log(leaderboards)
    for (var i = 0; i < leaderboards.length; i++) {
        var highScores = leaderboards[i];
        var li = document.createElement("li");
        li.textContent = highScores.Initials + ": " + highScores.Score + " out of 4";
        leaderBoard.appendChild(li);
    }
}

// this function will allow for high score to be displayed
function displayHighscore() {
    var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
    if (storedHighScores != null) {
        leaderboards = storedHighScores;
    }
    listHighScores()
}
displayHighscore()