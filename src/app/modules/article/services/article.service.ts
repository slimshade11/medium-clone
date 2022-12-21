import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly _BASE_URL: string = env.BASE_URL;

  constructor(private http: HttpClient) {}

  public deleteArticle$(slug: string): Observable<Object> {
    return this.http.delete<Object>(`${this._BASE_URL}/articles/${slug}`);
  }
}
