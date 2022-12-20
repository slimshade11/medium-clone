import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInitialValues } from '@article/models/article-initial-values.model';
import { SaveArticleResponse } from '@article/models/save-article-response.model';
import { Article } from '@feed/models/article.model';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  private readonly BASE_URL: string = env.BASE_URL;

  constructor(private http: HttpClient) {}

  editArticle$(slug: string, editArticlePayload: ArticleInitialValues): Observable<Article> {
    return (
      this.http
        ///////////////////////////////////////////////////////////// { article: editArticlePayload }
        .put<SaveArticleResponse>(`${this.BASE_URL}/articles/${slug}`, editArticlePayload)
        .pipe(map(({ article }: SaveArticleResponse): Article => article))
    );
  }
}
