import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Category, NewsArticle} from '../../api/news/types';

export interface News {
  articles: Record<Category, Record<string, NewsArticle>>;
  bookmarks: {[id: string]: NewsArticle};
  viewed: Record<string, boolean>;
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
  viewed: {},
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
    setViewed: (state, action: PayloadAction<string>) => {
      state.viewed[action.payload] = true;
    },
  },
});

export const newsReducer = newsSlice.reducer;

export const {loadArticles, setBookmark, unsetBookmark, setViewed} =
  newsSlice.actions;
