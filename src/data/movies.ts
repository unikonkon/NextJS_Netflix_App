export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  posterUrl: string;
  backdropUrl: string;
  videoUrl: string;
  trailerUrl: string;
  averageRating: number;
  reviewCount: number;
  isTrending: boolean;
  isPopular: boolean;
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    releaseYear: 2008,
    duration: 152,
    genre: 'Action',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    averageRating: 9.0,
    reviewCount: 2500,
    isTrending: true,
    isPopular: true
  },
  {
    id: '2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    releaseYear: 2010,
    duration: 148,
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    averageRating: 8.8,
    reviewCount: 2000,
    isTrending: true,
    isPopular: true
  },
  {
    id: '3',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseYear: 1994,
    duration: 142,
    genre: 'Drama',
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
    trailerUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
    averageRating: 9.3,
    reviewCount: 3000,
    isTrending: false,
    isPopular: true
  }
];

export const categories = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Romance',
  'Documentary'
]; 