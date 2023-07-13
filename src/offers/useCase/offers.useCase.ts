import { Inject, Injectable } from '@nestjs/common';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Offer } from '../models/offer.entity';
import { Wallet } from '@prisma/client';
import { IOffersRepository } from '../ports/walletsRepository.interface';
import { IWalletsRepository } from '../../wallets/ports/walletsRepository.interface';

@Injectable()
export class OffersUseCase {
  constructor(
    @Inject('IOffersRepository')
    private readonly offersRepository: IOffersRepository,
    @Inject('IWalletsRepository')
    private readonly walletsRepository: IWalletsRepository,
  ) {}

  public async create(
    userId: number,
    offerDto: CreateOfferDto,
  ): Promise<Offer> {
    const { unitPrice, quantity, coinId } = offerDto;
    const offers = await this.offersRepository.findTodayUserOffers(userId);
    if (offers.length > 5) {
      throw new Error('Limite de ofertas atingido');
    }
    const wallets = await this.walletsRepository.findUserWallets(userId);
    const coinQuantity = this.calculateCoinsQuantity(coinId, wallets);
    if (coinQuantity < quantity) {
      throw new Error('Quantidade insuficiente');
    }
    const offer = new Offer(
      unitPrice,
      quantity,
      coinId,
      userId,
      new Date(),
      new Date(),
    );
    await this.offersRepository.createOffer(offer);
    return offer;
  }
  private calculateCoinsQuantity(coinId: number, wallets: Wallet[]) {
    let quantidadeTotal = 0;

    for (const wallet of wallets) {
      for (const walletCoin of (wallet as any).walletCoins) {
        if (walletCoin.coinId === coinId) {
          return (quantidadeTotal += walletCoin.quantity);
        }
      }
    }
  }
}
