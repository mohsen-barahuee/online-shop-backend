import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
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

    if (createTicketDto.replyTo) {
      replyTo = await this.ticketRepository.findOne({
        where: { id: createTicketDto.replyTo },
      });

      if (replyTo) {
        throw new NotFoundException('This ticket already replied!!!');
      }
    }

    const ticket = this.ticketRepository.create({
      ...TicketData,
      user,
      replyTo,
    });

    return await this.ticketRepository.save(ticket);
  }

  async findAll() {
    const tickets = await this.ticketRepository
      .createQueryBuilder('tickets')
      .where('tickets.replyToId IS NULL') //filtering for null tickets
      .getMany();

    return tickets;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }
}
