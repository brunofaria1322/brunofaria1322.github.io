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
        nav.classList.toggle('opened');
    }

    //------------------Work FullScreen------------------//

    var works = document.getElementsByClassName("work");

    const overlay= document.getElementById("full-screen-work"); //full box -> [img, h1, p, a (repository), exit_img]
    const work_descriptions = ["SCHOLL PROJECT - GROUP: A web application that, from a musical lyrics created by the user, generates a melody that accompanies it, taking into account its metrics and feeling.This app was built using, mainly, react.js and node.js. We also used figma for prototyping the UI, Photoshop for the social media posts, VSCode as the text editor and git for version controll. The goal of the project was to reach the maximum number of people, both users of the app and followers on social networks, and we even had some articles written about the app.",
                                "This website was built as a portfolio/curriculum in order to compile my skils and work. It was built in pure JS as well with HTML5 and CSS3.",
                                "Later...",
                                "Later...",
                                "Later...",
                                "SCHOLL PROJECT - GROUP: A browser game based in the life of a freshman in the University of Coimbra using ECMAScript with HTML and CSS. Te goal of this project was to learn more about web and multimedia programming."];    
    const work_github_links= [null,
                                "https://github.com/brunofaria1322/brunofaria1322.github.io",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/"];

    const work_web_links= ["https://lowkey-app.com/",
                                "brunofaria1322.github.io",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/",
                                "https://github.com/brunofaria1322/"];

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
        if(work_github_links[num]){
            overlay.children[3].children[0].href =  work_github_links[num];
        }else{
            overlay.children[3].children[0].className = "inactive";
        }

        if(work_web_links[num]){
            overlay.children[3].children[1].href =  work_web_links[num];
        }else{
            overlay.children[3].children[1].className = "inactive";
        }

        overlay.children[1].textContent= h1.textContent;
        overlay.children[2].textContent= work_descriptions[num];
        
        //to end previos changes and not enter on transition
        setTimeout(fullScreen, 1);
    }

    function fullScreen(){
        overlay.parentElement.classList.toggle('full-screen');
        
        overlay.children[4].addEventListener("click", exitFullScreen);
    }

    function exitFullScreen(){   
        overlay.parentElement.classList.toggle('full-screen');

        overlay.children[0].src = "";
        
        overlay.children[0].style.height= "0px";
        overlay.children[0].style.width= "0px";

        overlay.children[1].textContent= "";
        overlay.children[2].textContent= "";

        
        overlay.children[3].children[0].className = "";
        overlay.children[3].children[1].className = "";
        

        overlay.children[4].removeEventListener("click", exitFullScreen);

    }
}