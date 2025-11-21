"use client";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "classnames";

type PillProps = {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

export default function CheckboxPill({ label, checked, onChange }: PillProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative rounded-full px-4 py-2 font-medium transition-colors",
        "border",
        checked
          ? "text-white border-transparent"
          : "text-gray-700 border-primary/30 bg-white"
      )}
    >
      <motion.span
        className={clsx("block")}
        initial={false}
        animate={{ color: checked ? "#fff" : "#374151" }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </motion.span>
      <AnimatePresence>
        {checked && (
          <motion.div
            className="absolute inset-0 rounded-full -z-10 bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}