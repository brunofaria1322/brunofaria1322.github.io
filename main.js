"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){

    //------------------Home Background------------------//

    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext('2d');

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var streams = [];
    var fadeInterval = 1.5;
    var symbolSize = 20;

    class Symbol{
        constructor(x, y, speed, darker, opacity) {
            this.x = x;
            this.y = y;
            
            if (darker){
                this.color = "rgba(248, 122, 123,";
            }
            else{
                this.color = "rgba(242, 164, 160,"
            }

            this.speed = speed;
            this.opacity = opacity;
            
            this.zero = (Math.random()<0.5) ? true : false;
        }

        render() {
            this.y = (this.y >= canvas.height) ? 0 : this.y += this.speed;
            this.zero = (Math.random()<0.1) ? (!this.zero) : this.zero; 

            this.draw();
        }

        draw(){
            var number = (this.zero)? '0' : '1';

            ctx.fillStyle = this.color + (this.opacity/255).toString()+")";
            ctx.fillText(number , this.x, this.y);

        }
        
    }

    class Stream{
        constructor(x,y){
            this.x = x;
            this.symbols = [];

            this.y = y;
            this.totalSymbols = getRandom(5, 35);
            this.speed = getRandom(5, 20);

            //generate Symbols
            var opacity = 255;
            var darker = Math.random() <.25;
            for (var i =0; i <= this.totalSymbols; i++) {
                var symbol = new Symbol(x,y,this.speed,darker,opacity);
                this.symbols.push(symbol);
                opacity -= (255 / this.totalSymbols)/fadeInterval;
                y -= symbolSize;
            }
        }

      
        render() {
            for (let i = 0; i< this.symbols.length; i++){
                this.symbols[i].render();
            }
        }
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
    
    //initializing streams
    for (var x = 0; x <= canvas.width; x += symbolSize) {
        var stream = new Stream(x, getRandom(-2000, 0));
        streams.push(stream);
    }

    ctx.font = "18px p";

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    

        for (let i = 0; i< streams.length; i++){
            streams[i].render();
            
        }
    }

    setInterval(render, 50);   //renders every .05 s (20 fps)

    //------------------------NAV------------------------//

    const navColors = [["#F2A4A0", "#F87A7B", "#FFFFFF"], ["#B0D6D7", "#2B97A4", "#373d3e"]]
    var defaultNav = true;  //true if pink / false if green

    function changeNav(colors){
        document.documentElement.style.setProperty('--nav-normal', colors[0]);
        document.documentElement.style.setProperty('--nav-selected', colors[1]);
        document.documentElement.style.setProperty('--nav-text', colors[2]);
    }

    var lastSec = 1;    //number of last section (for unselecting)
    var currentSec = 1; //number of current section
    
    var dots = document.getElementsByClassName('dots');
    var sections = document.getElementsByTagName("section");
    let windowHeight = window.innerHeight;

    var scrollHandler = function (){
        var tempSec = 0;
        for (let i = 0; i < sections.length; i++) {
            let top = sections[i].getBoundingClientRect().top;  // gets the top offset
            if(top < windowHeight*7/16){
                tempSec ++;
            } else{
                break;
            }
        }
        if (currentSec!=tempSec){
            lastSec = currentSec;
            currentSec = tempSec;

            fixDots();
        }
    }
    scrollHandler();
    fixDots();
    window.addEventListener('scroll', scrollHandler);


    function fixDots() {
        let num = currentSec - 1;
        dots[lastSec-1].parentElement.classList.remove('selected-nav');  //uselect last "button"

        if ((num == 1 || num==2) && defaultNav){
            changeNav(navColors[1]);
            defaultNav = false;
        }
        else if ((num != 1 && num!=2) && !defaultNav){
            changeNav(navColors[0]);
            defaultNav = true;
        }

        dots[num].parentElement.classList.add('selected-nav');
    }
    //------------------Responsive Nav ------------------//
    

    var svg = document.getElementsByTagName("svg")[0];
    var nav = document.getElementsByTagName("nav")[0];
    
    svg.addEventListener("click", openCloseNav);

    function openCloseNav() {
        nav.classList.toggle('opened')
    }

    //------------------Work FullScreen------------------//

    var works = document.getElementsByClassName("work");

    const overlay= document.getElementById("full-screen-work"); //full box -> [img, h1, p, a (repository), exit_img]
    const work_descriptions = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"];    
                
    for (var i=0; i<works.length; i++){
        works[i].addEventListener("click", clickHandler)
    }

    function clickHandler(ev){
        var clicked_element;

        for (var i=0; i<ev.path.length; i++){
            if (ev.path[i].className == "work"){
                clicked_element=ev.path[i];
                break;
            }
        }
        
        var num = parseInt(clicked_element.id[clicked_element.id.length - 1]) - 1;
        var img = clicked_element.children[0];
        var h1 = clicked_element.children[1].children[0];

        //at

        overlay.children[0].style.height= clicked_element.clientHeight.toString()+"px";
        overlay.children[0].style.width= clicked_element.clientWidth.toString()+"px";
        overlay.children[0].style.left= clicked_element.offsetLeft.toString()+"px";
        overlay.children[0].style.top= (clicked_element.getBoundingClientRect().top).toString()+"px";
        

        overlay.children[0].src= img.src;

        overlay.children[1].textContent= h1.textContent;
        overlay.children[2].textContent= work_descriptions[num];
        
        //to end previos changes and not enter on transition
        setTimeout(fullScreen, 1);;
    }

    function fullScreen(){

        overlay.style.transition = "0.5s ease";
        overlay.children[0].style.transition = ".9s ease";

        overlay.style.left = "0px";
        overlay.style.height= "100vh";
        overlay.style.width= "100vw";

        overlay.children[0].style.width="40%";
        overlay.children[0].style.height="90%";

        overlay.children[0].style.left="1%";
        overlay.children[0].style.top="5%";
        overlay.children[0].style.transform="scale(0.9)";

        overlay.children[3].style.height= "40px";
        overlay.children[3].style.width= "40px";

        overlay.children[3].children[0].style.height= "40px";
        overlay.children[3].children[0].style.width= "40px";

        overlay.children[4].style.height= "35px";
        overlay.children[4].style.width= "35px";
        overlay.children[4].style.left="95%";
        
        overlay.children[4].addEventListener("click", exitFullScreen);
    }

    function exitFullScreen(){   

        overlay.children[0].src = "";

        overlay.children[1].textContent= "";
        overlay.children[2].textContent= "";
        
        
        overlay.style.transition = "none";
        overlay.children[0].style.transition = "none";

        overlay.style.left = "100vw";
        overlay.style.height= "0px";
        overlay.style.width= "0px";
        
        overlay.children[0].style.height= "0px";
        overlay.children[0].style.width= "0px";

        overlay.children[0].style.left= "100vw";
        overlay.children[0].style.transform="scale(1)";

        overlay.children[3].style.height= "0px";
        overlay.children[3].style.width= "0px";

        overlay.children[3].children[0].style.height= "0px";
        overlay.children[3].children[0].style.width= "0px";
        
        overlay.children[4].style.height= "0px";
        overlay.children[4].style.width= "0px";
        overlay.children[4].style.left= "100vw";

        overlay.children[4].removeEventListener("click", exitFullScreen);

    }
}