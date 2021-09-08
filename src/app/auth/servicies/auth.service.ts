import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth():Auth
  {
    return {...this._auth! } //los puntos es para que no se modifique en caso de hacerlo.
  }
  constructor(private http: HttpClient) { }
  verificaAutenticacion():Observable<boolean>
  {
    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
    pipe(
      map(auth => {
        this._auth = auth;
        return true;
      })
    );
  }
  login():Observable<Auth>
  {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
    pipe(
    tap(auth => this._auth = auth),
    tap(auth => localStorage.setItem('token',auth.id))
    );
  }
  logout()
  {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
