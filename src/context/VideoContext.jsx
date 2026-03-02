import React, { createContext, useState, useEffect } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  
 
  const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = currentUser?.id;


  useEffect(() => {
    if (userId) {
      const savedWatchlist = JSON.parse(localStorage.getItem(`watchlist_${userId}`)) || [];
      const savedHistory = JSON.parse(localStorage.getItem(`history_${userId}`)) || [];
      setWatchlist(savedWatchlist);
      setHistory(savedHistory);
    }
  }, [userId]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      const updated = [...watchlist, { ...movie, addedAt: new Date() }];
      setWatchlist(updated);
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
    }
  };

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updated));
  };

  const addToHistory = (movie) => {
    const updated = [movie, ...history.filter(m => m.id !== movie.id)].slice(0, 20); // Keep last 20
    setHistory(updated);
    localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
  };

  return (
    <VideoContext.Provider value={{ watchlist, history, addToWatchlist, removeFromWatchlist, addToHistory }}>
      {children}
    </VideoContext.Provider>
  );
};