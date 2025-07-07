import type React from "react";
import "./globals.css";
// import { Inter } from "next/font/google";
import type { Metadata } from "next";
// const inter = Inter({ subsets: ["latin"] });

import { Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import FooterSection from "./components/footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify desired weights
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeSuccex",
  description:
    "A social media-inspired platform for youth to learn, grow, and engage in productive activities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={lato.className}>
        <AuthProvider>
          <Toaster position='top-center' reverseOrder={false} />
          {children}
          {/* Footer */}
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
