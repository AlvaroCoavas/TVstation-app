import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  constructor(){}

  /**
   * Guarda un valor en el localStorage
   * @param key Clave para almacenar el valor
   * @param data Valor a almacenar
   */
  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  } 

  /**
   * Obtiene un valor del localStorage
   * @param key Clave del valor a obtener
   * @returns Valor almacenado o null si no existe
   */
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  /**
   * Elimina un valor del localStorage
   * @param key Clave del valor a eliminar
   */
  delete(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el localStorage
   */
  clear(): void {
    localStorage.clear();
  }
}
