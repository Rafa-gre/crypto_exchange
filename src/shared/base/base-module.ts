import {
  DynamicModule,
  Logger,
  Module,
  OnModuleInit,
  Optional,
} from '@nestjs/common';

@Module({})
export abstract class BaseModule implements OnModuleInit {
  protected readonly logger: Logger;

  constructor(@Optional() logger?: Logger) {
    this.logger =
      logger ??
      new Logger(this.constructor.name, {
        timestamp: true,
      });
  }

  onModuleInit(): Promise<void> | void {
    this.logger.log('Dependencies initialized');
  }
}
