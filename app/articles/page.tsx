'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  _id: string;
  title: string;
  content: string;
  author: { name: string };
  image?: string;
  createdAt: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => (
          <div key={article._id} className="border rounded-lg p-4 shadow">
            {article.image && (
              <Image src={article.image} alt={article.title} width={300} height={200} className="w-full h-48 object-cover rounded mb-4" />
            )}
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-2">{article.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">By {article.author.name} on {new Date(article.createdAt).toLocaleDateString()}</p>
            <Link href={`/articles/${article._id}`} className="text-blue-600 hover:underline">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}