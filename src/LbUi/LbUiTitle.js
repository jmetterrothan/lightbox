import LbUiObject from './LbUiObject';

class LbUiTitle extends LbUiObject {
    init() {
        super.init('div');
        this.$root.classList.add('ui_title');
    }

    update() {
        const element = this.lightbox.getCurrent();

        this.$root.textContent = element && element.title ? element.title : '';
        this.disabled =  this.lightbox.loading || this.lightbox.failed;
    }
}

export default LbUiTitle;
