import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { UserdataService } from '../services/userdata.service';
import { VehicledataService } from '../services/vehicledata.service';
import { Summary } from 'src/app/shared/models/summary';
import { SummaryService } from '../services/summary.service';
import { LocationService } from '../services/location.service';

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
    private locationService: LocationService,
    private vehicleService: VehicledataService,
    private summaryService: SummaryService
    ) { }

  ngOnInit(): void {
    this.summary = this.summaryService.getSummary();
  }

  submitAll() {
    this.summary.apellido = 'Dllano';
    console.log(this.summary);
  }
}
