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
        this.progressBar.active = this.lightbox.options.enableProgressBar;

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

            setTimeout(() => {
                this.progressBar.active = false;
            }, 650);
        });
    }
}

export default LbImageElement;