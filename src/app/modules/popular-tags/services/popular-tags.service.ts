import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPopularTagsResponse } from '@feed/models/get-popular-tags-response.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  private readonly _BASE_URL: string = env.BASE_URL;

  constructor(private http: HttpClient) {}

  public getPopuplarTags$(): Observable<Array<string>> {
    return this.http
      .get<GetPopularTagsResponse>(`${this._BASE_URL}/tags`)
      .pipe(map(({ tags }: GetPopularTagsResponse): Array<string> => tags));
  }
}
