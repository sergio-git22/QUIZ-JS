let questions = [];

const myHeaders = new Headers();
myHeaders.append(
  "apikey",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cnRuY2hhb2JpcnpmbHFoaWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDMyMzQsImV4cCI6MjA1MzcxOTIzNH0.quRhtK1ZK1l87SDdCVK9dKsvU36lvzuFWncBoWRZM4c"
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://qyrtnchaobirzflqhihv.supabase.co/rest/v1/Questions",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    questions = result;
    printQuestion();
    intervalID = setInterval(countdown, 1000);
  })
  .catch((error) => console.error(error));

let currentQuestion = 0;
let isAnswered = false;

const title = document.getElementById("question");
const respuestas = document.getElementById("respuestas");
const infoQuestion = document.getElementById("info-question");
const btnNext = document.getElementById("next");
const txtTimer = document.getElementById("txtTimer");
const progressBar = document.getElementById("progressBar");
btnNext.disabled = true;

function printQuestion(userAnswered, isCorrect) {
  // Muestra el título de la pregunta
  title.innerText = questions[currentQuestion].question;

  let questionAnswers = questions[currentQuestion].respuestas;

  // questionAnswers.sort(() => Math.random() - 0.5);

  // Antes de mostrar las nuevas respuestas, se borra el contenido del div
  respuestas.innerHTML = "";

  questions[currentQuestion].options.forEach((respuesta, index) => {
    let bgButton =
      " bg-slate-700 rounded-lg p-2 hover:bg-black text-white transition-all";
    if (userAnswered) {
      if (respuesta == userAnswered) {
        if (isCorrect) {
          bgButton = "bg-green-500 rounded-lg p-2 text-white transition-all";
        } else {
          bgButton = "bg-red-500 rounded-lg p-2 text-white transition-all";
        }
      }
    }

    respuestas.innerHTML += `<button 
        onclick="checkAnswer('${respuesta}')"
        class="${bgButton}">${respuesta}</button>`;
  });

  printNumPregunta();
}

// Resultados
let score = 0;

function checkAnswer(respuesta) {
  if (isAnswered == false) {
    isAnswered = true;
    btnNext.disabled = false;
    const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = respuesta == currentCorrectAnswer;
    if (isCorrect) {
      score += 10;
      localStorage.setItem("score", score);
    }
    console.log("SCORE:", score);

    if (respuesta == currentCorrectAnswer) {
      printQuestion(respuesta, true);
    } else {
      printQuestion(respuesta, false);
    }
  }
}

function nextQuestion() {
  btnNext.disabled = true;
  currentQuestion++;

  console.log("currentQuestion");
  if (currentQuestion == questions.length) {
    window.location = "/ranking.html";
  }

  isAnswered = false;
  console.log(currentQuestion);
  printQuestion();

  // Reinicializamos el contador
  timer = totalTimer + 1;
  // Arranca de nuevo el contador
  intervalID = setInterval(countdown, 1000);
}

function printNumPregunta() {
  infoQuestion.innerText = `Pregunta ${currentQuestion + 1} de ${
    questions.length
  }`;
}

// Temporizador
const totalTimer = 30;
let timer = 30;
let intervalID;

function countdown() {
  timer -= 1;
  console.log("timer", timer);
  txtTimer.innerText = `${timer}s`;

  console.log("Se ha respondido? => ", isAnswered);

  progressBar.classList.replace("opacity-0", "opacity-100");

  const widthPercent = getPercent(timer);
  progressBar.style.width = `${widthPercent}%`;

  if (isAnswered || timer == 0) {
    clearInterval(intervalID);

    // Aunque no haya respuesta, decimos que sí para no poder marcarla
    isAnswered = true;
    btnNext.disabled = false;

    if (timer == 0) {
      alert("¡Se acabó el tiempo!");
    }
  }
}

function getPercent(currentTime) {
  return (currentTime * 100) / totalTimer;
}
