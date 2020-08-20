import { Component } from '@angular/core';
import {Flutterwave} from './modules/make-payment/flutterwave.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  constructor(private flutterwave: Flutterwave ) {

    this.flutterwave.getBanks('NG').subscribe()

  }




}
