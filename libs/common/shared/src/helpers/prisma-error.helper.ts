import { InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const PrismaErrorHelper = (e: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    throw new InternalServerErrorException(e.meta?.['cause'] ?? undefined);
  }
  throw e;
};
