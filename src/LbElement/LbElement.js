import uniqid from 'uniqid';

import '../Utility/Image';

class LbElement {
    constructor(lightbox, typeName) {
        this.lightbox = lightbox;
        this.typeName = typeName;

        this.key = uniqid();
        this.loaded = false;
        this.loading = false;
        this.failed = false;

        this.$root =  null;
        this.$progress = null;
    }

    init() {
        this.$root = document.createElement('div');
        this.$root.classList.add('lightbox__element', 'element', `element_${this.typeName}`);

        this.lightbox.$container.appendChild(this.$root);
    }

    replaceContent($node) {
        const $content = this.$root.querySelector('.lightbox__content');
        if ($content) {
            this.$root.removeChild($content);
        }
        this.$root.appendChild($node);
    }

    showErrorState(message) {
        const $error = document.createElement('div');
        $error.classList.add('lightbox__content', 'message', 'message_error');

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
        $loading.classList.add('lightbox__content', 'message', 'message_loading');

        const $progress = document.createElement('span');
        $progress.textContent = '...';

        const $p = document.createElement('p');
        $p.textContent = 'Loading ';
        $p.appendChild($progress);
        $loading.appendChild($p);

        this.$progress = $progress;
        this.replaceContent($loading);
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

export default LbElement;
