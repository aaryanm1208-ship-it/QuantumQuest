import Link from "next/link";
import { Atom, Code, MessageSquare, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/50 backdrop-blur-lg border-t border-quantum-border/50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <Atom className="w-6 h-6 text-quantum-primary group-hover:text-quantum-electric transition-colors" />
              <span className="font-heading font-bold text-lg text-slate-800">
                QuantumQuest
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs text-center md:text-left">
              Making quantum technology understandable for everyone.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-medium text-slate-700 mb-2">
              Created by <span className="text-quantum-purple font-bold">Aaryan Mudvikar</span>
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="#" className="hover:text-quantum-primary transition-colors">
                <Code className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-quantum-electric transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-quantum-purple transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QuantumQuest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
