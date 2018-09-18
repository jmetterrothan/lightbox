'use strict';

class LbException extends Error {
    constructor(...args) {
        super(...args);
        this.name = 'LbException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, LbException);
        }
    }
}

export default LbException;
