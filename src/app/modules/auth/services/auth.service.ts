import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@auth/models/auth-response.model';
import { LoginPayload } from '@auth/models/login-payload.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = env.BASE_URL;

  constructor(private http: HttpClient) {}

  register$(registerPayload: RegisterPayload): Observable<CurrentUser> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/users`, registerPayload).pipe(map(this.getUser));
  }

  login$(loginPayload: LoginPayload): Observable<CurrentUser> {
    return this.http.post<any>(`${this.BASE_URL}/users/login`, loginPayload).pipe(map(this.getUser));
  }

  getUser({ user }: AuthResponse): CurrentUser {
    return user;
  }
}
