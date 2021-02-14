import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customlist',
  templateUrl: './customlist.component.html',
  styleUrls: ['./customlist.component.scss']
})
export class CustomlistComponent implements OnInit {

  @Input() itemsList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
