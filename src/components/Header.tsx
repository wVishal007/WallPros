import React, { useState } from 'react';
import { Search, Menu, X, Filter, Grid, List } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleView: () => void;
  isGridView: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onToggleView, 
  isGridView, 
  searchQuery, 
  setSearchQuery 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Grid className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              WallScope
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for amazing wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleView}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              {isGridView ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              <span>{isGridView ? 'List' : 'Grid'}</span>
            </button>
            
            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <div className="flex flex-col space-y-3">
              <button
                onClick={onToggleView}
                className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                {isGridView ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                <span>{isGridView ? 'List View' : 'Grid View'}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;