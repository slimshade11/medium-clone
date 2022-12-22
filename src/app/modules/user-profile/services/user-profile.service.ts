import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserProfileResponse } from '@user-profile/models/get-user-profile-response.model';
import { UserProfile } from '@user-profile/models/user-profile.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly _BASE_URL: string = env.BASE_URL;
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfile> {
    const url: string = `${this._BASE_URL}/profiles/${slug}`;
    return this.http.get<GetUserProfileResponse>(url).pipe(map(({ profile }): UserProfile => profile));
  }
}
