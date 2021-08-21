import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    
    if(!header){
        return res.status(401).json({message: 'token not found'});
    }

    const token = header.split(' ')[1];

    try{
        const decodedToken = verify(token, authConfig.jwt.secret);
        console.log(decodedToken);
        next();
    }catch (err){
        res.status(401).json({message: 'error in token'});
    }
    
};