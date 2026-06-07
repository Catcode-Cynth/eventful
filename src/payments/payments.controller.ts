import { Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Post('webhook')
  async handlePaystackWebhook(@Req() req: any, @Res() res: Response) {
    // TODO: Verify Paystack signature in production
    console.log('Webhook received:', req.body);
    res.status(200).send('OK');
  }
}