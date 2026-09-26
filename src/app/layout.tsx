import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog | Train With Intent",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-white min-h-screen flex flex-col`}>
        <WorkoutProvider>
          {/* Navbar সবার উপরে থাকবে */}
          <Navbar />
          
          {/* মূল কনটেন্ট */}
          <main className="grow">
            {children}
          </main>
          
          {/* Footer সবার নিচে থাকবে */}
          <Footer />
          
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }} 
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}