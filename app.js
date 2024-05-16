const choicesArray = ["exit", "rock", "paper", "scissors", "wrong input"];
let cpuScore = 0;
let userScore = 0;
let gameReset = 0;

cpuScoreDiv = document.querySelector(".cpu-score");
userScoreDiv = document.querySelector(".user-score");

roundResultDiv = document.querySelector(".round-result");
roundResultDiv.setAttribute('style', 'white-space: pre;');
gameResultDiv = document.querySelector("#final-result");


btnBoxDiv = document.querySelector(".buttons-box");
btnBoxDiv.addEventListener("click", (event) => {
    let target = event.target;
    let userInput = undefined;
    let userChoice = undefined;
    let computerChoice = undefined;
    let roundResult = 0;
    switch(target.id) {
        case "rock-btn":
            userInput = "rock";
            break;
        case "paper-btn":
            userInput = "paper";
            break;
        case "scissors-btn":
            userInput = "scissors";
            break;
        default:
            break;
    }
    if(userInput !== undefined) {
        userChoice = getHumanChoice(userInput);
        computerChoice = getComputerChoice();
        roundResult = playRound(userChoice, computerChoice);
        updateScore(roundResult);
    }
})

function getComputerChoice() {
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 3)+1;
    return randomNumber;
}

function getHumanChoice(userInput) {
    let returnInput = undefined;
    returnInput = choicesArray.indexOf(userInput);

    return returnInput;
}

function playRound(userChoice, computerChoice) {
    let result = 0;
    if(userChoice === -1) {
        result = -1;
    }
    else {
        if(gameReset===0) {
            resetGame();
            gameReset = 1;
        }
        roundResultDiv.textContent = `You: ${choicesArray[userChoice]}\tCPU: ${choicesArray[computerChoice]}\n`
        if(userChoice === computerChoice) {
            roundResultDiv.textContent += "Round ended in draw";
        }
        else if(((userChoice===1) && (computerChoice===3))
            ||((userChoice===2) && (computerChoice===1))
            ||((userChoice===3) && (computerChoice===2))) {
            roundResultDiv.textContent += "You won this round";
            result = 1;
        }
        else {
            roundResultDiv.textContent += "You lost this round";
            result = 2;
        }
    }
    return result;
}

function updateScore(roundResult) {
    let gameEnd = -1;
    switch(roundResult) {
        case 0:
            userScore++;
            cpuScore++;
            break;
        case 1:
            userScore++;
            break;
        case 2:
            cpuScore++;
            break;
    }

    cpuScoreDiv.textContent = `CPU Score: ${cpuScore}`;
    userScoreDiv.textContent = `Your Score: ${userScore}`;

    if(userScore===5 || cpuScore===5){
        gameResultDiv.classList.add("final-result-active");
        if(userScore===cpuScore){
            gameEnd = 0; /* Draw */
            gameResultDiv.textContent = "Game ended in Draw"
        }
        else if(userScore>cpuScore) {
            gameEnd = 1; /* User win */
            gameResultDiv.textContent = "Game ended: You Won!!!"
        }
        else {
            gameEnd = 2; /* Cpu win */
            gameResultDiv.textContent = "Game ended: You Lost :("
        }
        gameReset = 0;
        userScore = 0;
        cpuScore = 0;
    }
    return gameEnd;
}

function resetGame() {
    gameResultDiv.classList.remove("final-result-active");
    gameResultDiv.textContent = "";
}