import { LbUiPrevBtn, LbUiNextBtn } from './LbUiBtn';
import LbUiBulletlist from './LbUiBulletlist';
import LbUiPagination from './LbUiPagination';
import LbUiTitle from './LbUiTitle';
// import LbUiThumbnails from './LbUiThumbnails';
import LbUiOptions from './LbUiOptions';

class LbUi {
    constructor(lightbox) {
        this.lightbox = lightbox;
        this.$root = null;

        this.bulletlist = new LbUiBulletlist(lightbox);
        this.pagination = new LbUiPagination(lightbox);
        // this.thumbnailNav = new LbUiThumbnails(lightbox);

        this.prevBtn = new LbUiPrevBtn(lightbox);
        this.nextBtn = new LbUiNextBtn(lightbox);
        this.title = new LbUiTitle(lightbox);
        this.options = new LbUiOptions(lightbox);

        this.$progress = null;
    }

    init() {
        this.$root = document.createElement('div');
        this.$root.classList.add('lightbox__ui');
        this.lightbox.$container.appendChild(this.$root);

        this.options.init();
        this.options.active = true;

        this.prevBtn.init();
        this.prevBtn.active = this.lightbox.options.navigationBtnUI;

        this.nextBtn.init();
        this.nextBtn.active = this.lightbox.options.navigationBtnUI;

        this.bulletlist.init();
        this.bulletlist.active = this.lightbox.options.bulletlistUI;

        this.pagination.init();
        this.pagination.active = this.lightbox.options.paginationUI;

        // this.thumbnailNav.init();
        // this.thumbnailNav.active = this.lightbox.options.enableThumbnails;

        this.title.init();
        this.title.active = this.lightbox.options.titleUI;

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
        this.prevBtn.update();
        this.nextBtn.update();
        this.bulletlist.update();
        this.pagination.update();
        // this.thumbnailNav.update();
        this.title.update();
        this.options.update();
    }
}

export default LbUi;
