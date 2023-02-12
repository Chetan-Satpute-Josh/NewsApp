import {Category, Country} from '.';
import env from '../../env';
import {NewsArticle} from '../../redux/news/newsSlice';

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

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: env.API_KEY,
    },
  });

  const data = (await response.json()) as {
    articles: NewsArticle[];
  };

  // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));

  return data.articles;
};
