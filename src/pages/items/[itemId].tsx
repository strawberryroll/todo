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
        <div className="flex flex-col items-center bg-white w-3/5 min-h-[calc(100vh-64px)] mx-auto">
            <TodoItem todo={todo} onUpdate={updateTodo} variant="detail" />

            <div className="flex w-4/5 gap-6">
                {/* 이미지 박스 */}
                <div
                    className={`relative flex justify-center items-center w-2/5 h-56 bg-slate-50  rounded-2xl 
                        ${imageUrl ? "border-2 border-transparent" : "border-2 border-dashed border-slate-300"}`}
                >
                    {imageUrl ? (
                        // 이미지가 있을 때
                        <img
                            src={imageUrl}
                            alt="todo image"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    ) : (
                        // 이미지가 없을 때
                        <img
                            src="/images/image-icon.png"
                            alt="image icon"
                            className="w-10 h-10"
                        />
                    )}

                    {/* 이미지 업로드 */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                    />
                    {/* label을 누르면 파일 업로드 할 수 있음 */}
                    <label
                        htmlFor="image-upload"
                        className={`absolute bottom-3 right-3 flex justify-center items-center  w-10 h-10 rounded-full cursor-pointer ${imageUrl ? "bg-slate-900/50 border-1 border-slate-900" : "bg-slate-200"} `}
                    >
                        {imageUrl ? (
                            <img
                                src="/images/edit.png"
                                alt="edit"
                                className="w-4 h-4"
                            />
                        ) : (
                            <span className="text-2xl pb-1">+</span>
                        )}
                    </label>
                </div>

                {/* 메모 박스 */}
                <div
                    className="w-3/5 rounded-2xl px-6 py-4
                                bg-[repeating-linear-gradient(to_bottom,theme(colors.yellow.50),theme(colors.yellow.50)_28px,theme(colors.amber.100)_30px)]"
                >
                    <div className="text-center text-sm font-semibold text-amber-800 mb-3">
                        Memo
                    </div>
                    <textarea
                        id="memo"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="w-full h-36 text-sm resize-none bg-transparent outline-none leading-7"
                    ></textarea>
                </div>
            </div>

            <div className="w-4/5 flex justify-end gap-2 mt-4">
                <button
                    onClick={handleUpdate}
                    className="w-32 h-10 text-xs bg-slate-100 border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)] font-bold cursor-pointer"
                >
                    ✓ 수정 완료
                </button>
                <button
                    onClick={handleDelete}
                    className="w-32 h-10 bg-rose-500 text-white text-xs border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)] font-bold cursor-pointer"
                >
                    × 삭제하기
                </button>
            </div>
        </div>
    );
}
