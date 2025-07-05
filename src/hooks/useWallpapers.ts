import { useState, useEffect } from 'react';

interface WallpaperData {
  data: any[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface UseWallpapersResult {
  wallpapers: any[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  search: (query: string) => void;
  currentPage: number;
  totalPages: number;
}

export const useWallpapers = (): UseWallpapersResult => {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWallpapers = async (
    page: number,
    query: string = '',
    append: boolean = false
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/wallpapers?page=${page}&q=${query}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: WallpaperData = await response.json();

      setWallpapers(prev => (append ? [...prev, ...data.data] : data.data));
      setTotalPages(data.meta.last_page);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallpapers');
    } finally {
      setLoading(false);
    }
  };

  const search = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchWallpapers(1, query, false);
  };

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      fetchWallpapers(currentPage + 1, searchQuery, true);
    }
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  return {
    wallpapers,
    loading,
    error,
    hasMore: currentPage < totalPages,
    loadMore,
    search,
    currentPage,
    totalPages
  };
};
