import prisma from '@/prisma';
import { Request, Response } from 'express';

export class PromotionController {
  async applyDiscount(req: Request, res: Response): Promise<void> {
    try {
      const { discountCode, eventId } = req.body;

      if (!discountCode || !eventId) {
        res.status(400).send({
          status: 'error',
          msg: 'Discount code and event ID are required.',
        });
        return;
      }

      // Adjust the Prisma query to use discountVoucher if it's unique
      const discount = await prisma.promotion.findUnique({
        where: { discountCode: discountCode },
      });

      if (!discount) {
        res.status(400).send({
          status: 'error',
          msg: 'Invalid or expired discount code.',
        });
        return;
      }

      if (new Date() > new Date(discount.validUntil)) {
        res.status(400).send({
          status: 'error',
          msg: 'Discount code has expired.',
        });
        return;
      }

      const discountAmount = discount.amount;

      res.status(200).send({
        status: 'ok',
        msg: 'Discount applied successfully!',
        discountAmount,
      });
    } catch (err) {
      console.error('Error applying discount:', err);
      res.status(500).send({
        status: 'error',
        msg: 'Internal server error',
      });
    }
  }
}
