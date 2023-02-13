import {useCallback, useRef, useState} from 'react';

import {getNews, GetNewsOptions} from '..';
import {uniqueIDGenerator} from '../../../utils/numberUtils';

const useNews = () => {
  const [loading, setLoading] = useState(false);

  const lastRequest = useRef<number | null>(null);
  const getUniqueID = useRef(uniqueIDGenerator()).current;

  const fetchNews = useCallback(
    async (options: GetNewsOptions) => {
      setLoading(true);

      const id = getUniqueID();
      lastRequest.current = id;

      const articles = await getNews(options);

      if (id === lastRequest.current) {
        setLoading(false);
      }

      return articles;
    },
    [getUniqueID],
  );

  return {loading, fetchNews};
};

export default useNews;
