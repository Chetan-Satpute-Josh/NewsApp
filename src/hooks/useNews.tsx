import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useRef, useState} from 'react';

import {Category, Country} from '../api/news';
import {loadArticles} from '../redux/news/newsSlice';
import {getNews, GetNewsOptions} from '../api/news/getNews';
import {uniqueIDGenerator} from '../utils/numberUtils';

const useNews = () => {
  const [articleUrls, setArticleUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const lastRequest = useRef<number | null>(null);
  const getUniqueID = useRef(uniqueIDGenerator()).current;

  const fetchNews = useCallback(
    async (options: GetNewsOptions) => {
      setLoading(true);

      const id = getUniqueID();

      lastRequest.current = id;

      const articles = await getNews(options);

      if (id === lastRequest.current) {
        dispatch(loadArticles(articles));
        setArticleUrls(articles.map(article => article.url));

        setLoading(false);
      }
    },
    [dispatch, getUniqueID],
  );

  return {loading, articleUrls, fetchNews, setArticleUrls};
};

export const useNewsByCategory = () => {
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const {articleUrls, loading, fetchNews} = useNews();

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
    articleUrls,
    setCategory,
    loading,
    refresh,
  };
};

export const useNewsByQuery = () => {
  const [query, setQuery] = useState('');
  const {loading, setArticleUrls, articleUrls, fetchNews} = useNews();

  const refresh = useCallback(() => {
    if (query === '') {
      setArticleUrls([]);
    } else {
      fetchNews({
        q: query,
        country: Country.INDIA,
      });
    }
  }, [fetchNews, query, setArticleUrls]);

  useEffect(() => {
    refresh();
  }, [refresh, query]);

  return {
    query,
    articleUrls,
    searchByQuery: setQuery,
    loading,
    refresh: fetchNews,
  };
};
