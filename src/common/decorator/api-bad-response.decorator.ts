import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const ApiBadResponse = () => {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'error request data',
      schema: {
        allOf: [
          {
            properties: {
              status: {
                type: 'number',
                default: 400,
              },
              message: {
                type: 'string',
              },
              error: {
                type: 'string',
                default: 'Bad Request',
              },
            },
          },
        ],
      },
    }),
  );
};
