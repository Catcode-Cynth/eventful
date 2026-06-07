import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // ✅ BUY TICKET + GENERATE QR
  async buyTicket(buyTicketDto: BuyTicketDto, userId: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id: buyTicketDto.eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      if (event.status !== 'UPCOMING') {
        throw new BadRequestException('Event is no longer available');
      }

      // ✅ Simulate payment first
      const payment = await this.simulatePayment(event.id, userId);

      // ✅ Prevent duplicate ticket for same user
      const existingTicket = await this.prisma.ticket.findFirst({
        where: {
          userId,
          eventId: event.id,
        },
      });

      if (existingTicket) {
        throw new BadRequestException(
          'You already have a ticket for this event',
        );
      }

      // ✅ Create ticket
      const ticket = await this.prisma.ticket.create({
        data: {
          eventId: event.id,
          userId,
          qrCode: '',
        },
        include: { event: true },
      });

      // ✅ QR contains verification URL
      const verificationUrl = `http://192.168.8.103:3000/tickets/verify?qrCode=${ticket.id}`;
      const qrCodeBase64 = await QRCode.toDataURL(verificationUrl);

      // ✅ Save QR code
      const updatedTicket = await this.prisma.ticket.update({
        where: { id: ticket.id },
        data: { qrCode: qrCodeBase64 },
        include: { event: true },
      });

      return {
        success: true,
        message: '🎟️ Ticket purchased successfully!',
        payment,
        ticket: {
          id: updatedTicket.id,
          eventTitle: updatedTicket.event.title,
          qrCode: updatedTicket.qrCode,
          purchaseDate: new Date().toISOString(),
        },
        instruction:
          'Scan this QR code with your phone to verify your ticket.',
      };
    } catch (error) {
      console.error('Ticket purchase error:', error);

      if (error instanceof BadRequestException) throw error;
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(
        'Failed to purchase ticket. Please try again.',
      );
    }
  }

  // ✅ VERIFY QR USING TICKET ID
  async verifyQrCode(qrCode: string) {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id: qrCode },
        include: { event: true },
      });

      if (!ticket) {
        throw new BadRequestException('❌ Invalid Ticket');
      }

      if (ticket.event.status !== 'UPCOMING') {
        return {
          valid: false,
          message: '⚠️ Event is no longer active',
        };
      }

      return {
        valid: true,
        message: '✅ Ticket is valid',
        ticketId: ticket.id,
        eventTitle: ticket.event.title,
      };
    } catch (error) {
      console.error('QR verification error:', error);
      throw new BadRequestException('QR verification failed');
    }
  }

  // ✅ PAYMENT METHOD
  async simulatePayment(eventId: string, userId: string) {
    return {
      status: 'success',
      message: '✅ Payment successful (simulated)',
      eventId,
      userId,
      paidAt: new Date().toISOString(),
    };
  }
}