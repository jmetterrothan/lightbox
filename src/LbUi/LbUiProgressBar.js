import LbUiObject from './LbUiObject';

class LbUiProgressBar extends LbUiObject {
    constructor(lightbox, color = 'blue') {
        super(lightbox);
        this.color = color;

        this.value = 0;
        this.$inner = null;
    }

    init($parent = null) {
        super.init('div', $parent);
        this.$root.classList.add('ui_progress', 'progress', `progress_${this.color}`);

        this.$inner = document.createElement('div');
        this.$inner.classList.add('progress__inner');
        this.$root.appendChild(this.$inner);
    }

    update(value) {
        this.value = parseInt(value, 10);
        this.$inner.style.width = `${this.value}%`;
    }
}

export default LbUiProgressBar;
