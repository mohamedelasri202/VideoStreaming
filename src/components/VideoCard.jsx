import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    // We wrap everything in a Link. The 'to' prop matches  Route path in App.jsx
    <Link to={`/video/${video.id}`} className="block">
      <div className="group relative bg-zinc-900 rounded-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg cursor-pointer">
        
        {/* Poster Image */}
        <div className="relative aspect-[2/3]">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
          />
          
          {/* Play Icon Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="p-2">
          <h3 className="text-white font-medium text-xs md:text-sm truncate">
            {video.title}
          </h3>
          <p className="text-zinc-400 text-[10px] md:text-xs">
            {video.releaseYear}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;