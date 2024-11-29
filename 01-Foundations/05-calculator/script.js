console.log("Hello World")


function add (numberOne, numberTwo) {
    let newValue = numberOne + numberTwo
    return newValue
}

function subtract (numberOne, numberTwo) {
    let newValue = numberOne - numberTwo
    return newValue 
}

function multiply (numberOne, numberTwo) {
    let newValue = numberOne * numberTwo
    return newValue
}

function divide (numberOne, numberTwo) {
    let newValue = numberOne / numberTwo
    return newValue
}

function operate (operator, numberOne, numberTwo) {
    if (operator === add || operator ===`+`) {
        add(numberOne, numberTwo)
    }
    else if (operator === subtract || operator === `-`) {
        subtract(numberOne, numberTwo)
    }
    else if (operator === multiply || operator === `*`) {
        multiply(numberOne, numberTwo)
    }
    else if (operator === divide || operator === `/`) {
        divide(numberOne, numberTwo)
    }
}

