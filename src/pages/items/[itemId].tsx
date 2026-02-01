import TodoItem from "@/components/TodoItem";
import { TodoContext } from "@/contexts/TodoContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function ItemDetailPage() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [memo, setMemo] = useState<string>("");

    const router = useRouter();
    const { itemId } = router.query;

    const context = useContext(TodoContext);
    if (!context) return null;
    const { todos, updateTodo, deleteTodo } = context;

    const todo = todos.find((todo) => todo.id === itemId);

    useEffect(() => {
        if (!todo) return;
        setImageUrl(todo.image ?? "");
        setMemo(todo.memo ?? "");
    }, [todo]);

    if (!todo) {
        return <p>할 일을 찾을 수 없습니다</p>;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageUrl(URL.createObjectURL(file));
    };

    const handleUpdate = () => {
        updateTodo({
            ...todo,
            image: imageUrl,
            memo: memo,
        });
        router.push("/");
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
        router.push("/");
    };

    return (
        <div>
            <TodoItem todo={todo} onUpdate={updateTodo} />

            {/* 이미지 업로드 */}
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            {/* 이미지 보여주기 */}
            {imageUrl && <img src={imageUrl} alt="todo image" />}

            {/* 메모 */}
            <div>
                <label htmlFor="memo">Memo</label>
                <textarea
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                ></textarea>
            </div>

            <button onClick={handleUpdate}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
        </div>
    );
}
