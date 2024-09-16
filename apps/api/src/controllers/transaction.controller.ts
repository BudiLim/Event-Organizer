import { Request, Response } from 'express';
import prisma from '@/prisma'; // Ensure this is the correct path

export class TransactionController {
  async createTransaction(req: Request, res: Response): Promise<Response> {
    const { userId, eventId, amount } = req.body;

    // Input validation
    if (typeof userId !== 'number' || typeof eventId !== 'number' || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    try {
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          eventId,
          amount,
        },
      });
      return res.status(201).json({ transaction });
    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
