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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col text-ink font-sans">
        {/* Enables scroll-reveal styling without a flash; harmless if it never runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {children}
      </body>
    </html>
  );
}
