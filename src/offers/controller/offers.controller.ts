import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrors } from '../../shared/decorators/apiError.decorator';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Offer } from '../models/offer.entity';
import { OffersUseCase } from '../useCase/offers.useCase';

@Controller('offers')
@ApiTags('Offers')
export class OffersController {
  constructor(private readonly offersUseCase: OffersUseCase) {}
  @ApiOperation({
    summary: 'Create a new offer',
  })
  @ApiCreatedResponse({
    description: 'Offer created successfully',
    type: CreateOfferDto,
    status: 201,
  })
  @ApiErrors([400, 422, 500])
  @ApiBody({ type: CreateOfferDto })
  @ApiHeader({
    name: 'user-id',
    required: true,
    description: 'Put the user id of the user who created the offer',
  })
  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Headers('user-id') userId: string,
  ) {
    return this.offersUseCase.create(+userId, createOfferDto);
  }
  @ApiOperation({
    summary: 'List Offers',
  })
  @ApiResponse({
    description: 'Offers find with success',
    type: [Offer],
    status: 200,
  })
  @ApiErrors([400, 500])
  @ApiQuery({
    name: 'items',
    required: true,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Number of the page showing',
  })
  @Get()
  findAll(
    @Query('items', new ParseIntPipe()) items?: number,
    @Query('page', new ParseIntPipe()) page?: number,
  ) {
    return this.offersUseCase.listOffers(items, page);
  }

  @ApiOperation({
    summary: 'Soft delete an offer',
  })
  @ApiResponse({
    description: 'Offer deleted with success.',
    status: 204,
  })
  @ApiErrors([400, 404, 500])
  @ApiHeader({
    name: 'user-id',
    required: true,
    description: 'Put the user id of the user who created the offer',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user-id') userId: string) {
    return this.offersUseCase.removeOffer(+id, +userId);
  }
}
