import React from 'react';
import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'gray' | 'rose' | 'lavender' | 'mint' | 'peach' | 'sky' | 'corporate';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

const themes = {
  light: {
    primary: '#2D3FE7',
    background: '#F5F7FF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
  },
  dark: {
    primary: '#4F46E5',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
  },
  gray: {
    primary: '#4B5563',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
  },
  rose: {
    primary: '#EC4899',
    background: '#FDF2F8',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#FCE7F3',
  },
  lavender: {
    primary: '#8B5CF6',
    background: '#F5F3FF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#EDE9FE',
  },
  mint: {
    primary: '#10B981',
    background: '#ECFDF5',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#D1FAE5',
  },
  peach: {
    primary: '#F97316',
    background: '#FFF7ED',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#FFEDD5',
  },
  sky: {
    primary: '#0EA5E9',
    background: '#F0F9FF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E0F2FE',
  },
  corporate: {
    primary: '#0EA5E9',
    background: '#F0F9FF',
    card: '#FFFFFF',
    text: '#1F2937',
    border: '#E0F2FE',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();

  React.useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.classList.remove('light', 'dark', 'gray', 'rose', 'lavender', 'mint', 'peach', 'sky', 'corporate');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};