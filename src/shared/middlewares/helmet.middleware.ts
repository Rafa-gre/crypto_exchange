import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  protected readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    helmet()(req, res, next);
  }

  onModuleInit() {
    this.logger.log('Dependencies initialized');
  }
}
