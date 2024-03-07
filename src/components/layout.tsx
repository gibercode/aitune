"use client";
import { barlowCondensed, quickSand } from "@/utils";
import "../app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className={`${barlowCondensed.variable} ${quickSand.variable}`}>
      {children}
    </div>
  );
}
