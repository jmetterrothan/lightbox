import LbUiObject from './LbUiObject';

class LbUiBtn extends LbUiObject {
    init($parent = null) {
        super.init('button', $parent);
        this.$root.classList.add('ui_btn');
    }
}

export class LbUiCloseBtn extends LbUiBtn {
    init($parent = null) {
        super.init($parent);
        this.$root.classList.add('ui_btn-close');
        this.$root.addEventListener('click', () => this.lightbox.close());
    }
}

export class LbUiFullscreenBtn extends LbUiBtn {
    init($parent = null) {
        super.init($parent);
        this.$root.classList.add('ui_btn-fullscreen');
        this.$root.addEventListener('click', () => this.lightbox.toggleFullscreen());
    }

    update() {
        if (this.lightbox.fullscreen === true) {
            this.$root.classList.add('on');
        } else {
            this.$root.classList.remove('on');
        }
    }
}

export class LbUiAutoplayBtn extends LbUiBtn {
    init($parent = null) {
        super.init($parent);
        this.$root.classList.add('ui_btn-autoplay');
        this.$root.addEventListener('click', () => this.lightbox.toggleAutoplay());
    }

    update() {
        if (this.lightbox.autoplay === true) {
            this.$root.classList.add('on');
        } else {
            this.$root.classList.remove('on');
        }
    }
}

export class LbUiPrevBtn extends LbUiBtn {
    init($parent = null) {
        super.init($parent);
        this.$root.classList.add('ui_btn-prev');
        this.$root.addEventListener('click', () => this.lightbox.prev());
    }

    update() {
        if (!this.lightbox.options.rewind) {
            this.disabled = this.lightbox.currentIndex === 0;
        }
    }
}

export class LbUiNextBtn extends LbUiBtn {
    init($parent = null) {
        super.init($parent);
        this.$root.classList.add('ui_btn-next');
        this.$root.addEventListener('click', () => this.lightbox.next());
    }

    update() {
        if (!this.lightbox.options.rewind) {
            this.disabled = this.lightbox.currentIndex === this.lightbox.count - 1;
        }
    }
}

export default LbUiBtn;