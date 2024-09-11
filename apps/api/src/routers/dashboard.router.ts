import { DashboardController } from '@/controllers/dashboard.controller';
import { verifyToken } from '@/middlewares/token';
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
    this.router.get(
      '/',
      verifyToken,
      this.dashboardController.getOrganizerDashboardData.bind(
        this.dashboardController,
      ),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
