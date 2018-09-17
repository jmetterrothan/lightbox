'use strict';

import "babel-polyfill";
import "./classList.polyfill.js";
import uniqid from 'uniqid';
import objectAssignDeep  from 'object-assign-deep';

import LbElement, { createElement } from './LbElement';
import LbException from './LbException';

class Lightbox {
    constructor(options = {}) {
        this.options = objectAssignDeep.noMutate(Lightbox.DEFAULT_CONFIG, options);

        this.elements = [];
        this.count = 0;
        this.active = false;
        this.currentIndex = 0;
        
        this.$root = null;
        this.$container = null;
        this.$ui = null;
    }

    init() {
        this.$root = document.createElement('div');
        this.$root.id = this.options.uid;
        this.$root.classList.add('lightbox');

        this.$container = document.createElement('div');
        this.$container.classList.add('lightbox__container');
        this.$root.appendChild(this.$container);

        this.$ui = document.createElement('div');
        this.$ui.classList.add('lightbox__ui');
        this.$root.appendChild(this.$ui);

        this.$container.addEventListener('click', (e) => {
            if ((e.target === this.$container || e.target.classList.contains('lightbox__element')) &&  this.options.closeOnBlur) {
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
                    if (this.options.closeOnEscape) {
                        this.close();
                    }
                    break;

                case 37:
                    // left arrow key
                    if (this.options.arrowKeyNavigation) {
                        this.prev();
                    }
                    break;
                case 39:
                    // right arrow key
                    if (this.options.arrowKeyNavigation) {
                        this.next();
                    }
                    break;

                default:
                    // console.log(e.keyCode);
                }
            }
        });

        document.body.appendChild(this.$root);
    }

    fetch(selector) {
        const $targets = document.querySelectorAll(selector);
        Array.from($targets).forEach(($node) => {
            const data = JSON.parse($node.dataset.lightbox);

            if (data.trigger === undefined) {
                data.trigger = $node;
            }

            this._addElement(data);
        });
    }

    _addElement(data) {
        const element = createElement(this, data);
        element.init();

        if (data.preload === true) {
            element.load();
        }

        if (data.trigger === 'string') {
            data.trigger = document.querySelector(data.trigger);
        }

        if (data.trigger instanceof Element) {
            data.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.show(element.key);
                this.open();
            });
        }

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

    open() {
        this.active = true;
        this.$root.classList.add('active');
    }

    close() {
        this.active = false;
        this.$root.classList.remove('active');
    }

    toggle() {
        if (this.active) {
            this.close();
        } else {
            this.open();
        }
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

    show (j) {
        // we got the index, now we can get the correct element
        const index = this.getIndex(j);
        const previousElement = this.elements[this.currentIndex];
        const element = this.elements[index];

        if (!(element instanceof LbElement)) {
            throw new LbException(`Invalid lightbox element @ index ${index}`);
        }

        if (previousElement instanceof LbElement) {
            previousElement.hide();
        }

        // if it's not loaded yet
        if (!element.loaded) {
            element.load();
        }
        
        element.show();
        this.currentIndex = index;
    }

    prev() {
        this.show(this.currentIndex - 1);
    }

    next() {
        this.show(this.currentIndex + 1);
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
}

Lightbox.DEFAULT_CONFIG = {
    uid: uniqid(),
    rewind: true,
    closeOnBlur: true,
    closeOnEscape: true,
    arrowKeyNavigation: true,
};

export default Lightbox;
