class LbUi {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;
    }
    
    init(tagName) {
        this.$root = document.createElement(tagName);
        this.$root.classList.add('ui');
        this.lightbox.$ui.appendChild(this.$root);
    }

    addClass(...classList) {
        this.$root.classList.add(...classList);
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

export default LbUi;
