import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import TabbyChannel from '@/services/paymentChannels/TabbyChannel';
import connectDB from '@/lib/mongodb';

async function postHandler(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      orderId,
      amount,
      currency,
      description,
      customer,
      items,
      shippingAddress,
      successUrl,
      cancelUrl,
      failureUrl,
    } = body;

    // Validate required fields
    if (!orderId || !amount || !customer || !items || !successUrl || !cancelUrl || !failureUrl) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    const tabbyChannel = new TabbyChannel();
    
    const paymentSession = await tabbyChannel.createPaymentSession({
      orderId,
      amount,
      currency,
      description,
      customer,
      items,
      shippingAddress,
      successUrl,
      cancelUrl,
      failureUrl,
    });

    return NextResponse.json({
      success: true,
      data: paymentSession,
    });
  } catch (error: any) {
    console.error('Tabby payment creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create payment session' 
      },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);
