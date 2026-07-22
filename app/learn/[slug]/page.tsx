"use client";

import { use } from "react";
import { topics } from "@/data/content";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, Brain, Target, Shield, Rocket, FlaskConical, ExternalLink, Activity } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const topic = topics[slug];

  if (!topic) {
    notFound();
  }

  const { completeMission, addXp, user } = useStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const router = useRouter();

  const handleQuizSubmit = (quizIndex: number) => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    
    if (selectedAnswer === topic.quiz[quizIndex].correctAnswer) {
      if (user) {
        completeMission(topic.id);
      }
    }
  };

  const sections = [
    { id: "overview", title: "Overview", content: topic.overview, icon: <BookOpen className="w-5 h-5" /> },
    { id: "history", title: "Historical Background", content: topic.historicalBackground, icon: <Activity className="w-5 h-5" /> },
    { id: "scientific", title: "Scientific Definition", content: topic.scientificDefinition, icon: <FlaskConical className="w-5 h-5" /> },
    { id: "math", title: "Mathematical Foundation", content: topic.mathematicalFoundation, icon: <Target className="w-5 h-5" /> },
    { id: "intuitive", title: "Intuitive Explanation", content: topic.intuitiveExplanation, icon: <Brain className="w-5 h-5" /> },
    { id: "visual", title: "Visual Explanation", content: topic.visualExplanation, icon: <ExternalLink className="w-5 h-5" /> },
    { id: "apps", title: "Applications", content: topic.applications, icon: <Rocket className="w-5 h-5" /> },
    { id: "limitations", title: "Limitations", content: topic.limitations, icon: <Shield className="w-5 h-5" /> },
    { id: "research", title: "Current Research", content: topic.currentResearch, icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full flex gap-8">
      
      {/* Sticky Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 glass-card rounded-2xl p-6">
          <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-quantum-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Roadmap
          </Link>
          <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Table of Contents</h3>
          <ul className="space-y-3">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm font-medium text-slate-600 hover:text-quantum-electric transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#quiz" className="text-sm font-bold text-quantum-primary hover:text-quantum-purple transition-colors flex items-center gap-2 mt-4">
                <CheckCircle className="w-4 h-4" />
                Knowledge Check
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-50 text-quantum-primary text-xs font-bold rounded-full">{topic.category}</span>
            <span className="px-3 py-1 bg-purple-50 text-quantum-purple text-xs font-bold rounded-full">{topic.difficulty}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 mb-6 tracking-tight">
            {topic.title}
          </h1>
        </div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              id={section.id} 
              key={section.id}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-quantum-primary/10 to-quantum-electric/10 rounded-xl text-quantum-primary">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold font-heading text-slate-800">{section.title}</h2>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-quantum-primary">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                  {section.content}
                </p>
              </div>
            </motion.section>
          ))}
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="further"
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-bold font-heading text-slate-800 mb-4">Further Learning</h2>
            <div className="flex flex-wrap gap-3">
              {topic.furtherLearning.map(t => (
                <span key={t} className="px-4 py-2 bg-slate-100 text-slate-600 font-medium rounded-xl border border-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Quiz Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="quiz" 
            className="mt-16 pt-16 border-t border-slate-200"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-quantum-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-quantum-electric/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-heading mb-2 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-quantum-electric" /> Knowledge Check
                </h2>
                <p className="text-slate-300 mb-8">Test your understanding to earn XP and complete this module.</p>
                
                {topic.quiz.map((q, qIndex) => (
                  <div key={qIndex} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold mb-6 leading-relaxed">{q.question}</h3>
                    
                    <div className="space-y-3 mb-6">
                      {q.options.map((opt, i) => {
                        const isSelected = selectedAnswer === i;
                        const isCorrect = i === q.correctAnswer;
                        const showCorrect = showExplanation && isCorrect;
                        const showWrong = showExplanation && isSelected && !isCorrect;
                        
                        let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200";
                        if (isSelected && !showExplanation) btnStyle = "bg-quantum-primary/20 border-quantum-primary text-white";
                        if (showCorrect) btnStyle = "bg-green-500/20 border-green-500 text-green-100";
                        if (showWrong) btnStyle = "bg-red-500/20 border-red-500 text-red-100";
                        
                        return (
                          <button
                            key={i}
                            disabled={showExplanation}
                            onClick={() => setSelectedAnswer(i)}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${btnStyle}`}
                          >
                            <span className="font-bold mr-3 opacity-50">{String.fromCharCode(65 + i)}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {!showExplanation ? (
                      <button 
                        onClick={() => handleQuizSubmit(qIndex)}
                        disabled={selectedAnswer === null}
                        className="px-6 py-3 bg-gradient-to-r from-quantum-electric to-quantum-primary text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`p-5 rounded-xl border ${selectedAnswer === q.correctAnswer ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-white/10'}`}
                      >
                        <div className="flex items-start gap-3">
                          {selectedAnswer === q.correctAnswer ? (
                            <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                          ) : (
                            <Brain className="w-6 h-6 text-quantum-electric shrink-0" />
                          )}
                          <div>
                            <h4 className={`font-bold mb-1 ${selectedAnswer === q.correctAnswer ? 'text-green-400' : 'text-slate-200'}`}>
                              {selectedAnswer === q.correctAnswer ? 'Correct! +50 XP' : 'Keep learning!'}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <button 
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm"
                          >
                            Return to Dashboard
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
