import React from 'react';
import { useThemeStore } from '../ThemeProvider';
import { Sun, Moon, Palette, Heart, Briefcase, Flower2, Cloud, Leaf, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'gray', name: 'Gray', icon: Palette },
    { id: 'rose', name: 'Rose', icon: Heart },
    { id: 'lavender', name: 'Lavender', icon: Flower2 },
    { id: 'mint', name: 'Mint', icon: Leaf },
    { id: 'peach', name: 'Peach', icon: Sparkles },
    { id: 'sky', name: 'Sky', icon: Cloud },
    { id: 'corporate', name: 'Corporate', icon: Briefcase },
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Theme</h3>
      <div className="grid grid-cols-3 gap-3">
        {themes.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={clsx(
              'flex items-center gap-2 p-3 rounded-lg border text-sm font-medium',
              theme === id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            )}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};