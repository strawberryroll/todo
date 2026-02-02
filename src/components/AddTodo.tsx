import { Todo } from "@/types/todo";
import React, { useState } from "react";

interface AddTodoProps {
    onAdd: (todo: Todo) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd({ id: Date.now().toString(), text, status: "active" });
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
            <input
                type="text"
                value={text}
                placeholder="할 일을 입력해주세요"
                onChange={handleChange}
                className="w-3/5 h-10 bg-slate-100 border-2 border-slate-900 rounded-3xl pl-3 shadow-[2px_2px_0_theme(colors.slate.900)] mr-2.5 focus:outline-none"
            />
            <button className="w-12 sm:w-32 h-10 bg-slate-200 border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)]">
                <span className="hidden sm:inline">+추가하기</span>
                <span className="inline sm:hidden text-2xl">+</span>
            </button>
        </form>
    );
}
