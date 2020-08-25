## 📝 Table of Contents

- [About](#about)
- [Getting Started](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#5c4107d981244429b309cbcd954d5c18)
- [Usage](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#30eb23af86334769bee2650a75837e54)
- [Running tests](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#d92d0cb9d8844c649c23274c874c6eba)
- [Deployment](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#c1ea07f7d19c427da8c4e6a3aae7b8e3)
- [Built Using](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#7a8da9eb61b142fb879ff33d56488b59)
- [Contributors](#contributors)
- [Acknowledgments](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#d8edb268ac63402296f69af9c10dc8a3)

## About

Flutterwave Official  Angular library to accept payment via  card , USSD, QrCode etc.


## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](https://www.notion.so/flutterwavego/SDK-Doc-structure-0eebc573807a4bf8b99c65d4618fdb98#deployment) for notes on how to deploy the project on a live system.

### Prerequisites



```
Node  >= 6.9.x and npm >= 3
Angular version  >= 4
Flutterwave version 3

```

### Installing


Install the SDK 

```bash
$ npm install flutterwave-v3-angular
# or
$ yarn  add  flutterwave-v3-angular

```



## 🔧 Usage

Include the Flutterwave V3 script tag to the index.html file
```html

<script src="https://checkout.flutterwave.com/v3.js"></script>

// example below

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Flutterwave Angular SDK</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>

<script src="https://checkout.flutterwave.com/v3.js"></script>


</html>



```


Import FlutterwaveModule  and add to  app root module

```javascript
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

Use in component method 1 

```javascript
//Pass  in payment parameter individually as component attributes

<flutterwave-make-payment
  public_key="FLWPUBK_TEST-*************"
  tx_ref="25673*******"
  amount=90000
  currency='NGN'
  payment_options="card,ussd"
  redirect_url=""
  text="Pay Now"
  className="class-name"
  style=""
  [meta]="{counsumer_id: '7898' ,consumer_mac: 'kjs9s8ss7dd'   }"
  [customer]="{ name: 'Demo Customer  Name',email: 'customer@mail.com', phone_number: '08184505144' }"
  [customizations]="{  title: 'Customization Title' ,description: 'Customization Description'  ,  logo : 'https://flutterwave.com/images/logo-colored.svg' }"
  (callback)="makePaymentCallback($event)"
  (close)="cancelledPayment()" 
></flutterwave-make-payment>
```

Use in component method 2

```javascript

// Pass in the payment parameter as an object to the component 'data' attribute

<flutterwave-make-payment [data]="{
public_key: 'FLWPUBK_TEST-***********',
tx_ref: '78**********',
amount: 9000,
currency: 'NGN',
payment_options: 'card,ussd',
redirect_url: '',
text: 'Pay Now',
className: '',
style: '',
meta :{  'counsumer_id': '7898' , 'consumer_mac'  : 'kjs9s8ss7dd'   },
customer : {name: 'Demo Customer  Name',email: 'customer2@mail.com',phone_number: '081845***' },
customizations: {title: 'Customization Title' , description: 'Customization Description'  , logo : 'https://flutterwave.com/images/logo-colored.svg' } ,
callback:  makePaymentCallback ,
onclose:  cancelledPayment
}
></flutterwave-make-payment>


```


#### Use in code (Flutterwave service)

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

  //Inject the flutterwave service 
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





## 🔧 Running tests

Explain how to run the automated tests for this system. For users who would like to run tests before going live

### Break down into end to end tests

Explain what these tests test and why

```
Give an example

```

### And coding style tests (optional)

Explain what these tests test and why

```
Give an example

```

## 🚀 Deployment

- Switch to Live Mode on the Dashboard settings page
- Use the Live Public API key 

## ⛏️ Built Using

Mention the tools used in developing this package, e.g:

- [Angular CLI](https://www.mongodb.com/) - Database
- [Typescript](https://expressjs.com/) - Server Framework
- [Angular](https://vuejs.org/) - Web Framework

<a id="contributors"></a>
## ✍️ Contributors

- [@ArtOlamilekan](https://twitter.com/artolamilekan)

See also the list of [contributors](https://github.com/flutterwave/flutterwave-v3-angular/contributors) who participated in this project.

## 🎉 Flutterwave API  References

- [Flutterwave API Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
- [Flutterwave Inline Payment Doc](https://developer.flutterwave.com/docs/flutterwave-inline)
