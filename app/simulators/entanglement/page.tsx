"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Link as LinkIcon, Scissors, RefreshCw, Zap } from "lucide-react";

type ParticleState = "?" | "0" | "1";

export default function EntanglementSimulator() {
  const [isEntangled, setIsEntangled] = useState(false);
  const [particleA, setParticleA] = useState<ParticleState>("?");
  const [particleB, setParticleB] = useState<ParticleState>("?");

  const handleEntangle = () => {
    setIsEntangled(true);
    setParticleA("?");
    setParticleB("?");
  };

  const handleMeasure = (particle: "A" | "B") => {
    // Measurement collapses the state
    const result = Math.random() > 0.5 ? "1" : "0";
    
    if (particle === "A") {
      setParticleA(result);
      if (isEntangled) setParticleB(result);
    } else {
      setParticleB(result);
      if (isEntangled) setParticleA(result);
    }
    
    setIsEntangled(false); // Entanglement breaks upon measurement
  };

  const handleReset = () => {
    setIsEntangled(false);
    setParticleA("?");
    setParticleB("?");
  };

  return (
    <div className="w-full">
      <Link href="/simulators" className="inline-flex items-center gap-2 text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Simulators
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-800">Entanglement Visualizer</h1>
        <p className="text-slate-600 mt-2">Observe "spooky action at a distance". Entangle two particles and measure one to instantly determine the other.</p>
      </div>

      <div className="glass-card rounded-3xl p-8 relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
        
        {/* Entanglement Link Visual */}
        {isEntangled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-2 bg-gradient-to-r from-quantum-primary via-quantum-purple to-quantum-electric blur-sm"
          />
        )}
        
        <div className="flex items-center justify-between w-full max-w-2xl relative z-10">
          
          {/* Particle A */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-700 mb-6">Particle A (Earth)</h3>
            <motion.div
              animate={{ 
                rotate: particleA === "?" ? 360 : 0,
                scale: particleA !== "?" ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: particleA === "?" ? 4 : 0.5, repeat: particleA === "?" ? Infinity : 0, ease: "linear" }}
              className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl border-4 ${
                particleA === "?" 
                  ? "bg-gradient-to-tr from-blue-100 to-white border-blue-200" 
                  : particleA === "0" 
                    ? "bg-quantum-electric border-cyan-300 text-slate-800"
                    : "bg-quantum-purple border-purple-400 text-white"
              }`}
            >
              <span className="text-5xl font-bold font-mono">
                {particleA === "?" ? "" : particleA}
              </span>
            </motion.div>
            
            <button 
              onClick={() => handleMeasure("A")}
              disabled={particleA !== "?"}
              className="mt-8 px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:text-quantum-primary hover:border-quantum-primary transition-all disabled:opacity-50"
            >
              Measure A
            </button>
          </div>

          {/* Central Controls */}
          <div className="flex flex-col items-center gap-4">
            {!isEntangled && particleA === "?" && particleB === "?" ? (
              <button 
                onClick={handleEntangle}
                className="px-6 py-3 bg-gradient-to-r from-quantum-primary to-quantum-purple text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <LinkIcon className="w-5 h-5" /> Entangle
              </button>
            ) : (
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            )}
            
            <div className="text-center max-w-xs mt-4">
              {isEntangled ? (
                <p className="text-sm font-bold text-quantum-purple bg-purple-50 px-3 py-1.5 rounded-lg">
                  Particles are Entangled! Measuring one instantly collapses the other.
                </p>
              ) : particleA !== "?" || particleB !== "?" ? (
                <p className="text-sm text-slate-500 bg-white/80 p-2 rounded-lg">
                  Entanglement broken. Both particles now have definite classical states.
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Particles are independent.
                </p>
              )}
            </div>
          </div>

          {/* Particle B */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-700 mb-6">Particle B (Mars)</h3>
            <motion.div
              animate={{ 
                rotate: particleB === "?" ? -360 : 0,
                scale: particleB !== "?" ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: particleB === "?" ? 4 : 0.5, repeat: particleB === "?" ? Infinity : 0, ease: "linear" }}
              className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl border-4 ${
                particleB === "?" 
                  ? "bg-gradient-to-tr from-blue-100 to-white border-blue-200" 
                  : particleB === "0" 
                    ? "bg-quantum-electric border-cyan-300 text-slate-800"
                    : "bg-quantum-purple border-purple-400 text-white"
              }`}
            >
              <span className="text-5xl font-bold font-mono">
                {particleB === "?" ? "" : particleB}
              </span>
            </motion.div>

            <button 
              onClick={() => handleMeasure("B")}
              disabled={particleB !== "?"}
              className="mt-8 px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:text-quantum-primary hover:border-quantum-primary transition-all disabled:opacity-50"
            >
              Measure B
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
