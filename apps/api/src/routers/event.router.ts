import { EventController } from "@/controllers/event.controller";
import { verifyToken } from "@/middlewares/token";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";

export class EventRouter {
    private router : Router;
    private eventController: EventController;

    constructor() {
        this.eventController = new EventController()
        this.router = Router()
        this.initializeRoutes()    
    }
    
    private initializeRoutes(): void {
        this.router.post('/', uploader('event-', '/event').single('image'), this.eventController.createEvent)
        this.router.get('/', this.eventController.getEvent)
        this.router.get('/:id', this.eventController.getEventById.bind(this.eventController));

    }

    getRouter(): Router{
        return this.router
    }

}