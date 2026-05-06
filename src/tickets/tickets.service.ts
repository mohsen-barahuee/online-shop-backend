import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const { userId, ...TicketData } = createTicketDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let replyTo: Ticket | null = null;

    if (replyTo) {
      replyTo = await this.ticketRepository.findOne({
        where: { id: TicketData.replyToId },
      });

      if (!replyTo) {
        throw new NotFoundException('Parent ticket not found');
      }
    }

    const ticket = this.ticketRepository.create({
      ...TicketData,
      user,
      replyTo,
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
