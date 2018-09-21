import LbUiObject from './LbUiObject';

class LbUiThumbnails extends LbUiObject {
    constructor(lightbox) {
        super(lightbox);

        this.$ul = null;
        this.list = [];
    }

    init() {
        super.init('nav');
        this.$root.classList.add('ui_thumbnails');

        this.$ul = document.createElement('ul');
        this.$root.appendChild(this.$ul);
    }

    add(element) {
        const $node = document.createElement('li');
        const img = new Image();

        if (element.thumbnail) {
            img.load(element.thumbnail).then(() => {
                $node.appendChild(img);
            });
        }

        $node.addEventListener('click', (e) => {
            e.preventDefault();
            this.lightbox.show(element);
        });

        this.list.push($node);
        this.$ul.appendChild($node);
    }

    /*
    remove(i) {

    }
    */

    update() {
        const $current = this.list[this.lightbox.currentIndex];
        const $prev = this.list[this.lightbox.previousIndex];

        if ($current) $current.classList.add('active');
        if ($prev) $prev.classList.remove('active');

        // this.disabled =  this.lightbox.loading || this.lightbox.failed;
    }
}

export default LbUiThumbnails;
