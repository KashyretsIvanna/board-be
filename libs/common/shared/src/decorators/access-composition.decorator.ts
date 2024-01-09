import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

export const AccessComposition = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({ status: 401, description: 'Invalid token' }),
    ApiResponse({ status: 403, description: 'Email not verified' })
  );
