import { Router } from 'express';
import { ReferralController } from '@/controllers/referral.controller';
import { verifyToken } from '@/middlewares/token';

export class ReferralRouter {
  private router: Router;
  private referralController: ReferralController;

  constructor() {
    this.referralController = new ReferralController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Protected routes
    this.router.get('/:id', verifyToken, this.referralController.getReferralById);
    this.router.put('/:id/expire', verifyToken, this.referralController.markReferralAsExpired);
  }

  getRouter(): Router {
    return this.router;
  }
}