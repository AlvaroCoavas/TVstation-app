import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() control: FormControl = new FormControl();
  @Input() options: { id: string; value: string }[] = [];
  @Input() required: boolean = false;
  @Input() errorMessages: { [key: string]: string } = {};

  constructor() { }

  ngOnInit() {}

  /**
   * Maneja el cambio de valor en el select
   * @param event Evento de cambio
   */
  public doSelect(event: any) {
    this.control.setValue(event.detail.value);
    this.control.markAsTouched();
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

  /**
   * Compara dos opciones para determinar si son iguales
   * @param o1 Primera opción
   * @param o2 Segunda opción
   * @returns Verdadero si son iguales
   */
  compareWith(o1: any, o2: any): boolean {
    return o1 === o2;
  }
}