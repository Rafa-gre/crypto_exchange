import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BaseService {
  protected readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  protected readonly config = new ConfigService();
}
