import prisma from '@/prisma';
import { Category, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import multer = require('multer');

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class EventController {
  // Metode lainnya...

  async createEvent(req: MulterRequest, res: Response) {
    try {
      if (!req.file) throw new Error('No file uploaded'); // Lebih baik gunakan Error object

      const link = `http://localhost:8000/api/public/event/${req.file.filename}`;

      const {
        name,
        price,
        location,
        description,
        isPaidEvent,
        availableSeats,
        organizerId,
        eventDate,
        eventTime,
        sellEndDate,
        sellEndTime,
        discountCode,
        amount,
        quotaAvailable,
        quotaUsed,
        validUntil,
        category
      } = req.body;

      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const sellEndDateTime = new Date(`${sellEndDate}T${sellEndTime}`);

      if (isPaidEvent === 'Paid' && (!price || isNaN(parseFloat(price)))) {
        throw new Error('Price must be provided for Paid events');
      }

      const validCategories = ['SINGLEBAND', 'GROUPBAND', 'DISC_JORKEY'];
      if (!validCategories.includes(category)) {
        throw new Error('invalid category')
      }

      const eventData: Prisma.EventCreateInput = {
        name,
        location,
        description,
        isPaidEvent: isPaidEvent === 'Paid' ? 'Paid' : 'Free',
        availableSeats: parseInt(availableSeats),
        eventDate: new Date(eventDate),
        eventTime: eventDateTime,
        sellEndDate: new Date(sellEndDate),
        sellEndTime: sellEndDateTime,
        image: link,
        category: category,
        organizer: { connect: { id: parseInt(organizerId, 10) } },
      };

      if (isPaidEvent === 'Paid') {
        eventData.price = parseFloat(price);
      } else {
        eventData.price = 0;
      }

      const event = await prisma.event.create({
        data: eventData
      });

      if (discountCode && amount && quotaAvailable && validUntil) {
        const promotionData: Prisma.PromotionCreateInput = {
          event: { connect: { id: event.id } },
          discountCode,
          amount: parseFloat(amount),
          quotaAvailable: parseInt(quotaAvailable, 10),
          quotaUsed: parseInt(quotaUsed || '0', 10),
          validUntil: new Date(validUntil)
        };
        await prisma.promotion.create({
          data: promotionData,
        })
      }

      res.status(201).json({ event });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }

  async getEvent(req: Request, res: Response) {
    
    try {
      const { search, location, category } = req.query;
      
      const filter: Prisma.EventWhereInput = {};

      if (search) {
        filter.name = { contains: search as string };
      }

      if (location) {
        filter.location = { contains: location as string }
      }

      if (category && typeof category === 'string') {
        const validCategories = ['SINGLEBAND', 'GROUPBAND', 'DISC_JORKEY'];
  
        const upperCategory = category.toUpperCase();
        if (validCategories.includes(upperCategory)) {
          filter.category = upperCategory as Category; // Use the raw string here instead of Prisma.Category
        } else {
          return res.status(400).json({ msg: 'Invalid category' });
        }
      }

      const events = await prisma.event.findMany({
        where: filter,
        include: { organizer: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json({
        status: 'ok',
        event: events,
      });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const { id } = req.params; // Ambil ID dari parameter URL

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ msg: 'Invalid event ID' });
      }

      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
        include: { organizer: true }, // Sertakan informasi organizer jika diperlukan
      });

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      res.status(200).json({ event });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }
}
