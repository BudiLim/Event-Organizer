import { Request, Response } from 'express';
import prisma from '@/prisma'; // Adjust the path to your prisma instance

export class FeedbackController {
  async createFeedback(req: Request, res: Response) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ msg: 'Message is required' });
      }

      // Create feedback
      const feedback = await prisma.feedback.create({
        data: { message }
      });

      // Fetch updated feedback list
      const feedbackList = await prisma.feedback.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.status(201).json({ feedbackList });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      } else {
        res.status(500).json({ msg: 'Internal server error', error: 'Unknown error' });
      }
    }
  }

  async getFeedback(req: Request, res: Response) {
    try {
      const feedbackList = await prisma.feedback.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({ feedbackList });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      } else {
        res.status(500).json({ msg: 'Internal server error', error: 'Unknown error' });
      }
    }
  }
}
