import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [OffersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
