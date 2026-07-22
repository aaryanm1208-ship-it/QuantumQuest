"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Activity, ArrowDown, Zap } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

type Basis = "+" | "x";
type Bit = 0 | 1;

type Photon = {
  id: number;
  aliceBit: Bit;
  aliceBasis: Basis;
  state: string; // Arrow symbol
  eveIntercepted: boolean;
  eveBasis?: Basis;
  eveBit?: Bit;
  bobBasis?: Basis;
  bobBit?: Bit;
};

const generatePhotonState = (bit: Bit, basis: Basis) => {
  if (basis === "+") return bit === 0 ? "↑" : "→";
  return bit === 0 ? "↗" : "↘";
};

export default function BB84Simulator() {
  const [photons, setPhotons] = useState<Photon[]>([]);
  const [step, setStep] = useState<"alice" | "eve" | "bob" | "compare">("alice");
  const [eveEnabled, setEveEnabled] = useState(false);
  const { addXp, user, unlockAchievement } = useStore();

  const handleAliceGenerate = () => {
    const newPhotons: Photon[] = Array.from({ length: 8 }).map((_, i) => {
      const bit = (Math.random() > 0.5 ? 1 : 0) as Bit;
      const basis = (Math.random() > 0.5 ? "+" : "x") as Basis;
      return {
        id: i,
        aliceBit: bit,
        aliceBasis: basis,
        state: generatePhotonState(bit, basis),
        eveIntercepted: false,
      };
    });
    setPhotons(newPhotons);
    setStep(eveEnabled ? "eve" : "bob");
  };

  const handleEveIntercept = () => {
    const newPhotons = photons.map(p => {
      const eveBasis = (Math.random() > 0.5 ? "+" : "x") as Basis;
      let eveBit = p.aliceBit;
      
      // If Eve uses the wrong basis, 50% chance of getting the wrong bit
      if (eveBasis !== p.aliceBasis && Math.random() > 0.5) {
        eveBit = eveBit === 0 ? 1 : 0;
      }
      
      return {
        ...p,
        eveIntercepted: true,
        eveBasis,
        eveBit,
        state: generatePhotonState(eveBit, eveBasis) // State collapses to Eve's measurement
      };
    });
    setPhotons(newPhotons);
    setStep("bob");
  };

  const handleBobMeasure = () => {
    const newPhotons = photons.map(p => {
      const bobBasis = (Math.random() > 0.5 ? "+" : "x") as Basis;
      
      // Use the state sent (which might be Eve's collapsed state or Alice's original)
      const currentBasis = p.eveIntercepted ? p.eveBasis! : p.aliceBasis;
      const currentBit = p.eveIntercepted ? p.eveBit! : p.aliceBit;
      
      let bobBit = currentBit;
      if (bobBasis !== currentBasis && Math.random() > 0.5) {
        bobBit = bobBit === 0 ? 1 : 0;
      }
      
      return { ...p, bobBasis, bobBit };
    });
    setPhotons(newPhotons);
    setStep("compare");

    if (user) {
      addXp(25, "Completed BB84 Exchange");
      unlockAchievement("photon_master");
      if (eveEnabled) unlockAchievement("crypto_guardian");
    }
  };

  const keyMatches = photons.filter(p => p.aliceBasis === p.bobBasis);
  const errorRate = keyMatches.length > 0 
    ? (keyMatches.filter(p => p.aliceBit !== p.bobBit).length / keyMatches.length) * 100 
    : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Link href="/simulators" className="text-slate-500 hover:text-quantum-primary transition-colors">
          &larr; Back to Simulators
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-700">Eve Eavesdropping</span>
          <button 
            onClick={() => setEveEnabled(!eveEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${eveEnabled ? 'bg-red-500' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${eveEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-800">BB84 Key Distribution</h1>
        <p className="text-slate-600 mt-2">Generate a secure cryptographic key using quantum mechanics.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 lg:p-8">
        
        {/* Stages */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-4 left-0 w-full h-1 bg-slate-200 -z-10" />
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "alice" ? "bg-quantum-primary text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"}`}>1</div>
            <span className="text-xs font-bold mt-2 text-slate-600">Alice Sends</span>
          </div>
          
          {eveEnabled && (
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "eve" ? "bg-red-500 text-white ring-4 ring-red-100" : "bg-slate-200 text-slate-500"}`}>E</div>
              <span className="text-xs font-bold mt-2 text-slate-600">Eve Intercepts</span>
            </div>
          )}
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "bob" ? "bg-quantum-electric text-slate-800 ring-4 ring-cyan-100" : "bg-slate-200 text-slate-500"}`}>2</div>
            <span className="text-xs font-bold mt-2 text-slate-600">Bob Measures</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "compare" ? "bg-quantum-purple text-white ring-4 ring-purple-100" : "bg-slate-200 text-slate-500"}`}>3</div>
            <span className="text-xs font-bold mt-2 text-slate-600">Compare Bases</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 p-6">
          
          {photons.length === 0 ? (
            <div className="text-center">
              <Zap className="w-12 h-12 text-quantum-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Start the Protocol</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                Alice wants to securely send a key to Bob. She generates random bits and encodes them in random bases.
              </p>
              <button onClick={handleAliceGenerate} className="px-6 py-3 bg-quantum-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-md">
                Alice: Generate & Send
              </button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-sm text-slate-500">Photon</th>
                    <th className="p-3 font-bold text-blue-600">Alice Bit</th>
                    <th className="p-3 font-bold text-blue-600">Alice Basis</th>
                    <th className="p-3 text-lg">State</th>
                    
                    {eveEnabled && step !== "alice" && (
                      <>
                        <th className="p-3 font-bold text-red-500 bg-red-50/50">Eve Basis</th>
                        <th className="p-3 font-bold text-red-500 bg-red-50/50">Eve Bit</th>
                      </>
                    )}
                    
                    {(step === "compare" || step === "bob") && (
                      <>
                        <th className="p-3 font-bold text-cyan-600">Bob Basis</th>
                        <th className="p-3 font-bold text-cyan-600">Bob Bit</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {photons.map((p, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={p.id} 
                        className={`border-b border-slate-100 ${step === "compare" && p.aliceBasis === p.bobBasis ? "bg-green-50/50" : ""}`}
                      >
                        <td className="p-3 text-slate-400 font-mono">{i + 1}</td>
                        <td className="p-3 font-mono font-bold">{p.aliceBit}</td>
                        <td className="p-3 font-bold">{p.aliceBasis}</td>
                        <td className="p-3 text-xl text-quantum-purple font-bold">{p.state}</td>
                        
                        {eveEnabled && step !== "alice" && (
                          <>
                            <td className="p-3 font-bold text-red-500 bg-red-50/50">{p.eveBasis || "-"}</td>
                            <td className="p-3 font-mono font-bold text-red-500 bg-red-50/50">{p.eveBit !== undefined ? p.eveBit : "-"}</td>
                          </>
                        )}
                        
                        {(step === "compare" || step === "bob") && (
                          <>
                            <td className="p-3 font-bold">{p.bobBasis || "-"}</td>
                            <td className="p-3 font-mono font-bold">{p.bobBit !== undefined ? p.bobBit : "-"}</td>
                          </>
                        )}
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              <div className="mt-8 flex justify-center">
                {step === "eve" && (
                  <button onClick={handleEveIntercept} className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-md animate-pulse">
                    Eve: Intercept & Measure
                  </button>
                )}
                
                {step === "bob" && (
                  <button onClick={handleBobMeasure} className="px-6 py-3 bg-quantum-electric text-slate-800 font-bold rounded-xl hover:bg-cyan-300 transition-colors shadow-md">
                    Bob: Measure Photons
                  </button>
                )}

                {step === "compare" && (
                  <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <h4 className="font-bold text-slate-800 mb-2">Protocol Results</h4>
                    <p className="text-sm text-slate-600 mb-4">Alice and Bob share their bases publicly over a classical channel and discard non-matching bases.</p>
                    
                    <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-xl mb-3">
                      <span className="font-medium text-slate-700">Shared Key Bits:</span>
                      <span className="font-bold font-mono text-quantum-primary">{keyMatches.length} bits</span>
                    </div>
                    
                    <div className={`flex justify-between items-center px-4 py-3 rounded-xl ${errorRate > 0 ? "bg-red-50" : "bg-green-50"}`}>
                      <span className="font-medium text-slate-700">Error Rate:</span>
                      <span className={`font-bold ${errorRate > 0 ? "text-red-600" : "text-green-600"}`}>{errorRate.toFixed(1)}%</span>
                    </div>

                    {errorRate > 0 && (
                      <div className="mt-4 p-3 bg-red-100 text-red-700 text-xs font-bold rounded-lg flex items-center gap-2 text-left">
                        <Shield className="w-4 h-4 shrink-0" />
                        WARNING: High error rate detected. Eavesdropper present! Protocol aborted.
                      </div>
                    )}

                    <button onClick={handleAliceGenerate} className="mt-6 text-sm font-bold text-quantum-primary hover:underline">
                      Restart Protocol
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
