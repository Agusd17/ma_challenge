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
  stars: number[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {

    this.selected = this.productService.getSelected().codigoProducto;


    for (let i = 0; i < this.productData.puntaje; i++) {
      this.stars.push(i);
    }

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
