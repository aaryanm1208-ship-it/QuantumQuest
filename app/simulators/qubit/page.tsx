"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";

function BlochSphere({ theta, phi }: { theta: number, phi: number }) {
  // Convert spherical (theta, phi) to Cartesian (x,y,z)
  // Theta: 0 to PI (0 is |0>, PI is |1>)
  // Phi: 0 to 2PI (phase)
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.cos(theta);
  const z = Math.sin(theta) * Math.sin(phi);

  const vector = useMemo(() => new THREE.Vector3(x, y, z), [x, y, z]);
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  return (
    <group>
      {/* The Sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} wireframe />
      </mesh>
      
      {/* Axes */}
      <axesHelper args={[1.5]} />
      
      {/* State Vector */}
      <arrowHelper args={[vector, origin, 1, 0x8a2be2, 0.2, 0.1]} />
      
      {/* Labels */}
      <Text position={[0, 1.2, 0]} color="black" fontSize={0.15}>|0⟩</Text>
      <Text position={[0, -1.2, 0]} color="black" fontSize={0.15}>|1⟩</Text>
      <Text position={[1.2, 0, 0]} color="black" fontSize={0.15}>+X</Text>
      <Text position={[0, 0, 1.2]} color="black" fontSize={0.15}>+Z</Text>
    </group>
  );
}

export default function QubitSimulator() {
  const [theta, setTheta] = useState(0); // 0 to PI
  const [phi, setPhi] = useState(0); // 0 to 2PI
  const { addXp, user, unlockAchievement } = useStore();

  const handleMeasure = () => {
    // Probability of measuring |1> is sin^2(theta/2)
    const prob1 = Math.pow(Math.sin(theta / 2), 2);
    const result = Math.random() < prob1 ? 1 : 0;
    
    // Collapse the state
    setTheta(result === 1 ? Math.PI : 0);
    setPhi(0);
    
    alert(`Measured State: |${result}⟩\nProbability of |1⟩ was ${(prob1 * 100).toFixed(1)}%`);

    if (user) {
      addXp(10, "Measured a Qubit");
      unlockAchievement("first_qubit");
    }
  };

  const prob0 = Math.pow(Math.cos(theta / 2), 2);
  const prob1 = Math.pow(Math.sin(theta / 2), 2);

  return (
    <div className="w-full">
      <Link href="/simulators" className="inline-flex items-center gap-2 text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Simulators
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
        
        {/* Controls Panel */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-slate-800 mb-2">Bloch Sphere</h1>
            <p className="text-sm text-slate-500 mb-8">
              Visualize a single qubit state. Adjust the angles to see how it affects the probabilities of measuring |0⟩ or |1⟩.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <label>Theta (θ)</label>
                  <span>{(theta * (180 / Math.PI)).toFixed(0)}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" max={Math.PI} step="0.01" 
                  value={theta} 
                  onChange={(e) => setTheta(parseFloat(e.target.value))}
                  className="w-full accent-quantum-electric"
                />
                <p className="text-xs text-slate-400 mt-1">Controls the probability amplitude (0 to 180°)</p>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <label>Phi (φ)</label>
                  <span>{(phi * (180 / Math.PI)).toFixed(0)}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" max={2 * Math.PI} step="0.01" 
                  value={phi} 
                  onChange={(e) => setPhi(parseFloat(e.target.value))}
                  className="w-full accent-quantum-purple"
                />
                <p className="text-xs text-slate-400 mt-1">Controls the relative phase (0 to 360°)</p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-white/50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Measurement Probabilities</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>|0⟩</span>
                    <span>{(prob0 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-quantum-electric" style={{ width: `${prob0 * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>|1⟩</span>
                    <span>{(prob1 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-quantum-purple" style={{ width: `${prob1 * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleMeasure}
            className="w-full py-4 bg-gradient-to-r from-quantum-primary to-quantum-electric text-white font-bold rounded-xl shadow-lg hover:shadow-quantum-primary/30 transition-transform active:scale-95"
          >
            Measure Qubit
          </button>
        </div>

        {/* 3D Canvas */}
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden relative border border-white/60 min-h-[400px]">
          <Canvas camera={{ position: [2, 2, 2] }}>
            <ambientLight intensity={0.5} />
            <OrbitControls enablePan={false} enableZoom={true} />
            <BlochSphere theta={theta} phi={phi} />
          </Canvas>
          <div className="absolute top-4 left-4 pointer-events-none bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 shadow-sm">
            Drag to Rotate • Scroll to Zoom
          </div>
        </div>

      </div>
    </div>
  );
}
