"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as NextLink } from "lucide-react";
import Link from "next/link";
import { ArrowLeft, Play, RotateCcw, GitMerge } from "lucide-react";

type Gate = "H" | "X" | "Y" | "Z";
type QubitState = { prob0: number; prob1: number; label: string };

// Initial state |0>
const initialState: QubitState = { prob0: 1, prob1: 0, label: "|0⟩" };

const applyGate = (gate: Gate, state: QubitState): QubitState => {
  // Simplified math for single qubit pure states (assuming starting from |0>)
  // H on |0> -> |+> (50/50)
  // X on |0> -> |1> (0/100)
  // X on |1> -> |0> (100/0)
  // H on |1> -> |-> (50/50)
  
  if (gate === "X") {
    return {
      prob0: state.prob1,
      prob1: state.prob0,
      label: state.label === "|0⟩" ? "|1⟩" : state.label === "|1⟩" ? "|0⟩" : state.label
    };
  }
  
  if (gate === "H") {
    if (state.prob0 === 1 || state.prob1 === 1) {
      return { prob0: 0.5, prob1: 0.5, label: state.label === "|0⟩" ? "|+⟩" : "|-⟩" };
    }
    // H on superposition goes back to computational basis (simplification for demo)
    return { prob0: 1, prob1: 0, label: "|0⟩" }; 
  }
  
  // Y and Z on |0> just add phase, probabilities stay same (simplification for visual probability)
  if (gate === "Z") {
    return { ...state, label: state.label === "|+⟩" ? "|-⟩" : state.label };
  }
  
  if (gate === "Y") {
    return { prob0: state.prob1, prob1: state.prob0, label: "i|1⟩" }; // Rough approx for demo
  }

  return state;
};

export default function GatePlayground() {
  const [circuit, setCircuit] = useState<Gate[]>([]);
  const [currentState, setCurrentState] = useState<QubitState>(initialState);

  const handleAddGate = (gate: Gate) => {
    if (circuit.length >= 6) return; // Max 6 gates
    const newCircuit = [...circuit, gate];
    setCircuit(newCircuit);
    
    // Recalculate
    let s = initialState;
    for (const g of newCircuit) {
      s = applyGate(g, s);
    }
    setCurrentState(s);
  };

  const handleReset = () => {
    setCircuit([]);
    setCurrentState(initialState);
  };

  return (
    <div className="w-full">
      <Link href="/simulators" className="inline-flex items-center gap-2 text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Simulators
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-800">Quantum Gate Playground</h1>
        <p className="text-slate-600 mt-2">Build your own quantum circuit and observe how gates manipulate the qubit state.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Workspace */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Circuit Composer</h3>
              <button onClick={handleReset} className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* The Circuit Wire */}
            <div className="relative h-32 flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden">
              <div className="absolute left-0 right-0 h-1 bg-slate-300 top-1/2 -translate-y-1/2 z-0" />
              <div className="relative z-10 w-12 h-12 bg-white border-2 border-slate-300 rounded flex items-center justify-center font-bold text-slate-500 shrink-0">
                |0⟩
              </div>
              
              <div className="relative z-10 flex-1 flex items-center px-4 gap-2 h-full">
                <AnimatePresence>
                  {circuit.map((gate, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      className="w-12 h-12 bg-quantum-primary text-white border-2 border-blue-600 rounded flex items-center justify-center font-bold font-mono shadow-md"
                    >
                      {gate}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="relative z-10 w-12 h-12 bg-slate-800 text-quantum-electric border-2 border-slate-700 rounded flex items-center justify-center font-bold font-mono shrink-0">
                {currentState.label}
              </div>
            </div>
          </div>

          {/* Gate Palette */}
          <div className="mt-8">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Available Gates (Click to Add)</h3>
            <div className="flex gap-4">
              {[
                { id: "H", name: "Hadamard", desc: "Creates Superposition", color: "bg-purple-500" },
                { id: "X", name: "Pauli-X", desc: "NOT Gate (Bit Flip)", color: "bg-blue-500" },
                { id: "Y", name: "Pauli-Y", desc: "Bit & Phase Flip", color: "bg-green-500" },
                { id: "Z", name: "Pauli-Z", desc: "Phase Flip", color: "bg-orange-500" },
              ].map(gate => (
                <button
                  key={gate.id}
                  onClick={() => handleAddGate(gate.id as Gate)}
                  disabled={circuit.length >= 6}
                  className="group relative flex flex-col items-center justify-center w-20 h-20 bg-white border border-slate-200 rounded-xl hover:border-quantum-primary hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={`text-xl font-bold ${gate.color.replace('bg-', 'text-')}`}>{gate.id}</span>
                  <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none">
                    {gate.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="glass-card rounded-3xl p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-quantum-electric" /> Measurement Outcome
          </h3>
          
          <div className="flex-1 flex flex-col justify-center">
            
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-quantum-electric rounded-sm" /> |0⟩ Probability</span>
                <span>{(currentState.prob0 * 100).toFixed(0)}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentState.prob0 * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-quantum-electric"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-quantum-purple rounded-sm" /> |1⟩ Probability</span>
                <span>{(currentState.prob1 * 100).toFixed(0)}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentState.prob1 * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-quantum-purple"
                />
              </div>
            </div>

            <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-slate-600">
              <span className="font-bold text-quantum-primary">Current State:</span> The mathematical state of the qubit before measurement is <strong className="font-mono bg-white px-1 py-0.5 rounded">{currentState.label}</strong>.
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
