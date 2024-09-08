// routers/points.router.ts
import { Router } from 'express';
import { verifyToken } from '@/middlewares/token';
import { PointsController } from '@/controllers/point.controller';

export class PointsRouter {
  private router: Router;
  private pointsController: PointsController;

  constructor() {
    this.pointsController = new PointsController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Protected routes
    this.router.post('/', verifyToken, this.pointsController.createPoints);
    this.router.get('/:id/history', verifyToken, this.pointsController.getPointsHistory);
  }

  getRouter(): Router {
    return this.router;
  }
}
