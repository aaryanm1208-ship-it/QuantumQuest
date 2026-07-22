import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: number;
};

export type Skill = {
  name: string;
  level: number; // 1 to 100
};

export type UserProfile = {
  id: string;
  name: string;
  title: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin: number;
  completedMissions: string[];
  achievements: Achievement[];
  certificates: Certificate[];
  skills: Skill[];
};

interface AppState {
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  addXp: (amount: number, reason: string) => void;
  completeMission: (missionId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  addCertificate: (cert: Certificate) => void;
  updateSkill: (skillName: string, amount: number) => void;
}

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "first_qubit", title: "First Qubit", description: "Interact with your first qubit.", icon: "Atom" },
  { id: "photon_master", title: "Photon Master", description: "Successfully send 10 photons in BB84.", icon: "Zap" },
  { id: "crypto_guardian", title: "Crypto Guardian", description: "Detect Eve's interception.", icon: "Shield" },
  { id: "entanglement_expert", title: "Entanglement Expert", description: "Create a Bell pair.", icon: "Link" },
];

const INITIAL_SKILLS: Skill[] = [
  { name: "Quantum Mechanics", level: 10 },
  { name: "Quantum Cryptography", level: 5 },
  { name: "Circuit Design", level: 0 },
  { name: "Linear Algebra", level: 20 },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, name = "Aaryan Mudvikar") => {
        set({
          user: {
            id: "user_1",
            name,
            title: "Quantum Technology Explorer",
            email,
            xp: 150, // Give some initial XP for demo purposes
            level: 2,
            streak: 3,
            lastLogin: Date.now(),
            completedMissions: [],
            achievements: INITIAL_ACHIEVEMENTS,
            certificates: [
              { id: "cert_1", title: "Introduction to Quantum Computing", issuer: "QuantumQuest Academy", date: Date.now() - 86400000 * 5 }
            ],
            skills: INITIAL_SKILLS,
          },
        });
      },

      logout: () => set({ user: null }),

      addXp: (amount, reason) => {
        const { user } = get();
        if (!user) return;

        const newXp = user.xp + amount;
        
        let newLevel = 1;
        for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
          if (newXp >= LEVEL_THRESHOLDS[i]) {
            newLevel = i + 1;
          }
        }

        set({
          user: {
            ...user,
            xp: newXp,
            level: newLevel,
          },
        });
      },

      completeMission: (missionId) => {
        const { user, addXp, updateSkill } = get();
        if (!user || user.completedMissions.includes(missionId)) return;

        set({
          user: {
            ...user,
            completedMissions: [...user.completedMissions, missionId],
          },
        });

        addXp(50, `Completed mission: ${missionId}`);
        updateSkill("Quantum Mechanics", 5);
      },

      unlockAchievement: (achievementId) => {
        const { user } = get();
        if (!user) return;

        const updatedAchievements = user.achievements.map((ach) =>
          ach.id === achievementId && !ach.unlockedAt
            ? { ...ach, unlockedAt: Date.now() }
            : ach
        );

        set({
          user: {
            ...user,
            achievements: updatedAchievements,
          },
        });
      },

      addCertificate: (cert) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            certificates: [...user.certificates, cert]
          }
        });
      },

      updateSkill: (skillName, amount) => {
        const { user } = get();
        if (!user) return;
        
        const updatedSkills = user.skills.map(skill => 
          skill.name === skillName 
            ? { ...skill, level: Math.min(100, skill.level + amount) }
            : skill
        );
        
        set({
          user: {
            ...user,
            skills: updatedSkills
          }
        });
      }
    }),
    {
      name: "quantum-quest-storage",
    }
  )
);
