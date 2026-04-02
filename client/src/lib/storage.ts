import type { AuthPayload, User } from '../types';

export type ThemeMode = 'light' | 'dark';

const TOKEN_KEY = 'news-portal-token';
const USER_KEY = 'news-portal-user';
const THEME_KEY = 'news-portal-theme';

export function loadToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function loadUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function saveAuth(payload: AuthPayload) {
  localStorage.setItem(TOKEN_KEY, payload.token);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function loadTheme(): ThemeMode {
  const raw = localStorage.getItem(THEME_KEY);
  return raw === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme: ThemeMode) {
  localStorage.setItem(THEME_KEY, theme);
}
