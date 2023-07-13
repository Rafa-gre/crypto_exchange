import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OffersUseCase } from '../useCase/offers.useCase';
import { CreateOfferDto } from '../dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersUseCase: OffersUseCase) {}

  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Headers('user-id') userId: string,
  ) {
    return this.offersUseCase.create(+userId, createOfferDto);
  }

  @Get()
  findAll(
    @Query('items', new ParseIntPipe()) items?: number,
    @Query('page', new ParseIntPipe()) page?: number,
  ) {
    return this.offersUseCase.listOffers(items, page);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user-id') userId: string) {
    return this.offersUseCase.removeOffer(+id, +userId);
  }
}
