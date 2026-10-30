import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthGuard from "@/components/AuthGuard";
import { DeletedItemsProvider } from "./deletedItemsContext";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Academy Store",
  description: "A product catalog built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <DeletedItemsProvider>
          <StoreProvider>
            <AuthGuard>
              <Navbar />
              {children}
              <Footer />
            </AuthGuard>
          </StoreProvider>
        </DeletedItemsProvider>
      </body>
    </html>
  );
}
