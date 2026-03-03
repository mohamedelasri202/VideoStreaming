import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { VideoContext } from '../context/VideoContext';
import { fetchMovieDetails, fetchMovieTrailer } from '../services/api'; 

const VideoDetails = () => {
  const { id } = useParams();
  const { addToWatchlist, removeFromWatchlist, watchlist } = useContext(VideoContext);
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');

  
  const isAdded = watchlist.some(m => m.id === parseInt(id));

  useEffect(() => {
    const getDetails = async () => {
     
      const data = await fetchMovieDetails(id);
      setMovie(data);


      const trailer = await fetchMovieTrailer(id);
      
      setTrailerUrl(`${trailer}?autoplay=1&rel=0`);
    };
    
    if (id) getDetails();
  }, [id]);

  if (!movie) return (
    <div className="pt-24 bg-black min-h-screen text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="pt-20 bg-black min-h-screen text-white px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* VIDEO PLAYER SECTION */}
        <div className="group relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
          <iframe 
            width="100%" 
            height="100%" 
            src={trailerUrl} 
            title={movie.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        </div>

        {/* INFO & ACTIONS SECTION */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center space-x-4 mb-2">
               <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
               <span className="text-green-500 font-bold mt-2">Recommandé à 98%</span>
            </div>
            
            <p className="text-zinc-400 mb-6 text-sm md:text-base font-medium">
              {movie.release_date?.split('-')[0]} • 
              <span className="ml-2 border border-zinc-500 px-1 text-xs">13+</span> • 
              <span className="ml-2 text-white">⭐ {movie.vote_average?.toFixed(1)} / 10</span>
            </p>
            
            <p className="text-lg leading-relaxed text-zinc-300 max-w-3xl">
              {movie.overview || "Aucune description disponible pour ce film."}
            </p>
          </div>

          <div className="flex flex-col space-y-4 w-full md:w-auto">
            <button 
              onClick={() => isAdded ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
              className={`flex items-center justify-center space-x-2 px-10 py-3 rounded font-bold transition-all duration-200 ${
                isAdded 
                ? 'bg-zinc-700 hover:bg-zinc-600 text-white' 
                : 'bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/10'
              }`}
            >
              <span className="text-xl">{isAdded ? '✓' : '+'}</span>
              <span>{isAdded ? 'Dans ma liste' : 'Ma liste'}</span>
            </button>
            
            {/* Secondary Action Buttons */}
            <div className="flex space-x-2">
                <button className="flex-1 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a1 1 0 01.94 1.347l-2.292 6.005A2 2 0 0115.469 19H8V11.123l3.183-5.305A1 1 0 0112.043 5H12a1 1 0 011 1v4h1z" />
                    </svg>
                </button>
                <button className="flex-1 bg-zinc-800 p-3 rounded-full hover:bg-zinc-700 transition flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;