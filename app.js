/*-------------------------------- Constants --------------------------------*/
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button');


/*-------------------------------- Variables --------------------------------*/
let leftSide = '';
let rightSide = '';
let operator;
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
const button = document.querySelectorAll('.button')

//apply the click event handler to all the buttons
buttons.forEach((button) => button.addEventListener('click', handleCalculator));
/*-------------------------------- Functions --------------------------------*/

const reset = () => {
    leftSide = ''
    rightSide = ''
    operator = undefined
}

const resetRightSide = () => rightSide = ''

const solveTheProblem = problemToSolve => display.textContent = eval(problemToSolve).toLocaleString()

const displayOperation = string => display.textContent = string

const buttonClickedIsNumber = value => { return value >= 0 && value <= 9 }

function handleCalculator(event) {
    // This log is for testing purposes to verify we're getting the correct value
    const clickedButtonValue = event.target.innerText

    // Future logic to capture the button's value would go here...
    
    if(clickedButtonValue === 'C') {
        //reset values
        reset();
        //reset display
        display.innerText = 0

    } else if (clickedButtonValue === '=') { //if the button is = then you want to provide an answer
      
        //turns out eval does not like ÷ string so have to turn it back to / so eval can process
        //and x to *
      if(operator === '÷') operator = '/'
      if(operator === 'x') operator = '*'

      solveTheProblem(`${leftSide} ${operator} ${rightSide}`)
      reset()
    }
    //if clickeButtonValue is a string number then keep adding it to leftSide
    else if(clickedButtonValue >= 0 && clickedButtonValue <= 9  && operator === undefined) {
      leftSide += clickedButtonValue
      displayOperation(leftSide)

    //if the left is populated already and clickedButtonValue is an operator
    } else if ( 
        leftSide !== '' && clickedButtonValue === 'x' ||
        leftSide !== '' && clickedButtonValue === '÷' ||
        leftSide !== '' && clickedButtonValue === '+' ||
        leftSide !== '' && clickedButtonValue === '-') {
        //if the button click is an operation / * - + change operation value
     displayOperation(`${leftSide} ${clickedButtonValue} `) //i added extra space after the operator

     if(clickedButtonValue === '÷') {
      
        resetRightSide()
        displayOperation(`${leftSide} ÷ `)
        operator = clickedButtonValue

     } else if(clickedButtonValue === 'x') {
      
        resetRightSide()
        displayOperation(`${leftSide} x `)
        operator = clickedButtonValue

     } else {
        //if its nott x or ÷ then for sure its + or -
        resetRightSide()
        operator = clickedButtonValue;
     }
    } else if( buttonClickedIsNumber(clickedButtonValue) && operator !== undefined) { //if leftSide and operation and clickedButtonValue is a number then populate rightSide
        
      rightSide += clickedButtonValue
      
      if(operator === '/') displayOperation(`${leftSide} ÷ ${rightSide}`)
         
      else if (operator === 'x') displayOperation(`${leftSide} x ${rightSide}`)

      else {

        if(operator === '/') displayOperation(`${leftSide} ÷ ${rightSide}`)
        else if(operator === 'x') displayOperation(`${leftSide} x ${rightSide}`)
        else displayOperation(`${leftSide} ${operator} ${rightSide}`)
      }

    }
  }


//initially i wanna show 0
display.innerText = 0
// / is ugly
button[3].innerText = '÷'
// * as well
button[7].innerText = 'x'

/*
As a user, I want to be able to select numbers so that I can perform operations with them.
As a user, I want to be able to add two numbers together.
As a user, I want to be able to subtract one number from another.
As a user, I want to be able to multiply two numbers together.
As a user, I want to be able to divide one number by another.
As a user, I want to be able to see the output of the mathematical operation.
As a user, I want to be able to clear all operations and start from 0.

*/