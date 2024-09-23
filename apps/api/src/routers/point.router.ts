import { Router } from 'express';
import { checkExperience, verifyToken } from '@/middlewares/token';
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
    this.router.post('/', verifyToken, checkExperience, this.pointsController.createPoints);
    this.router.get('/:id/history', verifyToken, checkExperience, this.pointsController.getPointsHistory);
    this.router.get('/:userId/', verifyToken, checkExperience, this.pointsController.getMyPoints);
    this.router.post('/use', verifyToken, checkExperience, this.pointsController.usePoints);
  }

  getRouter(): Router {
    return this.router;
  }
}
