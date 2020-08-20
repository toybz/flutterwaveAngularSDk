import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FlutterwaveModule} from './modules/make-payment/make-payment.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlutterwaveModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
