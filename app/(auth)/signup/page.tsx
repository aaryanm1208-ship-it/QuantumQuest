"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Atom, Mail, Lock, UserPlus, User } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useStore();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration
    setTimeout(() => {
      login(email, name);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 shadow-xl shadow-quantum-primary/5 border border-white/60 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-quantum-purple via-quantum-electric to-quantum-cyan" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Atom className="w-6 h-6 text-quantum-electric" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-800">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join the next generation of quantum learners.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 pl-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-quantum-electric/50 focus:border-quantum-electric transition-all text-sm"
                placeholder="Ada Lovelace"
              />
            </div>
          </div>

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
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-quantum-electric/50 focus:border-quantum-electric transition-all text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 pl-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-quantum-electric/50 focus:border-quantum-electric transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-quantum-purple to-quantum-cyan hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quantum-cyan transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Create Account
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-quantum-electric hover:text-quantum-primary transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
