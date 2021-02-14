import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customlist-item',
  templateUrl: './customlist-item.component.html',
  styleUrls: ['./customlist-item.component.scss']
})
export class CustomlistItemComponent implements OnInit {

  @Input() itemIcon: string = '';
  @Input() itemContent: string = '';

  constructor() { }

  ngOnInit(): void {

  }

}
