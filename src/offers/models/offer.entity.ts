import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate } from 'class-validator';

export class Offer {
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  id?: number;
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  unitPrice: number;
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  quantity: number;
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  coinId: number;
  @ApiProperty({ type: Number, required: true })
  @IsInt()
  userId: number;
  @ApiProperty({ type: Date, required: true })
  @IsDate()
  createdAt: Date;
  @ApiProperty({ type: Date, required: true })
  @IsDate()
  updatedAt: Date;
  @ApiProperty({ type: Date, required: true })
  @IsDate()
  deletedAt?: Date;
  constructor(
    unitPrice: number,
    quantity: number,
    coinId: number,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.coinId = coinId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
