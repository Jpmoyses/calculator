import {animate} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";
//import {animate, easeOut, easeIn} from "motion";

let buttons = document.querySelectorAll("button");
let screen = document.querySelector(".screen"); 
let numberOfItems = 0;
let totalOfItems = 0;
let totalOperators = 0;
let lastOperator = '';


buttons.forEach((btn) =>{

    // animations
    btn.addEventListener("mouseover", () =>{
        btn.classList.add("mouseover");
        animate(btn, { scale: 1.1 })
    })
    btn.addEventListener("mouseout", () =>{
        btn.classList.remove("mouseover");
        btn.classList.remove("mousedown");
        animate(btn, { scale: 1.0 })
    })
    btn.addEventListener("mousedown", () =>{
        btn.classList.add("mousedown");
    })
    btn.addEventListener("mouseup", () =>{
        btn.classList.remove("mousedown");
    })

    // clear
    if(btn.id == "clear"){
        btn.addEventListener("click", () =>{
            clearAll();
        })
    }

    // numbers
    else if(btn.id != "op"){
        btn.addEventListener("click", () =>{
            if(numberOfItems > 6)return;
            const number = btn.innerText;
            let screenNumber = document.createElement("p");
            screenNumber.setAttribute("id", "num");
            screenNumber.innerText = number;
            screen.appendChild(screenNumber);
            numberOfItems ++;
            totalOfItems++;
            if(totalOfItems >= 14) tooManyNumbers();
            else normalNumbers();
        })
    }

    // operators
    else{
        btn.addEventListener("click", () =>{
            const number = btn.innerText;
            if (totalOperators == 0 && btn.innerText == "=")return;
            totalOperators++;
            if (totalOperators > 1 && btn.innerText != "=") {concatNumbers(lastOperator); totalOperators++;}
            else if(totalOperators > 1 && btn.innerText == "=") concatNumbers(lastOperator);
            
            if(btn.innerText != "="){
                let screenNumber = document.createElement("p");
                screenNumber.innerText = number;
                screen.appendChild(screenNumber);
                lastOperator = btn.innerText;
            }

            console.log(lastOperator);

            numberOfItems = 0;
            if(totalOfItems >= 14) tooManyNumbers();
            else normalNumbers();
        })
    }
})

function tooManyNumbers(){
    let allNumbers = document.querySelectorAll("p");
    allNumbers.forEach((item) =>{
        item.style.fontSize = "40px";
    })
}

function normalNumbers(){
    let allNumbers = document.querySelectorAll("p");
    allNumbers.forEach((item) =>{
        item.style.fontSize = "70px";
    })
}

function clearAll(){
    numberOfItems = 0;
    totalOfItems = 0;

    let allNumbers = document.querySelectorAll("p");
    allNumbers.forEach((item) =>{
        animate(item, { y: [0, -100] }, { ease: "easeOut" });
        animate(item, { opacity: 0});
        setTimeout(() => item.outerHTML = "", 300);
    })
}

function concatNumbers(operator){
    let allNumbers = document.querySelectorAll("p");
    let num1 = '';
    let num2 = '';
    let i = 0;
    let x = 0;
    
    allNumbers.forEach((item) =>{
        if(item.id != "num") i++; x++;
        if(i == 0) num1 = num1.concat(item.innerText);
        else if(x > 1 && i > 0)  num2 = num2.concat(item.innerText);
    });
    

    totalOperators = 0;

    console.log(operator);
    
    let totalCount = operate(Number(num1), operator, Number(num2));
    console.log(totalCount);
    
    clearAll();
    let newNum = document.createElement("p");
    newNum.setAttribute("id", "num");
    newNum.innerText = totalCount;
    screen.appendChild(newNum);
}



function operate(num1, operator, num2){
    console.log(num1, operator, num2);
    if(operator == "+") return num1 + num2;
    if(operator == "-") return num1 + num2;
    if(operator == "*") return num1 * num2;
    if(operator == "/") return num1 / num2;
    else return 0;
}


//max 2 operator
//make = button