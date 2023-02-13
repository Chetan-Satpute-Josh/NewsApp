import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Category} from '../../api/news';

export interface NewsArticle {
  source: {id: string; name: string};
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface News {
  articles: Record<Category, Record<string, NewsArticle>>;
  bookmarks: {[id: string]: NewsArticle};
}

const initialState: News = {
  articles: {
    general: {},
    science: {},
    sports: {},
    entertainment: {},
    technology: {},
    health: {},
    business: {},
  },
  bookmarks: {},
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    loadArticles: (state, action: PayloadAction<[Category, NewsArticle[]]>) => {
      const [category, articles] = action.payload;

      for (let article of articles) {
        state.articles[category][article.url] = article;
      }
    },
    setBookmark: (state, action: PayloadAction<NewsArticle>) => {
      const article = action.payload;

      state.bookmarks[article.url] = article;
    },
    unsetBookmark: (state, action: PayloadAction<NewsArticle>) => {
      const article = action.payload;
      delete state.bookmarks[article.url];
    },
  },
});

export const newsReducer = newsSlice.reducer;

export const {loadArticles, setBookmark, unsetBookmark} = newsSlice.actions;
