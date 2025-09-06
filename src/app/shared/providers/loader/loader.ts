import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  private loader: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) { }

  /**
   * Muestra un indicador de carga
   * @param options Opciones del indicador de carga
   * @returns Promesa que se resuelve cuando el indicador se muestra
   */
  async show(options?: LoadingOptions): Promise<void> {
    const defaultOptions: LoadingOptions = {
      message: 'Cargando...',
      spinner: 'circular',
      ...options
    };

    // Si ya hay un loader, lo cerramos primero
    if (this.loader) {
      await this.hide();
    }

    this.loader = await this.loadingController.create(defaultOptions);
    await this.loader.present();
  }

  /**
   * Oculta el indicador de carga
   * @returns Promesa que se resuelve cuando el indicador se oculta
   */
  async hide(): Promise<void> {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }
}