<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo-colored.svg" width="50%"/>
</p>

# Flutterwave v3 Angular Library 



## Installation

```bash
$ npm install flutterwave-v3-angular

# or
$ yarn  add  flutterwave-v3-angular



```



### Usage

```html
// include the script tag to the index.html file

<script src="https://checkout.flutterwave.com/v3.js"></script>

```


```javascript
//Import FlutterwaveModule  and add to  app root module
import FlutterwaveModule from "flutterwave-v3-angular"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlutterwaveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

### Component

```javascript
<flutterwave-make-payment
  public_key="FLWPUBK_TEST-*************"
  tx_ref="25673*******"
  amount=90000
  currency='NGN'
  payment_options="card,ussd"
  redirect_url=""
  text="Pay Now"
  [meta]="{counsumer_id: '7898' ,consumer_mac: 'kjs9s8ss7dd'   }"
  [customer]="{ name: 'Demo Customer  Name',email: 'customer@mail.com', phone_number: '08184505144' }"
  [customizations]="{  title: 'Customization Title' ,description: 'Customization Description'  ,  logo : 'https://flutterwave.com/images/logo-colored.svg' }"
  (callback)="makePaymentCallback($event)"
  (close)="cancelledPayment()" 
></flutterwave-make-payment>
```

*OR Pass in Object containing the payment data*

```javascript

<flutterwave-make-payment [data]="{
public_key: 'FLWPUBK_TEST-***********',
tx_ref: '78**********',
amount: 9000,
currency: 'NGN',
payment_options: 'card,ussd',
redirect_url: '',
meta :{  'counsumer_id': '7898' , 'consumer_mac'  : 'kjs9s8ss7dd'   },
customer : {name: 'Demo Customer  Name',email: 'customer2@mail.com',phone_number: '081845***' },
customizations: {title: 'Customization Title' , description: 'Customization Description'  , logo : 'https://flutterwave.com/images/logo-colored.svg' } ,
callback:  makePaymentCallback ,
onclose:  cancelledPayment
}
></flutterwave-make-payment>


```

### Service

```javascript

import { Component } from '@angular/core';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-v3-angular";

@Component({
  selector: 'app-root',
  template: `<button (click)="makePayment()" )>Pay</button>`,
})
export class AppComponent {
  title = 'app';

  paymentData : InlinePaymentOptions =  {
    public_key: 'FLWPUBK_TEST-XXXXX-X',
    tx_ref: '8*********',
    amount: 9000,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta : {
      counsumer_id: '7898' ,
      consumer_mac  : 'kjs9s8ss7dd'
    },
    customer : {
      name: 'Demo Customer  Name',
      email: 'customer@mail.com',
      phone_number: '08184******'
    },
    customizations: {
      title: 'Customization Title' ,
      description: 'Customization Description'  ,
      logo : 'https://flutterwave.com/images/logo-colored.svg'
    } ,
    callback:  this.makePaymentCallback ,
    onclose:  this.cancelledPayment
  }


  constructor(private flutterwave: Flutterwave ) {
  }

  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);
  }
  
  cancelledPayment(): void {
    console.log('payment is closed');

  }



}


```



Please checkout
[Flutterwave Documentation](https://developer.flutterwave.com/docs/flutterwave-standard)
for other available options you can add to config 

 For staging, Use TEST PUBLIC API Key and for production, use LIVE PUBLIC API Key.
 You can get your PUBLIC  from the Flutterwave dashboard. 

 Go [here](https://dashboard.flutterwave.com/dashboard/settings/apis) to get your API Keys. 
 
 Turn on Sandbox to get TEST API KEYS and Turn off Sandbox to get LIVE API KEYS
 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE)
file for details


## Contributions 

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Follow on Twitter [@ArtOlamilekan](https://twitter.com/artolamilekan)

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!


### Issues

Looking to contribute? Look for the Good First Issue label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

## License

MIT
