console.log("Hello World")
console.log("Welcome to my Scissors, Paper, Rock game!")

// Global Scores
let computerScore = 0
let playerScore = 0 

function getComputerChoice () {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return "scissors"
    } else if (randomNumber === 1) {
        return "paper"
    } else {
        return "rock"
    }
}

function getHumanChoice() {
    const userChoice = prompt("Enter your choice (scissors, paper or rock): ").toLowerCase();
    const validChoices = ["scissors", "paper", "rock"];

    if (!validChoices.includes(userChoice)) {
        console.log("Invalid choice. Please refresh and try again");
        return null;
    }
    return userChoice
}

function returnScoresAndDetermineWinner(computerChoice, playerChoice) {
    console.log(`You chose ${playerChoice}`)
    console.log(`Computer chose ${computerChoice}`)

    if (playerChoice === computerChoice) {
        console.log("It's a tie!");
        return "tie";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock" ) ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        console.log("Player wins!");
        return "Player wins!";
    } else {
        console.log("Computer wins!");
        return "Computer wins!";
        }
    }

function playRound() {
    const computerChoice = getComputerChoice()
    const playerChoice = getHumanChoice()
    
    if (!playerChoice) {
        console.log("Invalid input. Round skipped.");
        return; // Exit the function if input is invalid
    }

        const result = returnScoresAndDetermineWinner(computerChoice, playerChoice)
        
        if (result === "Player wins!") {
            playerScore++;
        } else if (result === "Computer wins!") {
            computerScore++;
        }
        console.log(`Current Score - Player: ${playerScore}, Computer: ${computerScore}`);
  }

function main() {

    let roundCount = 0
    
    while (roundCount < 5) {
        console.log(`Round ${roundCount + 1}`)
        playRound()
        roundCount++;
    }

    console.log("Game Over!");
    console.log(`Final Score - Player Score: ${playerScore}, Computer Score: ${computerScore}`);
}


main();