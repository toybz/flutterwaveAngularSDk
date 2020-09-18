import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
var InlinePaymentOptions = (function () {
    function InlinePaymentOptions() {
    }
    return InlinePaymentOptions;
}());
var PaymentSuccessResponse = (function () {
    function PaymentSuccessResponse() {
    }
    return PaymentSuccessResponse;
}());
var MakePaymentComponent = (function () {
    function MakePaymentComponent() {
        this.callback = new EventEmitter();
        this.close = new EventEmitter();
        this.customer_defaults = {
            email: "",
            phone_number: "",
            name: "",
        };
        this.meta_defaults = {
            consumer_id: '',
            consumer_mac: '',
        };
        this.customizations_defaults = {
            title: "",
            description: "",
            logo: "",
        };
    }
    /**
     * @return {?}
     */
    MakePaymentComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    MakePaymentComponent.prototype.makePayment = function () {
        this.prepareForPayment();
        FlutterwaveCheckout(this.inlinePaymentOptions);
    };
    /**
     * @return {?}
     */
    MakePaymentComponent.prototype.prepareForPayment = function () {
        var _this = this;
        this.customer = this.customer || {};
        this.meta = this.meta || {};
        this.customizations = this.customizations || {};
        // get the payment iframe
        var /** @type {?} */ paymentFrame = document.getElementsByName('checkout')[0];
        //get the initial style of the payment iframe
        var /** @type {?} */ initialIframeStyle = paymentFrame.getAttribute('style');
        this.inlinePaymentOptions = this.data ? this.data : {
            public_key: this.public_key,
            tx_ref: this.tx_ref,
            amount: this.amount,
            currency: this.currency || 'NGN',
            payment_options: this.payment_options || "card, mobilemoney, ussd",
            redirect_url: this.redirect_url || '',
            meta: Object.assign({}, this.meta_defaults, this.meta),
            customer: Object.assign({}, this.customer_defaults, this.customer),
            onclose: function () { return _this.close.emit(); },
            customizations: Object.assign({}, this.customizations_defaults, this.customizations)
        };
        this.inlinePaymentOptions.callback = function (response) {
            if (_this.closeAfterSuccessfulPayment && _this.durationBeforeClose) {
                var /** @type {?} */ waitDuration = _this.durationBeforeClose * 1000;
                setTimeout(function () {
                    //apply the initial style to the payment iframe, so it goes back to it's initial mode
                    console.log("setting initial style");
                    document.getElementsByName('checkout')[0].setAttribute('style', initialIframeStyle + "z-index: -1; opacity: 0");
                }, waitDuration);
            }
            _this.callback.emit(response);
        };
    };
    return MakePaymentComponent;
}());
MakePaymentComponent.decorators = [
    { type: Component, args: [{
                selector: 'flutterwave-make-payment',
                template: "\n    <button\n\n      style=\"{{style}}\"\n      [ngClass]=\"className ? className : 'flutterwave-pay-button' \"\n      (click)=\"makePayment()\">\n      {{text || 'Pay'}}\n    </button>\n  ",
                styles: ["\n    .flutterwave-pay-button{\n      background-color: #f5a623;\n      border-radius: 4px;\n      border-color: #f5a623;\n      -webkit-box-shadow: 0 2px 3px 0 #ccc;\n              box-shadow: 0 2px 3px 0 #ccc;\n      color: #fff;\n      display: block;\n      font-size: 12px;\n      font-weight: 700;\n      padding: 14px 22px;\n      text-align: center;\n      text-decoration: none;\n      -webkit-transition: all .3s ease-in-out;\n      transition: all .3s ease-in-out;\n\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MakePaymentComponent.ctorParameters = function () { return []; };
MakePaymentComponent.propDecorators = {
    'public_key': [{ type: Input },],
    'tx_ref': [{ type: Input },],
    'amount': [{ type: Input },],
    'currency': [{ type: Input },],
    'payment_options': [{ type: Input },],
    'redirect_url': [{ type: Input },],
    'meta': [{ type: Input },],
    'customer': [{ type: Input },],
    'callback': [{ type: Output },],
    'closeAfterSuccessfulPayment': [{ type: Input },],
    'durationBeforeClose': [{ type: Input },],
    'close': [{ type: Output },],
    'customizations': [{ type: Input },],
    'text': [{ type: Input },],
    'style': [{ type: Input },],
    'className': [{ type: Input },],
    'data': [{ type: Input },],
};
var Flutterwave = (function () {
    function Flutterwave() {
    }
    /**
     * @param {?} paymentData
     * @return {?}
     */
    Flutterwave.prototype.inlinePay = function (paymentData) {
        FlutterwaveCheckout(paymentData);
    };
    /**
     * @param {?} paymentData
     * @return {?}
     */
    Flutterwave.prototype.asyncInlinePay = function (paymentData) {
        var /** @type {?} */ paymentFrame = document.getElementsByName('checkout')[0];
        var /** @type {?} */ initialIframeStyle = paymentFrame.getAttribute('style');
        return new Promise(function (resolve, reject) {
            paymentData = Object.assign({}, paymentData, { callback: function ($event) {
                    if (paymentData.closeAfterSuccessfulPayment && paymentData.durationBeforeClose) {
                        var /** @type {?} */ waitDuration = paymentData.durationBeforeClose * 1000;
                        setTimeout(function () {
                            document.getElementsByName('checkout')[0].setAttribute('style', initialIframeStyle + "z-index: -1; opacity: 0");
                        }, waitDuration);
                    }
                    resolve($event);
                }, onclose: function () { return resolve('closed'); } });
            FlutterwaveCheckout(paymentData);
        });
    };
    return Flutterwave;
}());
Flutterwave.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Flutterwave.ctorParameters = function () { return []; };
var FlutterwaveModule = (function () {
    function FlutterwaveModule() {
    }
    return FlutterwaveModule;
}());
FlutterwaveModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [MakePaymentComponent],
                providers: [Flutterwave],
                exports: [MakePaymentComponent]
            },] },
];
/**
 * @nocollapse
 */
FlutterwaveModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { FlutterwaveModule, Flutterwave, InlinePaymentOptions, PaymentSuccessResponse, MakePaymentComponent };
//# sourceMappingURL=flutterwave-angular-v3.es5.js.map
