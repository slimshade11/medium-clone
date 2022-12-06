import { Article } from '@feed/models/article.model';

export interface GetFeedResponse {
  articles: Article;
  articlesCount: number;
}
