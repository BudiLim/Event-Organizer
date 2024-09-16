import { Router } from 'express';
import { verifyToken } from '@/middlewares/token';
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
    this.router.post('/apply', verifyToken, this.promotionController.applyDiscount);
  }

  getRouter(): Router {
    return this.router;
  }
}
