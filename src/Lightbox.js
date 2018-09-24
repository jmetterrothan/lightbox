'use strict';

import "babel-polyfill";
import "./Utility/classList.polyfill.min";

import animejs from 'animejs';
import Hammer from 'hammerjs';

import uniqid from 'uniqid';
import objectAssignDeep  from 'object-assign-deep';

import LbElement from './LbElement/LbElement';
import LbImageElement from './LbElement/LbImageElement';
import LbUi from './LbUi/LbUi';
import LbException from './LbException';

import utility from './Utility/index';

class Lightbox {
    constructor(options = {}) {
        this.options = objectAssignDeep.noMutate(Lightbox.DEFAULT_CONFIG, options);

        this.elements = [];
        this.count = 0;
        this.fullscreen = false;

        this._currentIndex = -1;
        this.previousIndex = -1;
        this.currentLoadingIndex = -1;
        
        this.$parent = null;
        this.$root = null;
        this.$container = null;

        this.ui = new LbUi(this);

        this.timer = null;
        this.autoplay = this.options.autoplay === true;
    }

    createElement(data) {
        switch(data.type) {
        case 'image':
            return new LbImageElement(this, data);
        default:
            throw new LbException("Unknown lightbox element type");
        }
    }

    init() {
        this.$parent = document.querySelector(this.options.appendTo);

        if (!this.$parent) {
            throw new LbException(`Could not find parent node @ ${this.options.appendTo}`);
        }

        this.$root = document.createElement('div');
        this.$root.id = this.options.uid;
        this.$root.classList.add('lightbox');

        this.$container = document.createElement('div');
        this.$container.classList.add('lightbox__container');
        this.$root.appendChild(this.$container);

        this.ui.init();

        this.$root.addEventListener('click', (e) => {
            if (e.target === this.$root && this.options.closeOnBlur) {
                e.preventDefault();
                e.stopPropagation();

                this.close();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (this.active) {
                switch (e.keyCode) {
                case 27:
                    // escape key
                    e.preventDefault();
                    if (this.options.closeOnEscape) {
                        this.close();
                    }
                    break;

                case 37:
                    // left arrow key
                    e.preventDefault();
                    if (this.options.arrowKeyNavigation) {
                        this.prev();
                    }
                    break;
                case 39:
                    // right arrow key
                    e.preventDefault();
                    if (this.options.arrowKeyNavigation) {
                        this.next();
                    }
                    break;
                }
            }
        });

        window.addEventListener('wheel', (e) => {
            if (this.active) {
                if (e.deltaY > 0) {   
                    e.preventDefault();

                    if (this.options.scrollNavigation) {
                        this.next();
                    }
                } else if(e.deltaY < 0) {
                    e.preventDefault();

                    if (this.options.scrollNavigation) {
                        this.prev();
                    }
                }
            }
        });

        
        
        // Gestures
        const h = new Hammer(this.$root);

        h.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        h.get('tap').set({ taps: 2 });

        // controls when swiping
        h.on('swiperight', (e) => {
            if (e.pointerType !== 'mouse') {
                this.prev();
            }
        });

        h.on('swipeleft', (e) => {
            if (e.pointerType !== 'mouse') {
                this.next();
            }
        });

        // close on double tap
        h.on('tap', (e) => {
            if (e.pointerType !== 'mouse') {
                this.close();
            }
        });


        // Fullscreen change handlers
        const fullscreenChanged = () => {
            const test = utility.getFullscreenElement();

            this.fullscreen = test !== null;
            this.ui.options.fullscreenBtn.update();
        };

        document.onfullscreenchange = fullscreenChanged;
        document.onmozfullscreenchange = fullscreenChanged;
        document.onwebkitfullscreenchange = fullscreenChanged;
        document.onmsfullscreenchange = fullscreenChanged;

        this.$parent.appendChild(this.$root);
    }

    fetch(...selectors) {
        selectors.forEach((selector) => {
            const $targets = document.querySelectorAll(selector);
            Array.from($targets).forEach(($node) => {
                const data = JSON.parse($node.dataset.lightbox);

                if (data.trigger === undefined) {
                    data.trigger = $node;
                }

                this._addElement(data);
            });
        });
    }

    _addElement(data) {
        try {
            const element = this.createElement(data);
            element.init();

            if (data.preload === true) {
                element.load();
            }

            if (data.trigger === 'string') {
                data.trigger = document.querySelector(data.trigger);
            }

            // listeners
            if (data.trigger instanceof Element) {
                data.trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.show(element.key);
                });
            }

            this.ui.bulletlist.add(element);
            // this.ui.thumbnailNav.add(element);

            this.elements.push(element);
            this.count = this.elements.length;   
        } catch(e) {
            if (e instanceof LbException) {
                console.warn(e.message); // eslint-disable-line
            } else {
                throw e;
            }
        }
    }

    add(stuff) {
        if (typeof stuff === 'string') {
            try {
                const json = JSON.parse(stuff);
                this.add(json);
            } catch(e) {
                throw new LbException(`Could not parse JSON data provided`);
            }
        } else if (Array.isArray(stuff)) {
            stuff.forEach(element => this._addElement(element));
        } else if(typeof stuff === 'object') {
            this._addElement(stuff);
        }
    }

    /*
    remove(stuff) {
        if (typeof stuff === 'string') {
            this.removeByKey(stuff);
        } else if (typeof stuff === 'number') {
            this.removeByIndex(stuff);
        }
    }

    removeByKey(k) {
        this.elements = this.elements.filter((element) => element.key !== k);
        this.count = this.elements.length;
    }

    removeByIndex(i) {
        this.elements.splice(i, 1);
        this.count = this.elements.length;
    }
    */

    show(j, direction = -1) {
        if (!this.active) {
            this.open().then(() => this.load(j, direction));
        } else {
            this.load(j, direction);
        }
    }

    open() {
        return new Promise((resolve, reject) => {
            if (this.active) {
                reject();
            }

            if (!this.options.documentScroll) {
                utility.disableScroll();
            }

            this.active = true;
            this.animating = true;
            this.$root.style.opacity = '0';
            this.$container.style.visibility = 'visible';

            const animation = animejs({
                targets: this.$root,
                opacity: 1,
                delay: 0,
                duration: 350,
                easing: 'easeInQuad',
            });

            animation.complete = () => {
                this.animating = false;
                resolve();
            };
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            if (!this.active) {
                reject();
            }

            if (this.timer !== null) {
                clearTimeout(this.timer);
            }

            this.animating = true;
            this.$root.style.opacity = '1';
            this.$container.style.visibility = 'hidden';

            const animation = animejs({
                targets: this.$root,
                opacity: 0,
                delay: 0,
                duration: 250,
                easing: 'easeOutQuad',
            });

            animation.complete = () => {
                if (this.fullscreen === true) {
                    this.disableFullscreen();
                }
    
                if (!this.options.documentScroll) {
                    utility.enableScroll();
                }

                this.active = false;
                this.animating = false;

                if (this.currentIndex !== -1) {
                    this.elements[this.currentIndex].active =  false;
                    this.currentIndex = -1;
                }

                resolve();
            };
        });
    }

    toggle() {
        if (this.active) {
            this.close();
        } else {
            this.open();
        }
    }

    toggleFullscreen() {
        if (this.fullscreen === true) {
            this.disableFullscreen();
        } else {
            this.enableFullscreen();
        }
    }

    enableFullscreen() {
        utility.openFullscreen(this.$root);
    }

    disableFullscreen() {
        utility.closeFullscreen();
    }

    getCurrent() {
        return this.elements[this.currentIndex];
    }

    getIndex(j) {
        // fetch new index
        let index = this.findIndex(j);

        if (index < 0) {
            index = this.options.rewind ? this.count - 1 : 0;
        }
        if (index >= this.count) {
            index = this.options.rewind ? 0 : this.count - 1;
        }

        return index;
    }

    load (j, direction) {
        // we got the index, now we can get the correct element
        const index = this.getIndex(j);

        if (this.currentIndex === index) {
            return;
        }

        const previousElement = this.elements[this.currentIndex];
        const element = this.elements[index];

        if (!(element instanceof LbElement)) {
            throw new LbException(`Invalid lightbox element @ index ${index}`);
        }

        if (previousElement instanceof LbElement) {
            previousElement.active = false;
        }

        // if it's not loaded yet
        element.active = true;

        this.currentIndex = index;
        this.loading = !element.loaded;
        this.failed = element.failed;

        this.ui.update();

        Promise.resolve(element.load()).finally(() => {
            if (index === this.currentLoadingIndex) {
                this.loading = false;
                this.failed = element.failed;
            }

            this.animating = true;

            element.show(direction).then(() => {
                if (this.autoplay) {
                    this.start();
                }
                this.animating = false;
            });

            // slight delay to account for the image rendering
            this.ui.update();
        });
    }

    prev() {
        this.show(this.currentIndex - 1, 0);
    }

    next() {
        this.show(this.currentIndex + 1, 1);
    }

    random() {
        this.show(Math.floor(Math.random() * this.count));
    }

    keyExists(k) {
        return !this.elements.reduce((bool, curr) => bool && curr.key !== k, true);
    }

    findByKey(k) {
        return this.elements.find((element) => element.key === k);
    }

    findIndexByKey(k) {
        return this.elements.findIndex((element) => element.key === k);
    }

    findIndexByRef(r) {
        return this.elements.findIndex((element) => element === r);
    }

    findIndex(j) {
        if (typeof j === 'number') {
            return parseInt(j, 10);
        } else if (typeof j === 'string') {
            return this.findIndexByKey(j);
        } else if (j instanceof LbElement) {
            return this.findIndexByRef(j);
        } else {
            return -1;
        }
    }

    doTimerLoop() {
        if (this.currentIndex < this.count - 1) {
            this.next();
        } else {
            this.load(0, 1);
        }
    }

    start() {
        if (this.timer !== null) {
            this.clear();
        }
    
        const delay = parseInt(this.options.delay, 10);
        this.timer = setTimeout(this.doTimerLoop.bind(this), delay);
    }

    clear() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    toggleAutoplay() {
        if (this.timer === null) {
            this.autoplay = true;
            this.start();
        } else {
            this.autoplay = false;
            this.clear();
        }

        this.ui.options.autoplayBtn.update();
    }

    get failed() {
        return this.$root.classList.contains('failed');
    }

    set failed(bool) {
        if (bool === true) {
            this.$root.classList.add('failed');
        } else {
            this.$root.classList.remove('failed');
        }
    }

    get animating() {
        return this.$root.classList.contains('animating');
    }

    set animating(bool) {
        if (bool === true) {
            this.$root.classList.add('animating');
        } else {
            this.$root.classList.remove('animating');
        }
    }

    get loading() {
        return this.$root.classList.contains('loading');
    }

    set loading(bool) {
        if (bool === true) {
            this.$root.classList.add('loading');
            this.currentLoadingIndex = this.currentIndex;
        } else {
            this.$root.classList.remove('loading');
        }
    }

    get currentIndex() {
        return this._currentIndex;
    }

    set currentIndex(index) {
        this.previousIndex = this._currentIndex;
        this._currentIndex = index;
    }

    get active() {
        return this.$root.classList.contains('active');
    }

    set active(bool) {
        if (bool === true) {
            this.$root.classList.add('active');
        } else {
            this.$root.classList.remove('active');
        }
    }
}

Lightbox.DEFAULT_CONFIG = {
    uid: uniqid(),
    appendTo: 'body',
    autoplay: false,
    delay: 5000,
    rewind: true,
    documentScroll: false,
    fullscreen: true,
    closeOnBlur: true,
    closeOnEscape: true,
    arrowKeyNavigation: true,
    scrollNavigation: true,
    closeBtnUI: true,
    navigationBtnUI: true,
    autoplayBtnUI: true,
    bulletlistUI: true,
    paginationUI: true,
    // enableThumbnails: true,
    titleUI: true,
    progressBarUI: true,
};

export default Lightbox;
