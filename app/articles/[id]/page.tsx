'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Article {
  _id: string;
  title: string;
  content: string;
  author: { name: string };
  image?: string;
  createdAt: string;
}

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      {article.image && (
        <Image src={article.image} alt={article.title} width={800} height={400} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <p className="text-gray-600 mb-4">By {article.author.name} on {new Date(article.createdAt).toLocaleDateString()}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}