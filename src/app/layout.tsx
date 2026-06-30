import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/authContext";

export const metadata: Metadata = {
  title: "ThreadCounty — AI Fabric Analysis Platform",
  description:
    "ThreadCounty uses AI to analyze fabric images and instantly report thread density, warp/weft counts, and fabric type.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
