import { Module } from '@nestjs/common';
import { OffersPrismaRepository } from './repositories/offers.prisma.repository';
import { WalletsPrismaRepository } from '../wallets/repositories/wallets.prisma.repository';
import { OffersController } from './controller/offers.controller';
import { OffersUseCase } from './useCase/offers.useCase';
import { PrismaService } from '../database/prisma/prisma.service';
import { BaseModule } from 'src/shared/base/base-module';

@Module({
  controllers: [OffersController],
  providers: [
    OffersUseCase,
    PrismaService,
    { provide: 'IOffersRepository', useClass: OffersPrismaRepository },
    { provide: 'IWalletsRepository', useClass: WalletsPrismaRepository },
  ],
})
export class OffersModule extends BaseModule {
  constructor() {
    super();
  }
}
