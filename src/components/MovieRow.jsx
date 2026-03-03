import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import VideoCard from './VideoCard';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(fetchUrl);
      setMovies(data);
      setLoading(false);
    };

    if (fetchUrl) {
      getMovies();
    }
  }, [fetchUrl]);

  return (
    <div className="mb-10 group">
      {/* Row Title */}
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-12 transition-colors group-hover:text-red-600">
        {title}
      </h2>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4 md:px-12 pb-6 scroll-smooth">
          {loading ? (
            // Skeleton Loaders while waiting for API
            [...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[160px] md:min-w-[240px] aspect-[2/3] bg-zinc-900 animate-pulse rounded-md"></div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="min-w-[160px] md:min-w-[240px]">
                <VideoCard 
                  video={{
                    id: movie.id,
                    title: movie.title || movie.name,
                    // Building the full image path from TMDb
                    thumbnailUrl: movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                      : 'https://via.placeholder.com/500x750?text=No+Image',
                    releaseYear: (movie.release_date || movie.first_air_date)?.split('-')[0],
                    category: movie.media_type === 'tv' ? 'Série' : 'Film'
                  }} 
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;