import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiUnauthorizedBaseResponse = () => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
              },
              message: {
                type: 'string',
                default: 'Unauthorized',
              },
              error: {
                type: 'string',
              },
            },
          },
        ],
      },
    }),
  );
};
