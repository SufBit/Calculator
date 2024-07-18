const prevValueDisplay = document.querySelector('.prev-value');
const currValueDisplay = document.querySelector('.current-value');
const operator = document.querySelector('.operator');
const buttons = document.querySelectorAll('button');

let prevVal = '0';
let currVal = '';
let operation = '';
let result = '';
let newInput = false;

function updateDisplay(){

    prevValueDisplay.textContent = prevVal;
    currValueDisplay.textContent = currVal ;
}

function handleNumberClick(number){

    if(newInput){
        currVal = '';
        newInput = false;
    }

    if (currVal === '0' && number === '0'){
        return;
    }

    if (currVal === '0' && number !== '.') {
        currVal = '';
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
    newInput = false;
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
    newInput = false;
    updateDisplay();

}

function handleEqual(){
    if (currVal === '' || prevVal === '' || operation === ''){
        return;
    }

    operate();
    operation = '';
    prevVal = currVal;
    newInput = true;
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
                currVal = 'Error';
                prevVal = '';
                operation = '';
                return;
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