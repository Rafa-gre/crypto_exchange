import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Offer } from '../models/offer.entity';
import { IOffersRepository } from '../ports/offersRepository.interface';

@Injectable()
export class OffersPrismaRepository implements IOffersRepository {
  constructor(private prisma: PrismaService) {}

  public async createOffer(offer: Offer): Promise<void> {
    await this.prisma.offers.create({ data: offer });
  }
}
