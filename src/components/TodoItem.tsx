import { Todo } from "@/types/todo";
import Link from "next/link";
import React from "react";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (updated: Todo) => void;
    variant?: "list" | "detail";
}

export default function TodoItem({
    todo,
    onUpdate,
    variant = "list",
}: TodoItemProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? "done" : "active";
        onUpdate({ ...todo, status: status });
    };
    const isDetail = variant === "detail";

    return (
        <Link
            href={`/items/${todo.id}`}
            className="block w-full flex justify-center"
        >
            <li
                className={`h-10 flex items-center gap-2 border-2 border-slate-900 rounded-3xl my-3
                ${todo.status === "done" ? "bg-violet-100" : "bg-white"} 
                ${isDetail ? "justify-center w-4/5 py-6 font-bold underline pl-0" : "w-full pl-3"}`}
            >
                <input
                    type="checkbox"
                    id={`checkbox-${todo.id}`}
                    checked={todo.status === "done"}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 appearance-none rounded-full bg-yellow-50 border-2 border-slate-900
                checked:bg-violet-600 checked:border-violet-600 checked:bg-[url('/images/check.png')] checked:bg-no-repeat checked:bg-center checked:bg-[length:12px_10px]
                cursor-pointer"
                />

                <span
                    className={`transition-all duration-200 ${
                        todo.status === "done" && !isDetail
                            ? "line-through"
                            : ""
                    }`}
                >
                    {todo.text}
                </span>
            </li>
        </Link>
    );
}
