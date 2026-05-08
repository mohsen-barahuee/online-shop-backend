import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number; // Foreign key for the user who created the ticket

  @IsNumber()
  @IsOptional() // If replyTo is optional for top-level tickets
  replyTo?: number; // Foreign key for the parent ticket
}
