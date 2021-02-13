import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicledataService {

  private apiUrl = 'https://servicios.qamercantilandina.com.ar/api/v1';
  private vehicledataForm: FormGroup = null;

  constructor(
    private http: HttpClient
  ) { }

    saveForm(inputData: FormGroup) {
      this.vehicledataForm = inputData;
    }

  isDataStored(): boolean {
    return (this.vehicledataForm != null);
  }

  getForm(): FormGroup {
    return this.vehicledataForm;
  }

  getBrands() {
    return this.http.get(`${this.apiUrl}/vehiculos/marcas`)
    .pipe(
      map((responseData:any) => {
        return responseData;
      }),
      catchError(errorRes => {
        // throwError devuelve un observable
        return throwError(errorRes);
      }))
  }

  getModels(brand: string, year: number) {
    return this.http.get(`${this.apiUrl}/vehiculos/marcas/${brand}/${year}`)
    .pipe(
      map((response:any) => {
        return response;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }))
  }

  getVersions(brand: string, year: number, model: string) {
    return this.http.get(`${this.apiUrl}/vehiculos/marcas/${brand}/${year}/${model}`)
    .pipe(
      map((response:any) => {
        return response;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }))
  }
}
