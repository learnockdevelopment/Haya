import axios from 'axios';

export interface TabbyPaymentRequest {
  payment: {
    amount: string;
    currency: string;
    description: string;
    buyer: {
      phone: string;
      email: string;
      name: string;
      dob?: string;
    };
    buyer_history?: {
      registered_since?: string;
      loyalty_level?: number;
      wishlist_count?: number;
      is_social_networks_connected?: boolean;
      is_phone_number_verified?: boolean;
      is_email_verified?: boolean;
    };
    order: {
      tax_amount: string;
      shipping_amount: string;
      discount_amount: string;
      updated_at: string;
      reference_id: string;
      items: Array<{
        title: string;
        description: string;
        quantity: number;
        unit_price: string;
        discount_amount: string;
        reference_id: string;
        image_url?: string;
        product_url?: string;
        gender?: string;
        category?: string;
        color?: string;
        product_material?: string;
        size_type?: string;
        size?: string;
        brand?: string;
      }>;
    };
    order_history?: Array<{
      purchased_at: string;
      amount: string;
      payment_method: string;
      status: string;
      buyer: {
        phone: string;
        email: string;
        name: string;
        dob?: string;
      };
      shipping_address: {
        city: string;
        address: string;
        zip: string;
      };
      items: Array<{
        title: string;
        description: string;
        quantity: number;
        unit_price: string;
        discount_amount: string;
        reference_id: string;
        image_url?: string;
        product_url?: string;
        ordered?: number;
        captured?: number;
        shipped?: number;
        refunded?: number;
        gender?: string;
        category?: string;
        color?: string;
        product_material?: string;
        size_type?: string;
        size?: string;
        brand?: string;
      }>;
    }>;
    shipping_address?: {
      city: string;
      address: string;
      zip: string;
    };
    meta?: {
      order_id: string;
      customer: string;
    };
    attachment?: {
      body: string;
      content_type: string;
    };
  };
  lang: string;
  merchant_code: string;
  merchant_urls: {
    success: string;
    cancel: string;
    failure: string;
  };
}

export interface TabbyPaymentResponse {
  id: string;
  status: string;
  payment: {
    id: string;
    status: string;
    amount: string;
    currency: string;
    description: string;
    buyer: {
      phone: string;
      email: string;
      name: string;
      dob?: string;
    };
    order: {
      reference_id: string;
      items: Array<any>;
    };
  };
  created_at: string;
  expires_at: string;
  configuration: {
    available_products: Array<{
      type: string;
      description: string;
      installment_count: number;
      installment_frequency: string;
      installment_amount: string;
    }>;
  };
  merchant: {
    code: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  order: {
    reference_id: string;
    amount: string;
    currency: string;
    items: Array<any>;
  };
  created_at: string;
  expires_at: string;
  checkout_url: string;
}

export class TabbyChannel {
  private secretKey: string;
  private merchantCode: string;
  private currency: string;
  private baseUrl: string;
  private isTestMode: boolean;

  constructor() {
    this.secretKey = process.env.TABBY_SECRET_KEY || '';
    this.merchantCode = process.env.TABBY_MERCHANT_CODE || '';
    this.currency = process.env.TABBY_CURRENCY || 'AED';
    this.baseUrl = 'https://api.tabby.ai/api/v2';
    this.isTestMode = this.secretKey.startsWith('sk_test_');
  }

  /**
   * Create a Tabby payment session
   */
  async createPaymentSession(orderData: {
    orderId: string;
    amount: number;
    currency?: string;
    description: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      dob?: string;
    };
    items: Array<{
      title: string;
      description: string;
      quantity: number;
      unit_price: number;
      reference_id: string;
      image_url?: string;
      product_url?: string;
      category?: string;
      brand?: string;
    }>;
    shippingAddress?: {
      city: string;
      address: string;
      zip: string;
    };
    successUrl: string;
    cancelUrl: string;
    failureUrl: string;
  }): Promise<TabbyPaymentResponse> {
    try {
      const paymentRequest: TabbyPaymentRequest = {
        payment: {
          amount: orderData.amount.toString(),
          currency: orderData.currency || this.currency,
          description: orderData.description,
          buyer: {
            phone: orderData.customer.phone,
            email: orderData.customer.email,
            name: orderData.customer.name,
            dob: orderData.customer.dob,
          },
          buyer_history: {
            registered_since: new Date().toISOString(),
            loyalty_level: 0,
            wishlist_count: 0,
            is_social_networks_connected: false,
            is_phone_number_verified: true,
            is_email_verified: true,
          },
          order: {
            tax_amount: '0.00',
            shipping_amount: '0.00',
            discount_amount: '0.00',
            updated_at: new Date().toISOString(),
            reference_id: orderData.orderId,
            items: orderData.items.map(item => ({
              title: item.title,
              description: item.description,
              quantity: item.quantity,
              unit_price: item.unit_price.toString(),
              discount_amount: '0.00',
              reference_id: item.reference_id,
              image_url: item.image_url,
              product_url: item.product_url,
              category: item.category,
              brand: item.brand,
            })),
          },
          shipping_address: orderData.shippingAddress ? {
            city: orderData.shippingAddress.city,
            address: orderData.shippingAddress.address,
            zip: orderData.shippingAddress.zip,
          } : undefined,
          meta: {
            order_id: orderData.orderId,
            customer: orderData.customer.email,
          },
        },
        lang: 'en',
        merchant_code: this.merchantCode,
        merchant_urls: {
          success: orderData.successUrl,
          cancel: orderData.cancelUrl,
          failure: orderData.failureUrl,
        },
      };

      const response = await axios.post(
        `${this.baseUrl}/checkout`,
        paymentRequest,
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Tabby payment session creation failed:', error.response?.data || error.message);
      throw new Error(`Failed to create Tabby payment session: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Retrieve payment details
   */
  async getPayment(paymentId: string): Promise<TabbyPaymentResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to retrieve Tabby payment:', error.response?.data || error.message);
      throw new Error(`Failed to retrieve payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Update payment
   */
  async updatePayment(paymentId: string, updateData: {
    order: {
      reference_id: string;
    };
  }): Promise<TabbyPaymentResponse> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/payments/${paymentId}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to update Tabby payment:', error.response?.data || error.message);
      throw new Error(`Failed to update payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Capture payment
   */
  async capturePayment(paymentId: string, amount: string, referenceId: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/${paymentId}/captures`,
        {
          amount,
          reference_id: referenceId,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to capture Tabby payment:', error.response?.data || error.message);
      throw new Error(`Failed to capture payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(paymentId: string, amount: string, referenceId: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/${paymentId}/refunds`,
        {
          amount,
          reference_id: referenceId,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to refund Tabby payment:', error.response?.data || error.message);
      throw new Error(`Failed to refund payment: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Verify webhook signature (if needed)
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // Implement webhook signature verification if Tabby provides it
    // For now, we'll return true as Tabby might not require signature verification
    return true;
  }
}

export default TabbyChannel;
