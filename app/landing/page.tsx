"use client";

import { Github, Code2, Shield, CheckCircle2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" aria-hidden="true">
                  <path
                    d="M20 32 L12 14 Q11 11 14 12 L30 20 Q36 12 46 15 Q50 10 54 15 Q64 12 70 20 L86 12 Q89 11 88 14 L80 32 Q86 40 86 56 Q86 78 68 88 Q59 93 50 93 Q41 93 32 88 Q14 78 14 56 Q14 40 20 32 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="24" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="52" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <line x1="48" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <text x="31" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">F</text>
                  <text x="59" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">M</text>
                  <path d="M50 60 L46 64 Q50 67 54 64 Z" fill="currentColor" />
                  <path d="M44 66 Q50 71 56 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xl font-bold font-heading text-white">frontmatter</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all">
                About
              </Link>
              <Link href="/docs" className="text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all">
                Docs
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all">
                GitHub
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all">
                Discord
              </Link>
              <Link href="/sign-in">
                <Button size="sm" className="bg-[#D4F582] text-[#1a1a1a] hover:bg-[#c5e673] text-sm">
                  Sign In
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/about"
                className="block text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/docs"
                className="block text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all"
              >
                GitHub
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white font-medium px-3 py-2 rounded-md hover:bg-[#D4F582] hover:text-[#1a1a1a] transition-all"
              >
                Discord
              </Link>
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#D4F582] text-[#1a1a1a] hover:bg-[#c5e673]">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" aria-hidden="true">
                  <path
                    d="M20 32 L12 14 Q11 11 14 12 L30 20 Q36 12 46 15 Q50 10 54 15 Q64 12 70 20 L86 12 Q89 11 88 14 L80 32 Q86 40 86 56 Q86 78 68 88 Q59 93 50 93 Q41 93 32 88 Q14 78 14 56 Q14 40 20 32 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="24" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="52" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <line x1="48" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <text x="31" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">F</text>
                  <text x="59" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">M</text>
                  <path d="M50 60 L46 64 Q50 67 54 64 Z" fill="currentColor" />
                  <path d="M44 66 Q50 71 56 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-white">
              Frontmatter: Stop Juggling Git. Start Managing Content.
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              The No-Hassle CMS framework for developers who value their time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/sign-in">
                <Button size="lg" className="bg-[#D4F582] text-[#1a1a1a] hover:bg-[#c5e673] hover:scale-[1.02] text-base px-8">
                  <Github className="w-5 h-5 mr-2" />
                  Sign in with GitHub
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-base px-8">
                  <Code2 className="w-5 h-5 mr-2" />
                  Get the source code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-16 text-white">
            Why Choose Frontmatter?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-[#D4F582]/10 border-2 border-[#D4F582] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#D4F582]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                Zero-Config Data Management
              </h3>
              <p className="text-white leading-relaxed">
                Manage your data.json files through a structured UI that prevents "expected object, received array" errors.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-[#D4F582]/10 border-2 border-[#D4F582] flex items-center justify-center">
                <Code2 className="w-8 h-8 text-[#D4F582]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                Modular Architecture
              </h3>
              <p className="text-white leading-relaxed">
                Built on a clean, component-based CSS system that separates your header, menu, and post styles for total control.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-[#D4F582]/10 border-2 border-[#D4F582] flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#D4F582]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                Validated Data Schemas
              </h3>
              <p className="text-white leading-relaxed">
                Stop "TypeError" crashes with strictly enforced JSON/YAML structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
            Ready to simplify your workflow?
          </h2>
          <p className="text-lg md:text-xl text-white">
            Join developers who have ditched the hassle and embraced structured content management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/sign-in">
              <Button size="lg" className="bg-[#D4F582] text-[#1a1a1a] hover:bg-[#c5e673] hover:scale-[1.02] text-base px-8">
                <Github className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" aria-hidden="true">
                  <path
                    d="M20 32 L12 14 Q11 11 14 12 L30 20 Q36 12 46 15 Q50 10 54 15 Q64 12 70 20 L86 12 Q89 11 88 14 L80 32 Q86 40 86 56 Q86 78 68 88 Q59 93 50 93 Q41 93 32 88 Q14 78 14 56 Q14 40 20 32 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="24" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="52" y="40" width="24" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
                  <line x1="48" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <text x="31" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">F</text>
                  <text x="59" y="53" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">M</text>
                  <path d="M50 60 L46 64 Q50 67 54 64 Z" fill="currentColor" />
                  <path d="M44 66 Q50 71 56 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-bold font-heading text-white">frontmatter</span>
            </div>
            <p className="text-sm text-white">
              © 2026 Frontmatter. The No-Hassle CMS for GitHub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
