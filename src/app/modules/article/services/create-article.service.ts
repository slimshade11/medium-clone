import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { SaveArticleResponse } from '@article/models/save-article-response.model';
import { Article } from '@feed/models/article.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  private readonly BASE_URL: string = env.BASE_URL;
  constructor(private http: HttpClient) {}

  public createArticle$(createArticlePayload: ArticleInitialValues): Observable<Article> {
    return this.http
      .post<SaveArticleResponse>(`${this.BASE_URL}/articles`, { article: createArticlePayload })
      .pipe(map(({ article }: SaveArticleResponse): Article => article));
  }
}
