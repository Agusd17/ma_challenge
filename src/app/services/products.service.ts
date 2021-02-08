import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  dataForm: FormGroup = null;
  private apiUrl: string = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';

  constructor(private http: HttpClient) { }

  isDataSaved(): boolean {
    return (this.dataForm != null);
  }

  saveForm(inputData: FormGroup) {
    this.dataForm = inputData;
  }

  getForm(): FormGroup {
    return this.dataForm;
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/coberturas`)
    .pipe(
      map((responseData:any) => {
        return responseData;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }))
  }
}
