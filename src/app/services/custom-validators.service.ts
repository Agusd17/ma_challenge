import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  checkPasswords(group: FormGroup) {

    let password = group.get('password').value;
    let passCheck = group.get('passwordCheck').value;

    return password === passCheck ? null : { passDiffer: true }
  }

  areaCodeValidator(control: FormControl){

    let areaCode = control.value;
    console.log(areaCode);

    if (areaCode === null) {
      return null;
    } else {
      return ((areaCode > 9) && (areaCode < 10000)) ? null : { areaCodeOutOfRange: true };
    }

  }

  phoneNumberValidator(control: FormControl) {

    let phoneNumber = control.value;
    if (phoneNumber === null) {
      return null;
    } else {
      return ((phoneNumber > 99999) && (phoneNumber < 100000000)) ? null : { phoneNumberOutOfRange: true };
    }

  }

  ageValidator(fgDate: FormGroup) {
    let currentDate = new Date();
    let birthdate = new Date(+fgDate.get('year').value, (+fgDate.get('month').value - 1), +fgDate.get('day').value);
    let minDate = new Date(birthdate.getFullYear() + 18, birthdate.getMonth(), birthdate.getDate())
    let maxDate = new Date(birthdate.getFullYear() + 99, birthdate.getMonth(), birthdate.getDate())
    return (minDate <= currentDate && maxDate >= currentDate) ? null : { ageOutOfRange: true };
  }

  checkDni(dni: FormControl) {
    return (dni.value > 999999 && dni.value < 100000000 ) ? null : { dniOutOfRange: true };
  }

}
