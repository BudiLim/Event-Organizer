import { DashboardController } from '@/controllers/dashboard.controller';
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
    this.router.get(
      '/:organizerId',
      this.dashboardController.getOrganizerDashboardData.bind(this.dashboardController),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
