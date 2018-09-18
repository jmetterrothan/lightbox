import LbUiObject from './LbUiObject';

class LbUiBulletlist extends LbUiObject {
    constructor(lightbox) {
        super(lightbox);

        this.list = [];
    }

    init() {
        super.init('ul');
        this.$root.classList.add('ui_bulletlist');
    }

    add(element) {
        const $node = document.createElement('li');
        $node.addEventListener('click', () => {
            this.update();
            this.lightbox.show(element);
        });
        this.list.push($node);
        this.$root.appendChild($node);
    }

    update() {
        this.list.forEach(($node, index) => {
            if (index === this.lightbox.currentIndex) {
                $node.classList.add('active');
            } else {
                $node.classList.remove('active');
            }
        });
    }
}

export default LbUiBulletlist;
