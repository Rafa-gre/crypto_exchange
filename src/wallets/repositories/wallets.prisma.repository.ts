import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Wallet } from '@prisma/client';
import { IWalletsRepository } from '../ports/walletsRepository.interface';

@Injectable()
export class WalletsPrismaRepository implements IWalletsRepository {
  constructor(private prisma: PrismaService) {}

  public async findUserWallets(userId: number): Promise<Wallet[]> {
    return await this.prisma.wallet.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        walletCoins: true,
      },
    });
  }
}
