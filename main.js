"use strict";

(function(){
    window.addEventListener("load", main);
}());


function main(){

    let secs = ["Home","About", "Skills", "Work", "Contacts"];
    for (let i= 0; i<secs.length; i++){
        secs[i]=document.getElementById(secs[i])
    }
    let current_sec=0;
    let scrolling= false;

    function scroll(down){
        if (down){
            if (--current_sec<0){               //if first section
                current_sec=0;
                return;
            }
        }
        else{
            if (++current_sec>secs.length-1){   //if last section
                current_sec=secs.length-1;
                return;
            }
        }
        
        console.log(secs[current_sec]);
        secs[current_sec].scrollIntoView({block: 'start', behavior: 'smooth' });
    }

    function scrollHandler(ev) {
        if (scrolling) {
            if (!ev.deltaY){    //scrolling starts with deltaY = 0 or -0 / prevents from double scrolling
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