import uniqid from 'uniqid';

import '../Utility/Image';

class LbElement {
    constructor(lightbox, typeName) {
        this.lightbox = lightbox;
        this.typeName = typeName;

        this.key = uniqid();
        this.active = false;
        this.loaded = false;
        this.loading = false;

        this.$root =  null;
        this.$progress = null;
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

    showErrorState(message) {
        const $error = document.createElement('div');
        $error.classList.add('message', 'message_error');

        const $h4 = document.createElement('h4');
        $error.appendChild($h4);
        $h4.textContent = 'Something went wrong !';

        const $p = document.createElement('p');
        $p.innerHTML = `${message}`;
        $error.appendChild($p);

        this.replaceContent($error);
    }

    showLoadedState($content) {
        if ($content instanceof Element) {
            this.replaceContent($content);
        }
    }

    showLoadingState() {
        // loading message state
        const $loading = document.createElement('div');
        $loading.classList.add('message', 'message_loading');

        const $progress = document.createElement('span');
        $progress.textContent = '...';

        const $p = document.createElement('p');
        $p.textContent = 'Loading ';
        $p.appendChild($progress);
        $loading.appendChild($p);

        this.$progress = $progress;
        this.replaceContent($loading);
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

export default LbElement;
