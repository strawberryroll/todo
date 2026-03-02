export interface Todo {
    id: number;
    name: string;
    memo: string | null;
    imageUrl: string | null;
    isCompleted: boolean;
}

export type CreateTodoRequest = Pick<Todo, "name">;
