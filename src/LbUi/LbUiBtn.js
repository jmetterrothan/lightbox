import LbUiObject from './LbUiObject';

class LbUiBtn extends LbUiObject {
    init() {
        super.init('button');
        this.$root.classList.add('ui_btn');
    }
}

export class LbCloseBtn extends LbUiBtn {
    init() {
        super.init();
        this.$root.classList.add('ui_btn-close');
        this.$root.addEventListener('click', () => this.lightbox.close());
    }
}

export class LbPrevBtn extends LbUiBtn {
    init() {
        super.init();
        this.$root.classList.add('ui_btn-prev');
        this.$root.addEventListener('click', () => this.lightbox.prev());
    }
}

export class LbNextBtn extends LbUiBtn {
    init() {
        super.init();
        this.$root.classList.add('ui_btn-next');
        this.$root.addEventListener('click', () => this.lightbox.next());
    }
}

export default LbUiBtn;