import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit, OnDestroy {

  @Input() productData: any;
  selected: any;
  subscription: Subscription;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this.productService.selectedProductChanged.subscribe(
      product => {
        this.selected = product.codigoProducto;
      }
    )
  }

  selectProduct(product: any) {
    this.productService.setSelectedProduct(product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
