import React from 'react';
import { AssetGrid } from './AssetGrid';
import { AssetUpload } from './AssetUpload';
import { AssetCategories } from './AssetCategories';
import { Plus, Search, Filter } from 'lucide-react';

export const BrandAssets = () => {
  const [category, setCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showUpload, setShowUpload] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <AssetCategories
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
        </div>

        <div className="col-span-9">
          <AssetGrid
            category={category}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      {showUpload && (
        <AssetUpload onClose={() => setShowUpload(false)} />
      )}
    </div>
  );
};