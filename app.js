
function getComputerChoice() {
    let number = getRandomInt(3);
    let choice = (number == 2) ? "rock" : (number == 1) ? "paper" : "scissors";
    return choice;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let endGame = () => {
    if(playerScore > computerScore) return roundMessage.textContent = "You won the game!";
    return roundMessage.textContent = "You lost the game.";
};

let playerChoice = '';
let selection = document.querySelector('.selection');
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
    if(playerScore < 3 && computerScore < 3) playRound();
});

let roundDisplay = document.querySelector('#round');
let roundMessage = document.querySelector('#roundMessage');
let playerDisplay = document.querySelector('#playerScore');
let computerDisplay = document.querySelector('#computerScore');

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
    roundDisplay.textContent = "Round: " + currentRound;
    playerDisplay.textContent = "Player score: " + playerScore;
    computerDisplay.textContent = "Computer score: " + computerScore;
    if(playerScore == 3 || computerScore == 3) endGame();
    return;
}