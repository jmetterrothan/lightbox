import LbUiObject from './LbUiObject';

class LbUiBtn extends LbUiObject {
    init() {
        super.init('button');
        this.$root.classList.add('ui_btn');
    }

    update() { }
}

export class LbUiCloseBtn extends LbUiBtn {
    init() {
        super.init();
        this.$root.classList.add('ui_btn-close');
        this.$root.addEventListener('click', () => this.lightbox.close());
    }
}

export class LbUiPrevBtn extends LbUiBtn {
    init() {
        super.init();
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
    init() {
        super.init();
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