import { TicketController } from '@/controllers/tiket.controller';
import { Router } from 'express';

export class TicketRouter {
  private router: Router;
  private ticketController: TicketController;

  constructor() {
    this.ticketController = new TicketController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Route to get all tickets for a specific user
    this.router.get('/:userId', this.ticketController.getMyTicketDetails);

    // Route to get a specific ticket by ID for a specific user
    this.router.get('/:userId/:id', this.ticketController.getTicketId);
  }

  getRouter(): Router {
    return this.router;
  }
}
