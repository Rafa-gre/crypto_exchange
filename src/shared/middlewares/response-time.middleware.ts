import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import responseTime from 'response-time';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  protected readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    responseTime({
      digits: 2,
      header: 'X-Response-Time',
    })(req, res, next);
  }

  onModuleInit() {
    this.logger.log('Dependencies initialized');
  }
}
