import { LbUiCloseBtn, LbUiPrevBtn, LbUiNextBtn } from './LbUiBtn';
import LbUiBulletlist from './LbUiBulletlist';
import LbUiPagination from './LbUiPagination';
import LbUiTitle from './LbUiTitle';

class LbUi {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;

        this.bulletlist = new LbUiBulletlist(lightbox);
        this.pagination = new LbUiPagination(lightbox);
        this.thumbnails = null;

        this.closeBtn = new LbUiCloseBtn(lightbox);
        this.prevBtn = new LbUiPrevBtn(lightbox);
        this.nextBtn = new LbUiNextBtn(lightbox);
        this.title = new LbUiTitle(lightbox);
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

        this.pagination.init();
        this.pagination.active = this.lightbox.options.enablePagination;

        this.title.init();
        this.title.active = this.lightbox.options.enableTitle;

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

    update() {
        this.bulletlist.update();
        this.prevBtn.update();
        this.nextBtn.update();
        this.pagination.update();
        this.title.update();
    }
}

export default LbUi;
