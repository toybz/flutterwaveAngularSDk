import {Component, OnInit} from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3"
import {PaymentService} from './make-payment.service';

@Component({
  selector: 'app-root',
 // templateUrl: './app.component.html',
  template: ` <flutterwave-make-payment
          [public_key]="publicKey"
          amount='10'
          currency='NGN'
          payment_options="card"
          redirect_url=""
          text="Pay Now"
          [customer]="customerDetails"
          [customizations]="customizations"
          [meta]="meta"
          [tx_ref]="generateReference()"
          (callback)="makePaymentCallback($event)"
          (close)="closedPaymentModal()"
  ></flutterwave-make-payment>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  publicKey = "FLWPUBK_TEST-0b04581c8d73fd08d5c720e1e0f803b4-X";

  customerDetails = { name: 'Demo Customer  Name', email: 'customer@mail.com', phone_number: '08100000000'}

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'}

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'}

  paymentData: InlinePaymentOptions = {

    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 10,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this

  }

  constructor(private  paymentService: PaymentService, private flutterwave: Flutterwave) {}
  ngOnInit(){}
  payViaService() {
    this.paymentService.makePayment(this.paymentData)
  }
  payViaPromise() {
    this.paymentService.makePaymentViaPromise().then(
      (response) =>{
        console.log("Promise Res" , response)
        this.flutterwave.closePaymentModal(5)
      }
    )
  }
 makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Pay", response);
    this.flutterwave.closePaymentModal(5)
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }
  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

}
