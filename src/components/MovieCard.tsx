'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlayIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import type { Movie } from '@/data/movies';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

export default function MovieCard({ movie, isLarge = false }: MovieCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition duration-300 ease-in-out shadow-lg hover:scale-105 ${
        isLarge ? 'h-[400px]' : 'h-[200px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        fill
        className="object-cover rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black/60 rounded-md transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 font-bold">{movie.averageRating.toFixed(1)}</span>
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-300 text-sm">{movie.releaseYear}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/movie/${movie.id}`);
                }}
                className="flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-gray-200 transition"
              >
                <PlayIcon className="h-5 w-5 text-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/movie/${movie.id}?info=true`);
                }}
                className="flex items-center justify-center w-8 h-8 bg-gray-500/50 rounded-full hover:bg-gray-500/70 transition"
              >
                <InformationCircleIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 