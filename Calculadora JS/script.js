let currentOperand = '0';
let previousOperand = '';
let operation = null;
let waitingForOperand = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function appendNumber(number) {
    if (waitingForOperand || currentOperand === '0') {
        currentOperand = number;
        waitingForOperand = false;
    } else {
        currentOperand = currentOperand === '0' ? number : currentOperand + number;
    }
    
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }
    
    updateDisplay();
}

function appendOperator(nextOperation) {
    const inputValue = parseFloat(currentOperand);
    
    if (previousOperand === '' && !isNaN(inputValue)) {
        previousOperand = inputValue;
    } else if (operation) {
        const result = performCalculation();
        
        currentOperand = `${parseFloat(result.toFixed(7))}`;
        previousOperand = result;
    }
    
    waitingForOperand = true;
    operation = nextOperation;
    updateDisplay();
}

function performCalculation() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) {
        return current;
    }
    
    let result = 0;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Não é possível dividir por zero!');
                return prev;
            }
            result = prev / current;
            break;
        case '%':
            result = prev / 100;
            break;
        default:
            return current;
    }
    
    return result;
}

function calculate() {
    const result = performCalculation();
    
    currentOperand = `${parseFloat(result.toFixed(7))}`;
    previousOperand = '';
    operation = null;
    waitingForOperand = true;
    
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    waitingForOperand = false;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length > 1) {
        currentOperand = currentOperand.slice(0, -1);
    } else {
        currentOperand = '0';
    }
    updateDisplay();
}

function handleKeyboardInput(event) {
    const key = event.key;
    
    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    }
    else if (key === '+') {
        appendOperator('+');
    }
    else if (key === '-') {
        appendOperator('-');
    }
    else if (key === '*') {
        appendOperator('×');
    }
    else if (key === '/') {
        event.preventDefault();
        appendOperator('÷');
    }
    else if (key === '%') {
        appendOperator('%');
    }
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    else if (key === 'Escape' || key === 'Delete') {
        clearAll();
    }
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
}

document.addEventListener('keydown', handleKeyboardInput);

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});
