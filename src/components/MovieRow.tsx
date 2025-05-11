'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import MovieCard from './MovieCard';
import type { Movie } from '@/data/movies';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 mb-8">
      <h2 className="text-white text-xl md:text-2xl font-bold px-4 md:px-16">{title}</h2>
      <div className="group relative">
        <ChevronLeftIcon
          className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 z-10 text-white"
          onClick={() => scroll('left')}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide px-4 md:px-16"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[180px] md:min-w-[220px] lg:min-w-[260px] py-5">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <ChevronRightIcon
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 z-10 text-white"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
} 