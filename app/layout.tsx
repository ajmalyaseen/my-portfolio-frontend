import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Home, User, Briefcase, BookOpen, Image as ImageIcon, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";
import { CONTACT_EMAIL } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ajmal Yaseen | Backend Engineer",
    template: "%s | Ajmal Yaseen"
  },
  description: "Senior Backend Engineer specialized in Django, building scalable server-side systems and robust API architectures.",
  keywords: ["Backend Engineer", "Django", "Python", "Next.js", "Portfolio", "Kerala", "India"],
  authors: [{ name: "Ajmal Yaseen" }],
  creator: "Ajmal Yaseen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajmalyaseen.online",
    title: "Ajmal Yaseen | Backend Engineer",
    description: "Architecting scalable backend systems with Django and Next.js.",
    siteName: "Ajmal Yaseen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajmal Yaseen | Backend Engineer",
    description: "Architecting scalable backend systems with Django and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  }
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
          <header className="fixed top-6 w-full z-50 flex justify-center px-6 pointer-events-none">
            <nav className="flex items-center gap-1 md:gap-2 glass p-1.5 md:p-2 rounded-2xl shadow-2xl pointer-events-auto ring-1 ring-white/10">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95">
                <Home size={18} /> <span className="hidden md:inline">Home</span>
              </Link>

              <div className="h-4 w-[1px] bg-card-border/50 mx-1"></div>

              <div className="flex items-center gap-1">
                <Link href="/about" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95">
                  <User size={18} /> <span className="hidden md:inline">About</span>
                </Link>
                <Link href="/blog" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95">
                  <BookOpen size={18} /> <span className="hidden md:inline">Blog</span>
                </Link>
                <Link href="/gallery" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95">
                  <ImageIcon size={18} /> <span className="hidden md:inline">Gallery</span>
                </Link>
              </div>

              <div className="h-4 w-[1px] bg-card-border/50 mx-1"></div>

              <ThemeToggle />
            </nav>
          </header>

          <main className="animate-reveal">{children}</main>

          <footer className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center border-t border-card-border/50 gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold italic tracking-tighter text-gradient">
                Ajmal Yaseen
              </div>
              <p className="text-text-muted text-sm text-center max-w-xs">
                Building the backbone of modern web applications with focus on performance and scalability.
              </p>
            </div>

            <div className="flex items-center gap-5">
              {[
                { icon: Github, href: "https://github.com/ajmalyaseen" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ajmal-yaseen-pt" },
                { icon: Instagram, href: "https://www.instagram.com/yaa.sii._/" },
                { icon: Mail, href: `mailto:${CONTACT_EMAIL}` }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-card-bg border border-card-border text-text-muted hover:text-primary hover:border-primary hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            <div className="text-text-muted text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">
              © 2026 / DESIGNED & DEVELOPED BY AJMAL YASEEN
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
