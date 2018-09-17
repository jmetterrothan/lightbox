
const keys = {37: false, 38: false, 39: true, 40: true};

const preventDefault = (e) => {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
};

const preventDefaultForScrollKeys = (e) => {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};

const disableScroll = () => {
    if (window.addEventListener) {
        // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    }

    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
};

const enableScroll = () => {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }

    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
};

export default {
    disableScroll,
    enableScroll,
};
