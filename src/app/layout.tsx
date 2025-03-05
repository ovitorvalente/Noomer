import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "./[slug]/menu/contexts/cart";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Foodie",
  description: "O sabor certo, na hora certa, com inteligência!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
