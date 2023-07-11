import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from '../dto';
import { Type, applyDecorators } from '@nestjs/common';

export class ResponseWithPagination<T> extends PaginationDto {
  @ApiProperty({ description: 'Количество строк', type: 'number' })
  limit: number;

  @ApiProperty({ description: 'Пропуск строк', type: 'number' })
  offset: number;

  @ApiProperty({ description: 'Количество элементов', type: 'number' })
  total!: number;

  @ApiProperty({
    description: 'Набор данных',
    default: [],
    isArray: true,
    items: {},
  })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseWithPagination),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWithPagination) },
          {
            properties: {
              data: { type: 'array', items: { $ref: getSchemaPath(dataDto) } },
            },
          },
        ],
      },
    }),
  );
