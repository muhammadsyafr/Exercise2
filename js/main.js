// Default calculator state
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplayEqual() {
    const display = document.querySelector('#display-equal');
    display.value = calculator.displayValue; //getobject display value
    console.log(display.value)
}
updateDisplayEqual();

var keys = document.querySelector('#calculator')
keys.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) {
      console.log('bukan button')
      return;
    }
  
    if (target.classList.contains('op')) {
        handleOperator(target.value);
        updateDisplayEqual();
      return;
    }
  
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplayEqual();
        return
    }
  
    if (target.classList.contains('clear')) {
      resetCalculator();
      updateDisplayEqual();
      return;
    }
    inputNumber(target.value);
    updateDisplayEqual();
});

function inputNumber(number) {
    // const { displayValue, waitingForSecondOperand } = calculator;
    //same with
    const displayValue = calculator.displayValue
    const waitingForSecondOperand = calculator.waitingForSecondOperand
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    if (waitingForSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
      }
      console.log(calculator)
}

function inputDecimal(dot){
      if(!calculator.displayValue.includes(dot)){
          calculator.displayValue += dot;
      }
}

function handleOperator(nextoperator){
    // const {firstOperand, displayValue, operator} = calculator
    //same with
    const firstOperand = calculator.firstOperand;
    const displayValue = calculator.displayValue;
    const operator = calculator.operator;
    const inputValue = parseFloat(displayValue);

    if(firstOperand === null){
        calculator.firstOperand = inputValue;
        calculator.waitingForSecondOperand = true
        calculator.operator = nextoperator
    }else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextoperator;
    console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

