import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { ClientLayout } from "@/components/providers/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MealMaster",
  description: "Temukan dunia rasa dengan MealMaster. Jelajahi bahan, temukan resep, dan kuasai dapur Anda.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 transition-colors duration-500`} suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
