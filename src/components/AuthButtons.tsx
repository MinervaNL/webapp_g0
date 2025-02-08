"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
    const { data : session } = useSession();

    if (session) {
        return (
            <div className="flex gap-4 items-center">
                <span> Hello! Welcome, {session.user?.name || "User"} !</span>
                <button onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                > Logout
                </button>
            </div>
        )
    } 
    return (
        <div>
            <button onClick={() => signIn("google")}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Login with Google
            </button>
        </div>
    )
   
}