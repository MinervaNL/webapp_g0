import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { movie } = await req.json();
        const userId = session.user.id;
        const user = await prisma.user.update({
            where: { id: userId },
            data: { favoriteMovie: movie },
        });

        return NextResponse.json(user);
    } catch(error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to update favorite movie" },
            { status: 500 }
        );
    }
}
