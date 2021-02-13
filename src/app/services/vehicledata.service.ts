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

  /**
   * Guarda una instancia del Form recibido.
   * @param inputData FormGroup a guardar.
   */
  saveForm(inputData: FormGroup) {

    this.vehicledataForm = inputData;
  }

  /**
   * Verifica que exista un FormGroup guardado en el servicio, distinto de null.
   * Devuelve el resultado de la verificación.
   */
  isDataStored(): boolean {

    return (this.vehicledataForm != null);
  }

  /**
   * Devuelve el FormGroup almacenado en el servicio
   */
  getForm(): FormGroup {

    return this.vehicledataForm;
  }

  /**
   * Consulta a la API por las marcas de vehículos disponibles.
   * Devuelve el listado de marcas o un error.
   */
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

  /**
   * Consulta a la API por los modelos correspondientes a la marca y año recibidos.
   * Devuelve el resultado o un error si no existen versiones.
   * @param brand marca seleccionada
   * @param year año seleccionado
   */
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

  /**
   * Consulta a la API por las versiones correspondientes a la marca, año y modelo recibidos.
   * Devuelve el resultado o un error si no existen versiones.
   * @param brand marca seleccionada
   * @param year año seleccionado
   * @param model modelo seleccionado
   */
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
