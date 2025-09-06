import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './register.page';
import { IsLoggedGuard } from 'src/app/shared/guards/is-logged.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    canActivate: [IsLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}