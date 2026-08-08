import { create } from 'zustand';

/**
 * Store global de l'interface (exemple minimal).
 * Sera étendu au fil des étapes (ex: état de la sidebar, thème, etc.).
 */
interface UIState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));
