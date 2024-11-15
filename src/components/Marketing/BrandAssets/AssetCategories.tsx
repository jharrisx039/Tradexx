import React from 'react';
import { Image, FileText, Video, Book, Palette, Layout } from 'lucide-react';
import clsx from 'clsx';

interface AssetCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Assets', icon: Layout },
  { id: 'logos', name: 'Logos', icon: Image },
  { id: 'images', name: 'Images', icon: Image },
  { id: 'videos', name: 'Videos', icon: Video },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'guidelines', name: 'Brand Guidelines', icon: Book },
  { id: 'colors', name: 'Color Palette', icon: Palette },
];

export const AssetCategories: React.FC<AssetCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-1">
        {categories.map(category => {
          const Icon = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};