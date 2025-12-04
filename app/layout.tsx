import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinBoard - Take Control of Your Finances | Gemercik Studio",
  description:
    "Modern financial tracking application to help you manage your money smarter. Track expenses, set budgets, and achieve your financial goals.",
  keywords:
    "finance, budget, expense tracker, money management, financial planning",
  authors: [{ name: "Gemercik Studio" }],
  openGraph: {
    title: "FinBoard - Take Control of Your Finances",
    description: "Modern financial tracking application by Gemercik Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
