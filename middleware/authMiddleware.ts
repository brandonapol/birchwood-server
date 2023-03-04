import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import express from 'express'
import { Request, Response, NextFunction } from 'express';


interface IRequest extends Request {
    user?: any
}

const protect = asyncHandler(async (req: IRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
        // tslint:disable-next-line:no-console
        console.log(decoded)
        if (typeof decoded === 'object') {
            req.user = await User.findById(decoded.id).select('-password')
            // * tslint:disable-next-line:no-console
            // console.log(`User: ${ req.user }`)
        }
        next()
        } catch {
            res.status(401);
            throw new Error('Not authorized')
        }
    }

    if (token === undefined){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect