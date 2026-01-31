import { Todo } from "@/types/todo";
import Link from "next/link";
import React from "react";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (updated: Todo) => void;
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? "done" : "active";
        onUpdate({ ...todo, status: status });
    };
    return (
        <li>
            <input
                type="checkbox"
                id={`checkbox-${todo.id}`}
                checked={todo.status === "done"}
                onChange={handleChange}
            />
            <Link href={`/items/${todo.id}`}>
                <span>{todo.text}</span>
            </Link>
        </li>
    );
}
