import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/shared/context/StoreProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Do You Want to Become a Millionaire?",
  description:
    "Play a quiz-style game inspired by 'Who Wants to Be a Millionaire?' and climb the money ladder with increasingly challenging questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="app-root">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
