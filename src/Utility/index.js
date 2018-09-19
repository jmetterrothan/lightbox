const keys = { 37: true, 38: true, 39: true, 40: true };

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

const openFullscreen = ($elem) => {
    if ($elem.requestFullscreen) {
        $elem.requestFullscreen();
    } else if ($elem.mozRequestFullScreen) { /* Firefox */
        $elem.mozRequestFullScreen();
    } else if ($elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        $elem.webkitRequestFullscreen();
    } else if ($elem.msRequestFullscreen) { /* IE/Edge */
        $elem.msRequestFullscreen();
    }
};

const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
};

export default {
    disableScroll,
    enableScroll,
    openFullscreen,
    closeFullscreen,
};
