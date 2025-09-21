import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import TabbyChannel from '@/services/paymentChannels/TabbyChannel';
import connectDB from '@/lib/mongodb';

async function postHandler(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { paymentId, orderId } = body;

    if (!paymentId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Payment ID is required' 
        },
        { status: 400 }
      );
    }

    const tabbyChannel = new TabbyChannel();
    
    // Get payment details from Tabby
    const paymentDetails = await tabbyChannel.getPayment(paymentId);

    // Check payment status
    if (paymentDetails.payment.status === 'AUTHORIZED' || paymentDetails.payment.status === 'CLOSED') {
      // Payment successful
      return NextResponse.json({
        success: true,
        data: {
          paymentId: paymentDetails.payment.id,
          status: paymentDetails.payment.status,
          amount: paymentDetails.payment.amount,
          currency: paymentDetails.payment.currency,
          orderId: paymentDetails.payment.order.reference_id,
        },
        message: 'Payment verified successfully',
      });
    } else {
      // Payment failed or pending
      return NextResponse.json({
        success: false,
        data: {
          paymentId: paymentDetails.payment.id,
          status: paymentDetails.payment.status,
          amount: paymentDetails.payment.amount,
          currency: paymentDetails.payment.currency,
          orderId: paymentDetails.payment.order.reference_id,
        },
        message: `Payment status: ${paymentDetails.payment.status}`,
      });
    }
  } catch (error: any) {
    console.error('Tabby payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to verify payment' 
      },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);
