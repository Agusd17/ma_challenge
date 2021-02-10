import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { UserdataService } from '../services/userdata.service';
import { VehicledataService } from '../services/vehicledata.service';
import { Summary } from 'src/app/shared/models/summary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summaryForm: FormGroup;
  userdata: any;
  vehicledata: any;
  productdata: any;
  infoIsValid:boolean;
  summary = new Summary;

  constructor(
    private userdataService: UserdataService,
    private vehicledataService: VehicledataService,
    private productdataService: ProductsService
    ) { }

  ngOnInit(): void {
    this.userdata = this.userdataService.getForm();
    console.log('UserData:');
    console.log(this.userdata?.value);

    this.vehicledata = this.vehicledataService.getForm();
    console.log('VehicleData:');
    console.log(this.vehicledata?.value);
    this.productdata = this.productdataService.getSelected();
    console.log('ProductData:');
    console.log(this.productdata);

  }

  submitAll() {
    this.summary.apellido = 'Dllano';
    console.log(this.summary);
  }
}
