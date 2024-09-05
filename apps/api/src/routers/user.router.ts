import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middlewares/token';
import { Router } from 'express';


export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // protected routes
    this.router.get('/', verifyToken, this.userController.getUser);
    this.router.get('/:id', this.userController.getUserId);
    // public routes
    this.router.post('/', this.userController.createUser);
    this.router.post('/login', this.userController.loginUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
