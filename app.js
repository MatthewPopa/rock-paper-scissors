
function getComputerChoice() {
    let number = getRandomInt(3);
    let choice = (number == 2) ? "rock" : (number == 1) ? "paper" : "scissors";
    return choice;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let startGame = () => {
    roundDisplay.classList.add("grow");
    computerDisplay.classList.add("fade");
    playerDisplay.classList.add("fade");
    //make text fade before implementing score display
    //change computer/player divs to score display
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
    if(playerScore < 5 && computerScore < 5) playRound();
});

let roundDisplay = document.querySelector('#round');
let roundMessage = document.querySelector('#roundMessage');
let playerDisplay = document.querySelector('#playerScore');
let computerDisplay = document.querySelector('#computerScore');

let scoreDisplay = document.createElement('div');
scoreDisplay.classList.add('score-display');
let scoreTick = document.createElement('div');
scoreTick.classList.add('tick');

let numberOfRounds = 5;

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

let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
function playRound(player, computer) {
    player = playerChoice;
    computer = getComputerChoice();
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
    if(currentRound == 1){
        setTimeout(() => {
            roundDisplay.textContent = "R" + currentRound;
        }, 300);
        playerDisplay.textContent = '';
        computerDisplay.textContent = '';
        createScoreDisplay();
        playerDisplay.append(scoreDisplay);
        computerDisplay.append(scoreDisplay.cloneNode(true));
    } else {
        roundDisplay.textContent = "R" + currentRound;
    };
    let computerTicks = Array.from(document.querySelectorAll("#computerScore .score-display > .tick"));
    computerTicks.forEach((tick) => {
        if(tick.classList.contains(`${computerScore}`)){
            tick.classList.add('point');
        }
    });
    let playerTicks = Array.from(document.querySelectorAll("#playerScore .score-display > .tick"));
    playerTicks.forEach((tick) => {
        if(tick.classList.contains(`${playerScore}`)){
            tick.classList.add('point');
        }
    });
    // if(document.querySelector("#computerScore .score-display > .tick").classList.contains(`${computerScore}`)){
    //     document.querySelector("#computerScore .score-display > .tick").classList.add("point");
    // };
    if(playerScore == 5 || computerScore == 5) endGame();
    return;
}