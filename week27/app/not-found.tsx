import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-4xl font-extrabold text-orange-500">404 🤔</p>
      <h1 className="text-2xl font-bold">
        그런 맛집은 도감에 없어요.
      </h1>
      <Link
        href="/restaurants"
        className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
      >
        맛집 목록으로 돌아가기
      </Link>
    </main>
  );
}
