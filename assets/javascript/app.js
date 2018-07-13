$(document).ready(function() {
  // Create a function that creates the start button and initial screen

  function initialScreen() {
    startScreen =
      "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $('.mainArea').html(startScreen);
  }

  initialScreen();

  //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML

  $('body').on('click', '.start-button', function(event) {
    clickSound.play();
    generateHTML();

    timerWrapper();
  }); // **Closes start-button click

  $('body').on('click', '.answer', function(event) {
    //answeredQuestion = true;
    clickSound.play();
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      //alert("correct");
      clearInterval(theClock);
      generateWin();
    } else {
      //alert("wrong answer!");
      clearInterval(theClock);
      generateLoss();
    }
  }); // **Closes .answer click

  $('body').on('click', '.reset-button', function(event) {
    clickSound.play();
    resetGame();
  }); // ** Closes reset-button click
});

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    '</span></p>' +
    "<p class='text-center'>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    '</p>' +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    '</span></p>' +
    "<p class='text-center'>Correct! The answer is: " +
    correctAnswers[questionCounter] +
    '</p>' +
    imageArray[questionCounter];
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    '</span></p>' +
    "<p class='text-center'>Wrong! The correct answer is: " +
    correctAnswers[questionCounter] +
    '</p>' +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $('.mainArea').html(gameHTML);
  setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    '</p>';
  $('.mainArea').html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 15;
    timerWrapper();
  } else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(countdown, 1000);
  function countdown() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $('.timer').html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    '</span></p>' +
    "<p class='text-center'>All done, here's how you did!" +
    '</p>' +
    "<p class='summary-correct'>Correct Answers: " +
    correctTally +
    '</p>' +
    '<p>Wrong Answers: ' +
    incorrectTally +
    '</p>' +
    '<p>Unanswered: ' +
    unansweredTally +
    '</p>' +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $('.mainArea').html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 15;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 15;
var questionArray = [
  'What is the capital of Canada?',
  'What is the provincial flower of Ontario?',
  'What is the capital of Quebec?',
  'What is the capital of Ontario?',
  'What is the tallest waterfall in Canada?',
  'What is Canada known for exporting?',
  'What is the largest lake in Canada?',
  'Which city holds the coldest temperature recorded in Canada?'
];
var answerArray = [
  ['Ottawa', 'Toronto', 'Montreal', 'Quebec City'],
  ['Three leaf Clover', 'Great White Trillium', 'Anemone', 'New England Aster'],
  ['Gatineau', 'Montreal', 'Quebec City', 'Trois-Rivières'],
  ['Hamilton', 'Ottawa', 'Toronto', 'Windsor'],
  ['Athabasca Falls', 'Niagara Falls', 'Takakkaw Falls', 'Della Falls'],
  ['Lumber', 'Mineral Oil', 'Vehicles', 'Electricity'],
  ['Lake Huron', 'Lake Superior', 'Great Bear Lake', 'Great Slave Lake'],
  ['Fort Vermilion, AB', 'Eureka, NU', 'Fort Smith, NT', 'Snag, YT']
];
var imageArray = [
  "<img class='center-block img-right' src='assets/images/ottawa.png'>",
  "<img class='center-block img-right' src='assets/images/trillium.png'>",
  "<img class='center-block img-right' src='assets/images/quebecCity.png'>",
  "<img class='center-block img-right' src='assets/images/toronto.png'>",
  "<img class='center-block img-right' src='assets/images/dellaFalls.png'>",
  "<img class='center-block img-right' src='assets/images/oil.png'>",
  "<img class='center-block img-right' src='assets/images/lakesuperior.jpg'>",
  "<img class='center-block img-right' src='assets/images/snagYT.jpg'>"
];
var correctAnswers = [
  'A. Ottawa',
  'B. Great White Trillium',
  'C. Quebec City',
  'C. Toronto',
  'D. Della Falls',
  'B. Mineral Oil',
  'B. Lake Superior',
  'D. Snag, YT'
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio('sound/button-click.mp3');
