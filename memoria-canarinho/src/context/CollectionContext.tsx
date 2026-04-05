import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CollectionItem } from '../data/mockData';

interface CollectionContextType {
  favorites: CollectionItem[];
  toggleFavorite: (item: CollectionItem) => void;
  isFavorite: (id: string) => boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<CollectionItem[]>([]);

  const toggleFavorite = (item: CollectionItem) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      if (exists) {
        return prev.filter(fav => fav.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <CollectionContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
