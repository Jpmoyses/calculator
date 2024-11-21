import {animate} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";
// import {animate} from "motion";

let buttons = document.querySelectorAll("button");
let screen = document.querySelector(".screen"); 


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
    if(btn.id != "op"){
        btn.addEventListener("click", () =>{
            const number = btn.innerText;
            let screenNumber = document.createElement("p");
            screenNumber.innerText = number;
            screen.appendChild(screenNumber);
        })
    }
    else{
        btn.addEventListener("click", () =>{
            const number = btn.innerText;
            let screenNumber = document.createElement("p");
            screenNumber.innerText = number;
            screen.appendChild(screenNumber);
        })
    }
})