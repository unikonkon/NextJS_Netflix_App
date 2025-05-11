'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MovieCard from '@/components/MovieCard';
import type { Movie } from '@/data/movies';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  plan: 'Premium',
  memberSince: 'January 2022',
  avatar: '/default-avatar.png'
};

export default function AccountPage() {
  const router = useRouter();
  const [myList, setMyList] = useState<Movie[]>([]);
  
  useEffect(() => {
    // Get movies from localStorage
    const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(savedList);
  }, []);

  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    router.push('/');
  };

  const handleChangePlan = () => {
    // In a real app, this would navigate to plan selection
    alert('This feature would navigate to plan selection in a real app');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Account</h1>
        
        {/* Profile section */}
        <section className="bg-gray-900 rounded-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image 
                src={mockUser.avatar} 
                alt="Profile" 
                width={80} 
                height={80} 
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{mockUser.name}</h2>
                <p className="text-gray-400">{mockUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </section>
        
        {/* Membership section */}
        <section className="border-b border-gray-700 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Membership & Billing</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-gray-300 mb-1"><span className="text-gray-500">Plan:</span> {mockUser.plan}</p>
              <p className="text-gray-300"><span className="text-gray-500">Member since:</span> {mockUser.memberSince}</p>
            </div>
            <button 
              onClick={handleChangePlan}
              className="mt-4 md:mt-0 bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition"
            >
              Change Plan
            </button>
          </div>
        </section>
        
        {/* My List section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">My List</h2>
          {myList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {myList.map((movie) => (
                <div key={movie.id} className="aspect-[2/3]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Your list is empty. Add movies or TV shows to your list.</p>
          )}
        </section>
      </div>
    </div>
  );
} 