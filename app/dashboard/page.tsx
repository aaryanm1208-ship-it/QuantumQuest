"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Trophy, Flame, Target, Award, ArrowRight, Zap, Link as LinkIcon, Shield, Atom, Briefcase, FileBadge, CheckCircle, GraduationCap, ExternalLink } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-5 h-5 text-quantum-electric" />,
  Zap: <Zap className="w-5 h-5 text-yellow-500" />,
  Shield: <Shield className="w-5 h-5 text-green-500" />,
  Link: <LinkIcon className="w-5 h-5 text-quantum-purple" />,
};

export default function DashboardPage() {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000];
  const currentThreshold = LEVEL_THRESHOLDS[user.level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[user.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const progressPercent = Math.min(100, Math.max(0, ((user.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Left Column: Profile Card & Skills */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        
        {/* Profile Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl overflow-hidden relative"
        >
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-quantum-primary via-quantum-electric to-quantum-purple relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          </div>
          
          <div className="p-6 relative">
            <div className="absolute -top-12 left-6 w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-quantum-primary font-heading">
                {user.name.charAt(0)}
              </div>
            </div>
            
            <div className="mt-14">
              <h1 className="text-2xl font-bold font-heading text-slate-900">{user.name}</h1>
              <p className="text-slate-600 font-medium flex items-center gap-2 mt-1">
                <Briefcase className="w-4 h-4 text-slate-400" />
                {user.title}
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rank</p>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-800">Level {user.level}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Streak</p>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-slate-800">{user.streak} Days</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills & Endorsements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-3xl p-6"
        >
          <h3 className="text-lg font-bold font-heading text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-quantum-electric" /> Skills & Expertise
          </h3>
          <div className="space-y-4">
            {user.skills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-1.5">
                  <span>{skill.name}</span>
                  <span className="text-slate-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-quantum-primary to-quantum-cyan"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Feed, Certificates, Achievements */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        
        {/* Progress & Next Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-bold text-slate-800">Current Progress</h2>
              <span className="text-sm font-bold text-quantum-primary">{user.xp} / {nextThreshold} XP</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-quantum-primary via-quantum-electric to-quantum-purple"
              />
            </div>
            <p className="text-sm text-slate-500">Earn {nextThreshold - user.xp} more XP to reach Level {user.level + 1}.</p>
          </div>
          
          <Link 
            href="/learn"
            className="shrink-0 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2"
          >
            Continue Learning <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-quantum-primary" /> Licenses & Certifications
            </h3>
          </div>
          
          <div className="space-y-4">
            {user.certificates.map(cert => (
              <div key={cert.id} className="flex gap-4 items-start p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-colors">
                <div className="p-3 bg-blue-50 text-quantum-primary rounded-xl shrink-0">
                  <FileBadge className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{cert.title}</h4>
                  <p className="text-slate-600 font-medium">{cert.issuer}</p>
                  <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
                    Issued {new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    <span className="mx-2">•</span>
                    No Expiration Date
                  </p>
                  <button className="mt-3 text-sm font-bold text-slate-500 hover:text-quantum-primary transition-colors flex items-center gap-1 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-quantum-primary">
                    Show credential <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-heading text-slate-800 flex items-center gap-2">
              <Award className="w-6 h-6 text-quantum-purple" /> Honors & Awards
            </h3>
            <span className="text-sm font-medium text-slate-500">
              {user.achievements.filter(a => a.unlockedAt).length} / {user.achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.achievements.map((achievement, i) => {
              const isUnlocked = !!achievement.unlockedAt;
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked 
                      ? "bg-white/80 border-quantum-electric/30 shadow-sm hover:shadow-md" 
                      : "bg-slate-50/50 border-slate-200/50 opacity-60 grayscale"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${isUnlocked ? "bg-white shadow-sm" : "bg-slate-200"}`}>
                      {iconMap[achievement.icon]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        {achievement.title}
                        {isUnlocked && <CheckCircle className="w-3 h-3 text-quantum-electric" />}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
                      {isUnlocked && (
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">
                          Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
