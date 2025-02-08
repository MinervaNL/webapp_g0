import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Configuration, OpenAIApi } from "openai";

//console.log("Using OpenAI API Key:", process.env.OPENAI_API_KEY);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

});

const openai = new OpenAIApi(configuration);

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function testOpenAI() {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Tell me a fun fact about Inception." }],
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            console.error("OpenAI API Response Error:", await response.json());
        } else {
            console.log("OpenAI API Response:", await response.json());
        }
    } catch (error) {
        console.error("Test OpenAI Error:", error);
    }
}

testOpenAI();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                favoriteMovie: true
            }
        });
        const movie = user?.favoriteMovie;
        console.log("movie: " + movie);

        if (!movie) {
            return NextResponse.json(
                { error: "No favorite movie found." },
                { status: 400 }
            );
        }

        await delay(500);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Tell me an interesting fact about the movie "${movie}".` }],
            max_tokens: 100,
        });

        const fact = response.data.choices[0].message?.content?.trim();
        return NextResponse.json({ fact });
    } catch (error) {
        console.error("Error fetching fun fact:", error);
        return NextResponse.json(
            { error: "Failed to fetch fun fact." },
            { status: 500 }
        );
    }
}
