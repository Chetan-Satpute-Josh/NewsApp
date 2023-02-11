import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
  articles: {[id: string]: NewsArticle};
  bookmarks: {[id: string]: NewsArticle};
}

const initialState: News = {
  articles: {},
  bookmarks: {},
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    loadArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      const articles = action.payload;

      for (let article of articles) {
        state.articles[article.url] = article;
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

export const {loadArticles} = newsSlice.actions;
