import React, { useState, useEffect } from 'react';
import MovieRow from '../components/MovieRow';
import VideoCard from '../components/VideoCard';
import { searchMovies } from '../services/api';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'movie', 'tv'


  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="bg-black min-h-screen pt-24 pb-10 px-4 md:px-12 text-white">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Rechercher un film ou une série..."
            className="w-full bg-zinc-900 border border-zinc-700 py-2.5 px-10 rounded-md focus:outline-none focus:border-red-600 transition text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-zinc-500">🔍</span>
          {searchQuery && (
            <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-zinc-500 hover:text-white"
            >✕</button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {[
            { id: 'all', label: 'Tout' },
            { id: 'movie', label: 'Films' },
            { id: 'tv', label: 'Séries' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {setFilter(item.id); setSearchQuery('');}}
              className={`px-6 py-1.5 rounded-md text-sm font-bold transition-all ${
                filter === item.id ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: SEARCH RESULTS GRID */}
      {searchQuery.length > 2 ? (
        <section className="animate-in fade-in duration-500">
          <h2 className="text-xl text-zinc-400 mb-6">Résultats pour <span className="text-white font-bold">"{searchQuery}"</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {searchResults.map((movie) => (
              <VideoCard 
                key={movie.id}
                video={{
                  id: movie.id,
                  title: movie.title || movie.name,
                  thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  releaseYear: (movie.release_date || movie.first_air_date)?.split('-')[0]
                }} 
              />
            ))}
          </div>
          {searchResults.length === 0 && <p className="text-center text-zinc-600 mt-20">Aucun résultat trouvé.</p>}
        </section>
      ) : (
        /* VIEW 2: CATEGORY ROWS (DEFAULT) */
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
          {(filter === 'all' || filter === 'movie') && (
            <MovieRow title="Films du Moment" fetchUrl="/trending/movie/week?language=fr-FR" />
          )}
          
          {(filter === 'all' || filter === 'tv') && (
            <MovieRow title="Séries à ne pas manquer" fetchUrl="/trending/tv/week?language=fr-FR" />
          )}

          {filter === 'all' && (
            <>
              <MovieRow title="Action & Aventure" fetchUrl="/discover/movie?with_genres=28&language=fr-FR" />
              <MovieRow title="Comédies" fetchUrl="/discover/movie?with_genres=35&language=fr-FR" />
              <MovieRow title="Horreur" fetchUrl="/discover/movie?with_genres=27&language=fr-FR" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;