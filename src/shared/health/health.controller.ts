import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller({ version: VERSION_NEUTRAL })
@ApiExcludeController()
export class HealthController {
  constructor(
    @Inject(HealthCheckService)
    private readonly health: HealthCheckService,
    @Inject(HttpHealthIndicator)
    private readonly http: HttpHealthIndicator,
    @Inject(DiskHealthIndicator)
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  async check() {
    return this.health.check([
      async () => this.http.pingCheck('domain', 'https://nestjs.com'),
      async () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }),
    ]);
  }
}
