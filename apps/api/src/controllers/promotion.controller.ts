import { PromotionService } from '@/middlewares/promotion.service';
import { Request, Response } from 'express';

export class PromotionController {
  private promotionService: PromotionService;

  constructor() {
    this.promotionService = new PromotionService();
  }

  // Apply a discount based on a discount code and event ID
  async applyDiscount(req: Request, res: Response): Promise<void> {
    const { discountCode, eventId } = req.body;

    // Validate the inputs
    if (!discountCode || !eventId) {
      res.status(400).json({ message: 'Invalid discount code or event ID' });
      return;
    }

    try {
      // Fetch the discount using the service
      const discount = await this.promotionService.applyDiscount(discountCode, eventId);

      if (discount) {
        res.status(200).json({
          message: 'Discount applied successfully',
          discountAmount: discount.amount,
        });
      } else {
        res.status(400).json({ message: 'Invalid or expired discount code' });
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
