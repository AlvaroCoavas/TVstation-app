import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonType = 'button' | 'submit';
type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
type ButtonSize = 'small' | 'default' | 'large';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
})
export class ButtonComponent implements OnInit {
  @Input() value: string = '';
  @Input() type: ButtonType = 'button';
  @Input() color: ButtonColor = 'primary';
  @Input() size: ButtonSize = 'default';
  @Input() expand: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {}

  /**
   * Maneja el evento de clic en el botón
   * @param event Evento de clic
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  /**
   * Obtiene las clases CSS para el botón
   * @returns Objeto con las clases CSS
   */
  getClasses(): { [key: string]: boolean } {
    return {
      [`btn-${this.color}`]: true,
      [`btn-${this.size}`]: true,
      'btn-expand': this.expand,
      'btn-disabled': this.disabled,
      'btn-loading': this.loading,
      'btn-with-icon': !!this.icon,
      [`icon-${this.iconPosition}`]: !!this.icon
    };
  }
}
