import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";



const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata: Metadata = {
  title: "Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
           <body className={`${outfit.className} antialiased text-gray-700`} >

        {/* Toast container (GLOBAL) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#111",
            },
            success: {
              style: {
                borderLeft: "4px solid #16a34a",
              },
            },
            error: {
              style: {
                borderLeft: "4px solid #dc2626",
              },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
