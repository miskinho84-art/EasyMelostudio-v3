'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, LogOut } from 'lucide-react';
import { dashboardNavItems, APP_NAME } from '@/constants/navigation';
import { cn } from '@/utils/cn';
import { useAuth } from '@/providers/AuthProvider';

export interface SidebarProps {
  /** Contrôle l'affichage sur mobile/tablette (drawer). Ignoré en desktop où la sidebar est toujours visible. */
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {dashboardNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'relative block rounded-lg px-3 py-2 text-sm font-medium text-midnight-100 transition-colors hover:bg-white/5 hover:text-white',
              isActive && 'bg-emerald-500/10 text-emerald-400'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active"
                className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-emerald-400"
              />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarUserFooter() {
  const { user, signOut } = useAuth();

  return (
    <div className="border-t border-white/10 p-3">
      {user?.email && (
        <p className="truncate px-2 py-1 text-xs text-midnight-300" title={user.email}>
          {user.email}
        </p>
      )}
      <button
        onClick={() => signOut()}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-midnight-100 transition-colors hover:bg-white/5 hover:text-white"
      >
        <LogOut size={16} />
        Déconnexion
      </button>
    </div>
  );
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar fixe pour desktop / tablette large */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-midnight-950/60 backdrop-blur-xl md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6 font-display font-semibold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 text-midnight-950">
            <Music size={14} />
          </span>
          {APP_NAME}
        </div>
        <SidebarContent />
        <SidebarUserFooter />
      </aside>

      {/* Drawer mobile animé */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="absolute left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-midnight-950 shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-6 font-display font-semibold text-white">
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 text-midnight-950">
                    <Music size={14} />
                  </span>
                  {APP_NAME}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Fermer le menu"
                  className="rounded-md p-1 text-midnight-300 hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent onNavigate={onClose} />
              <SidebarUserFooter />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
