import React, { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';
import VideoCard from '../components/VideoCard';

const Watchlist = () => {
  const { watchlist, history, removeFromWatchlist } = useContext(VideoContext);

  
  const getWatchStatus = (movieId) => {
    return history.some(m => m.id === movieId);
  };

  return (
    <div className="min-h-screen bg-black pt-28 px-4 md:px-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Ma Liste</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {watchlist.map((movie) => {
          const isWatched = getWatchStatus(movie.id);

          return (
            <div key={movie.id} className="relative group">
              <VideoCard 
                video={{
                  id: movie.id,
                  title: movie.title,
                  thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  releaseYear: movie.release_date?.split('-')[0]
                }} 
              />

              {/* INDICATEUR DE VISIONNAGE (The Badge) */}
              {isWatched && (
                <div className="absolute top-2 left-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20 flex items-center space-x-1">
                  <span>✓</span>
                  <span>VU</span>
                </div>
              )}

              {/* RETRAIT D'ÉLÉMENTS (The Delete Button) */}
              <button 
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-2 w-full py-1.5 bg-zinc-800 hover:bg-red-600 text-[10px] rounded uppercase font-bold transition"
              >
                Retirer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;