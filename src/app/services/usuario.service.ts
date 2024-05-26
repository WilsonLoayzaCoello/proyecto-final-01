import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { StorageService } from './storage.service';

declare const google: any;

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private storageSvc: StorageService
  ) {}

  get token(): string {
    return this.storageSvc.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  logout() {
    this.storageSvc.removeItem('token');

    if (!this.usuario?.google) {
      this.router.navigateByUrl('/login');
      return;
    } else {
      google.accounts.id.revoke(this.usuario?.email, (response: any) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    }
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          this.storageSvc.setItem('token', resp.token);
          return true;
        }),
        // map((resp: any) => true),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.storageSvc.setItem('token', resp.token);
      })
    );
  }

  actualizarUsuario(formData: {
    email: string;
    nombre: string;
    role: string | undefined;
  }) {
    formData = { ...formData, role: this.usuario?.role };
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, formData, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        this.storageSvc.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.storageSvc.setItem('token', resp.token);
      })
    );
  }
}
