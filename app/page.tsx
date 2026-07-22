"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Atom } from "lucide-react";
import HeroScene from "@/components/HeroScene";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center pt-10 overflow-hidden">
      
      {/* 3D Background */}
      <HeroScene />
      
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-quantum-electric/30 bg-white/40 mb-8"
        >
          <Sparkles className="w-4 h-4 text-quantum-electric" />
          <span className="text-sm font-medium text-slate-700">The New Standard in Quantum Education</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight text-slate-900 mb-6 drop-shadow-sm"
        >
          Explore The <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary via-quantum-electric to-quantum-purple">
            Quantum World
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Learn quantum computing through interactive simulations, experiments, and gamified challenges. Master the future of technology today.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/learn" 
            className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-quantum-primary to-quantum-electric text-white font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-quantum-primary/30"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <BookOpen className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Start Learning</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/simulators" 
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md text-slate-800 font-bold rounded-full border border-slate-200/50 hover:bg-white/80 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <Atom className="w-5 h-5 text-quantum-purple group-hover:rotate-180 transition-transform duration-500" />
            <span>Explore Simulator</span>
          </Link>
        </motion.div>
      </div>

      {/* Feature Highlight Cards */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-24 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Interactive Learning", desc: "No boring textbooks. Learn through doing with live 3D quantum sandboxes.", color: "from-blue-500 to-cyan-400" },
          { title: "BB84 & Protocols", desc: "Play as Alice or Bob (and catch Eve) in fully functional cryptographic simulations.", color: "from-purple-500 to-pink-400" },
          { title: "Gamified Progress", desc: "Earn XP, level up, and collect rare achievements as you master quantum mechanics.", color: "from-amber-400 to-orange-500" }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 * i }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
            <h3 className="font-heading font-bold text-xl text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
