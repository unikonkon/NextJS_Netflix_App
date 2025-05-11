'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagnifyingGlassIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

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
      <div className="flex items-center space-x-2 md:space-x-8">
        <h1 className="text-red-600 font-extrabold text-3xl tracking-widest uppercase">Netflix</h1>


        {/* Mobile menu button */}
        <div className="md:hidden">
          <Bars3Icon
            className="h-6 w-6 text-white cursor-pointer"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        </div>

        {/* Desktop menu */}
        <ul className="hidden space-x-4 md:flex">
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

      <div className="flex items-center space-x-4">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer text-white" />
        <BellIcon className="h-6 w-6 cursor-pointer text-white" />
        <Link href="/account">
          <Image
            src="/default-avatar.png"
            alt="Account"
            width={32}
            height={32}
            className="cursor-pointer rounded"
          />
        </Link>
      </div>

      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 py-4 px-4 md:hidden">
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