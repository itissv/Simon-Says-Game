let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let score = 0;
let highScore = 0;

let btns = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");
let highScoreText = document.querySelector("#highScore");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game Started");

        started = true;

        score = 0;

        levelUp();
    }
});


function gameBtnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function userBtnFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp() {
    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    // UPDATED: level animation
    h2.classList.remove("game-over");
    void h2.offsetWidth;
    h2.classList.add("game-over");

    // Random button choose
    let randIdx = Math.floor(Math.random() * btns.length); // UPDATED

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    console.log(gameSeq);

    // Flashing random button
    gameBtnFlash(randBtn);
}


function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {

            score = level * 10;

            // Check high score
            if (score > highScore) {

                highScore = score;

                highScoreText.innerText = `🏆 High Score: ${highScore}`;

                // UPDATED: New record animation
                highScoreText.classList.add("new-record");

                setTimeout(function () {
                    highScoreText.classList.remove("new-record");
                }, 800);
            }

            setTimeout(levelUp, 1000);
        }

    } else {

        // UPDATED: Improved Game Over message
        h2.innerHTML = `
            Game Over! Your Score is <b>${score}</b>
            <br>
            <span class="restart-text">Press any key to Restart</span>
        `;

        // UPDATED: Game Over animation
        h2.classList.add("game-over");

        // UPDATED: Use CSS class instead of changing
        // background directly
        document.querySelector("body").classList.add("gameOver");

        setTimeout(function () {
            document.querySelector("body").classList.remove("gameOver");
        }, 500);

        reset();
    }
}


function btnPress() {

    let btn = this;

    userBtnFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {

    started = false;

    level = 0;

    userSeq = [];

    gameSeq = [];

    score = 0;
}