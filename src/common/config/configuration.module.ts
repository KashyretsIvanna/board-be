import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FullConfig } from './full-config';
import { validateConfig } from './validate-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig(FullConfig),
      envFilePath: '.env',
    }),
  ],
})
export class ConfigurationModule {}
