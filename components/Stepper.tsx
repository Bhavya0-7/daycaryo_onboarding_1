"use client";
import clsx from "classnames";

type Props = {
  current: number;
  total: number;
  labels: string[];
  onJump: (step: number) => void;
};

export default function Stepper({ current, total, labels, onJump }: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <ol className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {labels.map((l, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isDone = step < current;
          return (
            <li key={l} className="flex flex-col items-center gap-1">
              <button
                className={clsx(
                  "w-8 h-8 rounded-full border font-semibold",
                  isActive
                    ? "text-white border-transparent bg-gradient-to-r from-primary to-secondary"
                    : isDone
                    ? "text-white border-transparent bg-gradient-to-r from-primary to-secondary/70"
                    : "text-primary bg-white border-primary"
                )}
                onClick={() => onJump(step)}
              >
                {step}
              </button>
              <span className="text-xs text-gray-500 text-center">{l}</span>
            </li>
          );
        })}
      </ol>
      <div className="mt-2 h-1 rounded-full bg-white/70 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}