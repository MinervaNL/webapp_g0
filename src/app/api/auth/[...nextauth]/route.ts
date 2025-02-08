import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

// 提取配置为 authOptions
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        maxAge: 15 * 24 * 60 * 60, // 会话有效期为 15 天
    },
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id; // 将 user.id 添加到会话
            return session;
        },
    },
    debug: true, // 开启调试模式
};

// 使用配置创建 NextAuth 处理程序
const handler = NextAuth(authOptions);

// 导出 GET 和 POST 路由
export { handler as GET, handler as POST };