import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Offer } from '../models/offer.entity';
import { OffersPrismaRepository } from '../repositories/offers.prisma.repository';

describe('OffersPrismaRepository', () => {
  let offersRepository: OffersPrismaRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersPrismaRepository,
        {
          provide: PrismaService,
          useValue: {
            offers: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    offersRepository = module.get<OffersPrismaRepository>(
      OffersPrismaRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createOffer', () => {
    it('should create an offer', async () => {
      const offer = {
        unitPrice: 1000,
        quantity: 10,
        coinId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaService.offers.create = jest.fn().mockResolvedValue(offer);

      await offersRepository.createOffer(offer);

      expect(prismaService.offers.create).toHaveBeenCalledWith({ data: offer });
    });

    it('should throw BadRequestException if an error occurs during creation', async () => {
      const offer = {
        /* ... */
      } as Offer;
      prismaService.offers.create = jest.fn().mockRejectedValue(new Error());

      await expect(offersRepository.createOffer(offer)).rejects.toThrowError(
        BadRequestException,
      );
      expect(prismaService.offers.create).toHaveBeenCalledWith({ data: offer });
    });
  });

  describe('findTodayUserOffers', () => {
    it('should find offers of a user for the current day', async () => {
      const userId = 1;
      const offers: Offer[] = [
        /* ... */
      ];
      prismaService.offers.findMany = jest.fn().mockResolvedValue(offers);

      const result = await offersRepository.findTodayUserOffers(userId);

      expect(result).toBe(offers);
      expect(prismaService.offers.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          createdAt: {
            gte: expect.any(Date),
            lt: expect.any(Date),
          },
          deletedAt: null,
        },
      });
    });

    it('should throw BadRequestException if an error occurs during the query', async () => {
      const userId = 1;
      prismaService.offers.findMany = jest.fn().mockRejectedValue(new Error());

      await expect(
        offersRepository.findTodayUserOffers(userId),
      ).rejects.toThrowError(BadRequestException);
      expect(prismaService.offers.findMany).toHaveBeenCalledWith(
        expect.any(Object),
      );
    });
  });

  describe('findOffers', () => {
    it('should find offers with pagination', async () => {
      const pageSize = 10;
      const pageNumber = 1;
      const offers: Offer[] = [
        /* ... */
      ];
      prismaService.offers.findMany = jest.fn().mockResolvedValue(offers);

      const result = await offersRepository.findOffers(pageSize, pageNumber);

      expect(result).toBe(offers);
      expect(prismaService.offers.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: expect.any(Date),
          },
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: pageSize,
        skip: pageSize * (pageNumber - 1),
      });
    });

    it('should throw BadRequestException if an error occurs during the query', async () => {
      const pageSize = 10;
      const pageNumber = 1;
      prismaService.offers.findMany = jest.fn().mockRejectedValue(new Error());

      await expect(
        offersRepository.findOffers(pageSize, pageNumber),
      ).rejects.toThrowError(BadRequestException);
      expect(prismaService.offers.findMany).toHaveBeenCalledWith(
        expect.any(Object),
      );
    });
  });

  describe('getOfferById', () => {
    it('should get an offer by ID and user ID', async () => {
      const offerId = 1;
      const userId = 1;
      const offer = {
        /* ... */
      } as Offer;
      prismaService.offers.findUnique = jest.fn().mockResolvedValue(offer);

      const result = await offersRepository.getOfferById(offerId, userId);

      expect(result).toBe(offer);
      expect(prismaService.offers.findUnique).toHaveBeenCalledWith({
        where: { id: offerId, userId, deletedAt: null },
      });
    });

    it('should throw BadRequestException if an error occurs during the query', async () => {
      const offerId = 1;
      const userId = 1;
      prismaService.offers.findUnique = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      await expect(
        offersRepository.getOfferById(offerId, userId),
      ).rejects.toThrowError(BadRequestException);
      expect(prismaService.offers.findUnique).toHaveBeenCalledWith({
        where: { id: offerId, userId, deletedAt: null },
      });
    });
  });

  describe('updateOffer', () => {
    it('should update an offer', async () => {
      const offer = {
        /* ... */
      } as Offer;
      prismaService.offers.update = jest.fn().mockResolvedValue(offer);

      await offersRepository.updateOffer(offer, 1);

      expect(prismaService.offers.update).toHaveBeenCalledWith({
        where: { id: offer.id, userId: expect.any(Number), deletedAt: null },
        data: offer,
      });
    });

    it('should throw BadRequestException if an error occurs during the update', async () => {
      const offer = {
        /* ... */
      } as Offer;
      prismaService.offers.update = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      await expect(offersRepository.updateOffer(offer, 1)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaService.offers.update).toHaveBeenCalledWith(
        expect.any(Object),
      );
    });
  });
});
