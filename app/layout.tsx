import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Management Dashboard",
  description: "create and manage your event easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
       
      </body>
    </html>
  );
}
