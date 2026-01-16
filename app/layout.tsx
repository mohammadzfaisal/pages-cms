import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading"
});

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
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
          crimsonPro.variable
        )}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}