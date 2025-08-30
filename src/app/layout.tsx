import NavBar from "@/components/NavBar/NavBar";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Noiré",
  description:
    "Discover stylish and affordable clothing for men and women. Our online fashion store offers trendy outfits, everyday essentials, and seasonal collections designed to fit your lifestyle. Shop now for quality apparel with fast and secure delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
