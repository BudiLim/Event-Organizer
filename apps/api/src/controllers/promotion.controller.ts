import { PromotionService } from '@/middlewares/promotion.service';
import { Request, Response } from 'express';

export class PromotionController {
  private promotionService: PromotionService;

  constructor() {
    this.promotionService = new PromotionService();
  }

  async applyDiscount(req: Request, res: Response): Promise<void> {
    const { discountCode, eventId } = req.body;

    try {
      // Validate and apply discount using a service method
      const discount = await this.promotionService.applyDiscount(discountCode, eventId);

      if (discount) {
        res.json({ discount });
      } else {
        res.status(400).json({ message: 'Invalid discount code' });
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}