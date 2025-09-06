import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Toast {
  constructor(private toastController: ToastController) { }

  /**
   * Muestra un mensaje toast
   * @param options Opciones del toast
   * @returns Promesa que se resuelve cuando el toast se muestra
   */
  async show(options: ToastOptions): Promise<void> {
    const defaultOptions: ToastOptions = {
      duration: 2000,
      position: 'bottom',
      ...options
    };

    const toast = await this.toastController.create(defaultOptions);
    await toast.present();
  }

  /**
   * Muestra un mensaje de éxito
   * @param message Mensaje a mostrar
   * @param duration Duración en milisegundos
   */
  async success(message: string, duration: number = 2000): Promise<void> {
    await this.show({
      message,
      duration,
      color: 'success'
    });
  }

  /**
   * Muestra un mensaje de error
   * @param message Mensaje a mostrar
   * @param duration Duración en milisegundos
   */
  async error(message: string, duration: number = 3000): Promise<void> {
    await this.show({
      message,
      duration,
      color: 'danger'
    });
  }

  /**
   * Muestra un mensaje de información
   * @param message Mensaje a mostrar
   * @param duration Duración en milisegundos
   */
  async info(message: string, duration: number = 2000): Promise<void> {
    await this.show({
      message,
      duration,
      color: 'primary'
    });
  }
}