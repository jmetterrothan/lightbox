import uniqid from 'uniqid';

class LbElement {
    constructor(data) {
        this.data = data;
        this.key = uniqid();
        this.loaded = false;
    }

    load() {
        this.loaded = true;
    }
}

class Lightbox {
    constructor() {
        this.elements = [];
        this.count = 0;
        this.active = false;
    }

    init() {

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
        const element = new LbElement(data);

        if (data.preload === true) {
            element.load();
        }

        if (data.trigger instanceof Element) {
            data.trigger.addEventListener('click', (e) => {
                console.info('CLICKED');
            });
        }

        this.elements.push(element);
        this.count = this.elements.length;
    }

    add(stuff) {
        if (typeof stuff === 'string') {
            this.add(JSON.parse(stuff));
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

    removeByKey(key) {
        this.elements = this.elements.filter((element) => element.key !== key);
        this.count = this.elements.length;
    }

    removeByIndex(i) {
        this.elements.splice(i, 1);
        this.count = this.elements.length;
    }

    open() {
        this.active = true;
    }

    close() {
        this.active = false;
    }

    toggle() {
        this.active ? close() : open();
    }

    keyExists(key) {
        return !this.elements.reduce((bool, curr) => bool && curr.key !== key, true);
    }
};

export default Lightbox;
