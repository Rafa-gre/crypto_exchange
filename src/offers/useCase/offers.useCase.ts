import { Inject, Injectable } from '@nestjs/common';
import { IOffersRepository } from '../ports/offersRepository.interface';

@Injectable()
export class OffersUseCase {
  constructor(
    @Inject('IOffersRepository')
    private readonly offersRepository: IOffersRepository,
  ) {}
}
