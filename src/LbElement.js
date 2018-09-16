import uniqid from 'uniqid';

class LbElement {
    constructor(data) {
        this.data = data;
        this.key = uniqid();
        this.loaded = false;
    }

    load() {
        this.loaded = true;
    }
}

export default LbElement;
