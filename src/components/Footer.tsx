import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-10 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">Home</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">TV Shows</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Movies</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">New & Popular</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">My List</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">FAQ</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Help Center</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Account</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Media Center</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Use</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Preferences</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Corporate Information</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-gray-400 text-sm">Contact Us</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm">1-800-NETFLIX</span></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Netflix Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 