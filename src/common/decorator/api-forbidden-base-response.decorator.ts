import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';

export const ApiForbiddenBaseResponse = () => {
  return applyDecorators(
    ApiForbiddenResponse({
      description: 'Forbidden',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
              },
              message: {
                type: 'string',
                default: 'string',
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
