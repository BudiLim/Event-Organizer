import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import multer = require('multer');

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class EventController {
  async createEvent(req: MulterRequest, res: Response) {
    try {
      if (!req.file) throw new Error('no file uploaded'); // Lebih baik gunakan Error object

      const link = `http://localhost:8000/api/public/event/${req?.file?.filename}`;

      const {
        name,
        price,
        location,
        description,
        isPaidEvent,
        availableSeats,
        organizerId,
        eventDate,
        eventTime, // Mengelola waktu terpisah
        sellEndDate, // Tanggal berakhir penjualan (tambahkan di request body)
        sellEndTime, // Waktu berakhir penjualan (tambahkan di request body)
      } = req.body;

      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const sellEndDateTime = new Date(`${sellEndDate}T${sellEndTime}`);



      const event = await prisma.event.create({
        data: {
          name,
          price: parseFloat(price),
          location,
          description,
          isPaidEvent, 
          availableSeats: parseInt(availableSeats, 10),
          eventDate: new Date(eventDate), // Tetap sebagai tanggal
          eventTime: eventDateTime, // Waktu khusus event
          sellEndDate: new Date(sellEndDate), // Tetap sebagai tanggal untuk akhir penjualan
          sellEndTime: sellEndDateTime, // Waktu untuk akhir penjualan
          image: link,
          organizerId: parseInt(organizerId, 10),
        },
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(400).send({
        msg: err instanceof Error ? err.message : err, // Menangani error dengan lebih baik
      });
    }
  }

  async getEvent(req: MulterRequest, res: Response) {
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
        msg: err instanceof Error ? err.message : err, // Menangani error dengan lebih baik
      });
    }
  }
}
