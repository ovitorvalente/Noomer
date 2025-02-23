import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIFoodie",
  description: "O sabor certo, na hora certa, com inteligência!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
