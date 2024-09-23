// feedback.router.ts
import { Router } from 'express';
import { FeedbackController } from '@/controllers/feedback.controller'; 

export class FeedbackRouter {
  private router: Router;
  private feedbackController: FeedbackController;

  constructor() {
    this.feedbackController = new FeedbackController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Public routes
    this.router.post('/', this.feedbackController.createFeedback.bind(this.feedbackController)); // Create feedback
    this.router.get('/:eventId', this.feedbackController.getFeedbackForEvent.bind(this.feedbackController)); // Get feedback for an event
  }

  getRouter(): Router {
    return this.router;
  }
}
