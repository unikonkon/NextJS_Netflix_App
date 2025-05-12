'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { Movie } from '@/data/movies';

type ContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  myList: Movie[];
  addToMyList: (movie: Movie) => void;
  removeFromMyList: (movieId: string) => void;
  clearMyList: () => void;
  isInMyList: (movieId: string) => boolean;
};

const AppContext = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState<Movie[]>([]);

  // Load myList from localStorage on initial mount
  useEffect(() => {
    try {
      const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
      setMyList(savedList);
    } catch (error) {
      console.error('Error loading myList from localStorage:', error);
      setMyList([]);
    }
  }, []);

  // Save myList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie: Movie) => {
    setMyList(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromMyList = (movieId: string) => {
    setMyList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const clearMyList = () => {
    setMyList([]);
  };

  const isInMyList = (movieId: string) => {
    return myList.some(movie => movie.id === movieId);
  };

  return (
    <AppContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      myList, 
      addToMyList, 
      removeFromMyList, 
      clearMyList,
      isInMyList
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
} 