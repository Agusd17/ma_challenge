import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';
  selectedProduct: any = null;
  selectedProductChanged = new Subject<any>();

  constructor(private http: HttpClient) { }

  /**
   * Consulta a la API por los productos disponibles.
   * Devuelve los productos, o un error.
   */
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

  /**
   * Setea el producto seleccionado y envía un update a los suscriptores de 'selectedProductChanged' con el nuevo objeto.
   * @param product objeto que contiene los datos del producto seleccionado.
   */
  setSelectedProduct(product: any) {

    this.selectedProduct = product;
    this.selectedProductChanged.next(product);
  }

  /**
   * Comprueba que el formulario almacenado sea válido
   */
  isValid() {

    const promise = new Promise(
      (resolve, reject) => {
        if (this.selectedProduct != null) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
  );
  return promise;
  }

  /**
   * Devuelve el producto seleccionado actualmente, o 0 si no hay producto seleccionado.
   */
  getSelected() {

    return (this.selectedProduct != null) ? this.selectedProduct : 0 ;
  }
}
