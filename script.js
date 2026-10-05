const board = document.getElementById("board");
const target = document.getElementById("target");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const startMessage = document.getElementById("startMessage");
const gameOver = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");


let score = 0;

let timeLeft = 3;

let timer = null;

let gameRunning = false;


/* =========================
   START GAME
========================= */

function startGame() {

    score = 0;

    scoreDisplay.textContent = score;

    gameRunning = true;

    startMessage.style.display = "none";

    gameOver.style.display = "none";

    target.style.display = "flex";

    placeTarget();

    startTimer();
}


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(timer);

    timeLeft = 3;

    updateTimer();


    const startTime = performance.now();


    timer = setInterval(() => {

        const elapsed =
            (performance.now() - startTime) / 1000;

        timeLeft = Math.max(
            0,
            3 - elapsed
        );

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timer);

            endGame();
        }

    }, 30);
}


/* =========================
   UPDATE TIMER
========================= */

function updateTimer() {

    timeDisplay.textContent =
        timeLeft.toFixed(2);
}


/* =========================
   TARGET CLICK
========================= */

target.addEventListener("click", function(event) {

    event.stopPropagation();


    if (!gameRunning) {
        return;
    }


    score++;

    scoreDisplay.textContent = score;


    /*
        Every successful click
        gives you another 3 seconds.
    */

    placeTarget();

    startTimer();
});


/* =========================
   PLACE TARGET
========================= */

function placeTarget() {

    const boardRect =
        board.getBoundingClientRect();


    const targetSize =
        target.offsetWidth;


    const padding = 25;


    const minX =
        padding + targetSize / 2;


    const maxX =
        boardRect.width -
        padding -
        targetSize / 2;


    const minY =
        padding + targetSize / 2;


    const maxY =
        boardRect.height -
        padding -
        targetSize / 2;


    const x =
        Math.random() *
        (maxX - minX) +
        minX;


    const y =
        Math.random() *
        (maxY - minY) +
        minY;


    target.style.left = `${x}px`;

    target.style.top = `${y}px`;
}


/* =========================
   GAME OVER
========================= */

function endGame() {

    gameRunning = false;

    target.style.display = "none";

    gameOver.style.display = "flex";

    finalScore.textContent = score;

    timeDisplay.textContent = "0.00";
}


/* =========================
   RESTART
========================= */

function restartGame() {

    startGame();
}


/* =========================
   BUTTONS
========================= */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    restartGame
);


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        if (gameRunning) {
            placeTarget();
        }

    }
);