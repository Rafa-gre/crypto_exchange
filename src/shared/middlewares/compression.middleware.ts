import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import compression from 'compression';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  protected readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['x-no-compression']) {
      return next();
    }

    compression()(req, res, next);
  }

  onModuleInit() {
    this.logger.log('Dependencies initialized');
  }
}
