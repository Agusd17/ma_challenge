import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  imgUrl: string = 'assets/imgs/register.png';
  title: string = 'Registro de póliza';
  description: string = 'Formulario de alta de nueva póliza';

  constructor() { }

  ngOnInit(): void {
  }

}
