import { Wallet } from '@prisma/client';

export interface IWalletsRepository {
  findUserWallets(userId: number): Promise<Wallet[]>;
}
