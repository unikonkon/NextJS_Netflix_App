'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { movies } from '@/data/movies';
import { PlayIcon, PlusIcon, ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import type { Movie } from '@/data/movies';
import { useAppContext } from '@/context/ContextProvider';
import Loader from '@/components/ui/loader';
import VideoModal from '@/components/VideoModal';

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const { isInMyList, addToMyList, removeFromMyList } = useAppContext();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalTitle, setOriginalTitle] = useState<string | null>(null);
  const [originalTitleRomanised, setOriginalTitleRomanised] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true);

        // First check if it's in our local movies array
        const localMovie = movies.find((m) => m.id === id);

        if (localMovie) {
          setMovie(localMovie);
          setLoading(false);
          return;
        }
        // If not found locally, try to fetch from Ghibli API
        const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`, {
          cache: 'no-store',
          mode: 'cors', // Explicitly set CORS mode
          credentials: 'omit', // Don't send credentials
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error('Movie not found');
        }

        const ghibliFilm = await response.json();

        // Convert Ghibli film to our Movie format
        const ghibliMovie: Movie = {
          id: ghibliFilm.id,
          title: ghibliFilm.title,
          description: ghibliFilm.description,
          releaseYear: parseInt(ghibliFilm.release_date),
          duration: parseInt(ghibliFilm.running_time),
          genre: 'Anime',
          director: ghibliFilm.director,
          cast: [ghibliFilm.producer], // Producer as cast since API doesn't provide cast
          posterUrl: ghibliFilm.image,
          backdropUrl: ghibliFilm.movie_banner,
          videoUrl: '', // Placeholder
          trailerUrl: '', // Placeholder
          averageRating: parseFloat(ghibliFilm.rt_score) / 10,
          reviewCount: 100, // Placeholder
          isTrending: false,
          isPopular: true
        };

        setMovie(ghibliMovie);

        // Store original title information for Ghibli films
        if (ghibliFilm.original_title) {
          setOriginalTitle(ghibliFilm.original_title);
        }

        if (ghibliFilm.original_title_romanised) {
          setOriginalTitleRomanised(ghibliFilm.original_title_romanised);
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Movie not found');
      } finally {
        setLoading(false);
      }
    }

    fetchMovieData();
  }, [id]);

  const handleAddToMyList = () => {
    if (!movie) return;

    if (isInMyList(movie.id)) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-white text-2xl">{error || 'Movie not found'}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black pb-20">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="cursor-pointer absolute top-20 left-4 z-20 flex items-center space-x-2 text-white md:left-10"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        <span>Back</span>
      </button>

      {/* Hero section with backdrop image */}
      <div className="relative h-[70vh]">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-10 left-4 right-4 md:left-10 md:right-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            {movie.title}
          </h1>

          {/* Show original title for Ghibli films */}
          {originalTitle && originalTitleRomanised && (
            <h2 className="text-xl md:text-2xl text-gray-300 mb-4">
              {originalTitle} ({originalTitleRomanised})
            </h2>
          )}

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-500 font-bold">{movie.averageRating.toFixed(1)}/10</span>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-1 text-white">{movie.reviewCount} reviews</span>
            </div>
            <span className="text-gray-400">{movie.releaseYear}</span>
            <span className="text-gray-400">{movie.duration} min</span>
          </div>

          <div className="flex flex-wrap space-x-3 mb-6">
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-x-2 rounded bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-opacity-80 md:py-2.5 md:px-8 md:text-base"
            >
              <PlayIcon className="h-6 w-6" />
              Play
            </button>
            <button
              onClick={handleAddToMyList}
              className="flex items-center gap-x-2 rounded bg-gray-500/50 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-600/50 md:py-2.5 md:px-8 md:text-base"
            >
              <PlusIcon className="h-6 w-6" />
              {isInMyList(movie.id) ? 'Remove from My List' : 'Add to My List'}
            </button>
          </div>
        </div>
      </div>

      {/* Movie details */}
      <div className="px-4 md:px-10 mt-8 max-w-6xl">
        <h2 className="text-xl font-bold text-white mb-2">Overview</h2>
        <p className="text-gray-300 mb-6">{movie.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Details</h2>
            <div className="space-y-2">
              <p className="text-gray-300"><span className="text-gray-500">Director:</span> {movie.director}</p>
              <p className="text-gray-300"><span className="text-gray-500">Genre:</span> {movie.genre}</p>
              <p className="text-gray-300"><span className="text-gray-500">Release Year:</span> {movie.releaseYear}</p>
              <p className="text-gray-300"><span className="text-gray-500">Duration:</span> {movie.duration} minutes</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor) => (
                <span
                  key={actor}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>
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