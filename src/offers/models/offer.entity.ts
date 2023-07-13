export class Offer {
  unitPrice: number;
  quantity: number;
  coinId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
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
