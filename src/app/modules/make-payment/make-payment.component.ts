import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FlutterwaveCheckout, InlinePaymentOptions, PaymentSuccessResponse} from '../models';
import {tryCatch} from 'rxjs/util/tryCatch';

@Component({
  selector: 'flutterwave-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  @Input() public_key: string;
  @Input() tx_ref: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() payment_options: string;
  @Input() redirect_url: string;
  @Input() meta: object; //{ counsumer_id, consumer_mac}
  @Input() customer: object; //{email, phone_number,name}
  @Output() callback: EventEmitter<PaymentSuccessResponse> = new EventEmitter<PaymentSuccessResponse>();


  @Input() closeAfterSuccessfulPayment: boolean;
  /*
   * durationBeforeClose; kndkndn
   */
  @Input() durationBeforeClose: number ;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() customizations: object; //{title, description, logo}



  @Input() text: string;
  @Input() style: any;
  @Input() className: string;

  @Input() data: InlinePaymentOptions;

  private inlinePaymentOptions: InlinePaymentOptions

  customer_defaults = {
    email: "",
    phone_number: "",
    name: "",
  }
  meta_defaults = {
    consumer_id: '',
    consumer_mac: '',
  }
  customizations_defaults = {
    title: "",
    description: "",
    logo: "",
  }


  constructor() {
  }

  ngOnInit(): void {

   /* if(this.data){

      this.public_key = this.data.public_key;
        this.tx_ref = this.data.tx_ref;
       this.amount = this.data.amount;
        this.currency= this.data.currency || 'NGN';
        this.payment_options = this.data.payment_options || "card, mobilemoney, ussd";
        this.redirect_url= this.data.redirect_url || '';
        this.meta= this.data.meta;
      this.customer = this.customer ;
     this.close = this.data.onclose;
      this.customizations= this.data.customizations
      this.callback = this.data.callback



    }*/

  }

  makePayment() {

    this.prepareForPayment();
    FlutterwaveCheckout(this.inlinePaymentOptions);

  }

  prepareForPayment(): void {

    this.customer = this.customer || {};
    this.meta = this.meta || {};
    this.customizations = this.customizations || {};

    // get the payment iframe
    let paymentFrame = document.getElementsByName('checkout')[0] ;

    //get the initial style of the payment iframe

   let initialIframeStyle : any = paymentFrame.getAttribute('style') ;



    this.inlinePaymentOptions =  this.data ? this.data :  {
      public_key: this.public_key,
      tx_ref: this.tx_ref,
      amount: this.amount,
      currency: this.currency || 'NGN',
      payment_options: this.payment_options || "card, mobilemoney, ussd",
      redirect_url: this.redirect_url || '',
      meta: {...this.meta_defaults, ...this.meta},
      customer: {...this.customer_defaults, ...this.customer},
      onclose: () => this.close.emit(),
      customizations: {...this.customizations_defaults, ...this.customizations}
    }

    this.inlinePaymentOptions.callback = (response: PaymentSuccessResponse) => {

      if(this.closeAfterSuccessfulPayment && this.durationBeforeClose){

    let waitDuration  = this.durationBeforeClose  * 1000 ;
        setTimeout(
          ()=>{
            //apply the initial style to the payment iframe, so it goes back to it's initial mode
            console.log("setting initial style");
            document.getElementsByName('checkout')[0].setAttribute('style', initialIframeStyle + "z-index: -1; opacity: 0")

          } , waitDuration
        )
      }

      this.callback.emit(response)
    }


  }

}
