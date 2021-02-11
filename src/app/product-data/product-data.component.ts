import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { SummaryService } from '../services/summary.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent implements OnInit, OnDestroy {


  productsLoading: boolean = false;
  products: any;
  selectedProduct: any;
  isProductSelected: boolean = false;
  subscription: Subscription;

  constructor(
    private productdataService: ProductsService,
    private summaryService: SummaryService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.subscription = this.productdataService.selectedProductChanged.subscribe(product => {
      this.selectedProduct = product;
      this.isProductSelected = true;
    });
    (this.productdataService.getSelected() === 0) ? this.isProductSelected = false : this.isProductSelected = true;
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

  submitData() {
    this.summaryService.saveProductdata();
    this.router.navigate(['../summary'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
