import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haider Sultan | Software Developer",
  description:
    "Software developer portfolio featuring jobs, blog notes, projects, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
