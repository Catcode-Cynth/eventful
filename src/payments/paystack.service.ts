import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackService {
  constructor(private configService: ConfigService) {}

  // We'll implement full Paystack later
  async initializePayment(data: any) {
    return { reference: 'test_ref_' + Date.now(), authorization_url: '#' };
  }
}