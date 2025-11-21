"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  useEffect(() => {
    // No heavy libs; simple confetti using DOM + CSS animations
    const container = document.getElementById("confetti-container");
    if (!container) return;
    const colors = ["#AB4FFC", "#B01EB8", "#7dd3fc", "#fde68a", "#fca5a5"]; // brand + soft accents
    const count = 60;
    for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.className = "confetti-piece";
      const size = 6 + Math.random() * 8;
      div.style.width = `${size}px`;
      div.style.height = `${size * 0.6}px`;
      div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      div.style.left = `${Math.random() * 100}%`;
      div.style.animationDelay = `${Math.random() * 0.8}s`;
      div.style.opacity = `${0.7 + Math.random() * 0.3}`;
      container.appendChild(div);
    }
    return () => { if (container) container.innerHTML = ""; };
  }, []);

  return (
    <main className="w-full flex flex-col items-center mt-10 relative overflow-hidden">
      <div id="confetti-container" className="pointer-events-none fixed inset-0"></div>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-xl p-8 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <img src="/logo.svg" alt="Daycaryo" className="w-10 h-10" />
          <span className="brand text-2xl">Daycaryo</span>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Registration Submitted 🎉</h1>
        <p className="text-gray-600 mb-5">Thank you for joining India’s trusted daycare network. We’ll review your details and get in touch soon.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <a className="btn-success justify-center" href="https://wa.me/7014469186?text=Hi%20Daycaryo%20team%2C%20please%20verify%20my%20registration%20faster." target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
          <Link href="/" className="btn-secondary justify-center">Back to Home</Link>
        </div>
      </motion.section>

      <style jsx global>{`
        .confetti-piece {
          position: absolute;
          top: -10px;
          transform: rotate(${Math.random() * 360}deg);
          border-radius: 2px;
          animation: fall 2.2s ease-in forwards;
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>
    </main>
  );
}