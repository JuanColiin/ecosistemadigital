// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroForm } from '../models/registro.model'; // Usamos el tipo de datos

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = 'http://localhost:8080/register';  // Endpoint para el registro
  private apiUrlLogin = 'http://localhost:8080/login';  // Endpoint para el login

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(userData: RegistroForm): Observable<any> {  // Usamos el tipo RegistroForm para mayor consistencia
    return this.http.post(this.apiUrlRegister, userData);
  }

  // Método para iniciar sesión
  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, loginData);
  }
}
