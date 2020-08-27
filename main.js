"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){
    var navColors = [["#F2A4A0", "#F87A7B", "#FFFFFF"], ["#B0D6D7", "#2B97A4", "#596466"]]
    var defaultNav = true;

    function changeNav(colors){
        document.documentElement.style.setProperty('--nav-normal', colors[0]);
        document.documentElement.style.setProperty('--nav-selected', colors[1]);
        document.documentElement.style.setProperty('--nav-text', colors[2]);
    }

    
    /*
    var scrollHandler = function (){

    }
    */


    //  in viewport

    let allElements = document.getElementsByTagName("section");
    let windowHeight = window.innerHeight;
    const elems = () => {
        for (let i = 0; i < allElements.length; i++) {  //  loop through the sections
            let viewportOffset = allElements[i].getBoundingClientRect();  //  returns the size of an element and its position relative to the viewport
            let top = viewportOffset.top;  //  get the offset top
            if(top < windowHeight*7/16){  //  if the top offset is less than the window height
                allElements[i].classList.add('in-viewport');  //  add the class
            } else{
                allElements[i].classList.remove('in-viewport');  //  remove the class
            }
        }
    }
    elems();
    window.addEventListener('scroll', elems);



    //  onscroll

    const dotActive = () => {
        var allVis = document.getElementsByClassName('in-viewport');
        var allDots = document.getElementsByClassName('dots');
        var visNum = allVis.length;
        let a = visNum - 1;
        for (let i = 0; i < allElements.length; i++) {
            allDots[i].parentElement.classList.remove('selected-nav');
        }
        if ((a == 1 || a==2) && defaultNav){
            changeNav(navColors[1]);
            defaultNav = false;
        }
        else if ((a != 1 && a!=2) && !defaultNav){
            changeNav(navColors[0]);
            defaultNav = true;
        }
        document.getElementById('dot-' + a).parentElement.classList.add('selected-nav');
    }

    
    dotActive();
    window.onscroll = function(){ dotActive(); };
}