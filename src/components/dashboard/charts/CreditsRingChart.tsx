'use client';

import { motion } from 'framer-motion';

interface CreditsRingChartProps {
  used: number;
  total: number;
}

export function CreditsRingChart({ used, total }: CreditsRingChartProps) {
  const size = 96;
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, used / total);

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D4AF7A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - percent) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>
      <div>
        <p className="font-display text-xl font-semibold text-white">
          {used}
          <span className="text-sm font-normal text-midnight-300">/{total}</span>
        </p>
        <p className="text-xs text-midnight-200">crédits utilisés ce mois-ci</p>
      </div>
    </div>
  );
}
