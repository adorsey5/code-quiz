// START VARIABLES
// HTML DOM ELEMENTS
var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var remarkEl = document.querySelector("#remark");

// QUIZ STATUS VARIABLES
var time = questions.length * 15; 
var timerId;
var currentQuestionIndex = 0;

// START QUIZ & TIMER
function startQuiz() {
    // HIDE START PAGE
    var startScreenEl = document.getElementById("start-page"); 
    startScreenEl.setAttribute("class", "hide"); 
  
     // DISPLAY TIME AT START OF QUIZ
     timerEl.textContent = time;
     // BEGIN TIMER
     timerId = setInterval(secondTick, 1000);
  
    // SHOW QUESTION PAGE
    questionsEl.removeAttribute("class"); 
    showQuestion();
  }

  function showQuestion() {
    // CLEARS FORMER USER QUESTION CHOICES 
    choicesEl.innerHTML = "";

    // RETRIEVE THE CURRENT QUESTION FROM ARRAY
  var currentQuestion = questions[currentQuestionIndex];

  // RENEWED QUESTION-TITLE WITH CURRENT QUESTION
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // PASSING THE CALLBACK CHOICE FUNCTION TO LOOP OVER CHOICES IN THE INDEX
  currentQuestion.choices.forEach(function(choice, i) {
      //console.log(choice, i);

  // CREATED BUTTON ELEMENT FOR EVERY CHOICE
    const choiceNode = document.createElement("button");
    choiceNode.setAttribute("value", choice);
    choiceNode.setAttribute("class", "choice");
    // QUESTION CHOICES FORMAT
    choiceNode.textContent = i + 1 + ". " + choice;
    
  // SHOW CHOICES FOR QUESTIONS
        choicesEl.appendChild(choiceNode);
  // EVERY CHOICE HAS A CLICK EVENT LISTENER
    choiceNode.onclick = clickQuestion;
  });
}

function clickQuestion() { 
    // IF USER ANSWERS INCORRECT
    if (this.value !== questions[currentQuestionIndex].answer) {
      // WRONG ANSWERS ARE PENALEZED BY 10 SECS
      time -= 10;
    if (time < 0) {
        time = 0;
      }
    // SHOWS UPDATED TIMER AND REMARKS
      timerEl.textContent = time;
      remarkEl.textContent = "WRONG!";
      remarkEl.style.fontSize = "100%";
      remarkEl.style.color = "gray";
    } else {
      remarkEl.textContent = "CORRECT!";
      remarkEl.style.fontSize = "100%";
      remarkEl.style.color = "gray";
    }
  
    // SHOW WRONG OR CORRECT REMARK
    remarkEl.setAttribute("class", "remark");
    setTimeout(function() {
      remarkEl.setAttribute("class", "hide remark");
    }, 1000);
  
    // SHOW THE NEXT QUESTION IN THE INDEX
    currentQuestionIndex++;
  
    // TIME CHECK
    if (currentQuestionIndex === questions.length) {
      endQuiz(); 
    } else {
      showQuestion();
    }
  }

  // END OF THE QUIZ
function endQuiz() {
    // DISPLAY THE LAST PAGE
     var endScreenEl = document.getElementById("last-page"); 
     endScreenEl.removeAttribute("class");
    // HIDE THE QUESTIONS
      questionsEl.setAttribute("class", "hide");
    // AT THE END OF THE QUIZ THIS CLEARS THE TIMER SET WITH SETINTERVAL
     clearInterval(timerId);
     // SHOWS THE USERS FINAL SCORE
     var finalScoreEl = document.getElementById("final-score");
     finalScoreEl.textContent = time;
   }
   //TIMER AT THE END OF THE QUIZ
    function secondTick() {
    // TIMER IS RESTORED
    time--;
    timerEl.textContent = time;
    // IF TIMER HITS 0 END THE QUIZ
    if (time <= 0) {
      endQuiz();
    }
  }

  function submitHighscore() {
    // REMOVE ANY EXTRA SPACES IN THE USER INPUT FOR INITIALS
      var initials = initialsEl.value.trim();
      
      if (initials !== "") {
      // RETRIEVE HIGHSCORES FROM localstorage OR SHOW EMPTY ARRAY
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      // SET UP THE NEW SCORE FOR CURRENT USER
      var newScore = {
        score: time,
        initials: initials
      };
      
      // SAVE THE SCORES TO LOCAL STORAGE
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // LINK to HIGH SCORES page
      location.href = "highscores.html";
    }
  }
  // KEYBOARD ENTER KEY FUNCTION
function checkEnterkey(event) {
    if (event.key === "Enter") {
      submitHighscore();
    }
  }
  // BEGIN THE QUIZ ON THE START QUIZ BUTTON
  startBtn.onclick = startQuiz;
  // SUBMIT INITIALS FOR HIGH SCORE
  submitBtn.onclick = submitHighscore;
  initialsEl.onkeyup = checkEnterkey;