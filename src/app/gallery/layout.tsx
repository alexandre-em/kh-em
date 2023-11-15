import React from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ fontFamily: "roboto", height: "100%", overflowX: "hidden" }}>
      <Navbar />
      <div className="h-full m-3">{children}</div>
    </main>
  );
}
