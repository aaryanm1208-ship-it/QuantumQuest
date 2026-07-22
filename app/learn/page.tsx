"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

const PATHWAY = [
  {
    id: "beginner",
    title: "Beginner",
    description: "The foundations of quantum mechanics.",
    color: "from-blue-400 to-quantum-primary",
    modules: [
      { id: "intro", title: "What is Quantum Computing" },
      { id: "classical-vs-quantum", title: "Classical vs Quantum" },
      { id: "qubits", title: "Qubits" },
      { id: "superposition", title: "Superposition" },
      { id: "measurement", title: "Measurement" },
    ]
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Manipulating quantum states.",
    color: "from-quantum-purple to-pink-500",
    modules: [
      { id: "bloch-sphere", title: "Bloch Sphere" },
      { id: "quantum-gates", title: "Quantum Gates" },
      { id: "quantum-circuits", title: "Quantum Circuits" },
      { id: "entanglement", title: "Entanglement" },
      { id: "bell-states", title: "Bell States" },
    ]
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Real-world quantum algorithms.",
    color: "from-amber-400 to-orange-500",
    modules: [
      { id: "teleportation", title: "Quantum Teleportation" },
      { id: "bb84", title: "BB84 Protocol" },
      { id: "e91", title: "E91 Protocol" },
      { id: "error-correction", title: "Quantum Error Correction" },
      { id: "nisq", title: "NISQ Era" },
      { id: "algorithms", title: "Quantum Algorithms" },
    ]
  }
];

export default function LearnPage() {
  const { user } = useStore();
  const completed = user?.completedMissions || [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-800 mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary to-quantum-electric">Quantum Path</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Follow the roadmap to master quantum mechanics. Earn XP and unlock achievements as you progress.
        </p>
      </div>

      <div className="space-y-16 relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-1 bg-slate-200/50 -translate-x-1/2 rounded-full overflow-hidden">
          <div className="w-full h-1/3 bg-gradient-to-b from-quantum-primary via-quantum-purple to-transparent opacity-50" />
        </div>

        {PATHWAY.map((section, sectionIdx) => (
          <div key={section.id} className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-6 md:p-8 border-t-4 border-t-transparent relative overflow-hidden mb-8 shadow-md shadow-slate-200/50"
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${section.color}`} />
              <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-slate-800">{section.title}</h2>
                  <p className="text-slate-500">{section.description}</p>
                </div>
                <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {section.modules.filter(m => completed.includes(m.id)).length} / {section.modules.length} Completed
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              {section.modules.map((module, idx) => {
                const isCompleted = completed.includes(module.id);
                // A module is accessible if it's completed, OR if the previous module is completed, OR if it's the very first module.
                // For simplicity in the demo, we make all beginner unlocked, and others require at least user login.
                const isLocked = !user && sectionIdx > 0; 
                const alignRight = idx % 2 === 0;

                return (
                  <motion.div 
                    key={module.id}
                    initial={{ opacity: 0, x: alignRight ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${alignRight ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] flex ${alignRight ? 'justify-start' : 'justify-end'}`}>
                      <Link 
                        href={isLocked ? "#" : `/learn/${module.id}`}
                        className={`block w-full max-w-sm p-4 rounded-2xl border transition-all ${
                          isLocked 
                            ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed" 
                            : isCompleted
                              ? "bg-white/80 border-quantum-electric/30 hover:shadow-md hover:scale-[1.02]"
                              : "glass-card hover:border-quantum-primary/50 hover:shadow-md hover:scale-[1.02]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className={`font-bold ${isLocked ? "text-slate-500" : "text-slate-800"}`}>
                            {module.title}
                          </h3>
                          {isLocked ? (
                            <Lock className="w-4 h-4 text-slate-400" />
                          ) : (
                            <PlayCircle className={`w-5 h-5 ${isCompleted ? "text-quantum-electric" : "text-quantum-primary"}`} />
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span className="px-2 py-1 bg-slate-100 rounded-md">+50 XP</span>
                          <span>Interactive Lesson</span>
                        </div>
                      </Link>
                    </div>

                    {/* Node Icon */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-sm border-2 border-slate-200 flex items-center justify-center z-10">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-quantum-electric" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4 text-slate-300" />
                      ) : (
                        <Circle className="w-4 h-4 text-quantum-primary" />
                      )}
                    </div>

                    {/* Empty Space for Grid Alignment */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
