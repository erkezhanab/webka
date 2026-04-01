import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to News Portal</h1>
      <p className="text-lg mb-8">Your source for the latest news and articles.</p>
      <Link href="/articles" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        View Articles
      </Link>
    </div>
  );
}
