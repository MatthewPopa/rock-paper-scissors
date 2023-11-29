//Create 2 separate score displays, then add to each class

let roundMessage = document.querySelector('#roundMessage');
let playerDisplay = document.querySelector('#playerScore');
let computerDisplay = document.querySelector('#computerScore');

let roundSlider = document.querySelector('#roundSlider');
let roundNumber = document.querySelector('#roundNumber');
let roundDisplay = document.querySelector('#roundDisplay');

let playAgainBtn = document.createElement('button');
playAgainBtn.textContent = "Play again";
playAgainBtn.classList.add('fade');
playAgainBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    roundMessage.textContent = '';
    roundDisplay.textContent = 'Rounds: ';
    roundNumber.textContent = numberOfRounds;
    roundMessage.append(roundSlider);
    updateShape(player2Shape, "question");
    updateShape(player1Shape, "question");
    playerDisplay.removeChild(document.querySelector('#playerScore > .score-display'));
    computerDisplay.removeChild(document.querySelector('#computerScore > .score-display'));
    removeAllChildNodes(scoreDisplay);
    playAgainBtn.classList.add('fade');
    setTimeout(() => {
        document.body.removeChild(playAgainBtn);
    }, 500);
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let numberOfRounds = 5;

roundSlider.oninput = () => {
    roundNumber.textContent = roundSlider.value;
    numberOfRounds = roundSlider.value;
}

let scoreDisplay = document.createElement('div');
scoreDisplay.classList.add('score-display');
let scoreTick = document.createElement('div');
scoreTick.classList.add('tick');


let player1Shape = document.querySelector('#player1Selection');
let player2Shape = document.querySelector('#player2Selection');

function updateShape(playerShape, choice) {
    playerShape.classList.add('fade');
    setTimeout(() => {
        playerShape.src = "assets/" + choice + ".svg";
        playerShape.classList.remove('fade');
    }, 300);
}

function winAnim(playerShape) {
    setTimeout(() => {
        playerShape.classList.add('win');
    }, 500);
    setTimeout(() => {
        playerShape.classList.remove('win');
    }, 2000);
}

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
    document.querySelector(".selectable").classList.remove("selectable");
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';
    roundDisplay.textContent = 'Round: ';
    playerDisplay.append(scoreDisplay);
    computerDisplay.append(scoreDisplay.cloneNode(true));
    roundNumber.textContent = currentRound;
    setTimeout(() => {
        document.querySelector(".opponent-selector").setAttribute('style', 'height:' + document.querySelector(".opponent").scrollHeight + 'px');
    }, 250);
    setTimeout(() => {
        document.querySelectorAll(".opponent").forEach(item => {
            item.style.setProperty('overflow', 'unset');
        });
    }, 500);
};

let endGame = () => {
    if(playerScore > computerScore) {
        roundMessage.textContent = "You won the game!";
    } else {
        roundMessage.textContent = "You lost the game.";
    }
    gamePlayed = true;
    setTimeout(() => {
        document.body.append(playAgainBtn);
    }, 2000);
    setTimeout(() => {
        playAgainBtn.classList.remove('fade');
    }, 2500);
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
    if(currentRound == 0 && !gamePlayed) startGame();
    if(currentRound == 0 && gamePlayed) {
        createScoreDisplay();
        playerDisplay.append(scoreDisplay);
        computerDisplay.append(scoreDisplay.cloneNode(true));
    }
    if(playerScore < numberOfRounds && computerScore < numberOfRounds) playRound();
});

let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let gamePlayed = false;

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
            winAnim(player1Shape);
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You win! Rock beats scissors.";
            playerScore++;
            winAnim(player2Shape);
        }
    } else if(player == "paper"){
        if(computer == "rock"){
            roundMessage.textContent = "You win! Paper beats rock.";
            playerScore++;
            winAnim(player2Shape);
        }
        if(computer == "paper"){
            roundMessage.textContent = "You tie! You both picked paper.";
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You lose! Scissors beats paper.";
            computerScore++;
            winAnim(player1Shape);
        }
    } else if(player == "scissors"){
        if(computer == "rock"){
            roundMessage.textContent = "You lose! Rock beats scissors.";
            computerScore++;
            winAnim(player1Shape);
        }
        if(computer == "paper"){
            roundMessage.textContent = "You win! Scissors beats paper.";
            playerScore++;
            winAnim(player2Shape);
        }
        if(computer == "scissors"){
            roundMessage.textContent = "You tie! You both picked scissors.";
        }
    }
    let computerTicks = Array.from(document.querySelectorAll("#computerScore .score-display > .tick"));
    let playerTicks = Array.from(document.querySelectorAll("#playerScore .score-display > .tick"));
    function addScore() {
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
    function clearScore() {
        computerTicks.forEach((tick) => {
            tick.classList.remove('point');
        });
        playerTicks.forEach((tick) => {
            tick.classList.remove('point');
        });
    };
    playRound.clearScore = clearScore;
    roundNumber.textContent = currentRound;
    addScore();
    updateShape(player2Shape, player);
    updateShape(player1Shape, computer);
    if(playerScore == numberOfRounds || computerScore == numberOfRounds) endGame();
    return;
}

//need logic to decide between player vs computer
//probably 2 different game functions for each