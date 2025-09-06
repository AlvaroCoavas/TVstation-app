import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/user/user';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public name!: FormControl;
  public lastname!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public country!: FormControl;

  public registerForm!: FormGroup;
  public countries: { id: string; value: string }[] = [];

  constructor(
    private readonly userSrv: User,
    private readonly countriesSrv: CountriesService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadCountries();
  }

  /**
   * Carga la lista de países
   */
  private loadCountries(): void {
    this.countriesSrv.getCountries().subscribe({
      next: (countries) => {
        // Transformar ICountry[] a formato {id, value}[] para el componente Select
        this.countries = countries.map(country => ({
          id: country.id,
          value: country.name
        }));
      },
      error: (error) => {
        console.error('Error al cargar países:', error);
      }
    });
  }

  /**
   * Navega a la página de login
   */
  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Realiza el registro del usuario
   */
  public doRegister(): void {
    if (this.registerForm.valid) {
      // Buscar el país completo usando el ID seleccionado
      const selectedCountryId = this.country.value;
      this.countriesSrv.getCountries().pipe(
        map(countries => countries.find(country => country.id === selectedCountryId))
      ).subscribe({
        next: (countryFound) => {
          const userData = {
            name: this.name.value,
            lastname: this.lastname.value,
            email: this.email.value,
            password: this.password.value,
            country: countryFound || { id: selectedCountryId, name: '', code: '' }
          };
          
          try {
            this.userSrv.register(userData);
            this.router.navigate(['/login']);
            this.registerForm.reset();
          } catch (error) {
            console.error('Error al registrar usuario:', error);
          }
        },
        error: (error) => {
          console.error('Error al obtener país:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  /**
   * Inicializa el formulario de registro
   */
  private initForm(): void {
    this.name = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      this.matchPasswordValidator.bind(this)
    ]);
    this.country = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      country: this.country
    });
  }

  /**
   * Validador personalizado para verificar que las contraseñas coincidan
   * @param control Control de formulario a validar
   * @returns Objeto con error o null si es válido
   */
  private matchPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!this.password) return null;
    return control.value === this.password.value ? null : { 'passwordMismatch': true };
  }
}