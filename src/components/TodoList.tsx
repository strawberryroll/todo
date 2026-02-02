import React, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";
import { TodoContext } from "@/contexts/TodoContext";
import Image from "next/image";

/** 
TodoList 컴포넌트
- TodoContext를 통해 할 일 목록을 조회, 업데이트
- 상태(active/done)에 따라 TO DO, DONE 섹션으로 구분
*/

export default function TodoList() {
    // Todo 전역 상태 관리를 위해 Context 사용
    const context = useContext(TodoContext);
    if (!context) return null;

    // todos: 할 일 목록
    // addTodo: 할 일 추가
    // updateTodo: 할 일 상태, 이미지, 메모 등 정보 업데이트
    const { todos, addTodo, updateTodo } = context;

    const handleAdd = (todo: Todo) => {
        addTodo(todo);
    };

    return (
        <div className="w-full flex flex-col items-center p-4">
            <AddTodo onAdd={handleAdd} />

            <div className="w-9/12 flex flex-col lg:flex-row justify-center gap-8">
                {/* TO DO */}
                <section className="mt-6 w-full lg:w-96">
                    <h1 className="w-fit bg-lime-300 rounded-3xl text-center text-green-700 px-6 py-1 font-bold">
                        TO DO
                    </h1>
                    {/* 할 일이 없을 때 & 있을 때 */}
                    <div className="flex-1">
                        {todos.filter((todo) => todo.status === "active")
                            .length === 0 ? (
                            <div>
                                {/* 태블릿, 데스크탑 empty 이미지 */}
                                <Image
                                    src="/images/todo-large.svg"
                                    alt="empty todo"
                                    width={200}
                                    height={170}
                                    className="hidden md:block mx-auto mt-6"
                                />
                                {/* 모바일 empty 이미지*/}
                                <Image
                                    src="/images/todo-small.svg"
                                    alt="empty todo"
                                    width={100}
                                    height={85}
                                    className="block md:hidden mx-auto mt-6"
                                />
                                <p className="text-center text-sm text-slate-400 mt-4">
                                    할 일이 없어요. <br />
                                    TODO를 새롭게 추가해주세요!
                                </p>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </section>

                {/* DONE */}
                <section className="w-full lg:w-96 lg:mt-6">
                    <h1 className="w-fit bg-green-700 rounded-3xl text-center text-amber-300 px-6 py-1 font-bold">
                        DONE
                    </h1>
                    {/* 다 한 일이 없을 때 & 있을 때 */}
                    {todos.filter((todo) => todo.status === "done").length ===
                    0 ? (
                        <div>
                            {/* 태블릿, 데스크탑 empty 이미지 */}
                            <Image
                                src="/images/done-large.svg"
                                alt="empty done"
                                width={200}
                                height={170}
                                className="hidden md:block mx-auto mt-6"
                            />
                            {/* 모바일 empty 이미지*/}
                            <Image
                                src="/images/done-small.svg"
                                alt="empty done"
                                width={100}
                                height={85}
                                className="block md:hidden mx-auto mt-6"
                            />
                            <p className="text-center text-sm text-slate-400 mt-4">
                                아직 다 한 일이 없어요. <br />
                                해야 할 일을 체크해보세요!
                            </p>
                        </div>
                    ) : (
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
                    )}
                </section>
            </div>
        </div>
    );
}
