import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette premium EasyMelo Studio — bleu nuit / noir profond / émeraude / doré
        midnight: {
          DEFAULT: '#0A0E1A',
          50: '#F4F6FA',
          100: '#E4E8F2',
          200: '#B8C2D9',
          300: '#8B99BF',
          400: '#4E5D82',
          500: '#2A3654',
          600: '#1A2338',
          700: '#131A2E',
          800: '#0D1220',
          900: '#0A0E1A',
          950: '#05070E',
        },
        emerald: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          900: '#064E3B',
        },
        gold: {
          DEFAULT: '#D4AF7A',
          100: '#F5EBD9',
          200: '#E9D3AE',
          300: '#D4AF7A',
          400: '#C79A5C',
          500: '#B4854A',
        },
        // Alias conservé pour compatibilité avec les composants existants (Button, Navbar, Sidebar…)
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          900: '#064E3B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora': 'linear-gradient(135deg, #0A0E1A 0%, #131A2E 45%, #0D1F1A 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(16, 185, 129, 0.45)',
        'glow-gold': '0 0 40px -12px rgba(212, 175, 122, 0.4)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
