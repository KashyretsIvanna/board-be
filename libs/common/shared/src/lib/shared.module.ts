import { ConfigurationModule } from '@app/common/configuration';
import { PrismaModule } from '@app/common/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigurationModule, PrismaModule],
  exports: [ConfigurationModule, PrismaModule],
})
export class SharedModule {}
