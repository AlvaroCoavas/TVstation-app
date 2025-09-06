import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Uuid } from './providers/uuid/uuid';
import { User } from './services/user/user';
import { Storage } from './providers/storage/storage';

const services = [User];
const providers = [Storage, Uuid];

@NgModule({
  declarations: [InputComponent, ButtonComponent, SelectComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [InputComponent, ButtonComponent, SelectComponent, ReactiveFormsModule, FormsModule],
  providers: [...providers, ...services],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
