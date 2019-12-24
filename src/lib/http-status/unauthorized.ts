export class BaseError extends Error {
    status: number;
    message: string;
}

export class Unauthorized extends BaseError {
    status = 401;
    constructor(message?: string) {
        super();
        this.message = message || this.constructor.name;
    }
}
