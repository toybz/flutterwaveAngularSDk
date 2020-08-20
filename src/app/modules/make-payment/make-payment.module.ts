import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaymentComponent } from './make-payment.component';
import {Flutterwave} from './flutterwave.service';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LibInterceptor} from './interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [MakePaymentComponent] ,
  providers: [Flutterwave,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LibInterceptor ,
      multi: true
    }],
  exports: [MakePaymentComponent]
})
export class FlutterwaveModule { }
