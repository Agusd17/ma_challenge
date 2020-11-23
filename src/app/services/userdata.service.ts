import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private apiUrl = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';

  constructor(private http: HttpClient) { }

  checkUsername(control: FormControl): Promise<any> | Observable<any> {
    let isUsernameValid;
    let promise = new Promise(
      (resolve, reject) => {
        this.http.get(this.apiUrl + 'usuarios?nombre='+control.value).subscribe(
          response => {
            isUsernameValid = response;
        });
        if (isUsernameValid === 'false') {
          resolve({'usernameIsInvalid': true})
        } else {
          resolve(null);
        }
      }
    );
    return promise;
  }
}
