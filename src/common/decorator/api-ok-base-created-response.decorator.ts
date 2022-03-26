import { Type, applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseCreatedResponse } from 'src/dto/response/base-created-response.dto';

export const ApiOkBaseCreatedResponse = <T extends Type<any>>(
  model: T,
  description: string,
) => {
  return applyDecorators(
    ApiCreatedResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseCreatedResponse) },
          {
            properties: {
              data: {
                type: 'object',
                allOf: [{ $ref: getSchemaPath(model) }],
              },
            },
          },
        ],
      },
    }),
  );
};
