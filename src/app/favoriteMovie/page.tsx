"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoritePage() {
    const [movie, setMovie] = useState("");
    const router = useRouter();

    const saveFavorite = async () => {
        await fetch("/api/favoriteMovie", {
            method: "POST",
            body: JSON.stringify({ movie }),
            headers: { "Content-Type": "application/json" },
        });
        router.push("/dashboard");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">What's your favorite movie?</h1>
                <input
                    type="text"
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    className="border px-4 py-2 rounded mb-4 w-64"
                    placeholder="Enter your favorite movie"
                />
                <button
                    onClick={saveFavorite}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
