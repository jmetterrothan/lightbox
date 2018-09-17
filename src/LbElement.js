import uniqid from 'uniqid';

export default class LbElement {
    constructor(lightbox, typeName) {
        this.lightbox = lightbox;
        this.typeName = typeName;

        this.key = uniqid();
        this.active = false;
        this.loaded = false;
        this.loading = false;

        this.$root =  null;
    }

    init() {
        this.$root = document.createElement('div');
        this.$root.classList.add('lightbox__element', 'element', `element_${this.typeName}`);

        this.lightbox.$container.appendChild(this.$root);
    }

    replaceContent($node) {
        this.$root.innerHTML = '';
        this.$root.appendChild($node);
    }

    showError(message) {
        const $errorMessage = document.createElement('div');
        const $h4 = document.createElement('h4');
        const $p = document.createElement('p');

        $errorMessage.classList.add('message', 'message_error');
        $h4.textContent = 'Something went wrong !';
        $p.innerHTML = `${message}`;

        $errorMessage.appendChild($h4);
        $errorMessage.appendChild($p);

        this.replaceContent($errorMessage);
    }

    show() {
        this.$root.classList.add('active');
        this.active = true;
    }

    hide() {
        this.$root.classList.remove('active');
        this.active = false;
    }
}

export class LbImageElement extends LbElement {
    constructor(lightbox, { src, thumbnail, alt, width = -1, height = -1}) {
        super(lightbox, 'image');

        this.src = src;
        this.thumbnail = thumbnail;
        this.alt = alt;
        this.width = parseInt(width, 10);
        this.height = parseInt(height, 10);
    }

    load() {    
        this.loading = true;

        const image = new Image();

        new Promise((resolve, reject) => {
            // loading message
            const $loadingMessage = document.createElement('div');
            const $p = document.createElement('p');
    
            $loadingMessage.classList.add('message', 'message_loading');
            $p.innerHTML = 'Loading... <span class="message_progress">0%</span>';
            $loadingMessage.appendChild($p);
    
            this.replaceContent($loadingMessage);

            // image setup
            if (this.width != -1) image.width = this.width;
            if (this.height != -1) image.height = this.height;
            if (this.alt) image.alt = this.alt;

            image.onload = () => resolve();
            image.onerror = () => reject(new Error('Could not find image...'));
            image.onabort = () => reject(new Error('Image loading was aborted'));

            image.src = this.src;
        }).then(() => {
            this.replaceContent(image);
        }).catch((e) => {
            this.showError(e.message);
        }).finally(() => {       
            this.loading = false;
            this.loaded = true;
        });
    }
}

export const createElement = (lightbox, data) => {
    switch(data.type) {
    case 'image':
        return new LbImageElement(lightbox, data);
    }
};