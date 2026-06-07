import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buyTicket(@Body() buyTicketDto: BuyTicketDto, @Req() req: any) {
    return this.ticketsService.buyTicket(buyTicketDto, req.user.userId);
  }

  @Get('verify')
  async verifyQr(@Query('qrCode') qrCode: string) {
    return this.ticketsService.verifyQrCode(qrCode);
  }

  @Post('pay')
  @UseGuards(JwtAuthGuard)
  async pay(@Body('eventId') eventId: string, @Req() req: any) {
    return this.ticketsService.simulatePayment(
      eventId,
      req.user.userId,
    );
  }
}