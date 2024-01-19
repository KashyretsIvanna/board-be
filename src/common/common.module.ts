import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
})
export class CommonModule {}