import { Test, TestingModule } from '@nestjs/testing';
import { OffersUseCase } from '../useCase/offers.useCase';
import { IOffersRepository } from '../ports/offersRepository.interface';
import { IWalletsRepository } from '../../wallets/ports/walletsRepository.interface';
import { Offer } from '../models/offer.entity';
import { CreateOfferDto } from '../dto/create-offer.dto';

describe('OffersUseCase', () => {
  let offersUseCase: OffersUseCase;
  let offersRepository: IOffersRepository;
  let walletsRepository: IWalletsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersUseCase,
        {
          provide: 'IOffersRepository',
          useValue: {
            findTodayUserOffers: jest.fn(),
            createOffer: jest.fn(),
          },
        },
        {
          provide: 'IWalletsRepository',
          useValue: {
            findUserWallets: jest.fn(),
          },
        },
      ],
    }).compile();

    offersUseCase = module.get<OffersUseCase>(OffersUseCase);
    offersRepository = module.get<IOffersRepository>('IOffersRepository');
    walletsRepository = module.get<IWalletsRepository>('IWalletsRepository');
  });

  describe('create', () => {
    const userId = 1;
    const offerDto: CreateOfferDto = {
      unitPrice: 10,
      quantity: 5,
      coinId: 1,
    };

    it('should create an offer when the limit is not exceeded and quantity is sufficient', async () => {
      const offers = []; // Empty array to simulate no existing offers
      const wallets = []; // Empty array to simulate no existing wallets

      offersRepository.findTodayUserOffers = jest
        .fn()
        .mockResolvedValue(offers);

      offersRepository.createOffer = jest.fn().mockResolvedValue(offers);

      walletsRepository.findUserWallets = jest.fn().mockResolvedValue(wallets);

      const createdOffer = await offersUseCase.create(userId, offerDto);

      expect(offersRepository.findTodayUserOffers).toHaveBeenCalledWith(userId);
      expect(walletsRepository.findUserWallets).toHaveBeenCalledWith(userId);

      expect(offersRepository.createOffer).toHaveBeenCalledWith(
        expect.objectContaining({
          unitPrice: offerDto.unitPrice,
          quantity: offerDto.quantity,
          coinId: offerDto.coinId,
          userId,
        }),
      );
      expect(createdOffer).toBeInstanceOf(Offer);
    });

    it('should throw an error when the limit is exceeded', async () => {
      const offers = new Array(6).fill({}); // Array with 6 existing offers
      const wallets = []; // Empty array to simulate no existing wallets

      offersRepository.findTodayUserOffers = jest
        .fn()
        .mockResolvedValue(offers);

      offersRepository.createOffer = jest.fn().mockResolvedValue(offers);

      walletsRepository.findUserWallets = jest.fn().mockResolvedValue(wallets);

      await expect(offersUseCase.create(userId, offerDto)).rejects.toThrow(
        'Limite de ofertas atingido',
      );
    });

    it('should throw an error when the coin quantity is insufficient', async () => {
      const offers = [];
      const wallets = [
        {
          walletCoins: [{ coinId: 1, quantity: 4 }],
        },
      ];

      offersRepository.findTodayUserOffers = jest
        .fn()
        .mockResolvedValue(offers);

      walletsRepository.findUserWallets = jest.fn().mockResolvedValue(wallets);

      await expect(offersUseCase.create(userId, offerDto)).rejects.toThrow(
        'Quantidade insuficiente',
      );
      expect(offersRepository.findTodayUserOffers).toHaveBeenCalledWith(userId);
      expect(walletsRepository.findUserWallets).toHaveBeenCalledWith(userId);
      expect(offersRepository.createOffer).not.toHaveBeenCalled();
    });
  });
});
