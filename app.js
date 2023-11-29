//let roundDisplay = document.querySelector('#round');
let roundMessage = document.querySelector('#roundMessage');
let playerDisplay = document.querySelector('#playerScore');
let computerDisplay = document.querySelector('#computerScore');

let scoreDisplay = document.createElement('div');
scoreDisplay.classList.add('score-display');
let scoreTick = document.createElement('div');
scoreTick.classList.add('tick');

let numberOfRounds = 5;

let player1Shape = document.createElement('div');
let player2Shape = document.createElement('div');

function getComputerChoice() {
    let number = getRandomInt(3);
    let choice = (number == 2) ? "rock" : (number == 1) ? "paper" : "scissors";
    return choice;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let createRoundArray = () => {
    let newArray = [];
    for(i = 1; i <= numberOfRounds; i++) {
        newArray.push(i);
    }
    return newArray;
}

let createScoreDisplay = () => {
    createRoundArray().forEach((element) => {
        scoreTick.classList.add(element);
        scoreDisplay.append(scoreTick.cloneNode(true));
        scoreTick.classList.remove(element);
    });
}

let startGame = () => {
    createScoreDisplay();
    document.querySelector(".active").classList.remove("active");
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';
    playerDisplay.append(scoreDisplay);
    computerDisplay.append(scoreDisplay.cloneNode(true));
    //roundDisplay.textContent = "R" + currentRound;
    setTimeout(() => {
        document.querySelector(".opponent-selector").classList.add("grow");
    }, 400);
};

let endGame = () => {
    if(playerScore > computerScore) return roundMessage.textContent = "You won the game!";
    return roundMessage.textContent = "You lost the game.";
};

let playerChoice = '';
let selection = document.querySelector('.shape-selector');
selection.addEventListener('click', (e) => {
    let target = e.target;

    switch(target.id){
        case 'rock':
            playerChoice = 'rock';
            break;
        case 'paper':
            playerChoice = 'paper';
            break;
        case 'scissors':
            playerChoice = 'scissors';
            break;
    }
    if(currentRound == 0) startGame();
    if(playerScore < numberOfRounds && computerScore < numberOfRounds) playRound();
});

let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

function playRound(player, computer) {
    player = playerChoice;
    computer = "paper";
    currentRound++;
    if(player == "rock"){
        if(computer == "rock"){
            roundMessage.textContent = "You tie! You both picked rock.";
        }
        if(computer == "paper"){
            roundMessage.textContent = "You lose! Paper beats rock.";
            computerScore++;
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You win! Rock beats scissors.";
            playerScore++;
        }
    } else if(player == "paper"){
        if(computer == "rock"){
            roundMessage.textContent = "You win! Paper beats rock.";
            playerScore++;
        }
        if(computer == "paper"){
            roundMessage.textContent = "You tie! You both picked paper.";
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You lose! Scissors beats paper.";
            computerScore++;
        }
    } else if(player == "scissors"){
        if(computer == "rock"){
            roundMessage.textContent = "You lose! Rock beats scissors.";
            computerScore++;
        }
        if(computer == "paper"){
            roundMessage.textContent = "You win! Scissors beats paper.";
            playerScore++;
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You tie! You both picked scissors.";
        }
    }
    let computerTicks = Array.from(document.querySelectorAll("#computerScore .score-display > .tick"));
    let playerTicks = Array.from(document.querySelectorAll("#playerScore .score-display > .tick"));
    let addScore = () => {
        computerTicks.forEach((tick) => {
            if(tick.classList.contains(`${computerScore}`)){
                tick.classList.add('point');
            }
        });
        playerTicks.forEach((tick) => {
            if(tick.classList.contains(`${playerScore}`)){
                tick.classList.add('point');
            }
        });
    };
    //roundDisplay.textContent = "R" + currentRound;
    addScore();
    if(playerScore == numberOfRounds || computerScore == numberOfRounds) endGame();
    return;
}

//need logic to decide between player vs computer
//probably 2 different game functions for each