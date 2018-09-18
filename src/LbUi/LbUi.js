import { LbCloseBtn, LbPrevBtn, LbNextBtn } from './LbUiBtn';
import LbBulletlist from './LbUiBulletlist';

class LbUi {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;

        this.bulletlist = new LbBulletlist(lightbox);
        this.thumbnails = null;

        this.closeBtn = new LbCloseBtn(lightbox);
        this.prevBtn = new LbPrevBtn(lightbox);
        this.nextBtn = new LbNextBtn(lightbox);
    }

    init() {
        this.$root = document.createElement('div');
        this.$root.classList.add('lightbox__ui');
        this.lightbox.$container.appendChild(this.$root);

        this.closeBtn.init();
        this.closeBtn.active = this.lightbox.options.enableCloseBtn;

        this.prevBtn.init();
        this.prevBtn.active = this.lightbox.options.enableNavigationBtn;

        this.nextBtn.init();
        this.nextBtn.active = this.lightbox.options.enableNavigationBtn;

        this.bulletlist.init();
        this.bulletlist.active = this.lightbox.options.enableBullelist;

        this.active = true;
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

    toggle() {
        this.active = !this.active;
    }
}

export default LbUi;
