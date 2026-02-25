import { UpdateTodoDto } from "../../dtos/dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.update(dto);
    }
}
