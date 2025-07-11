"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse" />
            </div>
            <Link href="/">
              <span className="text-2xl text-black font-bold bg-clip-text ">Previo</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link href="/upload">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Upload
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!user ? (
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:block text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hidden sm:block transition-colors bg-gradient-primary hover:opacity-90 font-medium"
              >
                Logout
              </Button>
            )}
            {user && <p className="text-muted-foreground">{`hey, ${user?.name}`}</p>}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden flex flex-col space-y-3">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/upload" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Upload
              </Button>
            </Link>
            {user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-white transition-colors bg-gradient-primary hover:opacity-90 font-medium"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </header>
  );
};

export default Header;