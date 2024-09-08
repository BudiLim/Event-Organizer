import prisma from "@/prisma";
import { Request, Response } from "express";
import multer from 'multer';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export class EventController {
    async createEvent(req:MulterRequest, res:Response) {
        try {
            if(!req.file) throw "no file uploaded"

            const link = `http://localhost:8000/api/public/event/$(req?.file?.filename)`
            
            const { name, price, location, description, availableSeats, image } = req.body

        } catch (err) {
            res.status(400).send({
                msg: err
            })
        }
    }
}