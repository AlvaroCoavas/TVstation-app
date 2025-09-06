import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {

  constructor(private http: HttpClient) { }

  /**
   * Realiza una petición GET
   * @param url URL de la petición
   * @param headers Cabeceras opcionales
   * @returns Observable con la respuesta
   */
  public get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers });
  }

  /**
   * Realiza una petición POST
   * @param url URL de la petición
   * @param body Cuerpo de la petición
   * @param headers Cabeceras opcionales
   * @returns Observable con la respuesta
   */
  public post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  /**
   * Realiza una petición PUT
   * @param url URL de la petición
   * @param body Cuerpo de la petición
   * @param headers Cabeceras opcionales
   * @returns Observable con la respuesta
   */
  public put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  /**
   * Realiza una petición DELETE
   * @param url URL de la petición
   * @param headers Cabeceras opcionales
   * @returns Observable con la respuesta
   */
  public delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }
}