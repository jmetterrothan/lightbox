'use strict';

import "babel-polyfill";
import "./Utility/classList.polyfill.min";

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
        // this.thumbnails = [];
        this.count = 0;

        this._currentIndex = -1;
        this._previousIndex = -1;
        this._currentLoadingIndex = -1;
        
        this.$parent = null;
        this.$root = null;
        this.$container = null;

        this.ui = new LbUi(this);
    }

    createElement(data) {
        switch(data.type) {
        case 'image':
            return new LbImageElement(this, data);
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

        // this.$uiThumbnails = document.createElement('div');
        // this.$uiThumbnails.classList.add('ui-thumbnails');
        // this.$ui.appendChild(this.$uiThumbnails);

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

        this.ui.init();

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
                this.load(element.key);
                this.open();
            });
        }

        this.ui.bulletlist.add(element);

        this.elements.push(element);
        this.count = this.elements.length;
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

    show(j) {
        this.load(j);

        if (!this.active) {
            this.open();
        }
    }

    open() {
        this.active = true;

        if (this.options.disableScroll) {
            utility.disableScroll();
        }
    }

    close() {
        this.active = false;

        if (this.currentIndex !== -1) {
            this.elements[this.currentIndex].active =  false;
            this.currentIndex = -1;
        }

        if (this.options.disableScroll) {
            utility.enableScroll();
        }
    }

    toggle() {
        if (this.active) {
            this.close();
        } else {
            this.open();
        }
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

    load (j) {
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
            if (index === this._currentLoadingIndex) {
                this.loading = false;
                this.failed = element.failed;
            }

            // slight delay to account for the image rendering
            this.ui.update();
        });
    }

    prev() {
        this.load(this.currentIndex - 1);
    }

    next() {
        this.load(this.currentIndex + 1);
    }

    random() {
        this.load(Math.floor(Math.random() * this.count));
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

    get loading() {
        return this.$root.classList.contains('loading');
    }

    set loading(bool) {
        if (bool === true) {
            this.$root.classList.add('loading');
            this._currentLoadingIndex = this.currentIndex;
        } else {
            this.$root.classList.remove('loading');
        }
    }

    get currentIndex() {
        return this._currentIndex;
    }

    set currentIndex(index) {
        this._previousIndex = this._currentIndex;
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
    disableScroll: true,
    rewind: true,
    closeOnBlur: true,
    closeOnEscape: true,
    arrowKeyNavigation: true,
    enableCloseBtn: true,
    enableNavigationBtn: true,
    enableBullelist: true,
    enablePagination: true,
    enableTitle: true,
};

export default Lightbox;
