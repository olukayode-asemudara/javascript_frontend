const keypads = document.querySelectorAll('.keypad');
const screen = document.querySelector('.screen');

let firstNumber = 0;
let operator ;
let secondNumber = 0;

const handleNumber =(value)=> {
    screen.textContent += value;
}

keypads.forEach(keypad => {
    keypad.addEventListener("click", () => {
        const value = keypad.textContent;

        if (!isNaN(value)) {
            handleNumber(value);
        }
        
        if(value === "C") screen.textContent = "";

        if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/"
        ) {
            handleOperator(value);
        }

        if (value === "=") {
            calculate();
        }
    });
});

const handleOperator =(value)=> {
    firstNumber = Number(screen.textContent);
    operator = value;
    screen.textContent = "";
}

const calculate = () => {
    secondNumber = Number(screen.textContent);
    let result;
    
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = firstNumber / secondNumber;
            break;
    }
    screen.textContent = result;
};