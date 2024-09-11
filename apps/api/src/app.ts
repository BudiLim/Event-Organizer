import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routers/user.router';
import { ReferralRouter } from './routers/referral.router';
import { EventRouter } from './routers/event.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // Not found for API routes
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).json({ status: 'error', msg: 'Not found!' });
      } else {
        next();
      }
    });  

    // Error handler
  this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/api/')) {
      console.error('Error: ', err.stack);
      res.status(500).json({ status: 'error', msg: 'Internal server error' });
    } else {
      next();
    }
  });
}
  private routes(): void {
    const userRouter = new UserRouter();
    const referralRouter = new ReferralRouter();
    const eventRouter = new EventRouter();

    this.app.use('/api/referrals', referralRouter.getRouter());

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/event', eventRouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/api`);
    });
  }
}
