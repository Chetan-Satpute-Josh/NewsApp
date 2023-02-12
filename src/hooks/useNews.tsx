import {useCallback, useEffect, useRef, useState} from 'react';

import {Category, Country} from '../api/news';
import {NewsArticle} from '../redux/news/newsSlice';
import {getNews, GetNewsOptions} from '../api/news/getNews';
import {uniqueIDGenerator} from '../utils/numberUtils';

const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const lastRequest = useRef<number | null>(null);
  const getUniqueID = useRef(uniqueIDGenerator()).current;

  const fetchNews = useCallback(
    async (options: GetNewsOptions) => {
      setLoading(true);

      const id = getUniqueID();

      lastRequest.current = id;

      const newArticles = await getNews(options);

      if (id === lastRequest.current) {
        setArticles(newArticles);

        setLoading(false);
      }
    },
    [getUniqueID],
  );

  return {loading, articles, fetchNews, setArticles};
};

export const useNewsByCategory = () => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const {articles, loading, fetchNews} = useNews();

  const refresh = useCallback(() => {
    fetchNews({
      category: category,
      country: Country.INDIA,
    });
  }, [fetchNews, category]);

  useEffect(() => {
    refresh();
  }, [refresh, category]);

  return {
    category,
    articles,
    setCategory,
    loading,
    refresh,
  };
};

export const useNewsByQuery = () => {
  const [query, setQuery] = useState('');
  const {loading, setArticles, articles, fetchNews} = useNews();

  const refresh = useCallback(() => {
    if (query === '') {
      setArticles([]);
    } else {
      fetchNews({
        q: query,
        country: Country.INDIA,
      });
    }
  }, [fetchNews, query, setArticles]);

  useEffect(() => {
    refresh();
  }, [refresh, query]);

  return {
    query,
    articles,
    searchByQuery: setQuery,
    loading,
    refresh,
  };
};
