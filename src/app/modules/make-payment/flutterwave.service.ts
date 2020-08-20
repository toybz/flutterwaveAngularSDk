import { Injectable } from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions} from './models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from './constants';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class Flutterwave {

  constructor(private $http: HttpClient, private sanitizer: DomSanitizer) {
  }

  inlinePay(paymentData: InlinePaymentOptions){

    FlutterwaveCheckout(paymentData);

  }



  getBanks(country: string){

    let endPoint = `${BASE_URL}/banks/${country}`
    return  this.$http.put(endPoint, {})
  }


}
