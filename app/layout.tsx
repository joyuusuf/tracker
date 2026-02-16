import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })


export const metadata: Metadata = {
  title: "Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className={`${outfit.className} antialiased text-gray-700`} >

        {children}
      </body>
    </html>
  );
}
