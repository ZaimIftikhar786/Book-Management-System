import { Request,Response,NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
){
    const status =  err.status || 500;
    const message = err.message || 'Server Error';
    res.status(status).json({
        succcess: false,
        error: message,
    });
}