import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CustomValidatorsService } from '../services/custom-validators.service';
import { LocationService } from '../services/location.service';
import { SummaryService } from '../services/summary.service';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-userdata-form',
  templateUrl: './userdata-form.component.html',
  styleUrls: ['./userdata-form.component.scss']
})
export class UserdataFormComponent implements OnInit, OnDestroy {

  userdataForm: FormGroup;
  provinces: any = null;
  provincesLoading = false;
  provSubscription: Subscription;
  cities: any = null;
  citiesLoading = false;

  constructor(
    private locationService: LocationService,
    private userdataService: UserdataService,
    private customValidators: CustomValidatorsService,
    private summaryService: SummaryService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.formInit();
    this.loadProvinces();
    this.onProvinceChanges();
  }

  formInit() {

    let dni: number = null;
    let firstname: string = null;
    let lastname: string = null;
    let email: string = null;
    let mobile: number = null;
    let phone: number = null;
    let birthdate: Date = null;
    let username: string = null;
    let password: string = null;


    if (this.userdataService.isDataStored()) {

      this.userdataForm = this.userdataService.getForm();
    } else {

      this.userdataForm = new FormGroup({

        'real-data': new FormGroup({
          'dni': new FormControl(dni, [
            Validators.required,
            this.customValidators.checkDni,
            Validators.pattern(/^[0-9]*$/)
          ]),
          'firstname': new FormControl(firstname, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{2,15}$/),
          ]),
          'lastname': new FormControl(lastname, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{2,15}$/),
          ]),
          // - Fecha de nacimiento
          // La persona deberá tener más de 18 años y menos de 99
          'birthdate': new FormGroup({

            'day': new FormControl(birthdate, [
              Validators.required,
              Validators.pattern(/^((0)[1-9]|(1-2)[0-9]|[3][0-1])$/)
            ]),
            'month': new FormControl(birthdate, [
              Validators.required,
              Validators.pattern(/^(((0)[1-9])|((1)[0-2]))$/)
            ]),
            'year': new FormControl(birthdate, [
              Validators.required,
              Validators.pattern(/^\d{4}$/)
            ]),
          }, this.customValidators.ageValidator.bind(this.customValidators)),
        }),

        'contact-data': new FormGroup({
          'email': new FormControl(email, [
            Validators.required,
            Validators.email
          ]),
          'mobilecode': new FormControl(mobile, [
            Validators.pattern(/[0-9]/),
            this.customValidators.areaCodeValidator,
            Validators.required
          ] ),
          'mobilenum': new FormControl(mobile, [
            Validators.pattern(/[0-9]/),
            this.customValidators.phoneNumberValidator,
            Validators.required
          ] ),
          'phonecode': new FormControl(phone, [
            Validators.pattern(/[0-9]/),
            this.customValidators.areaCodeValidator
          ] ),
          'phonenum': new FormControl(phone, [
            Validators.pattern(/[0-9]/),
            this.customValidators.phoneNumberValidator
          ] )
        }),

        'location': new FormGroup({
          'province': new FormControl(null,
            Validators.required,
            this.locationService.provinceValidator.bind(this.locationService)),
          'city': new FormControl(null,
            Validators.required,
            this.locationService.cityValidator.bind(this.locationService)),
          'adress': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[a-zA-Z\s0-9.]{3,24}$/)
          ]),
        }),

        'user-data': new FormGroup({
          // - Usuario (2)
          // Requerido. minLength 3, maxLength 30 [Debe consultar disponibilidad]
          'username': new FormControl(username, [
            Validators.required,
            Validators.pattern(/^([a-zA-Z0-9.]){3,30}$/)
          ], this.userdataService.checkUsername.bind(this.userdataService)),

          'user-password': new FormGroup({

            // - Contraseña
            // Requerido. Nivel de seguridad media/alta
            'password': new FormControl(password, [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{8,16}$/)
          ]),

          // - Contraseña
          // Requerido. Nivel de seguridad media/alta
          'passwordCheck': new FormControl(password, [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{8,16}$/)
          ]),
        }, this.customValidators.checkPasswords),
      })
      });
    }

  }

  testing() {
    console.log(this.userdataForm);

  }

  onSubmit() {
    this.userdataService.saveForm(this.userdataForm);
    this.summaryService.saveUserdata();
    this.router.navigate(['../vehicle-data'], {relativeTo: this.route})
  }

  loadProvinces() {
    this.provincesLoading = true;
    this.locationService.getProvinces().subscribe(response => {
      this.provinces = response;
      this.provincesLoading = false;
    });
  }

  onProvinceChanges() {

    this.provSubscription = this.userdataForm.get('location').get('province').valueChanges.subscribe(selectedValue => {
      this.citiesLoading = true;
        this.userdataForm.get('location').get('city').reset();
        this.locationService.getCities(+selectedValue.id).subscribe(response => {
          this.cities = response;
          this.citiesLoading = false;
        });
    });
  }

  ngOnDestroy() {
    this.provSubscription.unsubscribe();
  }
}
