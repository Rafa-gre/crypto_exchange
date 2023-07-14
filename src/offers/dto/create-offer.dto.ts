import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  unitPrice: number;

  @ApiProperty({ type: Number, required: true })
  @IsInt()
  quantity: number;

  @ApiProperty({ type: Number, required: true })
  @IsInt()
  coinId: number;
}
