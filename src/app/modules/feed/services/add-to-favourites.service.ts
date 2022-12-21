import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetArticleResponse } from '@core/models/get-article-response.model';
import { Article } from '@feed/models/article.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddToFavouritesService {
  private readonly _BASE_URL = env.BASE_URL;
  constructor(private http: HttpClient) {}

  public addToFavourites$(slug: string): Observable<Article> {
    const url: string = this.getUrl(slug);
    return this.http.post<GetArticleResponse>(url, {}).pipe(map(({ article }) => article));
  }

  public removeFromFavourites$(slug: string): Observable<Article> {
    const url: string = this.getUrl(slug);
    return this.http.delete<GetArticleResponse>(url, {}).pipe(map(({ article }) => article));
  }

  getUrl(slug: string): string {
    return `${this._BASE_URL}/articles/${slug}/favorite`;
  }
}
