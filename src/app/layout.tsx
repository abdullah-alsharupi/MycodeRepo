import type { Metadata } from "next";
import {Work_Sans} from "next/font/google";
import  "./globals.css";

import ReactQueryProvider from "./react-query-provider/page";

const amiri = Work_Sans({
  subsets: ['latin'],
  weight: "400"
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={amiri.className}><ReactQueryProvider>{children}</ReactQueryProvider></body>
    </html>
  );
}
