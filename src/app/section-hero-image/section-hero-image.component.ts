import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-hero-image',
  templateUrl: './section-hero-image.component.html',
  styleUrls: ['./section-hero-image.component.scss']
})
export class SectionHeroImageComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() sectionTitle: string;
  @Input() sectionDescription: string;

  constructor() { }

  ngOnInit(): void {
  }

}
