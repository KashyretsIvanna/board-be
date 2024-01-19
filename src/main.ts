import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { FullConfig } from './common/config/full-config';
import { configureSwagger } from './common/swagger/configure-swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  const configService = app.get(ConfigService<FullConfig, true>);
  const globalPrefix = 'api';
  const swaggerPrefix = 'doc';
  app.setGlobalPrefix(globalPrefix);

  const PORT = configService.get('API_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      stopAtFirstError: true,
      transformOptions: {
        exposeDefaultValues: true,
        enableImplicitConversion: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        function richFirstErrorMessage(errors: ValidationError[]): string {
          const topLevelErrors = errors[0].constraints;
          if (topLevelErrors) {
            return Object.values(topLevelErrors)[0];
          }

          return richFirstErrorMessage(errors[0].children);
        }

        return new BadRequestException(richFirstErrorMessage(errors));
      },
    }),
  );
  configureSwagger(app, { swaggerPrefix });

  await app.listen(PORT);

  const url = await app.getUrl();

  Logger.log(`📚 Swagger documentation: ${url}/${swaggerPrefix}`);
  Logger.log(`🚀 Application is running on: ${url}/${globalPrefix}`);
}

bootstrap();
