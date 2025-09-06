import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

type InputType = 'text' | 'password' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() control: FormControl = new FormControl();
  @Input() required: boolean = false;
  @Input() errorMessages: { [key: string]: string } = {};

  isPasswordVisible: boolean = false;
 
  constructor() { }

  ngOnInit() {}

  /**
   * Maneja el cambio de valor en el input
   * @param event Evento de cambio
   */
  public doWrite(event: any) {
    this.control.setValue(event.target.value);
    this.control.markAsTouched();
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Obtiene el tipo de input actual
   * @returns Tipo de input
   */
  getInputType(): InputType {
    if (this.type === 'password') {
      return this.isPasswordVisible ? 'text' : 'password';
    }
    return this.type;
  }

  /**
   * Verifica si el control tiene un error específico
   * @param errorName Nombre del error
   * @returns Verdadero si tiene el error
   */
  hasError(errorName: string): boolean {
    return this.control.touched && this.control.hasError(errorName);
  }

  /**
   * Obtiene el mensaje de error para un error específico
   * @param errorName Nombre del error
   * @returns Mensaje de error
   */
  getErrorMessage(errorName: string): string {
    return this.errorMessages[errorName] || 'Campo inválido';
  }
}
