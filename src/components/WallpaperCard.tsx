import React, { useState } from 'react';
import { Download, Heart, Eye, Calendar, Tag } from 'lucide-react';

interface WallpaperCardProps {
  wallpaper: {
    id: string;
    url: string;
    short_url: string;
    views: number;
    favorites: number;
    source: string;
    purity: string;
    category: string;
    dimension_x: number;
    dimension_y: number;
    resolution: string;
    ratio: string;
    file_size: number;
    file_type: string;
    created_at: string;
    colors: string[];
    path: string;
    thumbs: {
      large: string;
      original: string;
      small: string;
    };
    tags: Array<{
      id: number;
      name: string;
      alias: string;
      category_id: number;
      category: string;
      purity: string;
      created_at: string;
    }>;
  };
  onClick: (wallpaper: any) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'anime': return 'bg-pink-500';
      case 'general': return 'bg-blue-500';
      case 'people': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
      onClick={() => onClick(wallpaper)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={wallpaper.thumbs.large}
          alt={`Wallpaper ${wallpaper.id}`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          } group-hover:scale-110`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(wallpaper.category)}`}>
            {wallpaper.category}
          </span>
        </div>

        {/* Resolution Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-black/30 backdrop-blur-sm">
            {wallpaper.resolution}
          </span>
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(wallpaper.path, '_blank');
                }}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-3 text-white text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{wallpaper.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{wallpaper.favorites.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(wallpaper.created_at)}</span>
          </div>
          <span className="text-sm text-gray-400">{formatFileSize(wallpaper.file_size)}</span>
        </div>

        {/* Tags */}
        {wallpaper.tags && wallpaper.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {wallpaper.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-gray-300 border border-white/20"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag.name}
              </span>
            ))}
            {wallpaper.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-gray-300 border border-white/20">
                +{wallpaper.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{wallpaper.dimension_x} × {wallpaper.dimension_y}</span>
          <span className="uppercase">{wallpaper.file_type}</span>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;