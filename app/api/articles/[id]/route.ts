import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Article from '@/app/lib/models/Article';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const article = await Article.findById(params.id).populate('author', 'name');
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}