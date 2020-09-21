import { Injectable } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, AsyncPaymentOptions} from 'flutterwave-angular-v3';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private flutterwave: Flutterwave) {}

  makePayment = (paymentDetails)=>{

    let paymentData = {...paymentDetails,
    callbackContext: this,
      callback: this.paymentCallBack
    }

    //this to use to caller component/service context & callback
    this.flutterwave.inlinePay(paymentDetails)

    //this to use this service context & callback
   // this.flutterwave.inlinePay(paymentData)

  }

  paymentCallBack(res){
    console.log('test service callback', res)
    this.flutterwave.closePaymentModal(5)
  }

  makePaymentViaPromise(): Promise<any>{

    let  paymentData : AsyncPaymentOptions = {
        public_key: 'FLWPUBK_TEST-0b04581c8d73fd08d5c720e1e0f803b4-X',
        tx_ref: '87yhm',
        amount: 10,
        currency: 'NGN',
        payment_options: 'card,ussd',
        meta: {
          'counsumer_id': '7898',
          'consumer_mac': 'kjs9s8ss7dd'
        },
        customer: {
          name: 'Demo Customer  Name',
          email: 'customer@mail.com',
          phone_number: '081845XX044'
        },
        customizations: {
          title: 'Customization Title',
          description: 'Customization Description',
          logo: 'https://flutterwave.com/images/logo-colored.svg'
        }
      }

    return  this.flutterwave.asyncInlinePay(paymentData)

  }

}
