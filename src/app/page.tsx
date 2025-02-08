import AuthButtons from "@/components/AuthButtons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App!</h1>
      <AuthButtons/>
      <div className="mt-16">
        <Link href="/favoriteMovie">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Set Your Favorite Movie
          </button>
        </Link>
      </div>
    </div>
  );
}