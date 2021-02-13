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
    let validDate = this.dateValidator(fgDate.get('year').value, (fgDate.get('month').value - 1), fgDate.get('day').value);
    if (!validDate) {
      return { dateDoesNotExist: true }
    }
    let currentDate = new Date();
    let birthdate = new Date(+fgDate.get('year').value, (+fgDate.get('month').value - 1), +fgDate.get('day').value);
    let minDate = new Date(birthdate.getFullYear() + 18, birthdate.getMonth(), birthdate.getDate())
    let maxDate = new Date(birthdate.getFullYear() + 99, birthdate.getMonth(), birthdate.getDate())
    return (minDate <= currentDate && maxDate >= currentDate) ? null : { ageOutOfRange: true };
  }

  /**
   * La siguiente funcion compara la fecha ingresada con la fecha convertida, corroborando que la fecha ingresada sea real (no permite por ejemplo, el 30 de febrero)
   * @param year recibe el año ingresado por input
   * @param month recibe el mes ingresado por input
   * @param day recibe el dia ingresado por input
   */
  dateValidator(year:number, month:number, day:number) {

    let inputDate = year +'-'+ month +'-'+ day;
    let d = new Date(year, month, day);
    let realDate = d.getFullYear() +'-'+ d.getMonth() +'-'+ d.getDate();

    if (inputDate === realDate) {

      return true;
    }
    return false;
  }

  checkDni(dni: FormControl) {
    return (dni.value > 999999 && dni.value < 100000000 ) ? null : { dniOutOfRange: true };
  }

}
