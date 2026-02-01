export interface Todo {
    id: string;
    text: string;
    status: "active" | "done";
    memo?: string;
    image?: string;
}
