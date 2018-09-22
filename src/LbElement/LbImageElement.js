import animejs from 'animejs';

import LbElement from './LbElement';
import LbUiProgressBar from '../LbUi/LbUiProgressBar';

class LbImageElement extends LbElement {
    constructor(lightbox, { title, src, thumbnail, alt, width = -1, height = -1}) {
        super(lightbox, 'image');

        this.title = title;
        this.src = src;
        this.thumbnail = thumbnail;
        this.alt = alt;
        this.width = parseInt(width, 10);
        this.height = parseInt(height, 10);
        this.$content = null;
        
        this.progressBar = new LbUiProgressBar(lightbox, 'element');
    }

    load() {
        if (this.loading || this.loaded) {
            return;
        }

        // loading flag will prevent any further attempt
        this.loading = true;
        this.showLoadingState();
        
        this.progressBar.init(this.$root);
        this.progressBar.active = this.lightbox.options.progressBarUI;

        // image setup
        const img = new Image();
        img.classList.add('lightbox__content');

        if (this.width != -1) img.style.width = `${this.width}px`;
        if (this.height != -1) img.style.height = `${this.height}px`;
        if (this.alt) img.alt = this.alt;

        // load
        return img.load(this.src, () => {
            this.progressBar.update(img.loadingProgress);

            if (this.$progress) {
                this.$progress.textContent = `${parseInt(img.loadingProgress, 10)}%`;
            }
        }).then(() => {
            this.failed = false;
            this.showLoadedState(img);
        }).catch((e) => {
            this.failed = true;
            this.showErrorState(e.message);
        }).finally(() => {       
            this.loading = false;
            this.loaded = true;
            this.$content = img;

            setTimeout(() => {
                this.progressBar.active = false;
            }, 650);
        });
    }

    show(direction = -1) {
        return new Promise((resolve, reject) => {
            if (!(this.$content instanceof Element)) {
                reject();
            }

            let tx = 0;
            let ty = 0;
            let s = 1;
            let d = 500;
            let o = 0;

            if (direction === 0) {
                tx = -25;
            } else if (direction === 1) {
                tx = 25;
            } else {
                ty = -5;
                s = 0.75;
                d = 300;
            }

            this.$content.style.transform = `translateX(${tx}%) translateY(${ty}%) scale(${s})`;
            this.$content.style.opacity = o;

            const animation = animejs({
                targets: this.$content,
                opacity: 1,
                translateX: 0,
                translateY: 0,
                scale : 1,
                delay: 0,
                duration: d,
                easing: 'easeInSine',
            });

            animation.complete = () => resolve();
        });
    }
}

export default LbImageElement;