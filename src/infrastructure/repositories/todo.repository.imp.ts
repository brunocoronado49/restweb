import { TodoDatasource } from "../../domain/datasources";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/dtos";
import { TodoEntity } from "../../domain/entities";
import { TodoRepository } from "../../domain/repositories";

export class TodoRepositoryImplementation implements TodoRepository {
    constructor(private readonly todoDatasource: TodoDatasource) {}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.create(createTodoDto);
    }

    getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll();
    }

    findById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.findById(id);
    }

    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.update(updateTodoDto);
    }

    delete(id: number): Promise<TodoEntity> {
        return this.todoDatasource.delete(id);
    }
}
