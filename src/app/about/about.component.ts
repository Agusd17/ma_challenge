import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  imgUrl: string = 'assets/imgs/about.png';
  title: string = 'Nosotros';
  description: string = 'Conocer de donde venimos es primoridal para entender hacia donde vamos';

  constructor() { }

  ngOnInit(): void {
  }

}
