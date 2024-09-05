import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Document } from 'mongoose';

export class PageParams {
  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: Number,
    example: 10,
    default: 10,
  })
  @IsNumber()
  // @ts-ignore
  @Transform((v) => parseInt(v, 10))
  per_page: number = 10;

  @ApiProperty({
    description: 'Page request',
    required: false,
    type: Number,
    example: 1,
    default: 1,
  })
  @IsNumber()
  // @ts-ignore
  @Transform(v => parseInt(v, 10))
  page: number = 1;
}

export class PageInfo {
  @ApiProperty({
    required: true,
    type: Number,
    example: 10,
  })
  perPage: number;

  @ApiProperty({
    required: true,
    type: Number,
    example: 2,
  })
  currentPage: number;

  @ApiProperty({
    required: true,
    type: Number,
    example: 52,
  })
  totalItems: number;

  @ApiProperty({
    required: true,
    type: Number,
    example: 6,
  })
  totalPages: number;
}

export interface Serialisable {
  toObject(): any;
}

export class IPagination<T extends Serialisable | Document>
  implements Serialisable {
  constructor(meta, data) {
    this.meta = meta;
    this.data = data;
  }

  meta: PageInfo;
  data: T[];

  toObject() {
    return {
      ...this,
      // TODO fix later. For to use Serialisable
      data: this.data.map((obj) => (obj.toObject ? obj.toObject() : obj)),
    };
  }
}
