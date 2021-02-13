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

  /**
   * Consulta a la API por el listado de provincias. Devuelve las provincias, o un error.
   */
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

  /**
   * Consulta a la API por el listado de municipios que pertenezcan a la id recibida. Devuelve los municipios, un array especial 'Sin Municipios', o un error.
   * @param id el id de la provincia cuyos municipios se desean consultar
   */
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

 /**
  * Validador asincrónico que verifica que la provincia seleccionada en el control sea real, y no haya sido modificada forzosamente.
  * Devuelve un error si la provincia no existe.
  * Devuelve un error si la consulta no se pudo realizar.
  * @param control provincia a evaluar, elegida en el control.
  */
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

  /**
   * Validador asincrónico que verifica que el municipio seleccionado en el control sea real, y no haya sido modificado forzosamente.
   * Devuelve un error si el municipio no existe.
   * No se ejecuta validación si el id del control es '-1', ya que corresponde a la opción 'Sin Municipios'.
   * Devuelve un error si la consulta no se pudo realizar.
   * @param control
   */
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
