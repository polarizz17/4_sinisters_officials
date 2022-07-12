//declairing variables
let ham = document.getElementById("ham");
let lgnav  = document.getElementById("lgnav");

//handling hamburger
ham.addEventListener('click',()=>{
 if (ham.src.match("../img/ham.svg")) {
    lgnav.classList.remove("-translate-x-[100rem]");
    lgnav.classList.add("translate-x-0");
    ham.src = "../img/x.svg"
 }
 else{
  lgnav.classList.remove("translate-x-0");
  lgnav.classList.add("-translate-x-[100rem]");
   ham.src = "../img/ham.svg"
 }
});