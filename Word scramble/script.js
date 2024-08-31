// script.js
let randomNumber;
let attempts;
const min = 1;
const max = 100;

// Get DOM elements
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const minSpan = document.getElementById('min');
const maxSpan = document.getElementById('max');

function initializeGame() {
    // Generate a new random number within the specified range
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 0;
    
    // Reset feedback and input field
    feedback.textContent = '';
    attemptsDisplay.textContent = '';
    guessInput.value = '';
    
    // Enable the guess button
    guessButton.disabled = false;
    
    // Display the current range
    minSpan.textContent = min;
    maxSpan.textContent = max;
    
    // Focus on the input field
    guessInput.focus();
}

function checkGuess() {
    const userGuess = Number(guessInput.value);
    
    // Validate that the input is not empty and is a number
    if (guessInput.value.trim() === '' || isNaN(userGuess)) {
        feedback.textContent = 'Please enter a valid number.';
        return;
    }
    
    // Ensure that the user's guess is within the specified range
    if (userGuess < min || userGuess > max) {
        feedback.textContent = `Please enter a number between ${min} and ${max}.`;
        return;
    }

    attempts++;

    if (userGuess === randomNumber) {
        feedback.textContent = `Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.`;
        guessButton.disabled = true;
    } else if (userGuess < randomNumber) {
        feedback.textContent = 'Too low! Try again.';
    } else {
        feedback.textContent = 'Too high! Try again.';
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', initializeGame);

// Allow Enter key to submit guess
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game when the page loads
initializeGame();
