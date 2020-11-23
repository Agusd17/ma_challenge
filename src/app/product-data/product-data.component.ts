import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {


  productdataForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
