import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const { userId, replyTo, ...ticketData } = createTicketDto;
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    const replayToTicket = await this.ticketRepository.findOneByOrFail({
      id: replyTo,
    });
    const ticket = this.ticketRepository.create({
      user,
      replayTo: replayToTicket,
      ...ticketData,
    });

    return await this.ticketRepository.save(ticket);
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
