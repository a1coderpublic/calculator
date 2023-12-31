let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let resetScreen = false;

const display = document.querySelector('#display');

const updateDisplay = () => {
    display.value = secondOperand;
};

const appendNumber = (number) => {
    if (resetScreen) {
        display.value = '';
        resetScreen = false;
    }
    secondOperand = secondOperand.toString() + number.toString();
};

const chooseOperation = (operator) => {
    if (secondOperand === '') return;
    if (firstOperand !== '') {
        compute();
    }
    currentOperator = operator;
    firstOperand = secondOperand;
    secondOperand = '';
};

const compute = () => {
    let computation;
    console.log(firstOperand, secondOperand, currentOperator)
    const prev = parseFloat(firstOperand);
    const current = parseFloat(secondOperand);
    console.log(firstOperand, secondOperand, currentOperator)
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    firstOperand = secondOperand
    secondOperand = computation;
    
};

const clear = () => {
    firstOperand = '';
    secondOperand = '';
    currentOperator = undefined;
};

document.querySelector('#buttons').addEventListener('click', (button) => {
    if (button.target.matches('button')) {
        const action = button.target.value;
        console.log(action)
        switch (action) {
            case '+':
            case '-':
            case '*':
            case '/':
                chooseOperation(action);
                break;
            case '=':
                compute();
                updateDisplay();
                break;
            case 'AC':
                clear();
                updateDisplay();
                break;
            default:
                if (Number.isInteger(parseFloat(action))) {
                    appendNumber(action);
                    updateDisplay();
                }
        }
    }
});
//js logic here