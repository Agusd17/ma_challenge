import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'https://apis.datos.gob.ar/georef/api';

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get(
      `${this.apiUrl}/provincias`
    )
    .pipe(
      map((responseData:any) => {
        return responseData.provincias;
      }),
      catchError(errorRes => {
        // throwError devuelve un observable
        return throwError(errorRes);
      }))
  }

  getCities(id: number) {

    return this.http.get(
      `${this.apiUrl}/municipios?provincia=${id}&campos=id,nombre&max=135`
      )
    .pipe(
      map((responseData:any) => {
        if (responseData.cantidad === 0) {
          return [{'id': -1, 'nombre': 'Sin municipios'}];
        }
        console.log(responseData);

        return responseData.municipios;
      }),
      catchError(errorRes => {
        // throwError devuelve un observable
        return throwError(errorRes);
      }))

  }

  // async validators
  provinceValidator(control: FormControl): Promise<any> | Observable<any> {
    let isProvinceValid;
    return new Promise<any>(
      (resolve, reject) => {
        this.http.get(`${this.apiUrl}/provincias?id=${control.value.id}`).subscribe(
          (response: any) => {
            isProvinceValid = response.total;
            (isProvinceValid === 0 || response.errores) ? resolve({'provinceNotFound': true}) : resolve(null);
          }, reject => {
            resolve({ 'provinceBadRequest': true });
          });
      }
    );
  }

  cityValidator(control: FormControl): Promise<any> | Observable<any> {
    let isCityValid;
    return new Promise<any>(
      (resolve, reject) => {
        if (control.value.id == -1) {
          resolve(null); // si el id es 0, es porque la opcion elegida es "Sin municipios"
        } else {

          this.http.get(`${this.apiUrl}/municipios?id=${control.value.id}`).subscribe(
            (response: any) => {
              isCityValid = response.total;
              (isCityValid === 0 || response.errores) ? resolve({'cityNotFound': true}) : resolve(null);
            }, reject => {
              resolve({ 'cityBadRequest': true });
            });
          }
        }
    );
  }
}
