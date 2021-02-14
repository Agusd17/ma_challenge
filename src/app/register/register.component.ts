import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imgUrl: string = 'assets/imgs/hero-1.jpg';
  title: string = 'Registro de póliza';
  description: string = 'Formulario de alta de nueva póliza';

  constructor() { }

  ngOnInit(): void {
  }

}
