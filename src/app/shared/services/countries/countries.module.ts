import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountriesService } from './countries.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [CountriesService]
})
export class CountriesModule { }