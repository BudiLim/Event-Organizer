import { VoucherController } from '@/controllers/voucher.controller';
import { checkExperience, verifyToken } from '@/middlewares/token';
import { Router } from 'express';

export class VoucherRouter {
  private router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.voucherController = new VoucherController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Route to get all tickets for a specific user
    this.router.get('/:userId', verifyToken,checkExperience, this.voucherController.getMyVoucherDetails);
    
  }

  getRouter(): Router {
    return this.router;
  }
}
