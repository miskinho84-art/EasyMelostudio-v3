'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/providers/AuthProvider';
import { getGreetingWord, getDynamicMessage, getQuoteOfTheDay } from '@/constants/dashboard';

function useClientClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function GreetingHeader() {
  const { user } = useAuth();
  const time = useClientClock();

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.first_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'là';

  const hour = time?.getHours() ?? 12;
  const greeting = getGreetingWord(hour);
  const message = getDynamicMessage(hour);
  const quote = getQuoteOfTheDay();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(212,175,122,0.12),transparent_50%)]"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 opacity-40 blur-md" />
            <Avatar name={displayName} size={56} className="relative border-2 border-white/10" />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-display text-2xl font-semibold text-white sm:text-3xl"
            >
              {greeting}, {displayName} 👋
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-1 flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-1 rounded-full border border-gold-300/30 bg-gold-300/10 px-2.5 py-0.5 text-xs font-medium text-gold-300">
                <Sparkles size={11} />
                Premium
              </span>
              <span className="text-sm text-midnight-200">
                {time
                  ? time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                  : '--:--'}
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm text-midnight-100 sm:max-w-[220px] sm:text-right"
        >
          {message}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative mt-6 flex items-start gap-2 border-t border-white/10 pt-4 text-sm italic text-midnight-100"
      >
        <Quote size={14} className="mt-0.5 shrink-0 text-emerald-400" />
        {quote}
      </motion.div>
    </div>
  );
}
