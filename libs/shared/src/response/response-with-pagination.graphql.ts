import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginated<T = unknown> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export function Paginated<T = unknown>(classRef: Type<T>): Type<IPaginated<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginated<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    offset: number;
  }

  return PaginatedType as Type<IPaginated<T>>;
}
