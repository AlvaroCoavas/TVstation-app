import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { IUser, IUserCreate, IUserLogin } from 'src/app/interfaces/IUser';
import { Encrypt } from '../../providers/encrypt/encrypt';
import { Storage } from '../../providers/storage/storage';
import { Toast } from '../../providers/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private encrypt: Encrypt,
    private storage: Storage,
    private toast: Toast,
    private router: Router
  ) { }

  /**
   * Registra un nuevo usuario
   * @param user Datos del usuario a registrar
   * @returns Observable con el resultado de la operación
   */
  register(user: IUserCreate): Observable<IUser> {
    // Encriptamos la contraseña
    const encryptedPassword = this.encrypt.encrypt(user.password);
    
    // Creamos el usuario con un ID único
    const newUser: IUser = {
      id: uuidv4(),
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: encryptedPassword,
      country: user.country
    };
    
    // Guardamos el usuario en el almacenamiento local
    this.storage.set('user', newUser);
    
    // Mostramos mensaje de éxito
    this.toast.success('Usuario registrado correctamente');
    
    // Redirigimos al home
    this.router.navigate(['/home']);
    
    return of(newUser);
  }

  /**
   * Inicia sesión con un usuario
   * @param credentials Credenciales de inicio de sesión
   * @returns Observable con el resultado de la operación
   */
  login(credentials: IUserLogin): Observable<IUser | null> {
    // Obtenemos el usuario del almacenamiento local
    const user = this.storage.get<IUser>('user');
    
    if (!user) {
      this.toast.error('Usuario no encontrado');
      return of(null);
    }
    
    // Verificamos que el email coincida
    if (user.email !== credentials.email) {
      this.toast.error('Credenciales incorrectas');
      return of(null);
    }
    
    // Verificamos que la contraseña coincida
    if (!this.encrypt.compare(credentials.password, user.password)) {
      this.toast.error('Credenciales incorrectas');
      return of(null);
    }
    
    // Mostramos mensaje de éxito
    this.toast.success('Inicio de sesión exitoso');
    
    // Redirigimos al home
    this.router.navigate(['/home']);
    
    return of(user);
  }

  /**
   * Actualiza los datos del usuario
   * @param user Datos actualizados del usuario
   * @returns Observable con el resultado de la operación
   */
  updateProfile(user: IUser): Observable<IUser> {
    // Guardamos el usuario actualizado en el almacenamiento local
    this.storage.set('user', user);
    
    // Mostramos mensaje de éxito
    this.toast.success('Perfil actualizado correctamente');
    
    return of(user);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    // Eliminamos el usuario del almacenamiento local
    this.storage.delete('user');
    
    // Mostramos mensaje de éxito
    this.toast.info('Sesión cerrada');
    
    // Redirigimos al login
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene el usuario actual
   * @returns Usuario actual o null si no hay sesión
   */
  getCurrentUser(): IUser | null {
    return this.storage.get<IUser>('user');
  }
}