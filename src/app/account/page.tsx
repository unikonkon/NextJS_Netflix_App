'use client';

import { useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { useAppContext } from '@/context/ContextProvider';

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
  const { myList, clearMyList } = useAppContext();
  console.log("myList", myList);

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
              <div>
                <h2 className="text-xl font-bold text-white">{mockUser.name}</h2>
                <p className="text-gray-400">{mockUser.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition cursor-pointer"
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">My List</h2>
            {myList.length > 0 && (
              <button
                onClick={clearMyList}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition cursor-pointer"
              >
                Clear List
              </button>
            )}
          </div>
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