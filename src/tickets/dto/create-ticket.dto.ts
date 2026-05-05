import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'title is not string' })
  @IsNotEmpty({ message: 'title is empty' })
  title: string;

  @IsString({ message: 'subject is not string' })
  @IsNotEmpty({ message: 'subject is empty' })
  subject: string;

  @IsString({ message: 'description is not string' })
  @IsNotEmpty({ message: 'desctiption is empty' })
  description: string;

  @IsNotEmpty({ message: 'user id is empty' })
  userId: number;

  @IsOptional()
  replyTo: number;
}
