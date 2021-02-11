import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Summary } from '../shared/models/summary';
import { ProductsService } from './products.service';
import { UserdataService } from './userdata.service';
import { VehicledataService } from './vehicledata.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  summary = new Summary;
  userdata: FormGroup;
  vehicledata: FormGroup;
  productdata: any;

  constructor(
    private userdataService: UserdataService,
    private vehicledataService: VehicledataService,
    private productdataService: ProductsService
  ) { }

  saveUserdata() {
    this.userdata = this.userdataService.getForm();

    this.summary.nombre = this.userdata.get('real-data').get('firstname').value;

    this.summary.apellido = this.userdata.get('real-data').get('lastname').value;

    this.summary.documento = this.userdata.get('real-data').get('dni').value;

    this.summary.nacimiento = this.userdata.get('real-data').get('birthdate').get('day').value
      +'-'+ this.userdata.get('real-data').get('birthdate').get('month').value
      +'-'+ this.userdata.get('real-data').get('birthdate').get('year').value;

    this.summary.email = this.userdata.get('contact-data').get('email').value;

    this.summary.numMobile = this.userdata.get('contact-data').get('mobilecode').value
      +'-'+ this.userdata.get('contact-data').get('mobilenum').value;

    this.summary.numPhone = this.userdata.get('contact-data').get('phonecode').value
      +'-'+ this.userdata.get('contact-data').get('phonenum').value;

    this.summary.provincia = this.userdata.get('location').get('province').value;

    this.summary.ciudad = this.userdata.get('location').get('city').value;

    this.summary.direccion = this.userdata.get('location').get('adress').value;

    this.summary.usuario = this.userdata.get('user-data').get('username').value;

    console.log(this.summary);
  }

  saveVehicledata() {
    this.vehicledata = this.vehicledataService.getForm();

    this.summary.marca = this.vehicledata.get('brand').value;

    this.summary.year = this.vehicledata.get('year').value;

    this.summary.modelo = this.vehicledata.get('model').value;

    this.summary.version = this.vehicledata.get('version').value;

  }

  saveProductdata() {
    this.productdata = this.productdataService.getSelected();

    this.summary.poliza = this.productdata.titulo;

    this.summary.granizo = this.productdata.granizo;

    this.summary.franquicia = this.productdata.franquicia;

    this.summary.costo = this.productdata.costo;

  }

  getSummary() {
    return this.summary;
  }

}
