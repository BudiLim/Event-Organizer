import { Request, Response } from 'express';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class EventController {
    async createEvent(req: Request, res: Response) {
        try {
          if (!req.file) throw 'no file uploaded';
          const link = `http://localhost:8000/api/public/event/${req.file.filename}`;
      
          const {
            name,
            slug,
            price,
            ticketType,
            location,
            description,
            availableSeats,
            isPaidEvent,
            eventDate,
            eventTime,
            sellEndDate,
            sellEndTime,
          } = req.body;

      
          const event = await prisma.event.create({
            data: {
              name,
              slug,
              price: new Prisma.Decimal(price),
              ticketType,
              location,
              description,
              availableSeats,
              isPaidEvent,
              eventDate: new Date(eventDate),
              eventTime: new Date(eventTime),
              sellEndDate: new Date(sellEndDate),
              sellEndTime: new Date(sellEndTime),
              image: link,
              organizerId: req.user?.id!
            },
          });
      
          res.status(201).send({
            status: 'ok',
            msg: 'Event created!',
            event,
          });
        } catch (err) {
          res.status(400).send({
            status: 'error',
            msg: err,
          });
        }
      }
      

  async getEvent(req: Request, res: Response) {
    try {
      const { search } = req.query;
      let filter: Prisma.EventWhereInput = {};

      if (search) {
        filter.name = { contains: search as string };
      }

      const event = await prisma.event.findMany({
        where: filter,
        include: { organizer: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).send({
        status: 'ok',
        event,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getEventSlug(req: Request, res: Response) {
    try {
      const event = await prisma.event.findFirst({
        where: { slug: req.params.slug },
        include: { organizer: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).send({
        status: 'ok',
        event,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }
}
