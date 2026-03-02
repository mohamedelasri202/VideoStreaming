import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api'; 
import VideoCard from '../components/VideoCard'


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      console.log("Checking API connection...");
      try {
        // Fetching popular movies from TMDb
        const data = await fetchMovies('/movie/popular?language=fr-FR&page=1');
        console.log("Movies Received:", data); 
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div style={msgStyle}>Chargement du catalogue...</div>;

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Découvrir</h1>
        <p>Films et séries du moment</p>
      </header>

      {/* THE GRID */}
      <div style={gridStyle}>
        {movies.map((movie) => (
          <VideoCard 
            key={movie.id} 
            video={{
              id: movie.id,
              title: movie.title,
              thumbnailUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              category: "Film",
              releaseYear: movie.release_date?.split('-')[0]
            }} 
          />
        ))}
      </div>
    </div>
  );
};


const containerStyle = { padding: '40px', backgroundColor: '#141414', minHeight: '100vh', color: 'white' };
const headerStyle = { marginBottom: '30px' };
const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
  gap: '25px' 
};
const msgStyle = { color: 'white', textAlign: 'center', marginTop: '50px' };

export default Home;