"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let scrolling= false;

    function scroll( down){
        window.scrollBy(0, down? -vh : vh);
    }

    function scrollHandler(ev) {
        console.log(ev.deltaY);
        if (scrolling) {
            if (!ev.deltaY){    //scrolling ends with delta = 0 or -0 / prevents from double scrolling
                
                console.log("pipi parou");
                scrolling = false;
            }
        }
        else{
            scrolling=true;
            scroll(ev.deltaY<0? true : false)   //true if down, false if up
        }
    }
    window.addEventListener('wheel', scrollHandler);
}