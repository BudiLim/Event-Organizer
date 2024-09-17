import { Router } from 'express';
import { PromotionController } from '@/controllers/promotion.controller';

export class PromotionRouter {
  private router: Router;
  private promotionController: PromotionController;

  constructor() {
    this.promotionController = new PromotionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/apply-discount', this.promotionController.applyDiscount.bind(this.promotionController));
    this.router.post('/discount-code', this.promotionController.applyDiscount);
  }

  getRouter(): Router {
    return this.router;
  }
}
