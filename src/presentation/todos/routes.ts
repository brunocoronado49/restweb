import { Router } from "express";
import { TodosController } from "./constroller";
import { TodoDatasource } from "../../domain/datasources";
import { TodoRepository } from "../../domain/repositories";
import { TodoDatasourceImplementation } from "../../infrastructure/datasources";
import { TodoRepositoryImplementation } from "../../infrastructure/repositories";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todoDatasource: TodoDatasource = new TodoDatasourceImplementation();
        const todoRepository: TodoRepository = new TodoRepositoryImplementation(todoDatasource);
        const todosController: TodosController = new TodosController(todoRepository);

        router.get("/", todosController.getTodos);
        router.get("/:id", todosController.getTodoById);
        router.post("/", todosController.createTodo);
        router.put("/:id", todosController.updateTodo);
        router.delete("/:id", todosController.deleteTodo);

        return router;
    }
}
