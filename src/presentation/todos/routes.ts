import { Router } from 'express';
import { TodosController } from './constroller';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todosController: TodosController = new TodosController();

    router.get('/', todosController.getTodos);
    router.get('/:id', todosController.getTodoById);
    router.post('/', todosController.createTodo);
    router.put('/:id', todosController.updateTodo);
    router.delete('/:id', todosController.deleteTodo);

    return router;
  }
}
