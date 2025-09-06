import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { SharedModule } from 'src/app/shared/shared-module';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}