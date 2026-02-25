import { Request, Response } from "express";
import { TodoRepository } from "../../domain/repositories";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/dtos";

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) {}

    public getTodos = async (_: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id,
        });

        if (error) return res.status(400).json({ error });

        try {
            const updatedTodo = await this.todoRepository.update(updateTodoDto!);
            return res.json(updatedTodo);
        } catch (error) {
            res.status(400).json({ error });
        }
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        try {
            const deletedTodo = await this.todoRepository.delete(id);
            res.json(deletedTodo);
        } catch (error) {
            res.status(400).json({ error });
        }
    };
}
