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
    this.router.post('/create', this.feedbackController.createFeedback.bind(this.feedbackController));
    this.router.get('/', this.feedbackController.getFeedback.bind(this.feedbackController));
  }

  getRouter(): Router {
    return this.router;
  }
}
