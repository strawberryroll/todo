import { Todo } from "@/types/todo";
import { createContext, useState } from "react";

interface TodoContextValue {
    todos: Todo[];
    addTodo: (newTodo: Todo) => void;
    updateTodo: (updated: Todo) => void;
    deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: "100",
            text: "장보기",
            status: "active",
            image: "https://img.freepik.com/free-photo/mesmerizing-view-lonely-tree-green-fields-blue-sky_181624-23654.jpg?semt=ais_hybrid&w=740&q=80",
            memo: "asdfghj",
        },
        { id: "101", text: "공부하기", status: "active" },
    ]);

    const addTodo = (newTodo: Todo) => {
        setTodos((prev) => [...prev, newTodo]);
    };

    const updateTodo = (updated: Todo) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t)),
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
    return (
        <TodoContext.Provider
            value={{ todos, addTodo, updateTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}
