let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let shouldResetScreen = false;

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            setOperator(button.value);
        } else if (button.id === 'clear') {
            resetCalculator();
        } else if (button.id === 'plus-minus') {
            toggleSign();
        } else if (button.id === 'comma') {
            appendDecimal();
        } else {
            appendNumber(button.value);
        }
    });
});

function appendNumber(number) {
    if (display.value === '0' || shouldResetScreen) resetScreen();
    display.value += number;
}

function resetScreen() {
    display.value = '';
    shouldResetScreen = false;
}

let previousOperator = '';
let previousOperand = '';

function setOperator(operator) {
    if (currentOperator !== '') calculate();
    if (operator === '=') {
        if (previousOperator !== '') {
            currentOperator = previousOperator;
            firstOperand = display.value;
            secondOperand = previousOperand;
        } else {
            currentOperator = operator;
            secondOperand = display.value;
        }
    } else {
        firstOperand = display.value;
        currentOperator = operator;
    }
    shouldResetScreen = true;
}

function calculate() {
    if (currentOperator === '') return;
    if (currentOperator === '/' && display.value === '0') {
        alert("You can't divide by 0!");
        resetCalculator();
        return;
    }
    if (currentOperator === '=') {
        firstOperand = display.value;
        console.log(currentOperator, firstOperand, secondOperand);
        display.value = operate(currentOperator, firstOperand, secondOperand);
        firstOperand = display.value;
        secondOperand = display.value;
        previousOperator = currentOperator;
        previousOperand = secondOperand;
    } else {
        secondOperand = display.value;
        display.value = operate(currentOperator, firstOperand, secondOperand);
        firstOperand = display.value;
        previousOperator = currentOperator;
        previousOperand = secondOperand;
    }
    shouldResetScreen = true;
}

function resetCalculator() {
    display.value = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
}

function toggleSign() {
    display.value = parseFloat(display.value) * -1;
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen();
    if (display.value.includes('.')) return;
    display.value += '.';
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}
