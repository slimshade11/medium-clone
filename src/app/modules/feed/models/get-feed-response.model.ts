import { Article } from '@feed/models/article.model';

export interface GetFeedResponse {
  articles: Array<Article>;
  articlesCount: number;
}
