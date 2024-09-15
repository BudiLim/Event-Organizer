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
      console.log('Received request:', req.body);

      if (!req.file) throw new Error('No file uploaded');

      const link = `http://localhost:8000/api/public/event/${req.file.filename}`;

      const {
        organizerId,
        name,
        date,
        time,
        location,
        description,
        availableSeats,
        isPaidEvent,
      } = req.body;

      // Validate required fields
      if (!organizerId || !name || !date || !time || !location || !description || !availableSeats || !isPaidEvent) {
        return res.status(400).json({ msg: 'All fields are required' });
      }

      // Parse fields
      const parsedOrganizerId = parseInt(organizerId);
      const parsedAvailableSeats = parseInt(availableSeats);

      // Ensure parsed values are valid
      if (isNaN(parsedOrganizerId) || isNaN(parsedAvailableSeats)) {
        return res.status(400).json({ msg: 'Invalid input values' });
      }

      // Map the isPaidEvent string to the enum value
      const eventType = isPaidEvent === 'Paid' ? 'Paid' : 'Free';

      console.log('Creating event with data:', {
        organizerId: parsedOrganizerId,
        name,
        location,
        description,
        availableSeats: parsedAvailableSeats,
        date: new Date(date),
        time: new Date(time),
        image: link,
        isPaidEvent: eventType,
      });

      const event = await prisma.event.create({
        data: {
          organizerId: parsedOrganizerId,
          name,
          location,
          description,
          availableSeats: parsedAvailableSeats,
          date: new Date(date),
          time: new Date(time),
          image: link,
          isPaidEvent: eventType,
        },
      });
      console.log(event)

      res.status(201).json(event);
    } catch (err) {
      console.error('Error creating event:', err);
      res.status(500).json({ msg: 'Internal server error' });
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

      res.status(200).json({
        status: 'ok',
        events,
      });
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
}
