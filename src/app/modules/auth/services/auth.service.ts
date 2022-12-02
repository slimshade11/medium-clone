import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@auth/models/auth-response.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = env.BASE_URL;

  constructor(private http: HttpClient) {}

  register$(payload: RegisterPayload): Observable<CurrentUser> {
    return this.http
      .post<AuthResponse>(`${this.BASE_URL}/api/users`, payload)
      .pipe(map(({ user }: AuthResponse) => user));
  }
}
