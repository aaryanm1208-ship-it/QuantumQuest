"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, ArrowRight, Zap, RefreshCcw } from "lucide-react";

const STEPS = [
  "Setup: Alice and Bob share an entangled Bell pair (A and B).",
  "Alice takes the unknown state (Q) and performs a Bell measurement with her half of the entangled pair (A).",
  "The measurement collapses the states. Alice gets two classical bits of information.",
  "Alice sends these two classical bits to Bob over a normal communication channel.",
  "Bob receives the bits and applies the corresponding Pauli gates to his half of the entangled pair (B).",
  "Bob's particle (B) transforms exactly into the original unknown state (Q). Teleportation complete!"
];

export default function TeleportationSimulator() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const reset = () => setStep(0);

  return (
    <div className="w-full">
      <Link href="/simulators" className="inline-flex items-center gap-2 text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Simulators
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-800">Quantum Teleportation</h1>
        <p className="text-slate-600 mt-2">Transfer a quantum state across space using entanglement and a classical channel.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col items-center">
        
        {/* Visualizer Area */}
        <div className="w-full max-w-3xl h-64 bg-slate-900 rounded-2xl relative overflow-hidden mb-8 border-4 border-slate-800 shadow-2xl">
          <div className="absolute top-4 left-4 text-white/50 text-xs font-bold uppercase">Alice's Lab</div>
          <div className="absolute top-4 right-4 text-white/50 text-xs font-bold uppercase">Bob's Lab</div>
          
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 border-l border-dashed border-white/20" />

          {/* Particles */}
          <div className="absolute inset-0 flex items-center justify-between px-16">
            
            {/* Alice Side */}
            <div className="flex gap-4 items-center">
              {/* Unknown State Q */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ 
                  x: step >= 1 ? 40 : 0, 
                  opacity: step >= 2 ? 0.2 : 1,
                  scale: step >= 2 ? 0.5 : 1
                }}
                className="w-12 h-12 rounded-full bg-quantum-electric border-2 border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center justify-center text-slate-900 font-bold"
              >
                Q
              </motion.div>
              
              {/* Alice Entangled Particle A */}
              <motion.div
                animate={{ 
                  scale: step >= 2 ? 0.5 : 1,
                  opacity: step >= 2 ? 0.2 : 1
                }}
                className="w-12 h-12 rounded-full bg-quantum-purple border-2 border-purple-400 shadow-[0_0_15px_rgba(138,43,226,0.5)] flex items-center justify-center text-white font-bold relative"
              >
                A
                {/* Entanglement Line */}
                {step < 2 && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-64 h-1 bg-gradient-to-r from-quantum-purple to-quantum-purple opacity-30" />
                )}
              </motion.div>
            </div>

            {/* Classical Bits travelling */}
            {step >= 3 && step < 5 && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 100, opacity: 1 }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1"
              >
                <div className="w-6 h-6 bg-slate-100 rounded text-[10px] font-bold flex items-center justify-center text-slate-800">1</div>
                <div className="w-6 h-6 bg-slate-100 rounded text-[10px] font-bold flex items-center justify-center text-slate-800">0</div>
              </motion.div>
            )}

            {/* Bob Side */}
            <div className="relative">
              {/* Bob Entangled Particle B / Final State */}
              <motion.div
                animate={{
                  backgroundColor: step >= 5 ? "#00f0ff" : "#8a2be2",
                  borderColor: step >= 5 ? "#67e8f9" : "#c084fc",
                  boxShadow: step >= 5 ? "0 0 15px rgba(0,240,255,0.5)" : "0 0 15px rgba(138,43,226,0.5)",
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-slate-900 font-bold transition-all duration-1000 border-2"
              >
                <span className={step >= 5 ? "text-slate-900" : "text-white"}>
                  {step >= 5 ? "Q" : "B"}
                </span>
              </motion.div>
              
              {/* Transformation Flash */}
              {step === 5 && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-quantum-electric rounded-full pointer-events-none"
                />
              )}
            </div>

          </div>
        </div>

        {/* Narrative Panel */}
        <div className="w-full max-w-3xl">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[120px] flex items-center justify-center text-center">
            <p className="text-lg font-medium text-slate-700">
              {STEPS[step]}
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? "bg-quantum-primary" : i < step ? "bg-slate-300" : "bg-slate-200"}`} />
              ))}
            </div>
            
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={reset} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              )}
              <button 
                onClick={nextStep}
                disabled={step === STEPS.length - 1}
                className="px-6 py-2 bg-gradient-to-r from-quantum-primary to-quantum-electric text-white font-bold rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 transition-transform active:scale-95"
              >
                {step === STEPS.length - 1 ? "Complete" : "Next Step"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
