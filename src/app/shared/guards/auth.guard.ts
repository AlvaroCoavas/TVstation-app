import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '../providers/storage/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificamos si el usuario está autenticado
    const user = this.storage.get('user');
    
    if (user) {
      return true; // Usuario autenticado, permitir acceso
    }
    
    // Usuario no autenticado, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}