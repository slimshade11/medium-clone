import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetFeedResponse } from '@feed/models/get-feed-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly _BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  public loadFeed$(url: string): Observable<GetFeedResponse> {
    return this.http.get<GetFeedResponse>(this._BASE_URL + url);
  }

  public getBaseUrlFromEndpoint(): string {
    return this.router.url.split('?')[0];
  }
}
