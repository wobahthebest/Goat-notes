import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Goat notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex flex-1 flex-col pt-10 sm:px-4 px-10">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
