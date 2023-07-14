import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

class ErrorMessage {
  @ApiProperty({ example: 'Unexpected error' })
  message: string;
}
export const ApiErrors = (codes: number[] = []) => {
  const errorDecorators = [
    {
      code: 400,
      decorator: ApiBadRequestResponse({
        description: 'Bad Request: Invalid Sintax',
        type: ErrorMessage,
      }),
    },
    {
      code: 401,
      decorator: ApiUnauthorizedResponse({
        description:
          'Not Authorized: Missing or Expired Authentication parameters',
        type: ErrorMessage,
      }),
    },
    {
      code: 403,
      decorator: ApiForbiddenResponse({
        description:
          "Forbidden: Mostly due to current user hasn't the needed AccessProfile to perform this operation.",
        type: ErrorMessage,
      }),
    },
    {
      code: 404,
      decorator: ApiNotFoundResponse({
        description:
          'Not Found: The organization Id provided was not found in our database',
        type: ErrorMessage,
      }),
    },
    {
      code: 422,
      decorator: ApiUnprocessableEntityResponse({
        description:
          'Due to system constraints was not possible to created the given entity. Probably other exists with the same name.',
        type: ErrorMessage,
      }),
    },
    {
      code: 500,
      decorator: ApiInternalServerErrorResponse({
        description:
          'Internal Server Error: Some unexpected error related to internal infra-structure.',
        type: ErrorMessage,
      }),
    },
  ];

  const decoratorsToInclude = errorDecorators
    .filter((errorDecorator) => codes.includes(errorDecorator.code))
    .map((errorDecorator) => errorDecorator.decorator);

  return applyDecorators(...decoratorsToInclude);
};
