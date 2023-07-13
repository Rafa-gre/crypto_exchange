import { Offer } from '../models/offer.entity';

export interface IOffersRepository {
  createOffer(offer: Offer): Promise<void>;
  findTodayUserOffers(userId: number): Promise<Offer[]>;
}
