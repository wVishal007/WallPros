import React, { useState } from 'react';
import Header from './components/Header';
import WallpaperCard from './components/WallpaperCard';
import WallpaperModal from './components/WallpaperModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWallpapers } from './hooks/useWallpapers';
import { ChevronUp } from 'lucide-react';

function App() {
  const [selectedWallpaper, setSelectedWallpaper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { wallpapers, loading, error, hasMore, loadMore, search } = useWallpapers();

  const handleWallpaperClick = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    search(query);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header
          onSearch={handleSearch}
          onToggleView={() => setIsGridView(!isGridView)}
          isGridView={isGridView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="pt-32 pb-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Discover Amazing Wallpapers
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore thousands of high-quality wallpapers from Wallhaven's vast collection.
                Find the perfect background for your desktop, mobile, or any device.
              </p>
            </div>

            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => search(searchQuery)}
              />
            )}

            {!error && (
              <>
                <div className={`grid gap-6 ${
                  isGridView 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1 lg:grid-cols-2'
                }`}>
                  {wallpapers.map((wallpaper, index) => (
                    <WallpaperCard
                      key={`${wallpaper.id}-${index}`}
                      wallpaper={wallpaper}
                      onClick={handleWallpaperClick}
                    />
                  ))}
                </div>

                {loading && <LoadingSpinner />}

                {!loading && hasMore && wallpapers.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={loadMore}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                    >
                      Load More Wallpapers
                    </button>
                  </div>
                )}

                {!loading && !hasMore && wallpapers.length > 0 && (
                  <div className="text-center mt-12">
                    <p className="text-gray-400">
                      You've reached the end of the gallery. Try searching for something else!
                    </p>
                  </div>
                )}

                {!loading && wallpapers.length === 0 && searchQuery && (
                  <div className="text-center mt-12">
                    <p className="text-gray-400 text-lg">
                      No wallpapers found for "{searchQuery}". Try a different search term.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-110 z-40"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}

        <WallpaperModal
          wallpaper={selectedWallpaper}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
