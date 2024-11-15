import React from 'react';
import { Download, Eye, Trash2, MoreHorizontal, Image, FileText, Video } from 'lucide-react';
import clsx from 'clsx';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  createdAt: string;
  size: number;
}

interface AssetGridProps {
  category: string;
  searchTerm: string;
}

// Mock data - in a real app, this would come from your store
const assets: Asset[] = [
  {
    id: '1',
    name: 'Logo Primary',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b',
    thumbnail: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?w=200',
    category: 'logos',
    tags: ['logo', 'brand'],
    createdAt: new Date().toISOString(),
    size: 256000,
  },
  // Add more mock assets as needed
];

export const AssetGrid: React.FC<AssetGridProps> = ({ category, searchTerm }) => {
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = category === 'all' || asset.category === category;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredAssets.map(asset => {
        const Icon = getAssetIcon(asset.type);
        
        return (
          <div
            key={asset.id}
            className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {asset.type === 'image' && asset.thumbnail ? (
              <div className="aspect-square">
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center bg-gray-50">
                <Icon className="h-12 w-12 text-gray-400" />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {asset.name}
              </h3>
              <p className="text-sm text-gray-500">
                {(asset.size / 1024).toFixed(1)} KB
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {asset.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="p-2 text-white hover:text-blue-200"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <a
                  href={asset.url}
                  download
                  className="p-2 text-white hover:text-blue-200"
                >
                  <Download className="h-5 w-5" />
                </a>
                <button className="p-2 text-white hover:text-red-200">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};