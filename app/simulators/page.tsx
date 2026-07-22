"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box, ShieldAlert, GitMerge, Link as LinkIcon, Zap } from "lucide-react";

const simulators = [
  {
    id: "qubit",
    title: "Qubit Visualizer",
    description: "Interact with a 3D Bloch sphere. Rotate state vectors and observe probability amplitudes collapse upon measurement.",
    icon: <Box className="w-8 h-8 text-quantum-electric" />,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-cyan-500/30",
    isNew: false
  },
  {
    id: "bb84",
    title: "BB84 Protocol",
    description: "Step-by-step interactive simulator of the first quantum cryptography protocol. Play as Alice, Bob, and Eve.",
    icon: <ShieldAlert className="w-8 h-8 text-quantum-primary" />,
    color: "from-blue-600/20 to-purple-600/20",
    border: "border-blue-500/30",
    isNew: false
  },
  {
    id: "gates",
    title: "Quantum Gate Playground",
    description: "Drag and drop Pauli X, Y, Z, and Hadamard gates onto a circuit wire to observe mathematical state changes.",
    icon: <GitMerge className="w-8 h-8 text-green-400" />,
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    isNew: true
  },
  {
    id: "entanglement",
    title: "Entanglement Visualizer",
    description: "Observe 'spooky action at a distance'. Measure one particle to instantly collapse its entangled partner.",
    icon: <LinkIcon className="w-8 h-8 text-quantum-purple" />,
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    isNew: true
  },
  {
    id: "teleportation",
    title: "Quantum Teleportation",
    description: "Transfer an unknown quantum state across space using a shared Bell pair and a classical communication channel.",
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
    isNew: true
  }
];

export default function SimulatorsHub() {
  return (
    <div className="w-full">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary to-quantum-electric">Simulators</span>
        </h1>
        <p className="text-slate-600 mt-4 max-w-2xl text-lg">
          Do not just read about quantum mechanics—experience it. Use our interactive physics engines to visualize complex quantum phenomena in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulators.map((sim, i) => (
          <motion.div
            key={sim.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/simulators/${sim.id}`} className="block h-full">
              <div className={`glass-card h-full p-8 rounded-3xl border transition-all hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group ${sim.border}`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sim.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {sim.isNew && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-quantum-electric text-slate-900 text-xs font-bold rounded-full shadow-sm z-10">
                    NEW
                  </span>
                )}
                
                <div className="relative z-10">
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl inline-block mb-6 shadow-sm group-hover:bg-white transition-colors">
                    {sim.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold font-heading text-slate-800 mb-3">{sim.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {sim.description}
                  </p>
                </div>
                
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
