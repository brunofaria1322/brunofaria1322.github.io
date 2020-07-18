"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){

    let secs = ["Home","About", "Skills", "Work", "Contacts"];
    let current_sec=0;
    let scrolling= false;

    function scroll(down){
        if (down){
            if (current_sec--<0){               //if first section
                current_sec=0;
                return;
            }
        }
        else{
            if (current_sec++>secs.length-1){   //if last section
                current_sec=secs.length-1;
                return;
            }
        }
        var element_to_scroll_to = document.getElementById(secs[current_sec]);
        element_to_scroll_to.scrollIntoView({behavior: 'smooth' });
        //location.hash = "#" + secs[current_sec];
    }

    function scrollHandler(ev) {
        console.log(ev.deltaY);
        if (scrolling) {
            if (!ev.deltaY){    //scrolling starts with deltaY = 0 or -0 / prevents from double scrolling
                
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