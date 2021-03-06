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
    private productsService: ProductsService
  ) { }

  /**
   * Solicita el formulario guardado en 'userdataService'.
   * Asigna los valores del formulario recibido a los atributos correspondientes de 'summary'.
   * No realiza validaciones sobre el mismo de ningún tipo.
   */
  saveUserdata() {

    this.userdata = this.userdataService.getForm();

    this.summary.nombre = this.userdata.get('real-data').get('firstname').value;

    this.summary.apellido = this.userdata.get('real-data').get('lastname').value;

    this.summary.documento = this.userdata.get('real-data').get('dni').value;

    this.summary.nacimiento = this.userdata.get('real-data').get('birthdate').get('day').value
      +'-'+ this.userdata.get('real-data').get('birthdate').get('month').value
      +'-'+ this.userdata.get('real-data').get('birthdate').get('year').value;

    this.summary.email = this.userdata.get('contact-data').get('email').value;

    this.summary.numMobile = '(' + this.userdata.get('contact-data').get('mobilecode').value
    +') - '+ this.userdata.get('contact-data').get('mobilenum').value;

    if (this.userdata.get('contact-data').get('phonecode').value != null
    && this.userdata.get('contact-data').get('phonenum').value != null) {

      this.summary.numPhone = '(' + this.userdata.get('contact-data').get('phonecode').value
      +') - '+ this.userdata.get('contact-data').get('phonenum').value;
    }

    this.summary.provincia = this.userdata.get('location').get('province').value;

    this.summary.ciudad = this.userdata.get('location').get('city').value;

    this.summary.direccion = this.userdata.get('location').get('adress').value;

    this.summary.usuario = this.userdata.get('user-data').get('username').value;

    this.summary.passwd = this.userdata.get('user-data').get('user-password').get('password').value;

    console.log(this.summary);
  }

  /**
   * Solicita el formulario guardado en 'vehicledataService'.
   * Asigna los valores del formulario recibido a los atributos correspondientes de 'summary'.
   * No realiza validaciones sobre el mismo de ningún tipo.
   */
  saveVehicledata() {

    this.vehicledata = this.vehicledataService.getForm();

    this.summary.marca = this.vehicledata.get('brand').value;

    this.summary.year = this.vehicledata.get('year').value;

    this.summary.modelo = this.vehicledata.get('model').value;

    this.summary.version = this.vehicledata.get('version').value;

  }

  /**
   * Solicita el objeto guardado en 'productsService'.
   * Asigna los valores de los atributos del objeto recibido a los atributos correspondientes de 'summary'.
   * No realiza validaciones sobre el mismo de ningún tipo.
   */
  saveProductdata() {

    this.productdata = this.productsService.getSelected();

    this.summary.poliza = this.productdata.titulo;

    this.summary.granizo = this.productdata.granizo;

    this.summary.franquicia = this.productdata.franquicia;

    this.summary.costo = this.productdata.costo;

  }

  /**
   * Devuelve el objeto 'summary'.
   */
  getSummary() {

    return this.summary;
  }

  /**
   * Comprueba que los formularios sigan siendo válidos y simula el envío de los datos.
   * devuelve un array [string, number] según corresponda.
   */
  sendData() {

    if (this.userdata?.valid && this.vehicledata?.valid && this.productdata != undefined && this.productdata != null) {

      /* Acá se enviarían los datos por POST a la API correspondiente... */

      return ['Los datos se enviaron con éxito.', 1];
    }
    return ['No se enviaron los datos. Revise que los mismos sean correctos.', 0];
  }

}
