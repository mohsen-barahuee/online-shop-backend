import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User]), // <— IMPORTANT
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
