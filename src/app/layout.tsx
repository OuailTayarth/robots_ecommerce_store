import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CustomProvider from "../providers/CustomProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick what you need
});

export const metadata: Metadata = {
  title: "RoboForge | Your Ultimate Robots Garage!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomProvider>
        <body className={poppins.className}>
          {children}
          <Toaster />
        </body>
      </CustomProvider>
    </html>
  );
}
