'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateArticle() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        image,
        tags: tags.split(',').map(tag => tag.trim()),
      }),
    });
    if (res.ok) {
      router.push('/articles');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-40"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL (optional)</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Create Article
        </button>
      </form>
    </div>
  );
}