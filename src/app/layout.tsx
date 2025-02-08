import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "My App",
  description: "A Next.js project with Supabase",
};

export default function RootLayout({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
      <body className="bg-gray-100">{children}</body>
      </Providers>
    </html>
  );
}

