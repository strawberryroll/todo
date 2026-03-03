"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoRequest, Todo } from "@/types/todo";
import axios from "./axios";
import { createContext } from "react";

/** 
TodoContext에서 제공할 값들의 타입 정의
- todos: 전체 할 일 목록
- addTodo: 할 일 추가
- updateTodo: 할 일 상태, 이미지, 메모 등 정보 업데이트
- deleteTodo: 할 일 삭제
*/
interface TodoContextValue {
    todos: Todo[];
    isLoading: boolean;
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
    const queryClient = useQueryClient();

    // 1) 목록 조회
    const { isLoading, data } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const res = await axios.get("/items");
            return res.data;
        },
        staleTime: 1000 * 60,
    });

    // 2) 추가
    const addMutation = useMutation({
        mutationFn: async (todo: CreateTodoRequest) => {
            const res = await axios.post("/items", { name: todo.name });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // 3) 수정
    const updateMutation = useMutation({
        mutationFn: async (updated: Todo) => {
            const body: Record<string, unknown> = {
                name: updated.name,
                isCompleted: updated.isCompleted,
            };
            if (updated.memo != null) body.memo = updated.memo;
            if (updated.imageUrl != null) body.imageUrl = updated.imageUrl;

            const res = await axios.patch(`/items/${updated.id}`, body);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // 4) 삭제
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`/items/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const todos = data ?? [];

    const addTodo = async (todo: CreateTodoRequest) => {
        try {
            await addMutation.mutateAsync(todo);
        } catch (error) {
            console.error("항목 등록 실패: ", error);
            alert("할 일을 추가하지 못했어요");
        }
    };

    const updateTodo = async (updated: Todo) => {
        try {
            await updateMutation.mutateAsync(updated);
        } catch (error) {
            console.error("수정 실패: ", error);
            alert("세부 사항을 수정하지 못했어요");
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await deleteMutation.mutateAsync(id);
        } catch (error) {
            console.error("삭제 실패: ", error);
            alert("할 일을 삭제하지 못했어요");
        }
    };

    return (
        <TodoContext.Provider
            value={{ todos, isLoading, addTodo, updateTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}
