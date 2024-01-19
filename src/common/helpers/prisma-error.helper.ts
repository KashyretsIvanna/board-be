import { InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const PrismaErrorHelper = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    throw new InternalServerErrorException(e.meta?.['cause'] ?? undefined);
  }
  throw e;
};
