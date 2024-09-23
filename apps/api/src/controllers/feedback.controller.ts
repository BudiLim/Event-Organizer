import prisma from '@/prisma';
import { Request, Response } from 'express';

export class FeedbackController {
  // Create feedback for an event
  async createFeedback(req: Request, res: Response) {
    try {
      const { message, eventId } = req.body;

      // Validate input
      if (!message || !eventId) {
        return res.status(400).json({ msg: 'Message and Event ID are required' });
      }

      // Create feedback
      const feedback = await prisma.feedback.create({
        data: {
          message,
          eventId: Number(eventId), // Ensure eventId is a number
        },
      });

      res.status(201).json({ feedback });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }

  // Retrieve feedback for an event
  async getFeedbackForEvent(req: Request, res: Response) {
    try {
      const { eventId } = req.params;

      if (!eventId || isNaN(Number(eventId))) {
        return res.status(400).json({ msg: 'Invalid event ID' });
      }

      const feedbacks = await prisma.feedback.findMany({
        where: { eventId: Number(eventId) },
        orderBy: { createdAt: 'desc' }, // Sort feedback by creation date
      });

      res.status(200).json({ feedback: feedbacks });
    } catch (err) {
      res.status(400).json({
        msg: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  }
}
