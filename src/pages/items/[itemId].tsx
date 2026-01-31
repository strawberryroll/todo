import { useRouter } from "next/router";
import React from "react";

export default function ItemDetailPage() {
    const router = useRouter();

    return (
        <div>
            <h1>{router.query.itemId}아이템 상세 페이지</h1>
        </div>
    );
}
