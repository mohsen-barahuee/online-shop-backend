import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty({ message: 'amount is empty' })
  amount: number;
}
