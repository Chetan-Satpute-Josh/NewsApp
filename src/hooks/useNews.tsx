import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';

import {Category, Country} from '../api/news';
import {loadArticles} from '../redux/news/newsSlice';
import {getNews} from '../api/news/getNews';

export const useNewsByCategory = () => {
  const [articleUrls, setArticleUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchNews = useCallback(async () => {
    setLoading(true);

    const articles = await getNews({
      category: category,
      country: Country.INDIA,
    });

    dispatch(loadArticles(articles));
    setArticleUrls(articles.map(article => article.url));

    setLoading(false);
  }, [dispatch, category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, category]);

  return {
    category,
    articleUrls,
    setCategory,
    loading,
    refresh: fetchNews,
  };
};

export const useNewsByQuery = () => {
  const [articleUrls, setArticleUrls] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchNews = useCallback(async () => {
    setLoading(true);

    const articles = await getNews({
      q: query,
      country: Country.INDIA,
    });

    dispatch(loadArticles(articles));
    setArticleUrls(articles.map(article => article.url));

    setLoading(false);
  }, [dispatch, query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, query]);

  return {
    query,
    articleUrls,
    searchByQuery: setQuery,
    loading,
    refresh: fetchNews,
  };
};
