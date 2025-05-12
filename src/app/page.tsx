'use client'
import Banner from '@/components/Banner';
import MovieRow from '@/components/MovieRow';
import { movies } from '@/data/movies';
import type { Movie } from '@/data/movies';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/ContextProvider';
import Loader from '@/components/ui/loader';

// Interface for Ghibli API response
interface GhibliFilm {
  id: string;
  title: string;
  description: string;
  release_date: string;
  running_time: string;
  director: string;
  producer: string;
  image?: string;
  movie_banner?: string;
  rt_score: string;
}

// Function to fetch Studio Ghibli anime films and convert to Movie type
async function getGhibliFilms(): Promise<Movie[]> {
  try {
    const response = await fetch('https://ghibliapi.vercel.app/films', { 
      cache: 'no-store',
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send credentials
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Ghibli films: ${response.status}`);
    }

    const data = await response.json();

    // Transform Ghibli API data to match our Movie type
    return data.map((film: GhibliFilm) => ({
      id: film.id,
      title: film.title,
      description: film.description,
      releaseYear: parseInt(film.release_date),
      duration: parseInt(film.running_time),
      genre: 'Anime',
      director: film.director,
      cast: [film.producer], // Producer as cast since API doesn't provide cast
      posterUrl: film.image || 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // Use image or fallback
      backdropUrl: film.movie_banner || 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg', // Use banner or fallback
      videoUrl: '', // Placeholder
      trailerUrl: '', // Placeholder
      averageRating: parseFloat(film.rt_score) / 10, // Convert Rotten Tomatoes score to our scale
      reviewCount: 100, // Placeholder
      isTrending: false,
      isPopular: true
    }));
  } catch (error) {
    console.error('Error fetching Ghibli films:', error);
    return [];
  }
}

export default function Home() {
  // Fetch Ghibli films and combine with local movies
  const [ghibliMovies, setGhibliMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useAppContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const films = await getGhibliFilms();
        if (films && films.length > 0) {
          setGhibliMovies(films);
        } else {
          setGhibliMovies([]);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const allMovies = [...movies, ...ghibliMovies];

  // Filter movies by search query if present
  const filteredMovies = searchQuery
    ? allMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allMovies;

  // Filter movies by category for different rows
  const trendingMovies = filteredMovies.filter(movie => movie.isTrending);
  const popularMovies = filteredMovies.filter(movie => movie.isPopular);
  const actionMovies = filteredMovies.filter(movie => movie.genre === 'Action');
  const dramaMovies = filteredMovies.filter(movie => movie.genre === 'Drama');
  const sciFiMovies = filteredMovies.filter(movie => movie.genre === 'Sci-Fi');
  const animeMovies = filteredMovies.filter(movie => movie.genre === 'Anime');

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader />  
    </div>;
  }

  return (
    <main className="relative min-h-screen bg-black pb-24">
      {/* Banner */}
      {!searchQuery && <Banner movies={allMovies} />}

      {/* Search Results */}
      {searchQuery && (
        <div className="flex flex-col items-center justify-center pt-24 pb-8">
          <h1 className="text-4xl font-bold">Search Results</h1>
          <p className="text-lg">Search results for: {searchQuery}</p>
          {filteredMovies.length === 0 && (
            <p className="text-gray-400 mt-4">No movies found matching &quot;{searchQuery}&quot;</p>
          )}
        </div>
      )}

      {/* Movie rows */}
      <section className="relative mt-6 space-y-4 md:mt-10">
        {searchQuery ? (
          filteredMovies.length > 0 && <MovieRow title="Search Results" movies={filteredMovies} />
        ) : (
          <>
            <MovieRow title="Trending Now" movies={trendingMovies} />
            <MovieRow title="Popular on Netflix" movies={popularMovies} />
            <MovieRow title="Studio Ghibli Anime" movies={animeMovies} />
            <MovieRow title="Action Movies" movies={actionMovies} />
            <MovieRow title="Drama" movies={dramaMovies} />
            <MovieRow title="Sci-Fi" movies={sciFiMovies} />
          </>
        )}
      </section>
    </main>
  );
}
