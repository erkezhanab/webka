'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          News Portal
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/articles" className="hover:underline">
            Articles
          </Link>
          {session ? (
            <>
              <Link href="/create-article" className="hover:underline">
                Create Article
              </Link>
              <button onClick={() => signOut()} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}