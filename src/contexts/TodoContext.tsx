"use client";

import { Todo } from "@/types/todo";
import { createContext, useEffect, useState } from "react";

/** 
TodoContext에서 제공할 값들의 타입 정의
- todos: 전체 할 일 목록
- addTodo: 할 일 추가
- updateTodo: 할 일 상태, 이미지, 메모 등 정보 업데이트
- deleteTodo: 할 일 삭제
*/
interface TodoContextValue {
    todos: Todo[];
    addTodo: (newTodo: Todo) => void;
    updateTodo: (updated: Todo) => void;
    deleteTodo: (id: string) => void;
}

// Todo 전역 상태 관리를 위해 Context 사용
export const TodoContext = createContext<TodoContextValue | null>(null);

/** 
TodoProvider
- Todo 전역 상태 관리
- 로컬 스토리지와 연동하여 새로고침 후에도 데이터 유지
*/
export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // 컴포넌트 마운트 시 로컬 스토리지에 저장된 todo 불러오기
    useEffect(() => {
        const stored = localStorage.getItem("todos");
        if (stored) {
            setTodos(JSON.parse(stored));
        }
    }, []);

    // todo 상태가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // 할 일 추가
    const addTodo = (newTodo: Todo) => {
        setTodos((prev) => [...prev, newTodo]);
    };

    // 할 일 업데이트 - Todo 객체 전체를 갱신
    const updateTodo = (updated: Todo) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t)),
        );
    };

    // 할 일 삭제
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
