import LbUiObject from './LbUiObject';

class LbUiThumbnails extends LbUiObject {
    constructor(lightbox) {
        super(lightbox);

        this.$list = null;
    }

    init() {
        super.init('nav');
        this.$root.classList.add('ui_thumbnails');

        this.$list = document.createElement('ul');
        this.$root.appendChild(this.$list);
    }

    update() {
        this.disabled =  this.lightbox.loading || this.lightbox.failed;
    }
}

export default LbUiThumbnails;
