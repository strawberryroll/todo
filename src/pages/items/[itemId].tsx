import TodoItem from "@/components/TodoItem";
import { TodoContext } from "@/lib/TodoContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Todo } from "@/types/todo";

export default function ItemDetailPage() {
    const [todo, setTodo] = useState<Todo | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [memo, setMemo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const context = useContext(TodoContext);
    if (!context) return null;
    const { updateTodo, deleteTodo } = context;

    // 항목 상세 조회 API 호출
    const getTodo = async (id: string) => {
        try {
            const res = await axios.get(`/items/${id}`);
            const newTodo: Todo = res.data;
            setTodo(newTodo);
            setImageUrl(newTodo.imageUrl ?? null);
            setMemo(newTodo.memo ?? null);
        } catch (error) {
            console.error("데이터 로딩 실패: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { itemId } = router.query;

        if (typeof itemId === "string") {
            getTodo(itemId);
        } else {
            // 쿼리 파라미터가 없거나 잘못된 경우 로딩 중단
            setLoading(false);
        }
    }, [router.query.itemId]);

    if (loading) {
        return <p>로딩중...</p>;
    }

    if (!todo) {
        return <p>할 일을 찾을 수 없습니다</p>;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 5MB 이하
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            alert("5MB 이하만 업로드 할 수 있어요");
            return;
        }

        // 파일 이름 영어로만
        const fileName = /^[a-zA-Z0-9._-]+$/;
        if (!fileName.test(file.name)) {
            alert("파일 이름은 영어로만 이루어져야 해요 ");
            return;
        }

        // 미리보기용 Base64 변환
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string); // 화면 미리보기용
        };
        reader.readAsDataURL(file);
        setFile(file); // 실제 업로드용 파일 저장
    };

    const handleUpdate = async () => {
        try {
            setIsUpdating(true);
            let uploadedImageUrl = imageUrl;

            if (file) {
                const formData = new FormData();
                formData.append("image", file);
                const res = await axios.post("/images/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                uploadedImageUrl = res.data.url;
            }

            updateTodo({
                ...todo,
                imageUrl: uploadedImageUrl || null,
                memo: memo || null,
            });
            alert("수정이 완료됐어요!");
            router.push("/");
        } catch (error) {
            console.error("수정 실패: ", error);
            alert("수정에 실패했어요");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = () => {
        try {
            setIsDeleting(true);
            deleteTodo(todo.id);
            alert("삭제가 완료됐어요!");
            router.push("/");
        } catch (error) {
            console.error("삭제 실패: ", error);
            alert("삭제에 실패했어요");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white w-3/5 min-h-[calc(100vh-64px)] mx-auto">
            <TodoItem
                todo={todo}
                onUpdate={(updated) => {
                    setTodo(updated);
                    updateTodo(updated);
                }}
                variant="detail"
            />

            <div className="flex flex-col lg:flex-row w-4/5 gap-6">
                {/* 이미지 박스 */}
                <div
                    className={`relative flex justify-center items-center w-full lg:w-2/5 h-56 bg-slate-50  rounded-2xl 
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
                            src="/images/image-Icon.png"
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
                    className="w-full lg:w-3/5 rounded-2xl px-6 py-4
                                bg-[repeating-linear-gradient(to_bottom,theme(colors.yellow.50),theme(colors.yellow.50)_28px,theme(colors.amber.100)_30px)]"
                >
                    <div className="text-center text-sm font-semibold text-amber-800 mb-3">
                        Memo
                    </div>
                    <textarea
                        id="memo"
                        value={memo ?? ""}
                        onChange={(e) => setMemo(e.target.value)}
                        className="w-full h-36 text-sm resize-none bg-transparent outline-none leading-7"
                    ></textarea>
                </div>
            </div>

            <div className="w-4/5 flex justify-center lg:justify-end gap-2 mt-4">
                <button
                    onClick={handleUpdate}
                    className={`w-32 h-10 text-xs border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)] font-bold cursor-pointer
                        ${imageUrl || memo ? "bg-lime-300" : "bg-slate-100"}}
                        ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {isUpdating ? "수정 중..." : "✓ 수정 완료"}
                </button>
                <button
                    onClick={handleDelete}
                    className={`w-32 h-10 bg-rose-500 text-white text-xs border-2 border-slate-900 rounded-3xl shadow-[2px_2px_0_theme(colors.slate.900)] font-bold cursor-pointer 
                        ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {isDeleting ? "삭제 중..." : "× 삭제하기"}
                </button>
            </div>
        </div>
    );
}
