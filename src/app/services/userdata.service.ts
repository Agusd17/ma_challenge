import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private apiUrl = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';
  private userdataForm: FormGroup = null;

  constructor(private http: HttpClient) { }

  /**
   * Guarda una instancia del Form recibido.
   * @param inputData FormGroup a guardar.
   */
  saveForm(inputData: FormGroup) {

    this.userdataForm = inputData;
  }

  /**
   * Verifica que exista un FormGroup guardado en el servicio, distinto de null.
   * Devuelve el resultado de la verificación.
   */
  isDataStored():boolean {

    return (this.userdataForm != null);
  }

  /**
   * Devuelve el FormGroup almacenado en el servicio
   */
  getForm(): FormGroup {

    return this.userdataForm;
  }

  /**
   * Validador asincrónico que comprueba si el valor del control recibido ('username') ya existe en la API.
   * Devuelve un error si ya existe.
   * @param control FormControl que contiene el string a verificar.
   */
  checkUsername(control: FormControl): Promise<any> | Observable<any> {

    var isUsernameValid;
    return new Promise<any>(
      (resolve, reject) => {
        this.http.get(`${this.apiUrl}/usuarios?nombre=${control.value}`).subscribe(
          response => {
            console.log(response);

            isUsernameValid = response;
            if (isUsernameValid === true) {
              console.log('name exists');

              resolve({'usernameIsInvalid': true})
            } else {
              console.log('name doesnt exist');
              resolve(null);
            }
          }, reject => {
            resolve({ 'usernameBadRequest': true });
          });
      }
    );
  }
}
