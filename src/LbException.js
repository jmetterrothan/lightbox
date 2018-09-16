class LbException extends Error {
    constructor(...args) {
        super(...args);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, LbException);
        }
    }
}

export default LbException;