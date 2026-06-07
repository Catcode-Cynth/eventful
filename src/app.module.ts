import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // ✅ CONFIG MODULE (VERY IMPORTANT FOR JWT)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ RATE LIMITING (WORKING VERSION)
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),

    // ✅ YOUR MODULES
    PrismaModule,
    AuthModule,
    EventsModule,
    TicketsModule,
    UsersModule,
  ],
})
export class AppModule {}