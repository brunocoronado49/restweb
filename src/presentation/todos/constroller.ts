import { Request, Response } from "express";
import { TodoRepository } from "../../domain/repositories";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain/use-cases";

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) {}

    public getTodos = (_: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
    };

    public getTodoById = (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public updateTodo = (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id,
        });

        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };
}
