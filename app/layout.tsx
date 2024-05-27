import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/providers/toast-provider";
import { UserSessionProvider } from "@/providers/user-session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Just a Simple CV",
  description: "Make your CV ease, faster and free. One layout is enought.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <UserSessionProvider>
          <ToasterProvider />
          {children}
        </UserSessionProvider>        
      </body>
    </html>
  );
}
