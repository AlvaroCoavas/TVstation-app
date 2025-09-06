import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '../providers/storage/storage';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  
  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificamos si el usuario está autenticado
    const user = this.storage.get('user');
    
    if (user) {
      // Usuario ya autenticado, redirigir a home
      this.router.navigate(['/home']);
      return false;
    }
    
    // Usuario no autenticado, permitir acceso a la página de login/registro
    return true;
  }
}