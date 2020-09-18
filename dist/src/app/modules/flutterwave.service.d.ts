import { InlinePaymentOptions } from './models';
export declare class Flutterwave {
    constructor();
    inlinePay(paymentData: InlinePaymentOptions): void;
    asyncInlinePay(paymentData: InlinePaymentOptions): Promise<any>;
}
