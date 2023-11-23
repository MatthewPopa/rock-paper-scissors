
function getComputerChoice() {
    let number = getRandomInt(3);
    let choice = (number == 2) ? "rock" : (number == 1) ? "paper" : "scissors";
    return choice;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getPlayerChoice() {
    return prompt(`Please type either "rock", "paper", or "scissors" to choose.`).toLowerCase();
}

function game(){
    let playerScore = 0;
    let computerScore = 0;
    let currentRound = 0;
    function playRound(player, computer) {
        player = getPlayerChoice();
        computer = getComputerChoice();
        currentRound++;
        if(player == "rock"){
            if(computer == "rock"){
                console.log("You tie! You both picked rock.");
            }
            if(computer == "paper"){
                console.log("You lose! Paper beats rock.");
                computerScore++;
            }
            if(computer == "scissors"){
                console.log("You win! Rock beats scissors.");
                playerScore++;
            }
        } else if(player == "paper"){
            if(computer == "rock"){
                console.log("You win! Paper beats rock.");
                playerScore++;
            }
            if(computer == "paper"){
                console.log("You tie! You both picked paper.");
            }
            if(computer == "scissors"){
                console.log("You lose! Scissors beats paper.");
                computerScore++;
            }
        } else if(player == "scissors"){
            if(computer == "rock"){
                console.log("You lose! Rock beats scissors.");
                computerScore++;
            }
            if(computer == "paper"){
                console.log("You win! Scissors beats paper.");
                playerScore++;
            }
            if(computer == "scissors"){
                console.log("You tie! You both picked scissors.");
            }
        } else {
            alert(`You entered something other than "rock", "paper", or "scissors". Please try again.`);
            currentRound--;
            playRound();
            return;
        }
        console.log("Round: " + currentRound + ". Player chose: " + player + ". Computer chose: " + computer + ".");
        return;
    }
    while(playerScore < 3 && computerScore < 3) {
            playRound();
            console.log("Score: Player: " + playerScore + ". Computer: " + computerScore + ".")
        }
}

game();