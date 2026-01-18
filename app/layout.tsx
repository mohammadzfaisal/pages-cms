import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | frontmatter",
    default: "frontmatter",
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
          "min-h-screen font-serif antialiased",
          inter.variable,
          crimsonPro.variable
        )}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
