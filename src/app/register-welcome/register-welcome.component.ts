import { Component, OnInit } from '@angular/core';
import { WebContentsService } from '../services/web-contents.service';


@Component({
  selector: 'app-register-welcome',
  templateUrl: './register-welcome.component.html',
  styleUrls: ['./register-welcome.component.scss']
})
export class RegisterWelcomeComponent implements OnInit {

  advantagesList: any[];

  constructor(private webContents: WebContentsService) { }

  ngOnInit(): void {

    this.advantagesList = this.webContents.getAdvantages();
  }

}
