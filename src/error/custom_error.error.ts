export class ItemNotFoundError extends Error{
    status: number;
    constructor(message = 'Item Not Found'){
        super(message);
        this.status = 404;
        this.name = 'ItemNotFoundError';
        Error.captureStackTrace(this,this.constructor);
    }
}
export class BadRequestError extends Error{
    status: number;
    constructor(message = 'Buri Baat'){
        super(message);
        this.status = 400;
        this.name = 'BadRequestError';
        Error.captureStackTrace(this, this.constructor)
    }
}
export class ConflictError extends Error{
    status: number;
    constructor(message = 'Masla ho gaya(conflict)'){
        super(message);
        this.status = 400;
        this.name = 'ConflictError';
        Error.captureStackTrace(this, this.constructor)
    }
}
export class UnauthorizedError extends Error{
    status: number;
    constructor(message = 'Bhai kon ho tum(Unatuhorized Error)'){
        super(message);
        this.status = 400;
        this.name = 'UnauthorizedError';
        Error.captureStackTrace(this, this.constructor)
    }
} 
export class ForbiddenError extends Error{
    status: number;
    constructor(message = 'ForbiddenError'){
        super(message);
        this.status = 400;
        this.name = 'ForbiddenError';
        Error.captureStackTrace(this, this.constructor)
    }
} 