import React, { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';
import VideoCard from '../components/VideoCard';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(VideoContext);

  return (
    
    <div className="min-h-screen bg-black pt-28 px-4 md:px-12 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold border-l-4 border-red-600 pl-4">Ma Liste</h1>
        <p className="text-zinc-500">{watchlist.length} titres enregistrés</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
          <p className="text-xl mb-4">Votre liste est vide.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-zinc-200 transition"
          >
            Découvrir des films
          </button>
        </div>
      ) : (
        // Using a Tailwind Grid for a professional look
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlist.map(movie => (
            <div key={movie.id} className="flex flex-col gap-3 group">
              <VideoCard video={{
                id: movie.id,
                title: movie.title,
                thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                releaseYear: movie.release_date?.split('-')[0]
              }} />
              
              <button 
                onClick={() => removeFromWatchlist(movie.id)}
                className="w-full py-2 bg-zinc-800 hover:bg-red-600 text-white text-xs rounded transition-colors duration-200 uppercase tracking-wider font-bold"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;