import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

export default function isAuthenticated(
    resquest: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = resquest.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT Token is missing');
    };

    const [, token] = authHeader.split(' ');

    try{
        const decodetoken = verify(token, authConfig.jwt.secret);

        return next();
    } catch{
        throw new AppError('token JWT invalido');
    }
}