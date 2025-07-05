import React, { useState } from 'react';
import { X, Download, Heart, Eye, Calendar, Tag, Monitor, Smartphone, Copy, ExternalLink } from 'lucide-react';

interface WallpaperModalProps {
  wallpaper: any;
  isOpen: boolean;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen || !wallpaper) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-6xl max-h-[90vh] w-full bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="lg:w-2/3 relative">
            <img
              src={wallpaper.path}
              alt={`Wallpaper ${wallpaper.id}`}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(wallpaper.category)}`}>
                    {wallpaper.category}
                  </span>
                  <span className="text-sm text-gray-400">ID: {wallpaper.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {wallpaper.resolution} Wallpaper
                </h2>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{wallpaper.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{wallpaper.favorites.toLocaleString()} favorites</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(wallpaper.path, '_blank')}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    isLiked
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-white/20 text-white hover:border-red-500 hover:bg-red-500/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Resolution Options */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Monitor className="w-5 h-5" />
                  <span>Download Options</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => window.open(wallpaper.path, '_blank')}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Monitor className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Desktop</div>
                    <div className="text-xs text-gray-400">{wallpaper.resolution}</div>
                  </button>
                  <button
                    onClick={() => window.open(wallpaper.thumbs.large, '_blank')}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Mobile</div>
                    <div className="text-xs text-gray-400">Optimized</div>
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Dimensions:</span>
                    <div className="text-white font-medium">{wallpaper.dimension_x} × {wallpaper.dimension_y}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">File Size:</span>
                    <div className="text-white font-medium">{formatFileSize(wallpaper.file_size)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Format:</span>
                    <div className="text-white font-medium uppercase">{wallpaper.file_type}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Ratio:</span>
                    <div className="text-white font-medium">{wallpaper.ratio}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Upload Date:</span>
                    <div className="text-white font-medium flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(wallpaper.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {wallpaper.tags && wallpaper.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>Tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {wallpaper.tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Share</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => copyToClipboard(wallpaper.short_url)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <button
                    onClick={() => window.open(wallpaper.short_url, '_blank')}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;