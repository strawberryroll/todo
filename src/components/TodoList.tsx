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
            <div className="flex">
                <section className="my-4 mx-1.5 w-96">
                    <h1 className="w-fit bg-lime-300 rounded-3xl text-center text-green-700 px-6 py-1 font-bold">
                        TO DO
                    </h1>
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

                <section className="my-4 mx-1.5 w-96">
                    <h1 className="w-fit bg-green-700 rounded-3xl text-center text-amber-300 px-6 py-1 font-bold">
                        DONE
                    </h1>
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
            </div>
        </>
    );
}
