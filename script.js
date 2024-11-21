import {animate} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";
// import {animate} from "motion";

let buttons = document.querySelectorAll("button");
let screen = document.querySelector(".screen"); 
let numberOfItems = 0;
let totalOfItems = 0;


buttons.forEach((btn) =>{
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
    if(btn.id == "clear"){
        btn.addEventListener("click", () =>{
            numberOfItems = 0;
            totalOfItems = 0;
            clearAll();
        })
    }
    else if(btn.id != "op"){
        btn.addEventListener("click", () =>{
            if(numberOfItems > 6)return;
            const number = btn.innerText;
            let screenNumber = document.createElement("p");
            screenNumber.innerText = number;
            screen.appendChild(screenNumber);
            numberOfItems ++;
            totalOfItems++;
            if(totalOfItems >= 14) tooManyNumbers();
            else normalNumbers();
        })
    }
    else{
        btn.addEventListener("click", () =>{
            const number = btn.innerText;
            let screenNumber = document.createElement("p");
            screenNumber.innerText = number;
            screen.appendChild(screenNumber);
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
    let allNumbers = document.querySelectorAll("p");
    allNumbers.forEach((item) =>{
        item.outerHTML = "";
    })
}