import { withApiKey } from '@/lib/apiKeyMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import TabbyChannel from '@/services/paymentChannels/TabbyChannel';
import connectDB from '@/lib/mongodb';

async function postHandler(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const signature = request.headers.get('x-tabby-signature') || '';
    
    // Verify webhook signature if provided
    const tabbyChannel = new TabbyChannel();
    const isValidSignature = tabbyChannel.verifyWebhookSignature(JSON.stringify(body), signature);
    
    if (!isValidSignature) {
      console.warn('Invalid webhook signature');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      );
    }

    const { payment_id, status, order_id } = body;

    console.log('Tabby webhook received:', {
      payment_id,
      status,
      order_id,
      timestamp: new Date().toISOString(),
    });

    // Process the webhook based on payment status
    switch (status) {
      case 'AUTHORIZED':
        // Payment authorized - you can now capture it
        console.log(`Payment ${payment_id} authorized for order ${order_id}`);
        break;
      case 'CLOSED':
        // Payment completed successfully
        console.log(`Payment ${payment_id} completed for order ${order_id}`);
        break;
      case 'EXPIRED':
        // Payment expired
        console.log(`Payment ${payment_id} expired for order ${order_id}`);
        break;
      case 'REJECTED':
        // Payment rejected
        console.log(`Payment ${payment_id} rejected for order ${order_id}`);
        break;
      default:
        console.log(`Payment ${payment_id} status changed to ${status} for order ${order_id}`);
    }

    // Here you would typically:
    // 1. Update your order status in the database
    // 2. Send confirmation emails
    // 3. Update inventory
    // 4. Trigger other business logic

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error: any) {
    console.error('Tabby webhook processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Webhook processing failed' 
      },
      { status: 500 }
    );
  }
}

export const POST = withApiKey(postHandler);
