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

  userdata: any;
  infoIsValid:boolean = false;
  showMsg: boolean = false;
  submitResponse: any[];
  summary = new Summary;

  constructor(
    private summaryService: SummaryService
    ) { }

  ngOnInit(): void {

    this.summary = this.summaryService.getSummary();
  }

  submitAll() {

    this.submitResponse = this.summaryService.sendData();
    (this.submitResponse[1] === 1) ? this.infoIsValid = true : this.infoIsValid = false;
    this.showMsg = true;

    console.log('intentando enviar datos...');
    console.log(this.submitResponse);

  }
}
