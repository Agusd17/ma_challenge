import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {


  productdataForm: FormGroup;
  productsLoading: boolean = false;
  products: any;

  constructor( private productdataService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.formInit();
  }

  loadProducts() {
    this.productsLoading = true;
    this.productdataService.getProducts().subscribe( response => {
      this.products = response;
      this.productsLoading = false;
    })
  }

  formInit() {
    if (this.productdataService.isDataSaved()) {
      this.productdataForm = this.productdataService.getForm();
    } else {

    }
  }

  onSubmit() {

  }

  testing() {
    console.log(this.productdataForm);
  }

}
