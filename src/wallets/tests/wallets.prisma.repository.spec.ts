import { Test, TestingModule } from '@nestjs/testing';
import { Wallet } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { WalletsPrismaRepository } from '../repositories/wallets.prisma.repository';

describe('WalletsPrismaRepository', () => {
  let walletsRepository: WalletsPrismaRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsPrismaRepository,
        {
          provide: PrismaService,
          useValue: {
            wallet: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    walletsRepository = module.get<WalletsPrismaRepository>(
      WalletsPrismaRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findUserWallets', () => {
    it('should return user wallets', async () => {
      const userId = 1;
      const wallets = [{ id: 1 }] as Wallet[];
      prismaService.wallet.findMany = jest.fn().mockResolvedValue(wallets);

      const result = await walletsRepository.findUserWallets(userId);

      expect(result).toBe(wallets);
      expect(prismaService.wallet.findMany).toHaveBeenCalledWith({
        where: {
          userId,
        },
        include: {
          user: true,
          walletCoins: true,
        },
      });
    });

    it('should throw an error if an error occurs during the query', async () => {
      const userId = 1;
      prismaService.wallet.findMany = jest.fn().mockRejectedValue(new Error());

      await expect(
        walletsRepository.findUserWallets(userId),
      ).rejects.toThrowError();
      expect(prismaService.wallet.findMany).toHaveBeenCalledWith({
        where: {
          userId,
        },
        include: {
          user: true,
          walletCoins: true,
        },
      });
    });
  });
});
