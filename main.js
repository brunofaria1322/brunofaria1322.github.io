"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){
    var navColors = [["#F2A4A0", "#F87A7B", "#FFFFFF"], ["#B0D6D7", "#2B97A4", "#373d3e"]]
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
}