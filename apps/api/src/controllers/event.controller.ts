import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import multer from 'multer';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export class EventController {
    async createEvent(req: MulterRequest, res: Response) {
        try {
            if (!req.file) throw "no file uploaded"

            const link = `http://localhost:8000/api/public/event/$(req?.file?.filename)`

            const { name, price, location, description, availableSeats, organizerId, date, time} = req.body

            const event = await prisma.event.create({
                data: {
                    name,
                    price: parseFloat(price), // Make sure price is a float
                    location,
                    description,
                    availableSeats: parseInt(availableSeats), // Ensure availableSeats is an integer
                    date: new Date(date), // Ensure date is a Date object
                    time: new Date(time), // Ensure time is a Date object
                    image: link,
                    organizerId: parseInt(organizerId) // Ensure organizerId is an integer
                }
            });
    
            res.status(201).json(event);

        } catch (err) {
            res.status(400).send({
                msg: err
            })
        }
    }

    async getEvent(req: MulterRequest, res: Response) {
        try {
            const { search } =req.query
            let filter: Prisma.EventWhereInput = {}

            if(search){
                filter.name = { contains: search as string}
            }
            const event = await prisma.event.findMany({
                where: filter,
                include: { organizer: true },
                orderBy: { createdAt: 'desc' }
            })
            res.status(200).send({
                status: 'ok',
                event
            })

        } catch (err) {
            res.status(400).send({
                msg: err
            })
        }
    }



}