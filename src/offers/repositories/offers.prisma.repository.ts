import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Offer } from '../models/offer.entity';
import { IOffersRepository } from '../ports/offersRepository.interface';

@Injectable()
export class OffersPrismaRepository implements IOffersRepository {
  constructor(private prisma: PrismaService) {}

  public async createOffer(offer: Offer): Promise<void> {
    try {
      await this.prisma.offers.create({ data: offer });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async findTodayUserOffers(userId: number): Promise<Offer[]> {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try {
      return await this.prisma.offers.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
          deletedAt: null,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  public async findOffers(
    pageSize: number,
    pageNumber: number,
  ): Promise<Offer[]> {
    const today = new Date();

    try {
      return await this.prisma.offers.findMany({
        where: {
          createdAt: {
            gte: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
            ),
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: pageSize,
        skip: pageSize * (pageNumber - 1),
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public getOfferById(offerId: number, userId: number): Promise<Offer> {
    try {
      return this.prisma.offers.findUnique({
        where: { id: offerId, userId, deletedAt: null },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async updateOffer(offer: Offer, userId: number): Promise<void> {
    try {
      await this.prisma.offers.update({
        where: { id: offer.id, userId, deletedAt: null },
        data: offer,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
