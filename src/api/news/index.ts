import {ToastAndroid} from 'react-native';

import env from '../../env';
import {Category, Country, NewsArticle} from './types';

export type GetNewsOptions =
  | {
      category: Category;
      country: Country;
    }
  | {
      q: string;
      country: Country;
    };

export const getNews = async (options: GetNewsOptions) => {
  const paramString = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const url = `${env.API_URL}/v2/top-headlines?${paramString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: env.API_KEY,
      },
    });

    const data = (await response.json()) as {
      articles: NewsArticle[];
    };

    return data.articles;
  } catch (err) {
    ToastAndroid.show('Failed to get news !', ToastAndroid.LONG);
  }

  // await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

  return [];
};
