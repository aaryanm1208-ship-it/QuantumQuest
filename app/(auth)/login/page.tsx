"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Atom, Mail, Lock, LogIn, Globe } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock validation
    setTimeout(() => {
      if (email.includes("@") && password.length >= 6) {
        login(email);
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Password must be 6+ characters.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 shadow-xl shadow-quantum-primary/5 border border-white/60 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-quantum-primary via-quantum-electric to-quantum-purple" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Atom className="w-6 h-6 text-quantum-primary" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to continue your quantum journey.</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6">
            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm text-center">
              {error}
            </div>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 pl-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-quantum-primary transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center pl-1 pr-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Link href="#" className="text-xs font-medium text-quantum-primary hover:text-quantum-electric">Forgot?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-quantum-primary transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 pb-2">
            <input type="checkbox" id="remember" className="w-4 h-4 text-quantum-primary border-slate-300 rounded focus:ring-quantum-primary/50" />
            <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-quantum-primary to-quantum-purple hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quantum-primary transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-slate-500 rounded-full">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-200 rounded-xl bg-white/50 hover:bg-white text-sm font-medium text-slate-700 hover:text-slate-900 transition-all hover:shadow-sm">
              <Globe className="w-5 h-5 text-slate-600" />
              Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-quantum-primary hover:text-quantum-electric transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
