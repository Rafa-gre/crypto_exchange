import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Offer } from '../models/offer.entity';
import { IOffersRepository } from '../ports/walletsRepository.interface';

@Injectable()
export class OffersPrismaRepository implements IOffersRepository {
  constructor(private prisma: PrismaService) {}

  public async createOffer(offer: Offer): Promise<void> {
    await this.prisma.offers.create({ data: offer });
  }
  public async findTodayUserOffers(userId: number): Promise<Offer[]> {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    return await this.prisma.offers.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }
}
