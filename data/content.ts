export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface EducationalTopic {
  id: string;
  title: string;
  category: "Quantum Mechanics" | "Quantum Computing" | "Quantum Communication" | "Quantum Hardware";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Research Level";
  
  // The 10 Wikipedia-Standard Sections
  overview: string;
  historicalBackground: string;
  scientificDefinition: string;
  mathematicalFoundation: string;
  intuitiveExplanation: string;
  visualExplanation: string; // Instructions on what simulator relates to this
  applications: string;
  limitations: string;
  currentResearch: string;
  furtherLearning: string[];

  // Embedded Assessment
  quiz: QuizQuestion[];
}

export const topics: Record<string, EducationalTopic> = {
  qubits: {
    id: "qubits",
    title: "Quantum Bits (Qubits)",
    category: "Quantum Computing",
    difficulty: "Beginner",
    overview: "A qubit is the fundamental unit of quantum information, analogous to a classical bit. Unlike a classical bit, which can be strictly 0 or 1, a qubit can exist in a superposition of both states simultaneously until measured.",
    historicalBackground: "The concept of quantum information originated in the 1970s and 1980s through the work of Stephen Wiesner, Charles Bennett, and Paul Benioff. The term 'qubit' was formally coined by Benjamin Schumacher in 1995 while working on quantum data compression.",
    scientificDefinition: "A qubit is a two-state (or two-level) quantum-mechanical system. It is a mathematical object described by a unit vector in a two-dimensional complex vector space (Hilbert space).",
    mathematicalFoundation: "The state of a qubit |ψ⟩ is a linear combination of the basis states |0⟩ and |1⟩: \n|ψ⟩ = α|0⟩ + β|1⟩\nwhere α and β are complex numbers known as probability amplitudes, satisfying the normalization condition |α|² + |β|² = 1.",
    intuitiveExplanation: "Imagine a coin. A classical bit is a coin sitting on a table—it is strictly heads (1) or tails (0). A qubit is a coin spinning in the air. While it spins, it is in a combination of heads and tails. It only becomes strictly heads or tails when you slap it down on the table (measurement).",
    visualExplanation: "Use the Qubit Visualizer. The Bloch Sphere perfectly maps the complex state of a qubit to a 3D surface. The North Pole is |0⟩ and the South Pole is |1⟩. Any point on the surface represents a valid qubit state in superposition.",
    applications: "Qubits are the building blocks of quantum computers, enabling exponential speedups for specific algorithms like prime factorization (Shor's Algorithm) and database searching (Grover's Algorithm).",
    limitations: "Qubits are highly susceptible to environmental noise and decoherence. Maintaining their quantum state requires extreme conditions, such as temperatures near absolute zero. They also suffer from the 'no-cloning theorem', meaning a qubit cannot be perfectly copied.",
    currentResearch: "Current research focuses on extending qubit coherence times and developing topological qubits (like Majorana fermions) that are inherently resistant to environmental noise.",
    furtherLearning: ["Superposition", "Bloch Sphere", "Quantum Gates"],
    quiz: [
      {
        question: "What is the normalization condition for a qubit state |ψ⟩ = α|0⟩ + β|1⟩?",
        options: ["α + β = 1", "|α| + |β| = 1", "|α|² + |β|² = 1", "α² + β² = 0"],
        correctAnswer: 2,
        explanation: "The sum of the probabilities must equal 1, and probability is the absolute square of the amplitude: |α|² + |β|² = 1."
      }
    ]
  },
  
  entanglement: {
    id: "entanglement",
    title: "Quantum Entanglement",
    category: "Quantum Mechanics",
    difficulty: "Intermediate",
    overview: "Quantum entanglement is a physical phenomenon where pairs or groups of particles interact such that the quantum state of each particle cannot be described independently of the others, even when the particles are separated by a large distance.",
    historicalBackground: "Albert Einstein, Boris Podolsky, and Nathan Rosen famously criticized this concept in 1935 (the EPR paradox), with Einstein calling it 'spooky action at a distance'. John Bell later formulated Bell's Theorem in 1964, proving that entanglement cannot be explained by hidden local variables.",
    scientificDefinition: "Two systems are entangled if their joint wavefunction cannot be factored into the product of the individual wavefunctions of the systems.",
    mathematicalFoundation: "For a two-qubit system, an entangled state (like a Bell State) is written as: \n|Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩). \nMeasuring the first qubit immediately collapses the second qubit to the identical state.",
    intuitiveExplanation: "Imagine two magical dice. When you roll them, they can land on any number, but they always perfectly match each other, even if one is rolled in New York and the other in Tokyo simultaneously. You don't know what number you'll get, but you know they will be identical.",
    visualExplanation: "Launch the Entanglement Visualizer. Observe two distant particles. Apply a Hadamard and CNOT gate to entangle them. Measure one, and watch the distant particle instantly collapse to the correlated state.",
    applications: "Entanglement is crucial for quantum cryptography, quantum teleportation, superdense coding, and error correction.",
    limitations: "Entanglement cannot be used to transmit classical information faster than the speed of light (No-Communication Theorem). Environmental noise easily destroys entanglement (entanglement sudden death).",
    currentResearch: "Scientists recently achieved quantum entanglement over vast distances (1,200 km) using the Micius satellite, paving the way for a global quantum internet.",
    furtherLearning: ["Bell States", "Quantum Teleportation", "E91 Protocol"],
    quiz: [
      {
        question: "Does measuring an entangled particle allow for faster-than-light communication?",
        options: ["Yes, through instant wave collapse", "No, due to the No-Communication Theorem", "Yes, but only in a vacuum", "No, because particles lose entanglement over distance"],
        correctAnswer: 1,
        explanation: "The No-Communication Theorem prevents entanglement from being used to transmit classical information faster than the speed of light, as the measurement outcomes are perfectly random."
      }
    ]
  },

  bb84: {
    id: "bb84",
    title: "BB84 Protocol",
    category: "Quantum Communication",
    difficulty: "Intermediate",
    overview: "BB84 is the first quantum cryptography protocol. It provides a method for two parties (Alice and Bob) to securely share a secret cryptographic key, guaranteed by the fundamental laws of quantum mechanics.",
    historicalBackground: "The protocol was developed by Charles Bennett and Gilles Brassard in 1984, hence the name BB84. It marked the practical birth of quantum cryptography.",
    scientificDefinition: "BB84 relies on the quantum property that measuring an unknown quantum state in a conjugate basis disturbs it (Heisenberg Uncertainty Principle). By transmitting qubits encoded in randomly chosen bases, any eavesdropper attempting to read the key will introduce detectable errors.",
    mathematicalFoundation: "The protocol utilizes two non-orthogonal bases, typically the rectilinear (+ basis, states |0⟩, |1⟩) and diagonal (x basis, states |+⟩, |-⟩). If Eve intercepts in the wrong basis, she gets a random result and re-transmits a collapsed state, introducing a 25% error rate on average when Alice and Bob compare bases.",
    intuitiveExplanation: "Imagine Alice sends Bob a message locked in a box. The box is made of fragile glass. If an eavesdropper (Eve) tries to open the box to read the message in transit, the glass shatters. Alice and Bob check the box when it arrives; if it's shattered, they know someone intercepted it and they discard the message.",
    visualExplanation: "Use the BB84 Simulator. Act as Alice to encode photons. Switch to Eve to attempt interception, and watch how measuring in the wrong basis corrupts the state. Finally, act as Bob to measure and calculate the Quantum Bit Error Rate (QBER) to detect Eve.",
    applications: "Secure communication immune to any future computational advances, including those brought by large-scale quantum computers (which would break classical RSA/ECC encryption).",
    limitations: "Requires specialized hardware like single-photon sources and highly sensitive detectors. Transmission is limited by photon loss over optical fibers, typically requiring quantum repeaters for long distances.",
    currentResearch: "Commercial deployment is currently active. Research focuses on improving transmission rates (QKD networks) and developing practical quantum repeaters to eliminate distance limits.",
    furtherLearning: ["E91 Protocol", "No-Cloning Theorem", "Quantum Cryptography"],
    quiz: [
      {
        question: "How does BB84 detect an eavesdropper (Eve)?",
        options: [
          "Eve's computer leaves an IP trace.",
          "Eve measuring the photon alters its quantum state, introducing a high error rate.",
          "The photons slow down when intercepted.",
          "BB84 encrypts the key using RSA, which alerts Alice."
        ],
        correctAnswer: 1,
        explanation: "According to quantum mechanics, measuring an unknown state disturbs it. Eve's interference introduces errors that Alice and Bob detect during the basis comparison phase."
      }
    ]
  }
};
