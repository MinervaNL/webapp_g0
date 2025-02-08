"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const { data: session } = useSession();
    const [fact, setFact] = useState("");

    useEffect(() => {
        const fetchFact = async () => {
            const res = await fetch(`/api/funFact`);
            const data = await res.json();
            setFact(data.fact);
        };

        fetchFact();
    }, []);

    if (!session) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Welcome, {session.user?.name}!</h1>
            <p>Email: {session.user?.email}</p>
            {session.user?.image && <img src={session.user.image} alt="Profile" />}
            <p className="mt-4">Fun Fact: {fact}</p>
        </div>
    );
}
