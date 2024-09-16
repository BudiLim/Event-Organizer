import { Router } from 'express';
import { verifyToken } from '@/middlewares/token';
import { TransactionController } from '@/controllers/transaction.controller';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/transaction/create', verifyToken, this.transactionController.createTransaction);
  }

  getRouter(): Router {
    return this.router;
  }
}
