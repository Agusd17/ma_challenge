import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-userdata-form',
  templateUrl: './userdata-form.component.html',
  styleUrls: ['./userdata-form.component.scss']
})
export class UserdataFormComponent implements OnInit {

  userdataForm: FormGroup;
  provinces: any = null;
  provincesLoading = false;
  cities: any = null;
  citiesLoading = false;

  constructor(
    private locationService: LocationService,
    private userdataService: UserdataService
    ) { }

  ngOnInit(): void {
    this.formInit();
    this.loadProvinces();
  }

  formInit() {

    let dni: number = null;
    let firstname: string = null;
    let lastname: string = null;
    let email: string = null;
    let mobile: number = null;
    let phone: number = null;
    let location: string = null;
    let birthdate: Date = null;
    let username: string = null;
    let password: string = null;

    this.userdataForm = new FormGroup({
      'dni': new FormControl(dni, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.pattern(/^[0-9]*$/)
      ]),
      'firstname': new FormControl(firstname, [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/),
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      'lastname': new FormControl(lastname, [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/),
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      'email': new FormControl(email, [
        Validators.required,
        Validators.email
      ]),
      'mobilecode': new FormControl(mobile, [
        Validators.pattern(/[0-9]/),
        Validators.maxLength(4),
        Validators.required
      ] ),
      'mobilenum': new FormControl(mobile, [
        Validators.pattern(/[0-9]/),
        Validators.maxLength(8),
        Validators.required
      ] ),
      'phonecode': new FormControl(phone, [
        Validators.pattern(/[0-9]/),
        Validators.maxLength(4)
      ] ),
      'phonenum': new FormControl(phone, [
        Validators.pattern(/[0-9]/),
        Validators.maxLength(8)
      ] ),
      'location': new FormGroup({
        'province': new FormControl(null,
          Validators.required,
          this.locationService.provinceValidator),
        'city': new FormControl(null,
          Validators.required,
          this.locationService.cityValidator),
        'adress': new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
          Validators.pattern(/^([a-zA-Z\s]+[0-9]+)$/)
        ]),
      }),
      // - Fecha de nacimiento
      // La persona deberá tener más de 18 años y menos de 99
      'birthdate': new FormControl(birthdate, [
        Validators.required,
        Validators.min(18),
        Validators.max(99),
      ]),
      // - Usuario (2)
      // Requerido. minLength 3, maxLength 30 [Debe consultar disponibilidad]
      'username': new FormControl(username, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ], this.userdataService.checkUsername),
      // - Contraseña
      // Requerido. Nivel de seguridad media/alta
      'password': new FormControl(password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{8,12}$/)
      ]),
    });


  }

  onSubmit() {}

  loadProvinces() {
    this.provincesLoading = true;
    this.locationService.getProvinces().subscribe(response => {
      this.provinces = response;
      this.provincesLoading = false;
    });
  }

  loadCities(id: number) {
    this.citiesLoading = true;
    setTimeout(() => {

      this.locationService.getCities(id).subscribe(response => {
        this.cities = response;
        this.citiesLoading = false;
      });
    }, 1500);
  }

}
