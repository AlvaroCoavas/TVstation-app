// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  newsApiUrl: 'https://newsapi.org/v2',
  newsApiKey: 'd207d20a73674f60bcd66747a5f9b453', // API key real de NewsAPI
  countriesApiUrl: 'https://countriesnow.space/api/v0.1/countries/flag/unicode'
};

/*
 * IMPORTANTE: Para usar la API de noticias necesitas:
 * 1. Registrarte en https://newsapi.org/register
 * 2. Obtener tu API key gratuita
 * 3. Reemplazar 'demo-api-key-for-testing' con tu API key real
 * 4. La API gratuita permite 1000 peticiones por día
 */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
