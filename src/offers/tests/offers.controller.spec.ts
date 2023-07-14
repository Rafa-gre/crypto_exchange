import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from '../controller/offers.controller';
import { OffersUseCase } from '../useCase/offers.useCase';
import { CreateOfferDto } from '../dto/create-offer.dto';

describe('OffersController', () => {
  let offersController: OffersController;
  let offersUseCase: OffersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
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

    offersController = module.get<OffersController>(OffersController);
    offersUseCase = module.get<OffersUseCase>(OffersUseCase);
  });

  describe('create', () => {
    it('should create an offer', async () => {
      const createOfferDto: CreateOfferDto = {
        unitPrice: 1000,
        quantity: 10,
        coinId: 2,
      };
      const userId = '1';
      const createdOffer = {
        /* ... */
      };
      offersUseCase.create = jest.fn().mockResolvedValue(createdOffer);

      const result = await offersController.create(createOfferDto, userId);

      expect(result).toBe(createdOffer);
      expect(offersUseCase.create).toHaveBeenCalledWith(
        +userId,
        createOfferDto,
      );
    });
  });

  describe('findAll', () => {
    it('should find all offers', async () => {
      const items = 10;
      const page = 1;
      const offers = [
        /* ... */
      ];
      offersUseCase.listOffers = jest.fn().mockResolvedValue(offers);

      const result = await offersController.findAll(items, page);

      expect(result).toBe(offers);
      expect(offersUseCase.listOffers).toHaveBeenCalledWith(items, page);
    });

    it('should find all offers with default parameters', async () => {
      const defaultItems = undefined;
      const defaultPage = undefined;
      const offers = [
        /* ... */
      ];
      offersUseCase.listOffers = jest.fn().mockResolvedValue(offers);

      const result = await offersController.findAll();

      expect(result).toBe(offers);
      expect(offersUseCase.listOffers).toHaveBeenCalledWith(
        defaultItems,
        defaultPage,
      );
    });
  });

  describe('remove', () => {
    it('should remove an offer', async () => {
      const offerId = '1';
      const userId = '1';
      jest.spyOn(offersUseCase, 'removeOffer').mockResolvedValue();

      const result = await offersController.remove(offerId, userId);

      expect(result).toBeUndefined();
      expect(offersUseCase.removeOffer).toHaveBeenCalledWith(+offerId, +userId);
    });
  });
});
