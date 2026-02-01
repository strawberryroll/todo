import React, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import { TodoContext } from "@/contexts/TodoContext";

export default function TodoList() {
    const context = useContext(TodoContext);
    if (!context) return null;
    const { todos, addTodo, updateTodo } = context;

    const handleAdd = (todo: Todo) => {
        addTodo(todo);
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
                                onUpdate={updateTodo}
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
                                onUpdate={updateTodo}
                            />
                        ))}
                </ul>
            </section>
        </>
    );
}
