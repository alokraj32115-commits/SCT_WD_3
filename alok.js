const questions = [

{
  question:"What is the chemical symbol for water?",
  options:["O2","H2O","CO2","HO"],
  answer:"H2O"
},

{
  question:"Which planet is known as the Red Planet?",
  options:["Venus","Mars","Jupiter","Saturn"],
  answer:"Mars"
},

{
  question:"Who wrote Hamlet?",
  options:[
    "Charles Dickens",
    "William Shakespeare",
    "Leo Tolstoy",
    "Mark Twain"
  ],
  answer:"William Shakespeare"
},

{
  question:"Which language runs in the browser?",
  options:["Python","Java","C++","JavaScript"],
  answer:"JavaScript"
},

{
  question:"What does CSS stand for?",
  options:[
    "Creative Style Sheets",
    "Cascading Style Sheets",
    "Colorful Style Sheets",
    "Computer Style Sheets"
  ],
  answer:"Cascading Style Sheets"
}

];

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const current = document.getElementById("current");
const total = document.getElementById("total");

const progressFill = document.querySelector(".progress-fill");

const timeText = document.getElementById("time");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

total.innerText = questions.length;

function loadQuestion(){

  resetTimer();

  const q = questions[currentQuestion];

  question.innerText = q.question;

  current.innerText = currentQuestion + 1;

  progressFill.style.width =
  ((currentQuestion + 1) / questions.length) * 100 + "%";

  options.innerHTML = "";

  q.options.forEach(option => {

    const div = document.createElement("div");

    div.classList.add("option");

    div.innerText = option;

    div.addEventListener("click", () => {

      checkAnswer(div, option);

    });

    options.appendChild(div);

  });

}

function checkAnswer(selectedDiv, selectedOption){

  clearInterval(timer);

  const correctAnswer =
  questions[currentQuestion].answer;

  const allOptions =
  document.querySelectorAll(".option");

  allOptions.forEach(option => {

    option.style.pointerEvents = "none";

    if(option.innerText === correctAnswer){

      option.classList.add("correct");

    }

  });

  if(selectedOption === correctAnswer){

    score++;

  }else{

    selectedDiv.classList.add("wrong");

  }

}

nextBtn.addEventListener("click", () => {

  currentQuestion++;

  if(currentQuestion < questions.length){

    loadQuestion();

  }else{

    showResult();

  }

});

function showResult(){

  document.querySelector(".quiz-panel").innerHTML = `

  <div class="result-screen">

    <h1>🎉 Quiz Completed</h1>

    <p>
      Your Score: ${score} / ${questions.length}
    </p>

    <button class="play-again" onclick="location.reload()">
      Play Again
    </button>

  </div>

  `;

}

function resetTimer(){

  clearInterval(timer);

  timeLeft = 15;

  timeText.innerText = timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    timeText.innerText = timeLeft;

    if(timeLeft === 0){

      clearInterval(timer);

      currentQuestion++;

      if(currentQuestion < questions.length){

        loadQuestion();

      }else{

        showResult();

      }

    }

  },1000);

}

loadQuestion();