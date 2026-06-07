import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';



@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  // ✅ CREATE EVENT
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEventDto: any, @Req() req: any) {
    if (!req.user) {
      throw new BadRequestException('User not authenticated');
    }

    return this.eventsService.create(
      createEventDto,
      req.user.userId
    );
  }

  // ✅ GET ALL EVENTS
  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  // ✅ SHARE EVENT
  @Get(':id/share')
  shareEvent(@Param('id') id: string) {
    return {
      shareUrl: `http://192.168.8.103:3000/events/${id}`,
      message: 'Share this event link on social media!',
    };
  }

  // ✅ ANALYTICS
  @Get(':id/analytics')
  async getAnalytics(@Param('id') id: string) {
    return this.eventsService.getAnalytics(id);
  }

  // ✅ NOTIFICATIONS
  @Get('reminders')
  getReminders() {
    return this.eventsService.checkEventReminders();
  }
}