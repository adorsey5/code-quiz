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