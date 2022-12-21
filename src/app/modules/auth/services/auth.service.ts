import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@auth/models/auth-response.model';
import { LoginPayload } from '@auth/models/login-payload.model';
import { RegisterPayload } from '@auth/models/register-payload.model';
import { UpdateCurrentUserPayload } from '@auth/models/update-current-user-payload.model';
import { CurrentUser } from '@auth/models/user.model';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly _BASE_URL = env.BASE_URL;

  constructor(private http: HttpClient) {}

  private _getUser({ user }: AuthResponse): CurrentUser {
    return user;
  }

  public register$(registerPayload: RegisterPayload): Observable<CurrentUser> {
    return this.http.post<AuthResponse>(`${this._BASE_URL}/users`, registerPayload).pipe(map(this._getUser));
  }

  public login$(loginPayload: LoginPayload): Observable<CurrentUser> {
    return this.http.post<AuthResponse>(`${this._BASE_URL}/users/login`, loginPayload).pipe(map(this._getUser));
  }

  public getCurrentUser$(): Observable<CurrentUser> {
    return this.http.get<AuthResponse>(`${this._BASE_URL}/user`).pipe(map(this._getUser));
  }

  public updateCurrentUser(updateCurrentUserPayload: UpdateCurrentUserPayload): Observable<CurrentUser> {
    return this.http.put<AuthResponse>(`${this._BASE_URL}/user`, updateCurrentUserPayload).pipe(map(this._getUser));
  }
}
