import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Http } from '../../providers/http/http';
import { ICountry } from '../../interfaces/country.interface';

interface ICountryResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    unicodeFlag: string;
    emoji: string;
  }[];
}

@Injectable()
export class CountriesService {

  constructor(private http: Http) { }

  /**
   * Obtiene la lista de países con sus banderas
   * @returns Observable con la lista de países formateada
   */
  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountryResponse>(environment.countriesApiUrl)
      .pipe(
        map(response => {
          if (response.error) {
            return [];
          }
          
          return response.data.map(country => ({
            id: country.name,
            name: country.name,
            code: country.name,
            flag: country.emoji
          }));
        })
      );
  }
}