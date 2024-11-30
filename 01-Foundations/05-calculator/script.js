
// Define variables
let inputA = '';
let inputB = '';
let operator = '';
let resultDisplayed = false;


// Get screen element and setup button listeners
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.button');


function add (numberOne, numberTwo) {
    return numberOne + numberTwo
}

function subtract (numberOne, numberTwo) {
    return numberOne - numberTwo
}

function multiply (numberOne, numberTwo) {
    return numberOne * numberTwo
}

function divide (numberOne, numberTwo) {
    if (numberTwo === 0) {
        return "ERROR";
    }
    return numberOne / numberTwo
}

function operate (operator, numberOne, numberTwo) {
    if (operator === add || operator ===`+`) {
        return add(numberOne, numberTwo)
    }
    else if (operator === subtract || operator === `-`) {
        return subtract(numberOne, numberTwo)
    }
    else if (operator === multiply || operator === `*`) {
        return multiply(numberOne, numberTwo)
    }
    else if (operator === divide || operator === `/`) {
        return divide(numberOne, numberTwo)
    }
}

function clear() {
    inputA = '';
    inputB = '';
    operator = '';
    screen.textContent = '';
}

function delete_character() {
    if (operator === '') {
        inputA = inputA.slice(0, -1);
        screen.textContent = inputA;
    } else {
        inputB = inputB.slice(0, -1);
        screen.textContent = inputA + operator + inputB;
    }
}

function equal_sign() {
    if (inputA !== '' && inputB !== '' && operator !== '') {
        const result = operate(operator, parseFloat(inputA), parseFloat(inputB));
        screen.textContent = result;
        inputA = result.toString();
        inputB = '';
        operator = '';
    }
}


// To Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let value = event.target.dataset.value;

        if (!isNaN(value)) {
            // If no operator has been selected, input goes to inputA
            if (operator === '') {
                inputA += value;
                screen.textContent = inputA;
            } else {
                // input goes to inputB
                inputB += value;
                screen.textContent = inputA + operator + inputB;
            }
        }
        else if (value === 'clear') {
            clear();
        } 
        else if(value === 'delete') {
            delete_character();
        } 
        else if(value === '=') {
            equal_sign();
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            if (inputA !== '' && inputB !== '') {
                equal_sign();
            }
            operator = value;
            screen.textContent = inputA + operator;
        }
         else if (value === '.') {
            // Allow decimal point only if the number doesn't already contain one
            if (operator === '') {
                if (!inputA.includes('.')) {
                    inputA += value;
                    screen.textContent = inputA;
                }
            } else {
                if (!inputB.includes('.')) {
                    inputB += value;
                    screen.textContent = inputA + operator + inputB;
                }
            }
        }
    });
});

// To handle keyboard input
document.addEventListener('keydown', function(event) {
    // Use event.key to get the key that was pressed
    const keyPressed = event.key;

    // Check for numerical keys (0-9)
    if (!isNaN(keyPressed)) {
        // If no operator has been selected, input goes to inputA
        if (operator === '') {
            inputA += keyPressed;
            screen.textContent = inputA;
        } else {
            // input goes to inputB
            inputB += keyPressed;
            screen.textContent = inputA + operator + inputB;
        }
    }
    // Backspace logic
    else if (keyPressed === 'Backspace') {
        delete_character();
    }
    // Equal sign or Enter key
    else if (keyPressed === 'Enter' || keyPressed === '=') {
        equal_sign();
    }
    // Operators (+, -, *, /)
    else if (['+', '-', '*', '/'].includes(keyPressed)) {
        if (inputA !== '' && inputB !== '') {
            equal_sign();
        }
        operator = keyPressed;
        screen.textContent = inputA + operator;
    }
    // Handle decimal point (.)
    else if (keyPressed === '.') {
        // Allow decimal point only if the number doesn't already contain one
        if (operator === '') {
            if (!inputA.includes('.')) {
                inputA += keyPressed;
                screen.textContent = inputA;
            }
        } else {
            if (!inputB.includes('.')) {
                inputB += keyPressed;
                screen.textContent = inputA + operator + inputB;
            }
        }
    }
});
