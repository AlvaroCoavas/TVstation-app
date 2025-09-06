import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public name! : FormControl;
  public lastname! : FormControl;
  public email! : FormControl;
  public password! : FormControl;

  public loginForm!: FormGroup;
  constructor(
    private readonly userSrv: User,
    private router: Router
  ) { 
    this.initForm();
  }

  ngOnInit() {}
  /**
   * Navega a la página de registro
   */
  public goToRegister(): void {
    this.router.navigate(['/register']);
  }
  /**
   * Realiza el inicio de sesión
   */
  public doLogin(): void {
    if (this.loginForm.valid) {
      try {
        this.userSrv.login(
          this.email.value,
          this.password.value
        );
        this.router.navigate(['/news']);
        this.loginForm.reset();
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
  } else {
    this.loginForm.markAllAsTouched();
    }
  }

  /**
   * Inicializa el formulario de login
   */
  private initForm(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required, 
      Validators.minLength(6),
    ]);
    
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }
}