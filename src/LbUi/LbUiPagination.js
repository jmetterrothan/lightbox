import LbUiObject from './LbUiObject';

class LbUiPagination extends LbUiObject {
    init() {
        super.init('div');
        this.$root.classList.add('ui_pagination');
    }

    update() {
        const current = this.lightbox.currentIndex + 1;
        const total = this.lightbox.count;

        this.$root.innerHTML = `${current} / ${total}`;
        this.disabled =  this.lightbox.loading || this.lightbox.failed;
    }
}

export default LbUiPagination;
