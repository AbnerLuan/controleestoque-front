import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Credenciais } from '../model/credenciais';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${environment.urlLogin}login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  //  localStorage.setItem('nameUser', this.decodePayloadJWT().name);
  //  localStorage.setItem('ROLES_USER', this.decodePayloadJWT().role);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if (token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  public decodePayloadJWT(): any {
    try {
      return jwt_decode(localStorage.getItem('token'));
    } catch (Error) {
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }
}

function jwt_decode(arg0: string): any {
  throw new Error('Function not implemented.');
}

