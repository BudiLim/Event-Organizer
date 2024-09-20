import { NextFunction, Request, Response } from 'express';

export const checkOrgnaizerRole = (req: Request, res: Response, next: NextFunction) => {
    const {user } = req;

    if(user?.userType !== 'organizer') {
        return res.status(400).json({msg: 'access forbidden: Organizer only'})
    }

    next()
}