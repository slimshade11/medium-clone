import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFeedResponse } from '@feed/models/getFeedResponse.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  readonly BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getFeed$(url: string): Observable<GetFeedResponse> {
    return this.http.get<GetFeedResponse>(this.BASE_URL + url);
  }
}
