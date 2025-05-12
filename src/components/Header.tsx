'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagnifyingGlassIcon, Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '@/context/ContextProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full flex items-center justify-between px-4 py-4 transition-all lg:px-16 lg:py-6 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
    >
      <div className="flex items-center space-x-2 md:space-x-8 w-full justify-between sm:justify-start">
        <Link href="/">
          <h1 className="text-red-600 font-extrabold text-3xl tracking-widest uppercase cursor-pointer">Netflix</h1>
        </Link>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          {showMobileMenu ? (
            <XMarkIcon className="h-6 w-6 text-white cursor-pointer"
              onClick={() => setShowMobileMenu(false)}
            />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white cursor-pointer"
              onClick={() => setShowMobileMenu(true)}
            />
          )}

        </div>

        {/* Desktop menu */}
        <ul className="hidden space-x-4 sm:flex">
          <li>
            <Link href="/" className={`headerLink ${pathname === '/' ? 'text-white font-medium' : ''}`}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/account" className={`headerLink ${pathname === '/account' ? 'text-white font-medium' : ''}`}>
              My List
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden items-center space-x-4 sm:flex">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border border-white rounded-md p-2 text-white"
        />
        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer text-white" />
        {/* <BellIcon className="h-6 w-6 cursor-pointer text-white" /> */}
        <Link href="/account">
          <UserCircleIcon className="h-8 w-8 cursor-pointer text-white" />
        </Link>
      </div>

      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 py-4 px-4 md:hidden">
          <div className="items-center space-x-4 flex w-full justify-end">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-white rounded-md p-2 text-white"
            />
            <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer text-white" />
            {/* <BellIcon className="h-6 w-6 cursor-pointer text-white" /> */}
            <Link href="/account">
              <UserCircleIcon className="h-8 w-8 cursor-pointer text-white" />
            </Link>
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className={`headerLink ${pathname === '/' ? 'text-white font-medium' : ''}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className={`headerLink ${pathname === '/account' ? 'text-white font-medium' : ''}`}
                onClick={() => setShowMobileMenu(false)}
              >
                My List
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}