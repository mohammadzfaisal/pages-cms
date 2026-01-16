import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Pages CMS",
    default: "Pages CMS",
  },
  description: "The No-Hassle CMS for GitHub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
	return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
