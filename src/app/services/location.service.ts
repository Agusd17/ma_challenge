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
      this.apiUrl+'/provincias'
    )
    .pipe(
      map((responseData:any) => {
        return responseData.provincias;
      }),
      catchError(errorRes => {
        // Do something with the error
        // throwError devuelve un observable
        return throwError(errorRes);
      }))
  }

  getCities(id: number) {

    return this.http.get(
      this.apiUrl+'/municipios?provincia='+id+'&campos=id,nombre&max=135'
    )
    .pipe(
      map((responseData:any) => {
        return responseData.municipios;
      }),
      catchError(errorRes => {
        // Do something with the error
        // throwError devuelve un observable
        return throwError(errorRes);
      }))

  }

  // async validators
  provinceValidator(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise<any>((resolve, reject) => {
      if (false) {
        resolve({'provinceInexistent': true})
      } else {
        // resolve null if validated
        resolve(null);
      }
    });
    return promise;
  }

  cityValidator(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise<any>((resolve, reject) => {

    });
    return promise;
  }
}
