import { Router } from "express";
import { TodosController } from "./constroller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todosController = new TodosController();

    router.get("/", todosController.getTodos);

    return router;
  }
}
