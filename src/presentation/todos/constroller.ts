import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
    constructor() {}

    //* get All Todos tasks
    public getTodos = async (_: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    };

    //* get one Todo task
    public getTodoById = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        todo ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found.` });
    };

    //* create new Todo task
    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text property is required." });

        const newTodo = await prisma.todo.create({
            data: { text },
        });

        res.json(newTodo);
    };

    //* update one Todo task
    public updateTodo = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const { text, completedAt } = req.body;

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                text,
                completedAt: completedAt ? new Date(completedAt) : null,
            },
        });

        res.json(updatedTodo);
    };

    //* delete one Todo task
    public deleteTodo = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Id argument is not a number." });

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });

        deletedTodo
            ? res.json(deletedTodo)
            : res.status(400).json({ error: `Failed to delete todo with id ${id}.` });
    };
}
