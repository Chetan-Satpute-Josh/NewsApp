export enum Category {
  BUSINESS = 'business',
  ENTERTAINMENT = 'entertainment',
  GENERAL = 'general',
  HEALTH = 'health',
  SCIENCE = 'science',
  SPORTS = 'sports',
  TECHNOLOGY = 'technology',
}

export enum Country {
  INDIA = 'in',
}

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
