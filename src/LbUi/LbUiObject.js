class LbUiObject {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;
    }
    
    init(tagName) {
        this.$root = document.createElement(tagName);
        this.$root.classList.add('ui');
        this.lightbox.ui.$root.appendChild(this.$root);
    }

    addClass(...classList) {
        this.$root.classList.add(...classList);
    }

    set disabled(bool) {
        if (bool === true) {
            this.$root.classList.add('disabled');
        } else {
            this.$root.classList.remove('disabled');
        }
    }

    get disabled() {
        return this.$root.classList.contains('disabled');
    }

    set active(bool) {
        if (bool === true) {
            this.$root.classList.add('active');
        } else {
            this.$root.classList.remove('active');
        }
    }

    get active() {
        this.$root.classList.contains('active');
    }
}

export default LbUiObject;