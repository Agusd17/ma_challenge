import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit {


  productsLoading: boolean = false;
  products: any;
  selectedProduct: any;

  constructor( private productdataService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsLoading = true;
    this.productdataService.getProducts().subscribe( response => {
      this.products = response;
      this.productsLoading = false;
    })
  }

  setSelectedProduct(product) {
    this.selectedProduct = product;

  }

}
