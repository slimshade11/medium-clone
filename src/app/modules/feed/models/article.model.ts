import { Profile } from '@feed/models/author.model';

export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: Array<string>;
  description: string;
  author: Profile;
  favorited: boolean;
  favoritesCount: number;
}
