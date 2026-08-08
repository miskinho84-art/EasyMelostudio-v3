'use client';

import { motion } from 'framer-motion';

const WEEK_DATA = [
  { label: 'L', value: 2 },
  { label: 'M', value: 4 },
  { label: 'M', value: 1 },
  { label: 'J', value: 5 },
  { label: 'V', value: 3 },
  { label: 'S', value: 6 },
  { label: 'D', value: 2 },
];

export function WeeklyActivityChart() {
  const max = Math.max(...WEEK_DATA.map((d) => d.value));

  return (
    <div className="flex h-24 items-end gap-2.5">
      {WEEK_DATA.map((day, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-16 w-full items-end overflow-hidden rounded-md bg-white/5">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(day.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
              className="w-full rounded-md bg-gradient-to-t from-emerald-500 to-emerald-300"
            />
          </div>
          <span className="text-[11px] text-midnight-300">{day.label}</span>
        </div>
      ))}
    </div>
  );
}
