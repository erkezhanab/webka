export type UserRole = 'reader' | 'author' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

export interface ArticleAuthor {
  _id?: string;
  id?: string;
  name: string;
  role?: UserRole;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: 'Tech' | 'Design' | 'News';
  featured_image?: string;
  createdAt: string;
  updatedAt: string;
  author: ArticleAuthor;
}

export interface AuthPayload {
  token: string;
  user: User;
}
