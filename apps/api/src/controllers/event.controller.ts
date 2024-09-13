import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import multer from 'multer';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class EventController {
  async createEvent(req: MulterRequest, res: Response) {
    try {
      if (!req.file) throw new Error('No file uploaded');

      const link = `http://localhost:8000/api/public/event/${req.file.filename}`;

      const {
        name,
        price,
        location,
        description,
        isPaidEvent,
        availableSeats,
        organizerId,
        date,
        time,
      } = req.body;

      // Parse and validate fields
      const parsedPrice = parseFloat(price);
      const parsedSeats = parseInt(availableSeats);
      const parsedOrganizerId = parseInt(organizerId);
      const parsedDate = new Date(date);
      const parsedTime = new Date(time);

      // Validate values
      if (isNaN(parsedPrice)) throw new Error('Price must be a valid number');
      if (isNaN(parsedSeats)) throw new Error('Available Seats must be a valid number');
      if (isNaN(parsedOrganizerId)) throw new Error('Organizer ID must be a valid number');
      if (isNaN(parsedDate.getTime())) throw new Error('Invalid date format');
      if (isNaN(parsedTime.getTime())) throw new Error('Invalid time format');

      // Create event
      const event = await prisma.event.create({
        data: {
          name,
          price: parsedPrice,
          location,
          description,
          availableSeats: parsedSeats,
          isPaidEvent,
          date: parsedDate,
          time: parsedTime,
          image: link,
          organizerId: parsedOrganizerId,
        },
      });

      res.status(201).json(event);
    } catch (err) {
      console.error('Error creating event:', err); // Log error details
      res.status(500).send({
        status: 'error',
        msg: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error',
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
      const events = await prisma.event.findMany({
        where: filter,
        include: { organizer: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).send({
        status: 'ok',
        events,
      });
    } catch (err) {
      console.error('Error fetching events:', err); // Log error details
      res.status(500).send({
        status: 'error',
        msg: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }
}
