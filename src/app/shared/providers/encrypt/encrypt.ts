import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Encrypt {

  constructor() { }

  /**
   * Encripta una cadena de texto usando SHA-256
   * @param text Texto a encriptar
   * @returns Texto encriptado
   */
  public encrypt(text: string): string {
    return CryptoJS.SHA256(text).toString();
  }

  /**
   * Compara un texto plano con un texto encriptado
   * @param plainText Texto sin encriptar
   * @param encryptedText Texto encriptado
   * @returns Verdadero si coinciden, falso en caso contrario
   */
  public compare(plainText: string, encryptedText: string): boolean {
    const encryptedPlainText = this.encrypt(plainText);
    return encryptedPlainText === encryptedText;
  }
}