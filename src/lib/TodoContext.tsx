"use client";

import { CreateTodoRequest, Todo } from "@/types/todo";
import axios from "./axios";
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
    addTodo: (newTodo: CreateTodoRequest) => void;
    updateTodo: (updated: Todo) => void;
    deleteTodo: (id: number) => void;
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

    // API 호출해서 todo 불러오기
    useEffect(() => {
        const axiosTodos = async () => {
            try {
                const res = await axios.get(`/items`); // 항목 목록 조회
                const newTodos = res.data;

                setTodos(newTodos);
            } catch (error) {
                console.error("목록 불러오기 실패: ", error);
            }
        };
        axiosTodos();
    }, []);

    // 할 일 추가
    const addTodo = async (todo: CreateTodoRequest) => {
        try {
            // 서버에 데이터 전송 (name만 보냄)
            const res = await axios.post("/items", {
                // 항목 등록 API
                name: todo.name,
            });

            // 서버에서 생성된 전체 객체 받아오기
            const newTodo = res.data;

            // 클라이언트 상태 업데이트
            setTodos((prev) => [...prev, newTodo]);
        } catch (error) {
            console.error("항목 등록 실패: ", error);
            alert("할 일을 추가하지 못했어요");
        }
    };

    // 할 일 업데이트 - Todo 객체 전체를 갱신
    const updateTodo = async (updated: Todo) => {
        try {
            const body: Record<string, unknown> = {
                name: updated.name,
                isCompleted: updated.isCompleted,
            };
            if (updated.memo != null) body.memo = updated.memo;
            if (updated.imageUrl != null) body.imageUrl = updated.imageUrl;
            console.log("서버로 보낸 데이터: ", body);
            const res = await axios.patch(`/items/${updated.id}`, body); // 서버에서 업데이트
            const newTodo = res.data;
            console.log("서버에서 받은 데이터: ", res.data);
            setTodos((prev) =>
                prev.map((t) => (t.id === newTodo.id ? newTodo : t)),
            );
        } catch (error) {
            console.error("수정 실패: ", error);
            alert("세부 사항을 수정하지 못했어요");
        }
    };

    // 할 일 삭제
    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`/items/${id}`); // 서버에서 삭제
            setTodos((prev) => prev.filter((todo) => todo.id !== id)); // 로컬 상태 동기화
        } catch (error) {
            console.error("삭제 실패: ", error);
            alert("할 일을 삭제하지 못했어요");
        }
    };

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, updateTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}
