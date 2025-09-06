import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Solo interceptamos las peticiones a la API de noticias
    if (request.url.includes(environment.newsApiUrl)) {
      // Clonamos la petición para añadir el header de autorización
      const authReq = request.clone({
        headers: request.headers.set('X-Api-Key', environment.newsApiKey)
      });
      return next.handle(authReq);
    }
    
    // Para el resto de peticiones, las dejamos pasar sin modificar
    return next.handle(request);
  }
}