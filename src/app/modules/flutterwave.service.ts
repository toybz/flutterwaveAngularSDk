import {EventEmitter, Injectable} from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from './models';

@Injectable()
export class Flutterwave {

  constructor() { }


  inlinePay(paymentData: InlinePaymentOptions){
    FlutterwaveCheckout(paymentData);
  }


  asyncInlinePay(paymentData: InlinePaymentOptions): Promise<any>{

    let paymentFrame = document.getElementsByName('checkout')[0] ;
    let initialIframeStyle : any = paymentFrame.getAttribute('style') ;

  return new Promise((resolve, reject) => {

    paymentData = {
      ...paymentData,
      callback: ($event) => {

        if(paymentData.closeAfterSuccessfulPayment && paymentData.durationBeforeClose){

          let waitDuration  = paymentData.durationBeforeClose  * 1000 ;
          setTimeout(
            ()=>{

              document.getElementsByName('checkout')[0].setAttribute('style', initialIframeStyle + "z-index: -1; opacity: 0")

            } , waitDuration
          )
        }
        resolve($event)
      } ,
      onclose: () => resolve('closed')
    }

    FlutterwaveCheckout(paymentData)
  })
}






}
