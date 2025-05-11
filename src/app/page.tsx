import { Metadata } from 'next';
import Banner from '@/components/Banner';
import MovieRow from '@/components/MovieRow';
import { movies, categories } from '@/data/movies';
import type { Movie } from '@/data/movies';

export const metadata: Metadata = {
  title: 'Netflix - Watch TV Shows & Movies',
  description: 'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
};

// Function to fetch Studio Ghibli anime films and convert to Movie type
async function getGhibliFilms(): Promise<Movie[]> {
  try {
    const response = await fetch('https://ghibliapi.vercel.app/films', { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Ghibli films');
    }
    
    const data = await response.json();
    
    // Transform Ghibli API data to match our Movie type
    return data.map((film: any) => ({
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
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
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

export default async function Home() {
  // Fetch Ghibli films and combine with local movies
  const ghibliMovies = await getGhibliFilms();
  const allMovies = [...movies, ...ghibliMovies];
  
  // Filter movies by category for different rows
  const trendingMovies = allMovies.filter(movie => movie.isTrending);
  const popularMovies = allMovies.filter(movie => movie.isPopular);
  const actionMovies = allMovies.filter(movie => movie.genre === 'Action');
  const dramaMovies = allMovies.filter(movie => movie.genre === 'Drama');
  const sciFiMovies = allMovies.filter(movie => movie.genre === 'Sci-Fi');
  const animeMovies = allMovies.filter(movie => movie.genre === 'Anime');

  return (
    <main className="relative min-h-screen bg-black pb-24">
      {/* Banner */}
      <Banner movies={allMovies} />
      
      {/* Movie rows */}
      <section className="relative mt-6 space-y-4 md:mt-10">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Popular on Netflix" movies={popularMovies} />
        <MovieRow title="Studio Ghibli Anime" movies={animeMovies} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Drama" movies={dramaMovies} />
        <MovieRow title="Sci-Fi" movies={sciFiMovies} />
      </section>
    </main>
  );
}
