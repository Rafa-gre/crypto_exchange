import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { BaseModule } from '../base/base-module';

@Module({})
export class HealthModule extends BaseModule {
  constructor() {
    super();
  }

  static forRoot(): DynamicModule {
    return {
      module: HealthModule,
      imports: [HttpModule, TerminusModule],
      controllers: [HealthController],
    };
  }

  async onModuleInit(): Promise<void> {
    super.onModuleInit();
    this.logger.log(`Health check available at: /health`);
  }
}
