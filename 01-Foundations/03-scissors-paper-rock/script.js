console.log("Hello World")
console.log("Welcome to my Scissors, Paper, Rock game!")

// Global Scores
let computerScore = 0
let playerScore = 0 

const resultsDiv = document.createElement('div');
const scoreDiv = document.createElement('div');
const container = document.querySelector("#container");

// Results
resultsDiv.id = 'results';
scoreDiv.id = 'score';
container.appendChild(resultsDiv);
container.appendChild(scoreDiv);


// Buttons for player choice creation
const buttons = ['scissors', 'paper', 'rock'];
buttons.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', () => playRound(choice));
    container.appendChild(button);
});

// Computer choice logic
function getComputerChoice() {
    const choices = ['scissors', 'paper', 'rock'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Determine round winner
function determineWinner(computerChoice, playerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock' ) ||
        (playerChoice === 'scissors' && computerChoice === 'paper') 
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

// Logic to play a round
function playRound(playerChoice) {
    // Will end the game if someone wins
    if (playerScore >= 5 || computerScore >= 5) return;

    const computerChoice = getComputerChoice()
    const winner = determineWinner(computerChoice, playerChoice);

    // Update scores
    if (winner === 'player') {
        playerScore++;
        resultsDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. You win this round!`;
      } else if (winner === 'computer') {
        computerScore++;
        resultsDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. Computer wins this round!`;
      } else {
        resultsDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. It's a tie!`;
      }
    
      // Update running score
      scoreDiv.textContent = `Score: Player ${playerScore} - Computer ${computerScore}`;
    
      // Check if there's a winner
      if (playerScore === 5) {
        resultsDiv.textContent += " Congratulations! You won the game!";
        disableButtons();
      } else if (computerScore === 5) {
        resultsDiv.textContent += " Game over! Computer wins!";
        disableButtons();
      }
    }
    
    // Function to disable buttons after game over
    function disableButtons() {
      document.querySelectorAll('button').forEach(button => {
        button.disabled = true;
      });
    
}