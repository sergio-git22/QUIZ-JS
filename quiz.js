const questions = [
  {
    id: 1,
    question: "1. ¿En qué año tuvo lugar la primera carrera de Fórmula 1?",
    options: ["1952", "1949", "1950", "1951"],
    correctAnswer: "1950",
  },

  {
    id: 2,
    question: "2. ¿Cuál es la escudería más laureada de la historia de la F1?",
    options: ["Mercedes AMG", "Ferrari", "McLaren", "Red Bull Racing"],
    correctAnswer: "Ferrari",
  },

  {
    id: 3,
    question: "3. ¿Quién es el piloto con más victorias de la categoría?",
    options: [
      "Fernando Alonso",
      "Michael Schumacher",
      "Ayrton Senna",
      "Lewis Hamilton",
    ],
    correctAnswer: "Lewis Hamilton",
  },

  {
    id: 4,
    question: "4. ¿En qué circuito se han disputado más Grandes Premios?",
    options: ["Spa", "Mónaco", "Silverstone", "Monza"],
    correctAnswer: "Monza",
  },

  {
    id: 5,
    question: "5. ¿Qué circuito tiene el historial más negro de accidentes?",
    options: ["Mónaco", "Imola", "Nürburgring", "Spa"],
    correctAnswer: "Nürburgring",
  },

  {
    id: 6,
    question:
      "6. ¿Con qué equipo ganó Fernando Alonso sus dos títulos mundiales?",
    options: ["McLaren", "Renault", "Aston Martin", "Ferrari"],
    correctAnswer: "Renault",
  },

  {
    id: 7,
    question:
      "7. ¿Cuántos títulos comparten Michael Schumacher y Lewis Hamilton?",
    options: ["6", "4", "5", "7"],
    correctAnswer: "7",
  },

  {
    id: 8,
    question:
      "8. ¿Qué empresario y ex-piloto impulsó el desarrollo internacional de la F1?",
    options: [
      "Ron Dennis",
      "Bernie Ecclestone",
      "Flavio Briatore",
      "Jean Todt",
    ],
    correctAnswer: "Bernie Ecclestone",
  },

  {
    id: 9,
    question:
      "9. ¿Cuántos puntos se lleva actualmente el ganador de una carrera?",
    options: ["30", "20", "25", "22"],
    correctAnswer: "25",
  },

  {
    id: 10,
    question: "10. ¿Qué sistema facilita los adelantamientos hoy en día?",
    options: ["ERS", "FIA", "KERS", "DRS"],
    correctAnswer: "DRS",
  },
];

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

printQuestion();

// Temporizador
const totalTimer = 30;
let timer = 30;
let intervalID = setInterval(countdown, 1000);

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
