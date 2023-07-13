import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
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

  /*   @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(+id);
  } */
}
