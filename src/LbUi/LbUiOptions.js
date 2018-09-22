import LbUiObject from './LbUiObject';
import { LbUiCloseBtn, LbUiFullscreenBtn, LbUiAutoplayBtn } from './LbUiBtn';

class LbUiOptions extends LbUiObject {
    constructor(lightbox) {
        super(lightbox);

        this.closeBtn = new LbUiCloseBtn(lightbox);
        this.fullscreenBtn = new LbUiFullscreenBtn(lightbox);
        this.autoplayBtn = new LbUiAutoplayBtn(lightbox);
    }

    init() {
        super.init('div');
        this.$root.classList.add('ui_options');

        this.fullscreenBtn.init(this.$root);
        this.fullscreenBtn.active = this.lightbox.options.fullscreen;

        this.closeBtn.init(this.$root);
        this.closeBtn.active = this.lightbox.options.closeBtnUI;

        this.autoplayBtn.init(this.$root);
        this.autoplayBtn.active = this.lightbox.options.autoplayBtnUI;
    }

    update() {
        this.closeBtn.update();
        this.fullscreenBtn.update();
        this.autoplayBtn.update();
    }
}

export default LbUiOptions;
