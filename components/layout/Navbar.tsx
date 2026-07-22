"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Atom, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useStore();

  const links = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Simulators", path: "/simulators" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-quantum-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Atom className="w-8 h-8 text-quantum-primary group-hover:text-quantum-electric transition-colors" />
            </motion.div>
            <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-quantum-primary to-quantum-purple">
              QuantumQuest
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === link.path ? "text-quantum-primary" : "text-slate-600 hover:text-quantum-purple"
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-quantum-electric rounded-full"
                  />
                )}
              </Link>
            ))}

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-quantum-primary transition-colors">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Link>
                  <button onClick={logout} className="text-slate-500 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-quantum-primary to-quantum-electric hover:shadow-lg hover:shadow-quantum-primary/25 transition-all transform hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-card border-t border-quantum-border/50"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path ? "bg-blue-50 text-quantum-primary" : "text-slate-600 hover:bg-slate-50 hover:text-quantum-purple"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-quantum-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-quantum-primary hover:bg-blue-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
