import { NextResponse } from 'next/server';
import { SplitPayoutService, SplitRatesDTO } from '@/services/splitPayoutService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount,
      currency = 'EUR',
      vendorAccountId = 'acc_vendor_default',
      hotelAccountId = 'acc_hotel_referral',
      bookingReference,
      customRates
    } = body as {
      amount: number;
      currency?: string;
      vendorAccountId?: string;
      hotelAccountId?: string;
      bookingReference?: string;
      customRates?: Partial<SplitRatesDTO>;
    };

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Geçersiz ödeme tutarı.' }, { status: 400 });
    }

    const result = await SplitPayoutService.createPaymentIntentWithSplit({
      amount,
      currency,
      vendorAccountId,
      hotelAccountId,
      bookingReference,
      customRates
    });

    return NextResponse.json({
      success: true,
      payment_intent_id: result.payment_intent_id,
      client_secret: result.client_secret,
      transfer_group: result.transfer_group,
      split_breakdown: result.split_breakdown,
      status: result.status
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
