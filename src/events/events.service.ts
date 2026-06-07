import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE EVENT
  async create(createEventDto: CreateEventDto, creatorId: string) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        creatorId,
        date: new Date(createEventDto.date),
      },
      include: {
        creator: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });
  }

  // ✅ GET ALL EVENTS
  async findAll() {
    return this.prisma.event.findMany({
      where: { status: 'UPCOMING' },
      include: {
        creator: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { date: 'asc' }
    });
  }

  // ✅ FIND USER EVENTS
  async findMyEvents(creatorId: string) {
    return this.prisma.event.findMany({
      where: { creatorId },
      include: { tickets: true },
      orderBy: { date: 'desc' }
    });
  }

  // ✅ GET ONE EVENT
  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        creator: true,
        tickets: true,
      }
    });

    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // ✅ ANALYTICS
  async getAnalytics(eventId: string) {
    const totalTickets = await this.prisma.ticket.count({
      where: { eventId },
    });

    return {
      eventId,
      totalTicketsSold: totalTickets,
      totalAttendees: totalTickets,
    };
  }

  // ✅ NOTIFICATIONS (REMINDERS)
  async checkEventReminders() {
    const now = new Date();

    const events = await this.prisma.event.findMany();

    return events.map(event => {
      const eventDate = new Date(event.date);
      const diff = eventDate.getTime() - now.getTime();
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

      return {
        eventTitle: event.title,
        daysLeft,
        message:
          daysLeft <= 1
            ? '⏰ Event is coming soon!'
            : `${daysLeft} days remaining`,

// ✅ PAYMENT (SIMULATED)
async simulatePayment(eventId: string, userId: string) {
  return {
    status: 'success',
    message: '✅ Payment successful (simulated)',
    eventId,
    userId,
    paidAt: new Date().toISOString(),
  };
}


      };
    });
  }
}