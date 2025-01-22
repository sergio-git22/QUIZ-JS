const textScore = document.getElementById("textScore");

const currentScore = localStorage.getItem("score");
textScore.innerText = `¡Has conseguido ${currentScore} de 100 puntos!`;
