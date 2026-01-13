import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Home, User, Briefcase, BookOpen, Image as ImageIcon, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajmal Yaseen | Portfolio",
  description: "Personal portfolio of Ajmal Yaseen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* 🏢 FLOATING HEADER */}
          <header className="fixed top-6 w-full z-50 flex justify-center px-6">
            <nav className="flex items-center gap-1 md:gap-2 bg-background/60 backdrop-blur-xl border border-card-border p-1.5 md:p-2 rounded-2xl shadow-xl">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                <Home size={18} /> <span className="hidden md:inline">Home</span>
              </Link>

              <div className="h-4 w-[1px] bg-card-border mx-1"></div>

              <div className="flex items-center gap-1">
                <Link href="/about" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <User size={18} /> <span className="hidden md:inline">About</span>
                </Link>
                <Link href="/blog" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <BookOpen size={18} /> <span className="hidden md:inline">Blog</span>
                </Link>
                <Link href="/gallery" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <ImageIcon size={18} /> <span className="hidden md:inline">Gallery</span>
                </Link>
              </div>

              <div className="h-4 w-[1px] bg-card-border mx-1"></div>

              <ThemeToggle />
            </nav>
          </header>

          <main>{children}</main>

          <footer className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-card-border gap-8">
            <div className="text-text-muted text-xs tracking-tight">
              © 2026 / <span className="text-foreground font-medium">Ajmal Yaseen</span>
            </div>

            <div className="flex items-center gap-6 text-text-muted">
              <a href="#" className="hover:text-foreground transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Mail size={20} /></a>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
