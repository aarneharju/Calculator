// Console.log shortcut
const c = console.log;

// Setup node links
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');
const displayOperator = document.querySelector('#display-operator');
const displayNumber = document.querySelector('#display-number');
const calculatorEquals = document.querySelector('#calculator-equals');
const calculatorClear = document.querySelector('#calculator-clear');
const calculatorDecimal = document.querySelector('#calculator-decimal');
const calculatorPercent = document.querySelector('#calculator-percent');
const calculatorPlusMinus = document.querySelector('#calculator-plusminus');
const calculatorNumbers = document.querySelectorAll('.calculator-number');
const calculatorOperators = document.querySelectorAll('.calculator-operator');
const calculatorButtons = document.querySelectorAll('.calculator-button');

// Dirrrty globalish variables
let nextOperator = null;
let savedNumber = null;
let currentNumber = 0;
let equalsClicked = null;
let operatorClicked = false;

// Show calculator's initial state
displayNumber.innerText = currentNumber;

// Calculate variable that launches the correct function depending on the operator string it receives
const calculateObject = {
    'add': (value1, value2) => value1 + value2,
    'subtract': (value1, value2) => value1 - value2,
    'multiply': (value1, value2) => value1 * value2,
    'divide': (value1, value2) => value1 / value2
}

// Add event listeners

// Add listeners for number button clicks
calculatorNumbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (equalsClicked) {
            displayNumber.innerText = event.target.innerText;
            nextOperator = null;
            operatorClicked = false;
            equalsClicked = null;
            savedNumber = null;
            currentNumber = null;
        } else if (operatorClicked) {
            displayOperator.innerText = '';
            displayNumber.innerText = event.target.innerText;
            operatorClicked = false;
        } else {
            Number(displayNumber.innerText) === 0 || equalsClicked ? displayNumber.innerText = event.target.innerText : displayNumber.innerText += event.target.innerText;
        }
        c('calculatorNumber: ', { savedNumber }, { currentNumber }, { nextOperator }, { operatorClicked }, { equalsClicked });
    });
});

// Add listeners for operator button clicks
calculatorOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        currentNumber = Number(displayNumber.innerText);
        nextOperator = event.target.getAttribute('value');
        displayOperator.innerText = event.target.innerText;
        if (savedNumber) {
            if (equalsClicked) {
                savedNumber = currentNumber;
                equalsClicked = null;
            } else {
                savedNumber = calculateObject[nextOperator](savedNumber, currentNumber, nextOperator);
            }
        } else {
            savedNumber = currentNumber;

        }
        operatorClicked = true;
        displayNumber.innerText = savedNumber;
        c('calculatorOperator: ', { savedNumber }, { currentNumber }, { nextOperator }, { operatorClicked }, { equalsClicked });
    });
});

// Add listener for clear button clicks
calculatorClear.addEventListener('click', (event) => {
    displayOperator.innerHTML = '';
    displayNumber.innerHTML = '0';
    savedNumber = null;
    currentNumber = null;
    nextOperator = null;
    equalsClicked = null;
    operatorClicked = false;
});

// Add listener for decimal button clicks
calculatorDecimal.addEventListener('click', (event) => {
    if (!displayNumber.innerText.includes('.')) displayNumber.innerText += '.';
});

// Add listener for equals button clicks
calculatorEquals.addEventListener('click', (event) => {
    if (!equalsClicked) currentNumber = Number(displayNumber.innerText);
    equalsClicked = true;
    if (savedNumber && currentNumber && nextOperator) {
        calculationResult = calculateObject[nextOperator](savedNumber, currentNumber, nextOperator);
        displayNumber.innerText = calculationResult;
        savedNumber = calculationResult;
    }
});

// Add listener for percent button clicks
calculatorPercent.addEventListener('click', (event) => {
    displayNumber.innerText = Number(displayNumber.innerText) / 100;
    savedNumber = Number(displayNumber.innerText);
    currentNumber = savedNumber;
});

// Add listener for plus / minus button clicks
calculatorPlusMinus.addEventListener('click', (event) => {
    displayNumber.innerText = Number(displayNumber.innerText) * -1;
    currentNumber = savedNumber;
});