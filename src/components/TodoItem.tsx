import { Todo } from "@/types/todo";
import Link from "next/link";
import React from "react";

/** 
TodoItem 컴포넌트 Props
- todo: 개별 할 일 데이터
- onUpdate: 할 일 상태(active/done) 변경 시 호출되는 함수
- variant: 홈페이지, 상세페이지 스타일링 구분을 위한 옵션
*/
interface TodoItemProps {
    todo: Todo;
    onUpdate: (updated: Todo) => void;
    variant?: "list" | "detail";
}

/** 
TodoItem 컴포넌트
- 할 일 하나를 표시
- 체크박스를 통해 상태(active/done) 변경
- 아이템 클릭 시 상세 페이지로 이동
*/
export default function TodoItem({
    todo,
    onUpdate,
    variant = "list",
}: TodoItemProps) {
    // 체크박스 변경 시 상태 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? "done" : "active";
        onUpdate({ ...todo, status: status });
    };
    // 상세 페이지 여부 판단
    const isDetail = variant === "detail";

    return (
        // 아이템 클릭 시 상세 페이지로 이동
        <Link
            href={`/items/${todo.id}`}
            className="block w-full flex justify-center"
        >
            <li
                className={`h-10 flex items-center gap-2 border-2 border-slate-900 rounded-3xl my-3
                ${todo.status === "done" ? "bg-violet-100" : "bg-white"} 
                ${isDetail ? "justify-center w-4/5 py-6 font-bold underline pl-3" : "w-full pl-3"}`}
            >
                {/* 체크박스 */}
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
                {/* 할 일 텍스트 */}
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
