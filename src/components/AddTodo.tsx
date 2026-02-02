import { Todo } from "@/types/todo";
import React, { useState } from "react";

/** 
AddTodo 컴포넌트 Props
- onAdd: 새로운 할 일 추가 시 호출되는 함수
*/
interface AddTodoProps {
    onAdd: (todo: Todo) => void;
}

/**
AddTodo 컴포넌트
새로운 할 일을 입력하고 추가
*/
export default function AddTodo({ onAdd }: AddTodoProps) {
    // 할 일 텍스트
    const [text, setText] = useState<string>("");

    // 텍스트 변경 시 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value);

    // 폼 제출 시 새로운 Todo 상위로 전달
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd({ id: Date.now().toString(), text, status: "active" });
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
            {/* 할 일 입력 필드 */}
            <input
                type="text"
                value={text}
                placeholder="할 일을 입력해주세요"
                onChange={handleChange}
                className="w-3/5 h-10 bg-slate-100 border-2 border-slate-900 rounded-3xl pl-3 shadow-[2px_2px_0_theme(colors.slate.900)] mr-2.5 focus:outline-none"
            />
            {/* 추가하기 버튼 */}
            <button className="w-12 sm:w-32 h-10 bg-slate-200 border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)]">
                <span className="hidden sm:inline">+추가하기</span>
                <span className="inline sm:hidden text-2xl">+</span>
            </button>
        </form>
    );
}
