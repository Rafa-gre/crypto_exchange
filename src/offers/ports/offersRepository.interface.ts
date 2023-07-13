import { Offer } from '../models/offer.entity';

export interface IOffersRepository {
  createOffer(offer: Offer): Promise<void>;
  findTodayUserOffers(userId: number): Promise<Offer[]>;
  findOffers(pageSize: number, pageNumber: number): Promise<Offer[]>;
  getOfferById(offerId: number, userId: number): Promise<Offer>;
  updateOffer(offer: Offer, userId: number): Promise<void>;
}
