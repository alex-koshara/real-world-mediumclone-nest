import { ArticleEntity } from '../article.entity';

export interface IArticlesResponseInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}
