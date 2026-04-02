import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to News Portal',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      createArticle: 'Create Article',
      articles: 'Articles',
      search: 'Search',
      category: 'Category',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      author: 'Author',
      admin: 'Admin',
      reader: 'Reader',
      home: 'Home'
    },
  },
  ru: {
    translation: {
      welcome: 'Добро пожаловать в News Portal',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      createArticle: 'Создать статью',
      articles: 'Статьи',
      search: 'Поиск',
      category: 'Категория',
      theme: 'Тема',
      light: 'Светлая',
      dark: 'Тёмная',
      author: 'Автор',
      admin: 'Админ',
      reader: 'Читатель',
      home: 'Главная'
    },
  },
  kk: {
    translation: {
      welcome: 'News Portal-ға қош келдіңіз',
      login: 'Кіру',
      register: 'Тіркелу',
      logout: 'Шығу',
      createArticle: 'Мақала жазу',
      articles: 'Мақалалар',
      search: 'Іздеу',
      category: 'Категория',
      theme: 'Тақырып',
      light: 'Ақ',
      dark: 'Қара',
      author: 'Автор',
      admin: 'Әкімші',
      reader: 'Оқырман'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
