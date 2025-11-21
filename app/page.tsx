"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import bg from "../bg.jpeg";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-hero" style={{ backgroundImage: `url(${bg.src})` }} />
      <div className="bg-hero-overlay" />

      <nav className="nav-glass">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Daycaryo" className="w-8 h-8" />
            <span className="brand text-xl">Daycaryo</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/">Home</Link>
            <a href="tel:+917014469186" className="opacity-80 hover:opacity-100">Contact</a>
            <a href="#help" className="opacity-80 hover:opacity-100">Help</a>
          </div>
        </div>
      </nav>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="glass-landing soft-glow w-[min(1000px,92vw)] max-h-[86vh] p-8 md:p-10 enter-soft">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Onboard Your Daycare With Daycaryo</h1>
          <p className="text-gray-700">Get discovered by parents. Automate bookings. Build trust — all in one place.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} className="card hover-neon">
            <div className="flex items-center gap-3">
              <span className="text-xl">📍</span>
              <div>
                <h3 className="font-semibold">Increase Visibility</h3>
                <p className="text-gray-600">Get listed & found by nearby parents.</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="card hover-neon">
            <div className="flex items-center gap-3">
              <span className="text-xl">📅</span>
              <div>
                <h3 className="font-semibold">Smart Bookings</h3>
                <p className="text-gray-600">Automated schedule & availability.</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="card hover-neon">
            <div className="flex items-center gap-3">
              <span className="text-xl">📹</span>
              <div>
                <h3 className="font-semibold">Parent Transparency</h3>
                <p className="text-gray-600">CCTV-enabled trust features.</p>
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="card hover-neon">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <h3 className="font-semibold">Zero Setup Cost</h3>
                <p className="text-gray-600">Start in minutes with no tech needed.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mb-6">
          <Link href="/register" className="btn-primary hover-neon text-lg px-8 py-3">Start Registration</Link>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <a href="https://www.instagram.com/daycaryo" target="_blank" rel="noopener noreferrer" className="opacity-80 hover-neon">Instagram →</a>
          <a href="https://www.linkedin.com/company/daycaryo" target="_blank" rel="noopener noreferrer" className="opacity-80 hover-neon">LinkedIn →</a>
          <a href="tel:+917014469186" className="opacity-80 hover-neon">Call Us →</a>
        </div>
      </motion.section>
    </main>
  );
}