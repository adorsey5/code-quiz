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