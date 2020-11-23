import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicledata-form',
  templateUrl: './vehicledata-form.component.html',
  styleUrls: ['./vehicledata-form.component.scss']
})
export class VehicledataFormComponent implements OnInit {

  vehicledataForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
