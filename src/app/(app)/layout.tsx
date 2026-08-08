'use client';

import { useState } from 'react';
import { Menu, Music } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { APP_NAME } from '@/constants/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-midnight-900 text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar visible uniquement sur mobile/tablette pour ouvrir le drawer */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 bg-midnight-900/80 px-4 backdrop-blur-xl md:hidden">
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-midnight-100 hover:bg-white/5"
          >
            <Menu size={22} />
          </button>
          <span className="flex items-center gap-2 font-display font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-gold-300 text-midnight-950">
              <Music size={14} />
            </span>
            {APP_NAME}
          </span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
