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

  saveForm(inputData: FormGroup) {
    this.userdataForm = inputData;
  }

  isDataStored():boolean {
    return (this.userdataForm != null);
  }

  getForm(): FormGroup {
    return this.userdataForm;
  }

  // async validator
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
