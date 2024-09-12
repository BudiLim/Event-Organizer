import { DashboardController } from '@/controllers/dashboard.controller';
import { checkRole, verifyToken } from '@/middlewares/token';
import { Router } from 'express';

export class DashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.dashboardController = new DashboardController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Update the route to include :organizerId
    this.router.get('/', verifyToken, this.dashboardController.getOrganizerDashboardData);
    this.router.get(
      '/:organizerId',
      verifyToken,
      checkRole,
      this.dashboardController.getOrganizerDashboardData,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
