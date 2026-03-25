import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Talha Hassan | Senior Software Engineer",
  description: "Personal website of Talha Hassan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        {/* <body className="bg-white text-gray-900"> */}
        <div className="fixed inset-0 -z-10 bg-linear-to-br from-gray-50 via-white to-gray-100 opacity-60" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
