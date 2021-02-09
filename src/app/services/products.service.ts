import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  dataForm: FormGroup = null;
  private apiUrl: string = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';
  selectedProductChanged = new Subject<any>();

  constructor(private http: HttpClient) { }

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

  setSelectedProduct(product: any) {
    this.selectedProductChanged.next(product);
    console.log('Producto elegido: '+ product.titulo);
  }
}
