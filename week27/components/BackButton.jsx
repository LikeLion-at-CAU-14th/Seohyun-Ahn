"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-xl w-50 bg-orange-500 px-1 py-3 font-regular text-white hover:bg-orange-600"
    >
      ◀ 목록으로 돌아가기
    </button>
  );
}
