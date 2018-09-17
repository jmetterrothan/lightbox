class LbUi {
    constructor(lightbox, tagName) {
        this.lightbox = lightbox;
        this.tagName = tagName;
        this.$root = null;
    }
    
    init() {
        this.$root = document.createElement('button');
        this.$root.classList.add('ui-btn', `ui-btn_${this.typeName}`);
        this.lightbox.$ui.appendChild(this.$root);
    }

    enable() {
        this.$root.classList.remove('disabled');
    }

    disable() {
        this.$root.classList.add('disabled');
    }

    show() {
        this.$root.classList.remove('hidden');
    }

    hide() {
        this.$root.classList.add('hidden');
    }

    isDisabled() {
        return this.$root.classList.contains('disabled');
    }

    isHidden() {
        return this.$root.classList.contains('hidden');
    }
}

class LbUiBtn extends LbUi{
    constructor(lightbox, typeName) {
        super(lightbox, 'button');
        this.typeName = typeName;
    }
}

export class LbCloseBtn extends LbUiBtn {
    constructor(lightbox) {
        super(lightbox, 'close');
    }

    init() {
        super.init();
        this.$root.addEventListener('click', () => this.lightbox.close());
    }
}

export class LbPrevBtn extends LbUiBtn {
    constructor(lightbox) {
        super(lightbox, 'prev');
    }

    init() {
        super.init();
        this.$root.addEventListener('click', () => this.lightbox.prev());
    }
}

export class LbNextBtn extends LbUiBtn {
    constructor(lightbox) {
        super(lightbox, 'next');
    }

    init() {
        super.init();
        this.$root.addEventListener('click', () => this.lightbox.next());
    }
}

export default LbUiBtn;