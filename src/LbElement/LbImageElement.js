import LbElement from './LbElement';

class LbImageElement extends LbElement {
    constructor(lightbox, { src, thumbnail, alt, width = -1, height = -1}) {
        super(lightbox, 'image');

        this.src = src;
        this.thumbnail = thumbnail;
        this.alt = alt;
        this.width = parseInt(width, 10);
        this.height = parseInt(height, 10);
    }

    load() {
        if (this.loading || this.loaded) {
            return;
        }

        // loading flag will prevent any further attempt
        this.loading = true;
        this.showLoadingState();

        // image setup
        const img = new Image();

        if (this.width != -1) img.style.width = `${this.width}px`;
        if (this.height != -1) img.style.height = `${this.height}px`;
        if (this.alt) img.alt = this.alt;

        // load
        return img.load(this.src, () => {
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
        });
    }
}

export default LbImageElement;