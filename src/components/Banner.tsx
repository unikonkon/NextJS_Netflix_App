'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import type { Movie } from '@/data/movies';
import VideoModal from './VideoModal';

interface BannerProps {
  movies: Movie[];
}

export default function Banner({ movies }: BannerProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, [movies]);

  if (!movie) return null;

  return (
    <div className="relative h-[56.25vw] lg:h-[65vh]">
      <Image
        src={movie.backdropUrl}
        alt={movie.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="banner-gradient" />
      <div className="absolute bottom-[15%] left-4 md:left-16 max-w-xl">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow">
          {movie.title}
        </h1>
        <p className="text-white text-sm md:text-base line-clamp-3 mb-6 text-shadow">
          {movie.description}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowVideoModal(true)}
            className="bannerButton bg-white text-black"
          >
            <PlayIcon className="h-6 w-6" />
            Play
          </button>
          <button
            onClick={() => router.push(`/movie/${movie.id}?info=true`)}
            className="bannerButton bg-gray-500/50 text-white"
          >
            <InformationCircleIcon className="h-6 w-6" />
            More Info
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
        videoUrl={movie.videoUrl} 
      />
    </div>
  );
} 