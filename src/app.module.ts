import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompressionMiddleware } from './shared/middlewares/compression.middleware';
import { HelmetMiddleware } from './shared/middlewares/helmet.middleware';
import { ResponseTimeMiddleware } from './shared/middlewares/response-time.middleware';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ClassTransformer } from 'class-transformer';
import { Serializer } from 'v8';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { HealthModule } from './shared/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        ttl: configService.get<number>('CACHE_TTL', 30),
        max: configService.get<number>('CACHE_MAX', 1000),
      }),
      inject: [ConfigService],
    }),
    HealthModule.forRoot(),
    OffersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HelmetMiddleware, CompressionMiddleware, ResponseTimeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
