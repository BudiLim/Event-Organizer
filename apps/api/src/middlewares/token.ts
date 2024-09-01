import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type IUser = {
    id: number,
    userType: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) throw "token empty !"

        const verifiedToken = verify(token, process.env.SECRET_JWT!)

        req.user = verifiedToken as IUser

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.userType !== "Admin") throw "Unauthorize !"

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}