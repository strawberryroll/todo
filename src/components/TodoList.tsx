import React, { useState } from "react";
import AddTodo from "./AddTodo";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "100", text: "장보기", status: "active" },
        { id: "101", text: "공부하기", status: "active" },
    ]);
    const handleAdd = (todo: Todo) => {
        setTodos((prev) => [...prev, todo]);
    };
    const handleUpdate = (updated: Todo) => {
        setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    };

    return (
        <>
            <AddTodo onAdd={handleAdd} />
            <section>
                <h1>TO DO</h1>
                <ul>
                    {todos
                        .filter((todo) => todo.status === "active")
                        .map((item) => (
                            <TodoItem
                                key={item.id}
                                todo={item}
                                onUpdate={handleUpdate}
                            />
                        ))}
                </ul>
            </section>
            <section>
                <h1>DONE</h1>
                <ul>
                    {todos
                        .filter((todo) => todo.status === "done")
                        .map((item) => (
                            <TodoItem
                                key={item.id}
                                todo={item}
                                onUpdate={handleUpdate}
                            />
                        ))}
                </ul>
            </section>
        </>
    );
}
