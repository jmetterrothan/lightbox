class LbUiObject {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;
    }
    
    init(tagName, $parent = null) {
        this.$root = document.createElement(tagName);
        this.$root.classList.add('ui');
        
        if ($parent instanceof Element) {
            $parent.appendChild(this.$root);
        } else {
            this.lightbox.ui.$root.appendChild(this.$root);
        }
    }

    addClass(...classList) {
        this.$root.classList.add(...classList);
    }

    update() { }
    
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
            this.$root.classList.remove('hidden');
        } else {
            this.$root.classList.add('hidden');
        }
    }

    get active() {
        !this.$root.classList.contains('hidden');
    }
}

export default LbUiObject;
