Image.prototype.load = function (src, progress = null) {
    this.loadingProgress = 0;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';

        xhr.onloadstart = () => {
            this.loadingProgress = 0;
        };
    
        xhr.onloadend = () => {
            this.loadingProgress = 100;
        };

        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                this.loadingProgress = e.loaded / e.total * 100;
            }

            if (typeof progress === 'function') {
                progress();
            }
        };

        xhr.onload = () => {
            this.onload = () => {
                resolve();
            };

            this.src = window.URL.createObjectURL(xhr.response);
        };

        xhr.onerror = () => reject(new Error('Could not find image...'));
        xhr.onabort = () => reject(new Error('Image loading was aborted'));
        xhr.ontimeout = () => reject(new Error('Request timed out'));

        xhr.send();
    });
};