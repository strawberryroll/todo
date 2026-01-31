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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                placeholder="할 일을 입력해주세요"
                onChange={handleChange}
            />
            <button>추가하기</button>
        </form>
    );
}
