import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/dtos";
import { TodoEntity } from "../../domain/entities";

export class TodoDatasourceImplementation implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return TodoEntity.fromObject(newTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if (!todo) throw `TODO with id: ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values,
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async delete(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deletedTodo = await prisma.todo.delete({
            where: { id },
        });

        return TodoEntity.fromObject(deletedTodo);
    }
}
