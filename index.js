const prevValueDisplay = document.querySelector('.prev-value');
const currValueDisplay = document.querySelector('.current-value');
const operator = document.querySelector('.operator');
const buttons = document.querySelectorAll('button');

let prevVal = '0';
let currVal = '';
let operation = '';
let result = '';

function updateDisplay(){

    prevValueDisplay.textContent = prevVal;
    currValueDisplay.textContent = currVal;
}

function handleNumberClick(number){

    if (currVal === '' && number === '0'){
        return;
    }

    if (number === '.' && currVal.includes('.')){
        return;
    }

    currVal += number;
    updateDisplay();
}

function clearCalculator(){
    prevVal = '0';
    currVal = '';
    operation = '';
    updateDisplay();
}

function handleOperator(op){
    if (currVal === '') return;

    if (prevVal !== ''){
        operate();
    }

    operation = op;
    prevVal = currVal;
    currVal = '';
    updateDisplay();

}

function handleEqual(){
    if (currVal === '' || prevVal === '' || operation === ''){
        return;
    }

    operate();
    operation = '';
    prevVal = '';
    updateDisplay();
}

function operate(){
    const prev = parseFloat(prevVal);
    const curr = parseFloat(currVal);

    switch(operation){
        case '+':
            currVal = prev + curr;
            break;
        case '-':
            currVal = prev - curr;
            break;
        case 'X':
            currVal = prev * curr;
            break;
        case '/':
            if (curr === 0){
                result = 'Error';
            }
            else{
                currVal = prev / curr;
            }
            break;
        case '%':
            currVal = prev % curr;
            break;
        default:
            return;
    
    }

    currVal = currVal.toString();
    prevVal = '';
}




buttons.forEach(button =>{
    button.addEventListener('click', function(){
        const value = button.textContent;

        if(!isNaN(value) || value === '.'){
            handleNumberClick(value);
        }
        else if (value === 'C'){
            clearCalculator();
        }
        else if (value === 'DEL'){
            currVal = currVal.slice(0,-1);
            updateDisplay();
        }
        else if (value === '='){
            handleEqual();
        }
        else{
            handleOperator(value);
        }
        
    });
});