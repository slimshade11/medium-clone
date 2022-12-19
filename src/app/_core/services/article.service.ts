import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '@app/modules/feed/models/article.model';
import { GetArticleResponse } from '@core/models/get-article-response.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly BASE_URL: string = env.BASE_URL;

  constructor(private http: HttpClient) {}

  public getArticle$(slug: string): Observable<Article> {
    const url: string = `${this.BASE_URL}/articles/${slug}`;
    return this.http.get<GetArticleResponse>(url).pipe(map(({ article }: GetArticleResponse): Article => article));
  }
}
