//HIGH SCORES PAGE
function viewHighscores() { 
    // RETRIEVE HIGHSCORES from localstorage OR SHOW EMPTY ARRAY
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // SORTS SCORES IN DESCENDING ORDER
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // CREATED A LIST ITEM ELEMENT FIR THE SCORES
      var li = document.createElement("li");
      li.textContent = score.initials + " - " + score.score;
  
      // SHOW THE HIGHSCORE ITEMS
      var olHighScoresEl = document.getElementById("highscores");
      olHighScoresEl.appendChild(li);
    });
}

  // CLEAR LOCAL STORAGE FOR HIGH SCORES
  function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  // DISPLAYS THE HIGHSCORES REPORT
  viewHighscores();
  
  document.getElementById("clear").onclick = clearHighscores;