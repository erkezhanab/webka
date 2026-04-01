import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/app/lib/db';
import Article from '@/app/lib/models/Article';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find({ published: true }).populate('author', 'name').sort({ createdAt: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { title, content, image, tags } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const article = new Article({
      title,
      content,
      author: session.user.id,
      image,
      tags: tags || [],
    });

    await article.save();

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}