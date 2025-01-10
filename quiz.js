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
        options: ["Fernando Alonso", "Michael Schumacher", "Ayrton Senna", "Lewis Hamilton"],
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
        question: "6. ¿Con qué equipo ganó Fernando Alonso sus dos títulos mundiales?",
        options: ["McLaren", "Renault", "Aston Martin", "Ferrari"],
        correctAnswer: "Renault",
    },

    {
        id: 7,
        question: "7. ¿Cuántos títulos comparten Michael Schumacher y Lewis Hamilton?",
        options: ["6", "4", "5", "7"],
        correctAnswer: "7",
    },

    {
        id: 8,
        question: "8. ¿Qué empresario y ex-piloto impulsó el desarrollo internacional de la F1?",
        options: ["Ron Dennis", "Bernie Ecclestone", "Flavio Briatore", "Jean Todt"],
        correctAnswer: "Bernie Ecclestone",
    },

    {
        id: 9,
        question: "9. ¿Cuántos puntos se lleva actualmente el ganador de una carrera?",
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

const title = document.getElementById("question");
const respuestas = document.getElementById("respuestas");

function printQuestion() {
    title.innerText = questions[currentQuestion].question;

    let questionAnswers = questions[currentQuestion].respuestas;
    
    respuestas.innerHTML = "";
    
    questions[currentQuestion].options.forEach((respuesta) => {
    respuestas.innerHTML += `<button class="bg-slate-800 rounded-lg p-2 hover:bg-red-950 hover: text-white transition-all">${respuesta}</button>`
});
}

printQuestion();

function nextQuestion() {
    currentQuestion++;
    printQuestion();
}